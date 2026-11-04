import { isPreview } from "@/config/site";
import { JsonLd } from "@/components/JsonLd";
import { getI18n } from "@/i18n/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqGroup } from "@/components/faq/FaqGroup";
import { faqGroups } from "@/data/faq";
import { WhatsAppCTA } from "@/components/conversion/WhatsAppCTA";
import { pageMetadata } from "@/lib/seo";
export async function generateMetadata() {
  return pageMetadata(
    "Pertanyaan yang sering diajukan",
    "Jawaban dasar tentang fungsi, material, varian, dan persiapan konsultasi tactile indicator.",
    "/faq",
  );
}
export default async function Faq() {
  const { t: tr, href: localizeHref } = await getI18n();

  const groups = faqGroups.filter((g) => g.items.some((i) => i.answer.trim()));
  return (
    <div className="container">
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: groups.flatMap((g) =>
            g.items
              .filter((i) => i.answer.trim())
              .map((i) => ({
                "@type": "Question",
                name: tr(i.question),
                acceptedAnswer: { "@type": "Answer", text: tr(i.answer) },
              })),
          ),
        }}
      />
      <Breadcrumbs label="FAQ" />
      <section className="catalog-hero">
        <p className="eyebrow">{tr("PUSAT BANTUAN / FAQ")}</p>
        <h1>
          {tr("PERTANYAAN YANG")}
          <br />
          {tr("SERING DIAJUKAN.")}
        </h1>
        <p>
          {tr(
            "Jawaban awal untuk membantu Anda memahami produk dan mempersiapkan diskusi kebutuhan.",
          )}
        </p>
        {isPreview && (
          <span className="draft-badge">
            {tr("JAWABAN DRAFT · MENUNGGU REVIEW KLIEN")}
          </span>
        )}
      </section>
      <div className="faq-page">
        <nav className="topic-nav" aria-label={tr("Kelompok pertanyaan")}>
          {groups.map((g) => (
            <a href={localizeHref(`#${g.id}`)} key={g.id}>
              {tr(g.title)}
            </a>
          ))}
        </nav>
        {groups.map((g) => (
          <FaqGroup group={g} key={g.id} />
        ))}
        <section className="faq-contact">
          <h2>{tr("MASIH ADA PERTANYAAN?")}</h2>
          <p>
            {tr("Sampaikan kebutuhan atau pertanyaan Anda melalui WhatsApp.")}
          </p>
          <WhatsAppCTA
            label="Tanyakan melalui WhatsApp"
            message="Halo, saya membaca FAQ dan ingin bertanya tentang tactile indicator."
          />
        </section>
      </div>
    </div>
  );
}
