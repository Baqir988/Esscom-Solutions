import type { MediaAsset } from "@/types/catalog";

/** Accept only same-site, prebuilt images with matching proportions. */
export function staticMediaSourceSet(image: MediaAsset) {
  if (!image.approved || !image.sources?.length) return undefined;
  const sources = image.sources.filter((source) =>
    /^\/images\/[a-zA-Z0-9/_-]+\.webp$/.test(source.src) &&
    Number.isInteger(source.width) && source.width > 0 && source.width <= image.width &&
    Number.isInteger(source.height) && source.height > 0 && source.height <= image.height &&
    Math.abs(source.height - source.width * image.height / image.width) <= 1,
  );
  return [...new Map(sources.map((source) => [source.width, source])).values()]
    .sort((a, b) => a.width - b.width)
    .map((source) => `${source.src} ${source.width}w`)
    .join(", ") || undefined;
}
