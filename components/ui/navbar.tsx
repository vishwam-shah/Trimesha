"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { BookCallButton } from "@/components/ui/animated-button";
import { Icon } from "@iconify/react";
import { useModal } from "@/components/ui/animated-modal";
import { prepareBookingModalTheme } from "@/lib/booking-cta";
import { ServicesNavDropdown } from "@/components/ui/services-nav-dropdown";
import { PricingNavDropdown } from "@/components/ui/pricing-nav-dropdown";
import type { ServiceWithId } from "@/types/service";
import type { PricingPlanWithId } from "@/types/pricing";



/* ─── Lightweight scroll detection (no heavy libs) ─── */
function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking.current = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

function sectionActive(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { setOpen: setBookingOpen } = useModal();
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [navServices, setNavServices] = useState<ServiceWithId[] | null>(null);
  const [navPlans, setNavPlans] = useState<PricingPlanWithId[] | null>(null);
  const scrolled = useScrollState();

  const onServices = pathname.startsWith("/services");
  const onPricing = pathname.startsWith("/pricing");
  const onProducts = pathname.startsWith("/products");
  const onAbout = sectionActive(pathname, "/about");
  const onCareers = sectionActive(pathname, "/careers");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [rs, rp] = await Promise.all([
          fetch("/api/v1/services"),
          fetch("/api/v1/pricing"),
        ]);
        if (cancelled) return;
        if (rs.ok) {
          const d = (await rs.json()) as unknown;
          setNavServices(Array.isArray(d) ? d : []);
        } else {
          setNavServices([]);
        }
        if (rp.ok) {
          const d = (await rp.json()) as unknown;
          setNavPlans(Array.isArray(d) ? d : []);
        } else {
          setNavPlans([]);
        }
      } catch {
        if (!cancelled) {
          setNavServices([]);
          setNavPlans([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    if (onServices) setExpandedItem("Services");
    else if (onPricing) setExpandedItem("Pricing");
    else setExpandedItem(null);
  }, [mobileOpen, onServices, onPricing]);

  const openBookingFromMobileMenu = useCallback(() => {
    prepareBookingModalTheme();
    setBookingOpen(true);
    setMobileOpen(false);
  }, [setBookingOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ── Navbar ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out will-change-[transform,background,backdrop-filter]",
          scrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent",
          className,
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group relative shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
            aria-label="Trimesha home"
          >
            <Image
              src="/logo/logo_dark.png"
              alt="Trimesha Logo"
              width={220}
              height={60}
              priority
              className={cn(
                "h-auto w-auto transition-all duration-500 ease-out",
                scrolled
                  ? "max-h-8 sm:max-h-10 lg:max-h-12"
                  : "max-h-10 sm:max-h-14 lg:max-h-16",
              )}
              sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 260px"
            />
          </Link>

          {/* Desktop menu - centered pill */}
          <div className="hidden lg:flex flex-1 justify-center">
            <Menu setActive={setActive}>
              <ServicesNavDropdown
                setActive={setActive}
                active={active}
                services={navServices}
                routeActive={onServices}
              />
              <div className="flex items-center">
                <Link
                  href="/products"
                  className={cn(
                    "flex flex-col gap-1 text-sm font-medium transition-colors duration-200",
                    onProducts
                      ? "font-semibold text-white"
                      : "text-white/90 hover:text-white",
                  )}
                >
                  <span>Products</span>
                  <span
                    className={cn(
                      "h-0.5 w-full shrink-0 rounded-full",
                      onProducts ? "bg-white/80" : "bg-transparent",
                    )}
                    aria-hidden
                  />
                </Link>
              </div>
              <PricingNavDropdown
                setActive={setActive}
                active={active}
                plans={navPlans}
                routeActive={onPricing}
              />
              <div className="flex items-center">
                <Link
                  href="/about"
                  className={cn(
                    "flex flex-col gap-1 text-sm font-medium transition-colors duration-200",
                    onAbout
                      ? "font-semibold text-white"
                      : "text-white/90 hover:text-white",
                  )}
                >
                  <span>About</span>
                  <span
                    className={cn(
                      "h-0.5 w-full shrink-0 rounded-full",
                      onAbout ? "bg-white/80" : "bg-transparent",
                    )}
                    aria-hidden
                  />
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  href="/careers"
                  className={cn(
                    "flex flex-col gap-1 text-sm font-medium transition-colors duration-200",
                    onCareers
                      ? "font-semibold text-white"
                      : "text-white/90 hover:text-white",
                  )}
                >
                  <span>Careers</span>
                  <span
                    className={cn(
                      "h-0.5 w-full shrink-0 rounded-full",
                      onCareers ? "bg-white/80" : "bg-transparent",
                    )}
                    aria-hidden
                  />
                </Link>
              </div>
            </Menu>
          </div>

          {/* Desktop Book Call Button */}
          <div className="hidden lg:block shrink-0">
            <BookCallButton />
          </div>

          {/* Mobile/Tablet controls */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <BookCallButton />
            </div>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="relative p-2.5 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/[0.1] hover:border-violet-500/40 hover:bg-white/[0.1] transition-all duration-300 active:scale-95"
            >
              <Icon icon="line-md:menu" className="w-5 h-5 text-violet-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet menu overlay – rendered as portal-like sibling */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobile}
              className="lg:hidden fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 z-[999] w-full sm:w-[380px] bg-gradient-to-b from-gray-950 via-gray-950 to-violet-950/30 shadow-2xl will-change-transform"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <span className="text-white font-bold text-base">T</span>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    TRIMESHA
                  </span>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={closeMobile}
                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors active:scale-95"
                >
                  <Icon icon="line-md:close" className="w-5 h-5 text-violet-400" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="max-h-[calc(100vh-180px)] space-y-2 overflow-y-auto overscroll-contain p-5 pb-28 [-webkit-overflow-scrolling:touch]">
                {/* Services */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedItem(expandedItem === "Services" ? null : "Services")
                    }
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl border p-3.5 text-[15px] font-semibold transition-all duration-200",
                      onServices
                        ? "border-white/20 bg-white/[0.12] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-violet-400/25"
                        : "border-white/[0.1] bg-white/[0.05] text-white/90 hover:border-violet-400/30 hover:bg-white/[0.09] hover:text-white",
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-purple-600/20 ring-1 ring-white/10">
                        <Icon icon="ph:stack-duotone" className="h-5 w-5 text-violet-300" />
                      </div>
                      <span>Services</span>
                    </div>
                    <div
                      className="transition-transform duration-300"
                      style={{ transform: expandedItem === "Services" ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <Icon icon="line-md:chevron-down" className="h-4 w-4 text-violet-300/80" />
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: expandedItem === "Services" ? "min(520px,62vh)" : "0px",
                      opacity: expandedItem === "Services" ? 1 : 0,
                    }}
                  >
                    <div className="mt-2 ml-1 space-y-0.5 rounded-xl border border-white/[0.08] bg-black/30 py-2 pl-2 pr-1.5 backdrop-blur-md">
                      {navServices === null ? (
                        <p className="px-3 py-2 text-sm text-white/45">Loading…</p>
                      ) : navServices.length === 0 ? (
                        <p className="px-3 py-2 text-sm text-white/45">No services listed.</p>
                      ) : (
                        navServices.map((s) => {
                          const slugActive = pathname === `/services/${s.slug}`;
                          return (
                            <Link
                              key={s.id}
                              href={`/services/${s.slug}`}
                              onClick={closeMobile}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors",
                                slugActive
                                  ? "bg-white/[0.12] text-white ring-1 ring-violet-400/30"
                                  : "text-white/80 hover:bg-violet-500/15 hover:text-white",
                              )}
                            >
                              <span
                                className={cn(
                                  "size-1.5 shrink-0 rounded-full",
                                  slugActive ? "bg-violet-300" : "bg-violet-400/55",
                                )}
                              />
                              {s.title}
                            </Link>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* Products */}
                <Link
                  href="/products"
                  onClick={closeMobile}
                  className={cn(
                    "flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-[15px] font-semibold transition-all duration-200",
                    onProducts
                      ? "border-white/20 bg-white/[0.12] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-violet-400/25"
                      : "border-white/[0.1] bg-white/[0.05] text-white/90 hover:border-violet-400/30 hover:bg-white/[0.09] hover:text-white",
                  )}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-purple-600/20 ring-1 ring-white/10">
                    <Icon icon="line-md:document-code" className="h-5 w-5 text-violet-300" />
                  </div>
                  <span>Products</span>
                </Link>

                {/* Pricing */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedItem(expandedItem === "Pricing" ? null : "Pricing")
                    }
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl border p-3.5 text-[15px] font-semibold transition-all duration-200",
                      onPricing
                        ? "border-white/20 bg-white/[0.12] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-violet-400/25"
                        : "border-white/[0.1] bg-white/[0.05] text-white/90 hover:border-violet-400/30 hover:bg-white/[0.09] hover:text-white",
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-purple-600/20 ring-1 ring-white/10">
                        <Icon icon="line-md:text-box" className="h-5 w-5 text-violet-300" />
                      </div>
                      <span>Pricing</span>
                    </div>
                    <div
                      className="transition-transform duration-300"
                      style={{ transform: expandedItem === "Pricing" ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <Icon icon="line-md:chevron-down" className="h-4 w-4 text-violet-300/80" />
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: expandedItem === "Pricing" ? "min(480px,58vh)" : "0px",
                      opacity: expandedItem === "Pricing" ? 1 : 0,
                    }}
                  >
                    <div className="mt-2 ml-1 space-y-0.5 rounded-xl border border-white/[0.08] bg-black/30 py-2 pl-2 pr-1.5 backdrop-blur-md">
                      {navPlans === null ? (
                        <p className="px-3 py-2 text-sm text-white/45">Loading…</p>
                      ) : navPlans.length === 0 ? (
                        <p className="px-3 py-2 text-sm text-white/45">No plans listed.</p>
                      ) : (
                        navPlans.map((p) => (
                          <Link
                            key={p.id}
                            href="/pricing"
                            onClick={closeMobile}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors",
                              onPricing
                                ? "bg-white/[0.12] text-white ring-1 ring-violet-400/30"
                                : "text-white/80 hover:bg-violet-500/15 hover:text-white",
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 shrink-0 rounded-full",
                                onPricing ? "bg-violet-300" : "bg-violet-400/55",
                              )}
                            />
                            {p.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Careers */}
                <Link
                  href="/careers"
                  onClick={closeMobile}
                  className={cn(
                    "flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-[15px] font-semibold transition-all duration-200",
                    onCareers
                      ? "border-white/20 bg-white/[0.12] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-violet-400/25"
                      : "border-white/[0.1] bg-white/[0.05] text-white/90 hover:border-violet-400/30 hover:bg-white/[0.09] hover:text-white",
                  )}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-purple-600/20 ring-1 ring-white/10">
                    <Icon icon="line-md:briefcase-twotone" className="h-5 w-5 text-violet-300" />
                  </div>
                  <span>Careers</span>
                </Link>

                {/* About */}
                <Link
                  href="/about"
                  onClick={closeMobile}
                  className={cn(
                    "flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-[15px] font-semibold transition-all duration-200",
                    onAbout
                      ? "border-white/20 bg-white/[0.12] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-violet-400/25"
                      : "border-white/[0.1] bg-white/[0.05] text-white/90 hover:border-violet-400/30 hover:bg-white/[0.09] hover:text-white",
                  )}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-purple-600/20 ring-1 ring-white/10">
                    <Icon icon="line-md:account" className="h-5 w-5 text-violet-300" />
                  </div>
                  <span>About</span>
                </Link>
              </nav>

              {/* Bottom CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-center shadow-lg shadow-violet-500/20">
                  <p className="text-white/70 text-xs mb-2 font-medium">Ready to get started?</p>
                  <button
                    type="button"
                    onClick={openBookingFromMobileMenu}
                    className="w-full py-2.5 rounded-xl bg-white text-violet-600 font-semibold text-sm hover:bg-violet-50 transition-colors active:scale-[0.98]"
                  >
                    Book a Call
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
