export const PRODUCTS_PER_PAGE = 9;

export function paginateProducts<T>(
  items: T[],
  value: string | string[] | undefined,
) {
  const raw = Array.isArray(value) ? value[0] : value;
  const requested = raw && /^\d+$/.test(raw) ? Number(raw) : 1;
  const totalPages = Math.max(1, Math.ceil(items.length / PRODUCTS_PER_PAGE));
  const page = Math.min(
    totalPages,
    Math.max(1, Number.isSafeInteger(requested) ? requested : 1),
  );
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  return {
    items: items.slice(start, start + PRODUCTS_PER_PAGE),
    page,
    totalPages,
    from: items.length ? start + 1 : 0,
    to: Math.min(start + PRODUCTS_PER_PAGE, items.length),
  };
}
