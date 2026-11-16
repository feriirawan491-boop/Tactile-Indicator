import { getI18n } from "@/i18n/server";
import { I18nProvider } from "@/i18n/client";
import type { Metadata } from "next";
import { siteUrl, siteIndexable } from "@/config/site";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
import { company } from "@/config/company";
import { JsonLd } from "@/components/JsonLd";
import { SurfacePattern } from "@/components/ui/SurfacePattern";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";
const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Tactile Indicator", template: "%s | Tactile Indicator" },
  description:
    "Kenali tactile indicator, fungsi guiding dan warning, serta pertimbangan pemilihan untuk kebutuhan jalur Anda.",
  robots: { index: siteIndexable, follow: true },
  verification: {
    google: "qvXt70t08ssLIeofRgLBh55IVUYFPPPM-FWhboh4V-A",
  },
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
      <body
        className={`${displayFont.variable} ${bodyFont.variable}`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P8WGKXNZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P8WGKXNZ');`}
        </Script>
        <I18nProvider locale={locale}>
          <JsonLd
            data={{
              "@type": "WebSite",
              name: company.displayName,
              url: siteUrl,
              inLanguage: ["id", "en"],
            }}
          />
          {company.approved && company.legalName && (
            <JsonLd
              data={{
                "@type": "Organization",
                name: company.legalName,
                url: siteUrl,
                ...(company.email ? { email: company.email } : {}),
                ...(company.address ? { address: company.address } : {}),
              }}
            />
          )}
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
