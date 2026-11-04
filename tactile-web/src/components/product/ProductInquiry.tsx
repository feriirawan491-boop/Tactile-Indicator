"use client";
import { useI18n } from "@/i18n/client";

import { ProductImage } from "./ProductImage";
import { useState } from "react";
import { WhatsAppCTA } from "@/components/conversion/WhatsAppCTA";
import { composeProductMessage, selectedVariant } from "@/lib/product-inquiry";
import type { ProductCardView } from "@/types/product";
export function ProductInquiry({
  product,
  url,
  initialVariantId,
}: {
  product: ProductCardView;
  url: string;
  initialVariantId?: string;
}) {
  const { t: tr, locale } = useI18n();

  const variants = product.variants ?? [];
  const [variantId, setVariantId] = useState(
    selectedVariant(variants, initialVariantId ?? product.preselectedVariantId)
      ?.id ?? "",
  );
  const [error, setError] = useState(false);
  const [grade, setGrade] = useState("");
  const [finish, setFinish] = useState("");
  const variant = selectedVariant(variants, variantId);
  const message = composeProductMessage({
    name:
      locale === "en" ? (product.englishName ?? product.name) : product.name,
    url,
    variantLabel: variant
      ? [
          variant.label.split(" · ")[0],
          grade ? `Grade: ${grade}` : "",
          finish ? `Finishing: ${finish}` : "",
        ]
          .filter(Boolean)
          .join(" / ")
      : undefined,
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
          <label htmlFor="product-model">{tr("Model pada sumber")}</label>
          <select
            id="product-model"
            value={variantId}
            onChange={(e) => {
              setVariantId(e.target.value);
              setGrade("");
              setFinish("");
              setError(false);
            }}
          >
            <option value="">{tr("Belum menentukan varian")}</option>
            {variants.map((v) => (
              <option key={v.id} value={v.id}>
                {tr(v.label)}
              </option>
            ))}
          </select>
        </fieldset>
      )}
      {variant?.grades && variant.grades.length > 0 && (
        <label className="model-option" htmlFor="product-grade">
          {tr("Grade (opsional)")}
          <select
            id="product-grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">{tr("Belum menentukan grade")}</option>
            {variant.grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      )}
      {variant?.finishOptions && variant.finishOptions.length > 0 && (
        <label className="model-option" htmlFor="product-finish">
          {tr("Finishing (opsional)")}
          <select
            id="product-finish"
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
          >
            <option value="">{tr("Belum menentukan finishing")}</option>
            {variant.finishOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
      )}
      {variant?.specs && (
        <section className="variant-specs" aria-live="polite">
          <h2>{tr("Spesifikasi model terpilih")}</h2>
          <p>{tr(variant.label)}</p>
          {variant.image && <ProductImage image={variant.image} />}
          <table className="spec-table">
            <tbody>
              {variant.specs.map((s, i) => (
                <tr key={i}>
                  <th scope="row">{tr(s.label)}</th>
                  <td>{tr(s.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {variant.sourceUrl && (
            <a
              className="text-link"
              href={variant.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tr("Lihat data model pada sumber")} ↗
            </a>
          )}
        </section>
      )}
      {!variant && variants.length > 0 && (
        <p>
          {tr(
            "Pilih model di atas untuk melihat data dimensi dan pemasangannya.",
          )}
        </p>
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
