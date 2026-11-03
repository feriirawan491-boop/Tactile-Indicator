import type { CompanyProfile } from "@/types/company";
export const company: CompanyProfile = {
  displayName: "Tactile Indicator",
  legalName: null,
  address: null,
  email: null,
  approved: false,
};
export const whatsappConfig = {
  number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281222952857",
  approved: (process.env.NEXT_PUBLIC_WHATSAPP_APPROVED ?? "true") === "true",
};
