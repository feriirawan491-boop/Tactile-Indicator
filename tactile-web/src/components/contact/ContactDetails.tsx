import { getI18n } from "@/i18n/server";
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { company, whatsappConfig } from "@/config/company";
import { approvedEmail } from "@/lib/contact";
import { getWhatsAppUrl } from "@/lib/whatsapp";
export async function ContactDetails() {
  const { t: tr, href: localizeHref } = await getI18n();

  const email = approvedEmail(company.email, company.approved);
  const wa = getWhatsAppUrl(
    whatsappConfig.number,
    whatsappConfig.approved,
    tr("Halo, saya ingin konsultasi tentang produk tactile indicator."),
  );
  const address = company.approved ? company.address : null;
  const hours = company.approved ? company.hours : null;
  return (
    <div className="contact-details">
      <h2>
        {tr(
          company.approved && company.legalName
            ? company.legalName
            : company.displayName,
        )}
      </h2>
      {!company.approved && (
        <p className="draft-badge">
          {tr("IDENTITAS PERUSAHAAN MENUNGGU KONFIRMASI")}
        </p>
      )}
      {wa && (
        <div className="contact-row">
          <MessageCircle size={20} />
          <div>
            <span>{tr("WhatsApp")}</span>
            <a
              href={localizeHref(wa)}
              target="_blank"
              rel="noopener noreferrer"
            >
              +{tr(whatsappConfig.number)} ↗
            </a>
          </div>
        </div>
      )}
      {email && (
        <div className="contact-row">
          <Mail size={20} />
          <div>
            <span>{tr("Email")}</span>
            <a href={localizeHref(`mailto:${email}`)}>{tr(email)}</a>
          </div>
        </div>
      )}
      {address && (
        <div className="contact-row">
          <MapPin size={20} />
          <div>
            <span>{tr("Alamat")}</span>
            <address>{tr(address)}</address>
          </div>
        </div>
      )}
      {hours && (
        <div className="contact-row">
          <Clock size={20} />
          <div>
            <span>{tr("Jam operasional")}</span>
            <p>{tr(hours)}</p>
          </div>
        </div>
      )}
      {!wa && !email && !address && !hours && (
        <p className="contact-pending">
          {tr(
            "Nomor WhatsApp, email, alamat, dan jam operasional belum dikonfirmasi. Tidak ada kontak sementara yang digunakan.",
          )}
        </p>
      )}
    </div>
  );
}
