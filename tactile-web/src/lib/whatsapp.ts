export function getWhatsAppUrl(
  number: string,
  approved: boolean,
  message = "Halo, saya ingin konsultasi tentang produk tactile indicator.",
): string | null {
  if (!approved || !/^[1-9]\d{7,14}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
