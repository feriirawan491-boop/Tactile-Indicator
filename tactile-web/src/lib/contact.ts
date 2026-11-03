export function approvedEmail(email: string | null, approved: boolean) {
  return approved && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? email
    : null;
}
