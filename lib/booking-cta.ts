/**
 * Admin `ctaUrl` values that should open the Calendly booking modal
 * (stay on the current page) instead of navigating away.
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

/** Match BookCallButton: modal looks best in dark theme. */
export function prepareBookingModalTheme() {
  if (
    typeof document !== "undefined" &&
    !document.documentElement.classList.contains("dark")
  ) {
    document.documentElement.classList.add("dark");
  }
}
