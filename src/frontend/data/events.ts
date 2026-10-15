
// Participants must register with their institutional email...
export const BIT_EMAIL_DOMAIN = "@bitmesra.ac.in";

export function isBitEmail(email: string): boolean {
  return email.trim().toLowerCase().endsWith(BIT_EMAIL_DOMAIN);
}

export function getRegistrationHref(eventId: string): string {
  return `/register?event=${encodeURIComponent(eventId)}`;
}
