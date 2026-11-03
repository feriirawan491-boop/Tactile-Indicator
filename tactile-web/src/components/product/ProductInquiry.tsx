"use client";
import { useI18n } from "@/i18n/client";

import { useState } from "react";
import { WhatsAppCTA } from "@/components/conversion/WhatsAppCTA";
import { composeProductMessage, selectedVariant } from "@/lib/product-inquiry";
import type { ProductCardView } from "@/types/product";
export function ProductInquiry({
  product,
  url,
}: {
  product: ProductCardView;
  url: string;
}) {
  const { t: tr } = useI18n();

  const variants = product.variants ?? [];
  const [variantId, setVariantId] = useState(
    selectedVariant(variants, product.preselectedVariantId)?.id ?? "",
  );
  const [error, setError] = useState(false);
  const variant = selectedVariant(variants, variantId);
  const message = composeProductMessage({
    name: product.name,
    url,
    variantLabel: variant?.label,
  });
  const needsVariant = product.variantRequired && !variant;
  return (
    <div className="product-inquiry">
      {variants.length > 0 && (
        <fieldset
          className="variant-selector"
          aria-describedby={error ? "variant-error" : undefined}
        >
          <legend>
            {tr("Pilih varian")}
            {tr(" ")}
            {tr(product.variantRequired ? "untuk penawaran" : "(opsional)")}
          </legend>
          <label>
            <input
              type="radio"
              name="variant"
              value=""
              checked={!variantId}
              onChange={() => {
                setVariantId("");
                setError(false);
              }}
            />
            {tr("Belum menentukan varian")}
          </label>
          {variants.map((v) => (
            <label key={v.id}>
              <input
                type="radio"
                name="variant"
                value={v.id}
                checked={variantId === v.id}
                onChange={() => {
                  setVariantId(v.id);
                  setError(false);
                }}
              />
              {tr(v.label)}
            </label>
          ))}
        </fieldset>
      )}
      {error && (
        <p id="variant-error" className="inline-error" role="alert">
          {tr(
            "Pilih varian sebelum meminta penawaran. Konsultasi umum tetap dapat dilakukan.",
          )}
        </p>
      )}
      <div className="detail-actions">
        <WhatsAppCTA
          label="Tanya produk ini via WhatsApp"
          message={tr(message)}
        />
        {needsVariant ? (
          <button className="button outline" onClick={() => setError(true)}>
            {tr("Minta penawaran")}
          </button>
        ) : (
          <WhatsAppCTA
            label="Minta penawaran"
            outline
            message={message.replace(
              "konsultasi produk",
              "meminta penawaran produk",
            )}
          />
        )}
      </div>
      <p className="inquiry-note">
        {tr(
          "Tidak ada harga atau status stok yang diasumsikan. Klik WhatsApp membuka percakapan, bukan mengirim pesan otomatis.",
        )}
      </p>
    </div>
  );
}
