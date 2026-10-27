"use client";
import { useState, useId } from "react";
import type { MediaAsset } from "@/types/catalog";
import type { EquipmentVisual } from "@/types/solution";
import { ApprovedImage } from "./approved-image";

export function MediaGallery({
  images,
  title,
  visual,
}: {
  images: MediaAsset[];
  title: string;
  visual?: EquipmentVisual;
}) {
  const approved = images.filter((image) => image.approved);
  const [selected, setSelected] = useState(0);
  const current = approved[selected] ?? approved[0];
  const panelId = useId();
  return (
    <div className="media-gallery">
      <figure className="gallery-main" id={panelId}>
        <ApprovedImage
          key={current?.src ?? "fallback"}
          image={current}
          label={title}
          visual={visual}
          sizes="(max-width: 767px) 100vw, 50vw"
          priority
        />
        <figcaption aria-live="polite">
          {current
            ? `${current.alt}${approved.length > 1 ? ` · ${selected + 1} of ${approved.length}` : ""}`
            : "Category illustration · Product imagery awaiting approval"}
        </figcaption>
      </figure>
      {approved.length > 1 && (
        <div
          className="gallery-thumbnails"
          role="group"
          aria-label={`${title} image selection`}
        >
          {approved.map((image, index) => (
            <button
              type="button"
              key={image.src}
              aria-label={`Show image ${index + 1}: ${image.alt}`}
              aria-pressed={index === selected}
              aria-controls={panelId}
              onClick={() => setSelected(index)}
            >
              <ApprovedImage
                image={{ ...image, alt: "" }}
                label={`Image ${index + 1}`}
                sizes="90px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
