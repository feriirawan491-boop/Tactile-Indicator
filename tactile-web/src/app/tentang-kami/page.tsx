import { isPreview } from "@/config/site";
import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TactileStudy } from "@/components/home/TactileStudy";
import { pageMetadata } from "@/lib/seo";
export async function generateMetadata() {
  return pageMetadata(
    "Tentang kami",
    "Kenali Tactile Indicator dan cara kami membantu Anda memahami produk, membandingkan spesifikasi, dan membahas kebutuhan jalur aksesibilitas.",
    "/tentang-kami",
  );
}
export default async function About() {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <div className="container">
      <Breadcrumbs label="Tentang Kami" />
      <section className="about-hero">
        <p className="eyebrow">{tr("TENTANG TACTILE INDICATOR")}</p>
        <h1>
          {tr("BETTER ACCESS.")}
          <br />
          {tr("ONE STEP AT A TIME.")}
        </h1>
        <div className="about-lead">
          <p>
            {tr(
              "Ruang yang mudah dinavigasi dimulai dari petunjuk yang jelas. Tactile Indicator membantu Anda mengenali pilihan penanda lantai untuk mendukung kebutuhan aksesibilitas proyek.",
            )}
          </p>
          {isPreview && (
            <span className="draft-badge">
              {tr("PROFIL DRAFT · IDENTITAS MENUNGGU KONFIRMASI")}
            </span>
          )}
        </div>
      </section>
      <div className="about-study">
        <TactileStudy />
      </div>
      <section className="section narrative">
        <p className="eyebrow">{tr("01 / FOKUS KAMI")}</p>
        <div>
          <h2>
            {tr("INFORMASI YANG JELAS.")}
            <br />
            {tr("PEMILIHAN YANG TERARAH.")}
          </h2>
          <p>
            {tr(
              "Dari pola garis dan titik hingga pilihan pelat, stud, dan strip, kami membuat informasi produk lebih mudah dipahami agar Anda bisa membandingkan pilihan dengan percaya diri.",
            )}
          </p>
          <p>
            {tr(
              "Punya denah, foto area, atau daftar kebutuhan? Bagikan melalui WhatsApp untuk membahas pilihan produk, ukuran, dan spesifikasi yang perlu diperhatikan.",
            )}
          </p>
          <Link href={localizeHref("/produk")} className="text-link">
            {tr("Jelajahi produk")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">{tr("02 / PEMBAHASAN KEBUTUHAN")}</p>
        <h2>
          {tr("DARI KONTEKS")}
          <br />
          {tr("KE SPESIFIKASI.")}
        </h2>
        <div className="steps-grid three">
          {[
            [
              "Diskusi kebutuhan",
              "Kenali kebutuhan area Anda, foto atau denah, serta kebutuhan jalur.",
            ],
            [
              "Pembahasan pilihan",
              "Tinjau fungsi, material, dan spesifikasi produk yang relevan.",
            ],
            [
              "Permintaan penawaran",
              "Lanjutkan pembahasan kebutuhan melalui WhatsApp.",
            ],
          ].map(([t, d], i) => (
            <div className="step" key={t}>
              <span className="step-number">0{i + 1}</span>
              <h3>{tr(t)}</h3>
              <p>{tr(d)}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section contact-note">
        <div>
          <p className="eyebrow">{tr("03 / LOKASI & KONTAK")}</p>
          <h2>{tr("MARI TERHUBUNG.")}</h2>
        </div>
        <div>
          <p>
            {tr(
              "Mulai dari percakapan sederhana. Ceritakan lokasi penggunaan dan kebutuhan Anda melalui WhatsApp, lalu kita bahas pilihan produknya bersama.",
            )}
          </p>
          <Link className="text-link" href={localizeHref("/kontak")}>
            {tr("Hubungi kami")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
