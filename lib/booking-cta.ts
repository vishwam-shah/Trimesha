/**
 * Admin `ctaUrl` values that should open the booking modal (stay on the page)
 * instead of navigating away.
 */
export function opensBookingModal(url: string): boolean {
  const u = url.trim().toLowerCase();
  if (u === "" || u === "#" || u === "/") return true;
  if (u === "#book-call" || u === "#/book-call" || u === "/book-call") {
    return true;
  }
  if (u === "#contact" || u.startsWith("#contact")) return true;
  if (u === "/#contact" || u.startsWith("/#contact")) return true;
  if (u === "/contact" || u.startsWith("/contact")) return true;
  return false;
}

/** Booking UI follows site light/dark; reserved for future tweaks. */
export function prepareBookingModalTheme() {
  /* no-op */
}
