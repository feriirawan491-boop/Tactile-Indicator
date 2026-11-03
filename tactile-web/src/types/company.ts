export interface CompanyProfile {
  displayName: string;
  legalName: string | null;
  address: string | null;
  email: string | null;
  hours?: string | null;
  approved: boolean;
}
