"use client";
import { createContext, useContext } from "react";
import { translateText, localeHref, type Locale } from "./core";
const LocaleContext = createContext<Locale>("id");
export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}
export function useI18n() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: (text: string) => translateText(text, locale),
    href: (path: string) => localeHref(path, locale),
  };
}
