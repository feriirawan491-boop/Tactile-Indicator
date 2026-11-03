import { getI18n } from "@/i18n/server";
import { I18nProvider } from "@/i18n/client";
import type { Metadata } from "next";
import { SurfacePattern } from "@/components/ui/SurfacePattern";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";
const baseMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: { default: "Tactile Indicator", template: "%s | Tactile Indicator" },
  description:
    "Kenali tactile indicator, fungsi guiding dan warning, serta pertimbangan pemilihan untuk kebutuhan jalur Anda.",
  robots: { index: false, follow: false },
};
export async function generateMetadata(): Promise<Metadata> {
  const { t: tr } = await getI18n();
  return { ...baseMetadata, description: tr(String(baseMetadata.description)) };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, t: tr } = await getI18n();
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      {/* Browser extensions may inject body attributes before hydration.
          Suppression is limited to this element; descendants remain checked. */}
      <body suppressHydrationWarning>
        <I18nProvider locale={locale}>
          <a href="#main-content" className="skip-link">
            {tr("Lewati ke konten")}
          </a>
          <SiteHeader />
          <main id="main-content" className="site-main">
            <div className="page-patterns" aria-hidden="true">
              <SurfacePattern variant="dots" className="page-pattern-top" />
            </div>
            {children}
          </main>
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
