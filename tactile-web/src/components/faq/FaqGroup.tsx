import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { FaqGroup as Group } from "@/types/faq";
export async function FaqGroup({ group }: { group: Group }) {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <section className="faq-group" id={group.id}>
      <h2>{tr(group.title)}</h2>
      <div className="accordion">
        {group.items
          .filter((item) => item.answer.trim())
          .map((item) => (
            <details key={item.question}>
              <summary>
                {tr(item.question)}
                <ChevronDown
                  className="faq-chevron"
                  size={18}
                  aria-hidden="true"
                />
              </summary>
              <div className="faq-answer">
                <p>{tr(item.answer)}</p>
                {item.link && (
                  <Link
                    className="text-link"
                    href={localizeHref(item.link.href)}
                  >
                    {tr(item.link.label)} ↗
                  </Link>
                )}
              </div>
            </details>
          ))}
      </div>
    </section>
  );
}
