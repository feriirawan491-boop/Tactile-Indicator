"use client";
import { useI18n } from "@/i18n/client";

import { ErrorRecovery } from "@/components/feedback/ErrorRecovery";
export default function CatalogError({ retry }: { retry: () => void }) {
  const { t: tr } = useI18n();

  return (
    <ErrorRecovery retry={retry} title={tr("Katalog belum dapat dimuat.")} />
  );
}
