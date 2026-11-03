"use client";
import { useI18n } from "@/i18n/client";

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { stripLocalePath } from "@/i18n/core";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/config/navigation";
import { WhatsAppCTA } from "@/components/conversion/WhatsAppCTA";
export function SiteHeader() {
  const { t: tr, href: localizeHref } = useI18n();

  const pathname = stripLocalePath(usePathname());
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  function close() {
    dialog.current?.close();
    trigger.current?.focus();
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href={localizeHref("/")}
          className="brand"
          aria-label={tr("Tactile Indicator — Beranda")}
        >
          <span className="brand-mark" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} />
            ))}
          </span>
          <span>
            {tr("TACTILE")}
            <span className="brand-sub">{tr("INDICATOR")}</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={tr("Navigasi utama")}>
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={localizeHref(n.href)}
              aria-current={
                pathname === n.href || pathname.startsWith(n.href + "/")
                  ? "page"
                  : undefined
              }
            >
              {tr(n.label)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <div className="header-contact">
            <WhatsAppCTA label="Konsultasi WhatsApp" />
          </div>
        </div>
        <button
          ref={trigger}
          className="menu-toggle"
          aria-label={tr("Buka menu navigasi")}
          aria-haspopup="dialog"
          onClick={() => dialog.current?.showModal()}
        >
          <Menu />
        </button>
        <dialog
          ref={dialog}
          className="mobile-nav"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onCancel={close}
        >
          <div className="drawer-top">
            <span>{tr("MENU NAVIGASI")}</span>
            <button aria-label={tr("Tutup menu")} onClick={close}>
              <X />
            </button>
          </div>
          <LanguageSwitcher />
          <nav aria-label={tr("Navigasi seluler")}>
            {navigation.map((n) => (
              <Link
                key={n.href}
                href={localizeHref(n.href)}
                onClick={close}
                aria-current={
                  pathname === n.href || pathname.startsWith(n.href + "/")
                    ? "page"
                    : undefined
                }
              >
                {tr(n.label)}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
          <p>
            {tr("Permukaan yang membantu.")}
            <br />
            {tr("Ruang yang lebih terarah.")}
          </p>
        </dialog>
      </div>
    </header>
  );
}
