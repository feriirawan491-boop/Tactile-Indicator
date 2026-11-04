import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { WhatsAppCTA } from "@/components/conversion/WhatsAppCTA";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { pageMetadata } from "@/lib/seo";
export async function generateMetadata() {
  return pageMetadata(
    "Hubungi kami",
    "Diskusikan pilihan tactile indicator, kebutuhan jumlah, dan spesifikasi proyek melalui WhatsApp.",
    "/kontak",
  );
}
export default async function Contact() {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <div className="container">
      <Breadcrumbs label="Kontak" />
      <section className="contact-hero">
        <div>
          <p className="eyebrow">{tr("KONTAK / MULAI DARI KEBUTUHAN")}</p>
          <h1>
            {tr("HUBUNGI")}
            <br />
            {tr("KAMI.")}
          </h1>
          <p>
            {tr(
              "Ceritakan kebutuhan jalur, pilihan produk, atau spesifikasi proyek yang ingin didiskusikan.",
            )}
          </p>
          <WhatsAppCTA
            label="Konsultasi via WhatsApp"
            message="Halo, saya ingin konsultasi kebutuhan tactile indicator dan meminta informasi penawaran."
          />
          <p className="inquiry-note">
            {tr(
              "Website tidak menyediakan formulir atau menyimpan permintaan penawaran. Percakapan dilanjutkan melalui WhatsApp.",
            )}
          </p>
        </div>
        <ContactDetails />
      </section>
      <section className="section contact-process">
        <p className="eyebrow">{tr("SEBELUM MEMULAI PERCAKAPAN")}</p>
        <h2>{tr("CARA KONSULTASI.")}</h2>
        <div className="steps-grid three">
          {[
            [
              "Kenali produk",
              "Telusuri fungsi dan material. Bila belum menentukan pilihan, mulai dari kebutuhan area.",
            ],
            [
              "Siapkan konteks",
              "Siapkan ukuran yang dibutuhkan, perkiraan jumlah, serta lokasi penggunaan bila sudah diketahui.",
            ],
            [
              "Diskusikan penawaran",
              "Konfirmasikan spesifikasi, kebutuhan, dan ketentuan penawaran melalui kontak resmi.",
            ],
          ].map(([t, d], i) => (
            <div className="step" key={t}>
              <span className="step-number">0{i + 1}</span>
              <h3>{tr(t)}</h3>
              <p>{tr(d)}</p>
            </div>
          ))}
        </div>
        <p className="category-copy">
          {tr(
            "Alur ini membantu menyiapkan diskusi, bukan janji waktu respons atau ketersediaan layanan.",
          )}
        </p>
        <div className="category-links">
          <Link href={localizeHref("/produk")}>
            {tr("Kembali ke katalog ↗")}
          </Link>
          <Link href={localizeHref("/faq")}>
            {tr("Baca pertanyaan umum ↗")}
          </Link>
          <Link href={localizeHref("/kebijakan-privasi")}>
            {tr("Informasi privasi ↗")}
          </Link>
        </div>
      </section>
    </div>
  );
}
