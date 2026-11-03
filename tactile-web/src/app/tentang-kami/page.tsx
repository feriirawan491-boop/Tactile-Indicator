import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TactileStudy } from "@/components/home/TactileStudy";
import { pageMetadata } from "@/lib/seo";
export async function generateMetadata() {
  return pageMetadata(
    "Tentang kami",
    "Mengenal fokus Tactile Indicator dan alur pembahasan kebutuhan jalur aksesibilitas.",
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
          {tr("MEMAHAMI RUANG.")}
          <br />
          {tr("MEMBANTU ARAH.")}
        </h1>
        <div className="about-lead">
          <p>
            {tr(
              "Setiap perjalanan dimulai dengan mengenali arah. Kami menghadirkan ruang informasi untuk memahami peran tactile indicator dalam aksesibilitas.",
            )}
          </p>
          <span className="draft-badge">
            {tr("PROFIL DRAFT · IDENTITAS MENUNGGU KONFIRMASI")}
          </span>
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
              "Website ini dirancang untuk membantu kebutuhan informasi tactile indicator: mulai dari perbedaan pola guiding dan warning hingga pertimbangan pemilihan material dan spesifikasi.",
            )}
          </p>
          <p>
            {tr(
              "Nama badan usaha, lokasi, cakupan layanan, serta portofolio belum dikonfirmasi. Profil ini akan diperbarui menggunakan informasi resmi sebelum website dipublikasikan.",
            )}
          </p>
          <Link href={localizeHref("/produk")} className="text-link">
            {tr("Jelajahi informasi produk")}
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
              "Siapkan konteks area, foto atau denah, serta kebutuhan jalur.",
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
              "WhatsApp tersedia untuk konsultasi. Alamat dan email sedang menunggu konfirmasi. Informasi kontak ditampilkan setelah mendapat persetujuan.",
            )}
          </p>
          <Link className="text-link" href={localizeHref("/kontak")}>
            {tr("Lihat status kontak")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
