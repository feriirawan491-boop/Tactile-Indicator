"use client";
import { ErrorRecovery } from "@/components/feedback/ErrorRecovery";
export default function SiteError({ retry }: { retry: () => void }) {
  return <ErrorRecovery retry={retry} />;
}
