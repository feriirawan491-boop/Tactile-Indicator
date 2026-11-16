import { getI18n } from "@/i18n/server";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { SurfacePattern } from "@/components/ui/SurfacePattern";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppCTA } from "@/components/conversion/WhatsAppCTA";
import { SelectionIllustration } from "@/components/home/SelectionIllustration";
import { faqs, steps } from "@/data/home";
export async function generateMetadata() {
  return pageMetadata(
    "Guiding Block Stainless Steel – Ubin Pemandu & Peringatan Tunanetra",
    "Jual guiding block stainless steel: stud, strip, dan pelat tactile untuk jalur pemandu dan peringatan. Konsultasikan kebutuhan proyek via WhatsApp.",
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
              {tr("Guiding Block &")}
              <br />
              <span>{tr("Tactile Indicator Stainless Steel")}</span>
            </h1>
            <p className="hero-slogan">
              {tr("TACTILE INDICATOR.")} {tr("SMALL DETAILS.")} {tr("CLEAR DIRECTION.")}
            </p>
            <p className="hero-description">
              {tr(
                "Bantu setiap langkah menemukan arah. Pilih tactile indicator stainless steel dengan pola garis untuk memandu dan pola titik untuk memberi peringatan. Belum yakin pilih yang mana? Mari diskusikan kebutuhan area Anda.",
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
            {tr("SMALL PATTERNS.")}
            <br />
            {tr("MEANINGFUL STEPS.")}
          </h2>
          <p>
            {tr(
              "Tactile indicator adalah penanda bertekstur pada lantai yang membantu penyandang disabilitas netra mengenali jalur melalui kaki atau tongkat. Detail kecil ini punya peran besar dalam membuat ruang lebih mudah dinavigasi.",
            )}
          </p>
          <p>
            {tr(
              "Cara membedakannya sederhana: pola garis menunjukkan arah, sedangkan pola titik mengingatkan pengguna untuk lebih waspada. Keduanya saling melengkapi dalam jalur aksesibilitas.",
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
            title={tr("FIND YOUR DIRECTION.")}
          >
            <p>
              {tr("Butuh petunjuk arah atau penanda peringatan?")}
              <br />
              {tr("Kenali dua pola ini sebelum memilih produk.")}
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
                    "Guiding block memakai pola garis memanjang untuk membantu pengguna mengikuti arah jalur.",
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
                    "Warning block memakai pola titik untuk mengingatkan pengguna agar lebih waspada terhadap perubahan kondisi jalur.",
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
          title={tr("THE RIGHT FIT.")}
        >
          <p>
            {tr(
              "Setiap area punya kebutuhan berbeda. Mulai dari kondisi lantai, lokasi penggunaan, hingga cara pemasangannya.",
            )}
          </p>
        </SectionHeading>
        <div className="material-note">
          <span className="large-index" aria-hidden="true">
            03 /
          </span>
          <div>
            <h3>{tr("Satu material, beragam pilihan bentuk.")}</h3>
            <p>
              {tr(
                "Pilih pelat tactile, stud bulat, atau strip memanjang sesuai rancangan jalur Anda. Pilihan grade 304 atau 316, ukuran, dan finishing berbeda pada setiap model. Kami bantu Anda membahas detailnya sebelum memesan.",
              )}
            </p>
          </div>
          <Link className="text-link" href={localizeHref("/produk")}>
            {tr("Lihat pilihan produk")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="steps-section section">
        <div className="container">
          <SectionHeading
            index="04"
            kicker="PANDUAN PEMILIHAN"
            title={tr("LET’S FIND\nYOUR FIT.")}
          />
          <div className="steps-grid">
            {steps.map(([title, description], i) => (
              <div className="step" key={title}>
                <span className="step-number">
                  0{i + 1}
                  <ArrowUpRight size={20} />
                </span>
                <SelectionIllustration step={i} />
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
          {tr("BETTER ACCESS.")}
          <br />
          {tr("STARTS HERE.")}
        </h2>
        <div>
          <p>
            {tr(
              "Memilih tactile indicator tidak harus membingungkan. Kami membantu Anda mengenali pilihan produk, memahami spesifikasinya, dan membahas kebutuhan jalur sebelum meminta penawaran.",
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
          title={tr("A LITTLE KNOW-HOW.")}
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
              <SelectionIllustration step={i} />
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
