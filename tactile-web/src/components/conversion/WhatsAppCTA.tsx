"use client";
import { useI18n } from "@/i18n/client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappConfig } from "@/config/company";
import { getWhatsAppUrl } from "@/lib/whatsapp";
export function WhatsAppCTA({
  label = "Konsultasi WhatsApp",
  outline = false,
  message = "Halo, saya ingin konsultasi tentang produk tactile indicator.",
}: {
  label?: string;
  outline?: boolean;
  message?: string;
}) {
  const { t: tr, href: localizeHref } = useI18n();

  const href = getWhatsAppUrl(
    whatsappConfig.number,
    whatsappConfig.approved,
    tr(message),
  );
  if (!href)
    return (
      <span className="wa-unavailable">
        <span
          className={`button ${outline ? "outline" : ""}`}
          aria-disabled="true"
        >
          <MessageCircle size={17} />
          {tr(label)}
        </span>
        <small>{tr("Kontak resmi segera tersedia")}</small>
      </span>
    );
  return (
    <a
      className={`button ${outline ? "outline" : ""}`}
      href={localizeHref(href)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {tr(label)}
      <ArrowUpRight size={17} />
    </a>
  );
}
