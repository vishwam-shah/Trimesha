"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { BookCallButton } from "@/components/ui/animated-button";
import { Icon } from "@iconify/react";
import { useModal } from "@/components/ui/animated-modal";
import { prepareBookingModalTheme } from "@/lib/booking-cta";
import { ServicesNavDropdown } from "@/components/ui/services-nav-dropdown";
import { PricingNavDropdown } from "@/components/ui/pricing-nav-dropdown";
import type { ServiceWithId } from "@/types/service";
import type { PricingPlanWithId } from "@/types/pricing";

const menuItems = [
  {
    title: "About",
    icon: "line-md:account",
    items: [
      { name: "Our Story", href: "/about" },
      { name: "Team", href: "/about#team" }
    ],
  },
];

export function Navbar({ className }: { className?: string }) {
  const { setOpen: setBookingOpen } = useModal();
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [navServices, setNavServices] = useState<ServiceWithId[] | null>(null);
  const [navPlans, setNavPlans] = useState<PricingPlanWithId[] | null>(null);

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

  function openBookingFromMobileMenu() {
    prepareBookingModalTheme();
    setBookingOpen(true);
    setMobileOpen(false);
  }

  return (
    <div className={cn("fixed top-4 sm:top-6 lg:top-6 left-0 right-0 z-50 px-3 sm:px-4 lg:px-8 overflow-visible", className)}>
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            className="cursor-pointer select-none rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
            aria-label="Trimesha home"
          >
            <Image
              src="/logo/logo_dark.png"
              alt="Trimesha Logo"
              width={280}
              height={80}
              priority
              className="h-16 w-auto sm:h-24 lg:h-36"
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 320px, 420px"
            />
          </Link>
        </div>

        {/* Desktop menu - centered */}
        <div className="hidden lg:flex flex-1 justify-center">
          <Menu setActive={setActive}>
            <ServicesNavDropdown
              setActive={setActive}
              active={active}
              services={navServices}
            />
            <div className="flex items-center">
              <Link
                href="/products"
                className="cursor-pointer text-sm font-medium text-black transition-colors hover:text-secondary dark:text-white dark:hover:text-secondary"
              >
                Products
              </Link>
            </div>
            <PricingNavDropdown
              setActive={setActive}
              active={active}
              plans={navPlans}
            />
            <MenuItem setActive={setActive} active={active} item="About" href="/about">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/about">Our Story</HoveredLink>
                <HoveredLink href="/about#team">Team</HoveredLink>
              </div>
            </MenuItem>
            <div className="flex items-center">
              <Link
                href="/careers"
                className="cursor-pointer text-sm font-medium text-black transition-colors hover:text-secondary dark:text-white dark:hover:text-secondary"
              >
                Careers
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
          <motion.button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            whileTap={{ scale: 0.95 }}
            className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 backdrop-blur-md border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
          >
            <Icon icon="line-md:menu" className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 dark:text-violet-400" />
          </motion.button>
        </div>
      </div>

      {/* Mobile/Tablet menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 bg-gradient-to-b from-white via-gray-50 to-violet-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-violet-950/30 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-violet-200/30 dark:border-violet-800/30">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    TRIMESHA
                  </span>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl bg-violet-100 dark:bg-violet-900/30 hover:bg-violet-200 dark:hover:bg-violet-800/30 transition-colors"
                >
                  <Icon icon="line-md:close" className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </motion.button>
              </div>

              {/* Menu Items */}
              <nav className="p-6 space-y-3 overflow-y-auto max-h-[calc(100vh-180px)]">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedItem(expandedItem === "Services" ? null : "Services")
                    }
                    className="flex w-full items-center justify-between rounded-2xl border border-violet-200/30 bg-white/60 p-4 font-semibold text-gray-800 backdrop-blur-sm transition-colors hover:border-violet-400/50 dark:border-violet-700/30 dark:bg-gray-800/40 dark:text-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20">
                        <Icon icon="ph:stack-duotone" className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                      </div>
                      Services
                    </div>
                    <motion.div
                      animate={{ rotate: expandedItem === "Services" ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon icon="line-md:chevron-down" className="w-5 h-5 text-violet-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedItem === "Services" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1 pt-2 pl-2">
                          {navServices === null ? (
                            <p className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                              Loading…
                            </p>
                          ) : navServices.length === 0 ? (
                            <p className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                              No services listed.
                            </p>
                          ) : (
                            navServices.map((s) => (
                              <Link
                                key={s.id}
                                href={`/services/${s.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-xl p-3 font-medium text-gray-700 transition-colors hover:bg-violet-100/50 dark:text-gray-300 dark:hover:bg-violet-900/20"
                              >
                                <span className="size-2 shrink-0 rounded-full bg-violet-400" />
                                {s.title}
                              </Link>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 }}
                >
                  <Link
                    href="/products"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center gap-4 rounded-2xl border border-violet-200/30 bg-white/60 p-4 font-semibold text-gray-800 backdrop-blur-sm transition-colors hover:border-violet-400/50 dark:border-violet-700/30 dark:bg-gray-800/40 dark:text-gray-200"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20">
                      <Icon icon="line-md:document-code" className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    Products
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedItem(expandedItem === "Pricing" ? null : "Pricing")
                    }
                    className="flex w-full items-center justify-between rounded-2xl border border-violet-200/30 bg-white/60 p-4 font-semibold text-gray-800 backdrop-blur-sm transition-colors hover:border-violet-400/50 dark:border-violet-700/30 dark:bg-gray-800/40 dark:text-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20">
                        <Icon icon="line-md:text-box" className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                      </div>
                      Pricing
                    </div>
                    <motion.div
                      animate={{ rotate: expandedItem === "Pricing" ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon icon="line-md:chevron-down" className="w-5 h-5 text-violet-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedItem === "Pricing" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1 pt-2 pl-2">
                          {navPlans === null ? (
                            <p className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                              Loading…
                            </p>
                          ) : navPlans.length === 0 ? (
                            <p className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                              No plans listed.
                            </p>
                          ) : (
                            navPlans.map((p) => (
                              <Link
                                key={p.id}
                                href="/pricing"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-xl p-3 font-medium text-gray-700 transition-colors hover:bg-violet-100/50 dark:text-gray-300 dark:hover:bg-violet-900/20"
                              >
                                <span className="size-2 shrink-0 rounded-full bg-violet-400" />
                                {p.name}
                                {p.nameSecondary ? ` (${p.nameSecondary})` : ""}
                              </Link>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 }}
                >
                  <Link
                    href="/careers"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center gap-4 rounded-2xl border border-violet-200/30 bg-white/60 p-4 font-semibold text-gray-800 backdrop-blur-sm transition-colors hover:border-violet-400/50 dark:border-violet-700/30 dark:bg-gray-800/40 dark:text-gray-200"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20">
                      <Icon icon="line-md:briefcase-twotone" className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    Careers
                  </Link>
                </motion.div>
                {menuItems.map((menu, index) => (
                  <motion.div
                    key={menu.title}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.08 }}
                  >
                    <button
                      onClick={() => setExpandedItem(expandedItem === menu.title ? null : menu.title)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm border border-violet-200/30 dark:border-violet-700/30 hover:border-violet-400/50 dark:hover:border-violet-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-purple-600/30 transition-all">
                          <Icon icon={menu.icon} className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {menu.title}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedItem === menu.title ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon icon="line-md:chevron-down" className="w-5 h-5 text-violet-500" />
                      </motion.div>
                    </button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {expandedItem === menu.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 pl-4 space-y-1">
                            {menu.items.map((item, itemIndex) => {
                              const itemName = typeof item === 'string' ? item : item.name;
                              const itemHref = typeof item === 'string' ? '#' : item.href;
                              return (
                                <motion.a
                                  key={itemName}
                                  href={itemHref}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: itemIndex * 0.05 }}
                                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-violet-100/50 dark:hover:bg-violet-900/20 transition-colors group"
                                >
                                  <div className="w-2 h-2 rounded-full bg-violet-400 group-hover:bg-violet-500 transition-colors" />
                                  <span className="text-gray-600 dark:text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                    {itemName}
                                  </span>
                                </motion.a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-center">
                  <p className="text-white/80 text-sm mb-2">Ready to get started?</p>
                  <button
                    type="button"
                    onClick={openBookingFromMobileMenu}
                    className="w-full py-3 rounded-xl bg-white text-violet-600 font-semibold hover:bg-violet-50 transition-colors"
                  >
                    Book a Call
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
