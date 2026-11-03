"use client";
import { useI18n } from "@/i18n/client";
export function ImageLoading() {
  const { t: tr } = useI18n();

  return (
    <span className="image-loading" role="status">
      <span className="sr-only">{tr("Memuat gambar…")}</span>
    </span>
  );
}
