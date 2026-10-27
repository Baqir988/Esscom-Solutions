import {
  Camera,
  Fingerprint,
  ListOrdered,
  Monitor,
  Network,
  ScanBarcode,
} from "lucide-react";
import type { SolutionIconName } from "@/types/solution";
const icons = {
  camera: Camera,
  fingerprint: Fingerprint,
  queue: ListOrdered,
  pos: ScanBarcode,
  display: Monitor,
  network: Network,
};
export function SolutionIcon({
  name,
  size = 25,
}: {
  name: SolutionIconName;
  size?: number;
}) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
