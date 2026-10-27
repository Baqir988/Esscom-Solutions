import { FolderOpen } from "lucide-react";
export function ProjectEmpty() {
  return (
    <div className="collection-empty portfolio-empty">
      <FolderOpen size={38} strokeWidth={1.4} aria-hidden="true" />
      <p className="eyebrow">PROJECT PUBLICATION PENDING</p>
      <h3>Project stories need a clear foundation.</h3>
      <p>ESSCOM-attributed project records and approved installation photographs are being confirmed before publication. Explore the solution areas below to understand the technology applications.</p>
    </div>
  );
}
