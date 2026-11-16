import type { CompanyProfile } from "@/types/company";
export const company: CompanyProfile = {
  displayName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Tactile Indicator",
  legalName: process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || null,
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || null,
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || null,
  hours: process.env.NEXT_PUBLIC_COMPANY_HOURS || null,
  approved: process.env.NEXT_PUBLIC_COMPANY_APPROVED === "true",
};
export const whatsappConfig = {
  number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6282214922270",
  approved: (process.env.NEXT_PUBLIC_WHATSAPP_APPROVED ?? "true") === "true",
};
