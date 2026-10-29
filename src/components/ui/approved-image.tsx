"use client";
import Image from "next/image";
import { useState } from "react";
import type { MediaAsset } from "@/types/catalog";
import type { EquipmentVisual } from "@/types/solution";
import { EquipmentIllustration } from "./equipment-illustration";
import { staticMediaSourceSet } from "@/lib/media";

export function ApprovedImage({
  image,
  label,
  visual,
  sizes = "(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 33vw",
  priority = false,
}: {
  image?: MediaAsset;
  label: string;
  visual?: EquipmentVisual;
  sizes?: string;
  priority?: boolean;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (!image?.approved || failedSource === image.src)
    return visual ? (
      <EquipmentIllustration
        variant={visual}
        label={`${label} — category illustration`}
      />
    ) : (
      <div
        className="media-unavailable"
        role="img"
        aria-label={`${label}: image unavailable`}
      >
        <span>{label}</span>
        <small>Image unavailable</small>
      </div>
    );
  const content = (
    <Image
      unoptimized
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className="approved-image"
      onError={() => setFailedSource(image.src)}
    />
  );
  const sourceSet = staticMediaSourceSet(image);
  return sourceSet ? (
    <picture className="responsive-media">
      <source type="image/webp" srcSet={sourceSet} sizes={sizes} />
      {content}
    </picture>
  ) : content;
}
