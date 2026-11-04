import { headers } from "next/headers";
import { getCatalog } from "@/data/catalog";
import { absoluteUrl } from "@/config/site";
import { composeProductMessage } from "@/lib/product-inquiry";
import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isPreview } from "@/config/site";
import { company } from "@/config/company";
import { approvedEmail } from "@/lib/contact";
import { navigation } from "@/config/navigation";
import { WhatsAppCTA } from "@/components/conversion/WhatsAppCTA";
export async function SiteFooter() {
  const { t: tr, href: localizeHref } = await getI18n();

  const path = (await headers()).get("x-tactile-path") || "/";
  const product = getCatalog().products.find(
    (p) => path === `/produk/${p.slug}`,
  );
  const message = product
    ? composeProductMessage({
        name: tr(product.name),
        url: absoluteUrl(localizeHref(path)),
      })
    : undefined;
  const email = approvedEmail(company.email, company.approved);
  return (
    <>
      {path !== "/kontak" && (
        <section className="closing">
          <div className="container closing-inner">
            <div>
              <p className="eyebrow">{tr("LANGKAH SELANJUTNYA")}</p>
              <h2>
                {tr("JALUR YANG BAIK")}
                <br />
                {tr("DIMULAI DARI DISKUSI.")}
              </h2>
              <p>
                {tr("Ceritakan kebutuhan area dan spesifikasi proyek Anda.")}
              </p>
            </div>
            <WhatsAppCTA
              label="Diskusikan kebutuhan proyek"
              outline
              message={message}
            />
          </div>
        </section>
      )}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Link href={localizeHref("/")} className="footer-brand">
                {tr("TACTILE INDICATOR")}
                <span>{tr("PERMUKAAN KECIL. PERAN BERARTI.")}</span>
              </Link>
              <p>
                {tr("Informasi tactile indicator untuk")}
                <br />
                {tr("ruang yang lebih mudah dinavigasi.")}
              </p>
            </div>
            <div>
              <p className="footer-label">{tr("JELAJAHI")}</p>
              {navigation.slice(0, 3).map((n) => (
                <Link href={localizeHref(n.href)} key={n.href}>
                  {tr(n.label)}
                </Link>
              ))}
            </div>
            <div>
              <p className="footer-label">{tr("INFORMASI")}</p>
              <Link href={localizeHref("/faq")}>{tr("Pertanyaan umum")}</Link>
              <Link href={localizeHref("/kontak")}>
                {tr("Kontak")}
                <ArrowUpRight size={13} />
              </Link>
              <Link href={localizeHref("/kebijakan-privasi")}>
                {tr("Kebijakan privasi")}
              </Link>
              {email && (
                <a href={localizeHref(`mailto:${email}`)}>{tr(email)}</a>
              )}
              {company.approved && company.address && (
                <address className="footer-address">
                  {tr(company.address)}
                </address>
              )}
              {isPreview && (
                <span className="draft-label">
                  {tr("Pratinjau lokal · Fase 0–12")}
                </span>
              )}
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()}
              {tr(" ")}
              {tr(
                isPreview
                  ? "Tactile Indicator · Identitas brand sementara"
                  : "Tactile Indicator",
              )}
            </span>
            <span>{tr("Dirancang untuk langkah yang lebih terarah.")}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
