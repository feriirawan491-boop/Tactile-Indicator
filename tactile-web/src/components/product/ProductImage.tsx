"use client";
import { useI18n } from "@/i18n/client";

import Image from "next/image";
import { ImageLoading } from "@/components/feedback/ImageLoading";
import { useState } from "react";
import type { ProductCardView } from "@/types/product";
export function ProductImage({ image }: { image: ProductCardView["image"] }) {
  const { t: tr } = useI18n();

  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="product-media">
      {image && !failed ? (
        <>
          {!loaded && <ImageLoading />}
          <Image
            src={image.src}
            alt={tr(image.alt)}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </>
      ) : (
        <span>
          {tr("FOTO PRODUK")}
          <br />
          {tr("BELUM TERSEDIA")}
        </span>
      )}
    </div>
  );
}
