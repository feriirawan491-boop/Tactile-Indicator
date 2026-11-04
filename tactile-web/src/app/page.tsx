import { getI18n } from "@/i18n/server";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { SurfacePattern } from "@/components/ui/SurfacePattern";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppCTA } from "@/components/conversion/WhatsAppCTA";
import { faqs, steps } from "@/data/home";
export async function generateMetadata() {
  return pageMetadata(
    "Tactile Indicator Stainless Steel untuk Aksesibilitas",
    "Kenali tactile indicator berpola garis dan titik, fungsi dan pertimbangan pemilihannya.",
  );
}
export default async function Home() {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <>
      <section
        className="hero-banner"
        aria-label={tr("Tactile indicator untuk jalur yang terarah")}
      >
        <div className="hero-banner-media">
          <Image
            src="/images/hero/tactile-crossing-motion-v1.webp"
            alt={tr(
              "Langkah pejalan kaki pada jalur taktil berpola garis dan titik di atas permukaan gelap",
            )}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            preload
          />
        </div>
        <div className="hero-banner-shade" aria-hidden="true" />
        <SurfacePattern variant="dots" />
        <div className="container hero-banner-content">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              {tr(" ")}
              {tr("AKSESIBILITAS DALAM SETIAP LANGKAH")}
            </p>
            <h1>
              {tr("PERMUKAAN KECIL.")}
              <br />
              {tr("ARAH YANG")}
              <br />
              <span>{tr("BERARTI.")}</span>
            </h1>
            <p className="hero-description">
              {tr(
                "Tactile indicator membantu mengenali arah dan peringatan melalui pola pada permukaan. Kenali pilihan yang sesuai untuk kebutuhan jalur Anda.",
              )}
            </p>
            <div className="hero-actions">
              <Link href={localizeHref("/produk")} className="button">
                {tr("Lihat produk")}
                <ArrowUpRight size={18} />
              </Link>
              <WhatsAppCTA outline />
            </div>
            <a className="scroll-cue" href={localizeHref("#kenali")}>
              <ArrowDown size={16} /> {tr("KENALI LEBIH DEKAT")}
            </a>
          </div>
        </div>
        <span className="hero-banner-caption">
          {tr("GUIDING & WARNING / JALUR TAKTIL")}
        </span>
      </section>
      <div className="principle-strip">
        <div className="container">
          <span>{tr("PETUNJUK ARAH")}</span>
          <span aria-hidden="true">+</span>
          <span>{tr("ISYARAT PERINGATAN")}</span>
          <span aria-hidden="true">+</span>
          <span>{tr("AKSESIBILITAS RUANG")}</span>
        </div>
      </div>
      <section id="kenali" className="section container intro-section">
        <p className="eyebrow">{tr("01 / KENALI TACTILE")}</p>
        <div>
          <h2>
            {tr("SEBUAH POLA.")}
            <br />
            {tr("SEBUAH PETUNJUK.")}
          </h2>
          <p>
            {tr(
              "Tidak semua orang membaca ruang dengan cara yang sama. Tactile indicator menghadirkan informasi melalui tekstur yang dapat dirasakan oleh kaki atau tongkat.",
            )}
          </p>
          <p>
            {tr(
              "Pola garis membantu menunjukkan arah, sementara pola titik memberi isyarat kewaspadaan. Keduanya memiliki peran berbeda dalam sebuah jalur.",
            )}
          </p>
          <Link className="text-link" href={localizeHref("/panduan")}>
            {tr("Pelajari tactile indicator")}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section functions-section">
        <SurfacePattern variant="dots" />
        <div className="container">
          <SectionHeading
            index="02"
            kicker="DUA FUNGSI UTAMA"
            title={tr("KENALI POLANYA.")}
          >
            <p>
              {tr("Mulai dari fungsi yang dibutuhkan.")}
              <br />
              {tr("Setiap pola membawa informasi berbeda.")}
            </p>
          </SectionHeading>
          <div className="function-grid">
            <Link
              href={localizeHref("/produk/fungsi/guiding-block")}
              className="function-card"
            >
              <div className="function-product-image">
                <Image
                  src="/images/products/catalog-v2/studs-strips.webp"
                  alt={tr(
                    "Batang pemandu arah individual berbahan stainless steel",
                  )}
                  width={650}
                  height={650}
                  sizes="(max-width:767px) 100vw, 50vw"
                />
              </div>
              <div className="function-card-content">
                <div className="function-meta">
                  <span>{tr("01 / DIRECTIONAL")}</span>
                  <ArrowUpRight />
                </div>
                <h3>{tr("GUIDING")}</h3>
                <p>
                  {tr(
                    "Pola garis memanjang untuk membantu mengenali arah perjalanan.",
                  )}
                </p>
                <span className="text-link">
                  {tr("Kenali produk guiding")}
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
            <Link
              href={localizeHref("/produk/fungsi/warning-block")}
              className="function-card"
            >
              <div className="function-product-image">
                <Image
                  src="/images/products/catalog-v2/silver-pineapple.webp"
                  alt={tr(
                    "Stud peringatan bulat individual berbahan stainless steel",
                  )}
                  width={650}
                  height={650}
                  sizes="(max-width:767px) 100vw, 50vw"
                />
              </div>
              <div className="function-card-content">
                <div className="function-meta">
                  <span>{tr("02 / ATTENTION")}</span>
                  <ArrowUpRight />
                </div>
                <h3>{tr("WARNING")}</h3>
                <p>
                  {tr(
                    "Pola titik untuk memberi isyarat kewaspadaan atau perubahan kondisi jalur.",
                  )}
                </p>
                <span className="text-link">
                  {tr("Kenali produk warning")}
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="section container material-section">
        <SectionHeading
          index="03"
          kicker="PERTIMBANGAN MATERIAL"
          title={tr("SESUAIKAN DENGAN AREANYA.")}
        >
          <p>
            {tr(
              "Lokasi dan kondisi penggunaan menjadi dasar pemilihan material dan metode pemasangan.",
            )}
          </p>
        </SectionHeading>
        <div className="material-note">
          <span className="large-index" aria-hidden="true">
            03 /
          </span>
          <div>
            <h3>{tr("Stainless steel untuk berbagai bentuk.")}</h3>
            <p>
              {tr(
                "Kenali pelat modular, studs bulat, serta kombinasi studs dan strips. Grade 304 atau 316 tergantung model produk; sesuaikan dimensi, finishing, dan pemasangan dengan kebutuhan proyek.",
              )}
            </p>
          </div>
          <Link className="text-link" href={localizeHref("/produk")}>
            {tr("Ke katalog")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="steps-section section">
        <div className="container">
          <SectionHeading
            index="04"
            kicker="PANDUAN PEMILIHAN"
            title={tr("EMPAT LANGKAH.\nPILIHAN LEBIH TERARAH.")}
          />
          <div className="steps-grid">
            {steps.map(([title, description], i) => (
              <div className="step" key={title}>
                <span className="step-number">
                  0{i + 1}
                  <ArrowUpRight size={20} />
                </span>
                <h3>{tr(title)}</h3>
                <p>{tr(description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container about-teaser">
        <p className="eyebrow">{tr("05 / TENTANG KAMI")}</p>
        <h2>
          {tr("BERAWAL DARI")}
          <br />
          {tr("KEBUTUHAN AKSES.")}
        </h2>
        <div>
          <p>
            {tr(
              "Halaman ini memperkenalkan tactile indicator dan membantu Anda memahami pertimbangan pemilihannya. Profil resmi perusahaan akan dilengkapi setelah identitas dan informasinya disetujui.",
            )}
          </p>
          <Link className="text-link" href={localizeHref("/tentang-kami")}>
            {tr("Mengenal kami")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section container guide-section">
        <SectionHeading
          index="06"
          kicker="BEKAL SEBELUM MEMILIH"
          title={tr("PAHAMI LEBIH DULU.")}
        >
          <Link href={localizeHref("/panduan")} className="text-link">
            {tr("Semua panduan")}
            <ArrowUpRight size={18} />
          </Link>
        </SectionHeading>
        <div className="guide-grid">
          {[
            [
              "FUNGSI",
              "Guiding dan warning: dua pola, dua peran.",
              "Kenali perbedaan dasar pola arah dan pola peringatan.",
            ],
            [
              "PERENCANAAN",
              "Apa yang perlu disiapkan sebelum memilih?",
              "Mulai dari lokasi, kondisi permukaan, dan kebutuhan area.",
            ],
          ].map(([tag, title, desc], i) => (
            <Link
              key={tag}
              href={localizeHref(
                i === 0
                  ? "/panduan/perbedaan-guiding-dan-warning"
                  : "/panduan/checklist-memilih-tactile-indicator",
              )}
              className="guide-card"
            >
              <div className="guide-top">
                <span>{tr(tag)}</span>
                <span>0{i + 1}</span>
              </div>
              <h3>{tr(title)}</h3>
              <p>{tr(desc)}</p>
              <span className="text-link">
                {tr("Baca panduan")}
                <ArrowUpRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <p className="eyebrow">{tr("07 / PERTANYAAN UMUM")}</p>
          <h2>
            {tr("HAL YANG")}
            <br />
            {tr("SERING DITANYAKAN.")}
          </h2>
          <Link href={localizeHref("/faq")} className="text-link">
            {tr("Halaman FAQ")}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <Accordion items={faqs} />
      </section>
    </>
  );
}
