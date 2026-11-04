"use client";
import { useSearchParams, usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useI18n } from "@/i18n/client";
import { localeHref, type Locale } from "@/i18n/core";
export function LanguageSwitcher() {
  const { locale } = useI18n();
  const pathname = usePathname();
  const params = new URLSearchParams(useSearchParams().toString());
  params.delete("demo");
  const search = params.toString();
  function navigate(event: MouseEvent<HTMLAnchorElement>, target: Locale) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    window.location.assign(
      localeHref(window.location.pathname, target) +
        (search ? `?${search}` : "") +
        window.location.hash,
    );
  }
  return (
    <nav
      className="language-switcher"
      aria-label={locale === "en" ? "Website language" : "Bahasa website"}
    >
      {(["id", "en"] as const).map((lang) => (
        <a
          key={lang}
          href={localeHref(pathname, lang) + (search ? `?${search}` : "")}
          hrefLang={lang}
          lang={lang}
          aria-current={locale === lang ? "true" : undefined}
          onClick={(e) => navigate(e, lang)}
        >
          {lang.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
