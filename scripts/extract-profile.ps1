param([Parameter(Mandatory=$true)][string]$Source)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$projectRoot = Split-Path $PSScriptRoot -Parent
$destination = Join-Path $projectRoot 'private/company-profile'
$originals = Join-Path $destination 'originals'
New-Item -ItemType Directory -Force -Path $originals | Out-Null
$sourceFile = Get-Item -LiteralPath $Source
$zip = [System.IO.Compression.ZipFile]::OpenRead($sourceFile.FullName)
function Read-ZipText($entry) {
  $reader = [System.IO.StreamReader]::new($entry.Open())
  try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
}
try {
  $contentTypes = [xml](Read-ZipText $zip.GetEntry('[Content_Types].xml'))
  $imageExtensions = @($contentTypes.Types.Default | Where-Object { $_.ContentType -like 'image/*' } | ForEach-Object { $_.Extension })
  $imageOverrides = @($contentTypes.Types.Override | Where-Object { $_.ContentType -like 'image/*' } | ForEach-Object { $_.PartName.TrimStart('/') })
  $entries = @($zip.Entries | Where-Object {
    $_.Length -gt 0 -and ($_.FullName -match '(^|/)media/' -or
      [System.IO.Path]::GetExtension($_.FullName).TrimStart('.') -in $imageExtensions -or $_.FullName -in $imageOverrides)
  } | Sort-Object FullName)
  $records = @{}
  foreach ($entry in $entries) {
    # Preserve package paths; never use unvalidated archive paths as filesystem destinations.
    if ($entry.FullName -match '(^/|\.\.|:|\\)') { throw "Unsafe archive path: $($entry.FullName)" }
    $target = Join-Path $originals $entry.FullName
    New-Item -ItemType Directory -Force -Path (Split-Path $target -Parent) | Out-Null
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $target, $true)
    $records[$entry.FullName] = [ordered]@{
      packagePath = $entry.FullName
      originalName = [System.IO.Path]::GetFileName($entry.FullName)
      originalBytes = $entry.Length
      sha256 = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant()
      originalPath = 'private/company-profile/originals/' + $entry.FullName
      occurrences = [System.Collections.Generic.List[object]]::new()
    }
  }
  $externalImages = [System.Collections.Generic.List[object]]::new()
  foreach ($part in @($zip.Entries | Where-Object { $_.FullName -match '^word/(?!_rels/).*\.xml$' })) {
    $partDirectory = [System.IO.Path]::GetDirectoryName($part.FullName).Replace('\','/')
    $relPath = $partDirectory + '/_rels/' + [System.IO.Path]::GetFileName($part.FullName) + '.rels'
    $relEntry = $zip.GetEntry($relPath)
    if (!$relEntry) { continue }
    $rels = [xml](Read-ZipText $relEntry)
    $images = @{}
    foreach ($rel in @($rels.Relationships.Relationship)) {
      if ($rel.Type -notmatch '/image$') { continue }
      if ($rel.TargetMode -eq 'External') {
        $externalImages.Add(@{part=$part.FullName; relationship=$rel.Id; target=$rel.Target})
        continue
      }
      $baseUri = [Uri]('https://package.invalid/' + $part.FullName)
      $path = [Uri]::UnescapeDataString(([Uri]::new($baseUri, [string]$rel.Target)).AbsolutePath.TrimStart('/'))
      $images[$rel.Id] = $path
    }
    if (!$images.Count) { continue }
    $xml = [xml](Read-ZipText $part)
    $ns = [System.Xml.XmlNamespaceManager]::new($xml.NameTable)
    $ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
    $page = 1; $section = 1; $previousText = ''
    foreach ($node in $xml.SelectNodes('//*')) {
      if ($node.LocalName -eq 'lastRenderedPageBreak') { $page++ }
      if ($node.LocalName -eq 'sectPr') { $section++ }
      if ($node.LocalName -eq 'p') {
        $t = (($node.SelectNodes('.//w:t', $ns) | ForEach-Object { $_.InnerText }) -join ' ')
        $t = ($t -replace '\s+', ' ').Trim()
        if ($t) { $previousText = $t.Substring(0, [Math]::Min(600, $t.Length)) }
      }
      if ($node.LocalName -notin @('blip','imagedata')) { continue }
      $id = @($node.Attributes | Where-Object { $_.LocalName -in @('embed','id') -and $_.NamespaceURI -like '*/relationships' } | ForEach-Object { $_.Value }) | Select-Object -First 1
      if (!$id -or !$images.ContainsKey($id)) { continue }
      $path = $images[$id]
      if (!$records.ContainsKey($path)) { throw "Image reference missing from extraction: $path" }
      $records[$path].occurrences.Add([ordered]@{part=$part.FullName; relationship=$id; cachedSegment=$page; section=$section; nearbyText=$previousText})
    }
  }
  $app = [xml](Read-ZipText $zip.GetEntry('docProps/app.xml'))
  $result = [ordered]@{
    sourceName=$sourceFile.Name; sourceBytes=$sourceFile.Length
    sourceSha256=(Get-FileHash -LiteralPath $sourceFile.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    documentReportedPages=$app.Properties.Pages
    paginationNote='Cached segments and section boundaries are XML locators, not verified printed page numbers.'
    externalImages=@($externalImages.ToArray())
    assets=@($records.Values | Sort-Object packagePath)
  }
  $json = $result | ConvertTo-Json -Depth 12
  [System.IO.File]::WriteAllText((Join-Path $destination 'extraction.json'), $json, [System.Text.UTF8Encoding]::new($false))
  Write-Output "Extracted $($entries.Count) embedded candidates to private/company-profile/originals. External references: $($externalImages.Count)."
} finally { $zip.Dispose() }
