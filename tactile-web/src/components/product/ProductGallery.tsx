"use client";
import { useI18n } from "@/i18n/client";

import { useState } from "react";
import Image from "next/image";
import { ImageLoading } from "@/components/feedback/ImageLoading";
export function ProductGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const { t: tr } = useI18n();

  const [selected, setSelected] = useState(0),
    [failed, setFailed] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<string[]>([]);
  const image = images[selected];
  return (
    <div className="product-gallery">
      <div className="gallery-main">
        {image && !failed.includes(image.src) ? (
          <>
            {!loaded.includes(image.src) && <ImageLoading />}
            <Image
              key={image.src}
              src={image.src}
              alt={tr(image.alt)}
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              onLoad={() => setLoaded((old) => [...old, image.src])}
              onError={() => setFailed((old) => [...old, image.src])}
            />
          </>
        ) : (
          <div className="gallery-fallback">
            <span>{tr("FOTO RESMI BELUM TERSEDIA")}</span>
            <p>{tr("Foto ditampilkan setelah aset produk disetujui.")}</p>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div
          className="gallery-thumbnails"
          aria-label={tr("Pilih foto produk")}
        >
          {images.map((photo, i) => (
            <button
              key={`${photo.src}-${i}`}
              onClick={() => setSelected(i)}
              aria-pressed={i === selected}
              aria-label={tr(`Tampilkan foto ${i + 1}: ${photo.alt}`)}
            >
              {!failed.includes(photo.src) ? (
                <Image
                  src={photo.src}
                  alt=""
                  width={80}
                  height={80}
                  onError={() => setFailed((old) => [...old, photo.src])}
                />
              ) : (
                <span>
                  {tr("Foto")}
                  {i + 1}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
