"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { BookCallButton } from "@/components/ui/animated-button";
import { Icon } from "@iconify/react";

const menuItems = [
  {
    title: "Services",
    icon: "line-md:cog-loop",
    items: [
      { name: "Web Development", href: "/services#web-development" },
      { name: "Interface Design", href: "/services#interface-design" },
      { name: "Search Engine Optimization", href: "/services#seo" },
      { name: "Branding", href: "/services#branding" }
    ],
  },
  {
    title: "Products",
    icon: "line-md:document-code",
    items: [
      { name: "Analytics Platform", href: "/products#analytics-platform" },
      { name: "AI Assistant", href: "/products#ai-assistant" },
      { name: "Cloud Storage", href: "/products#cloud-storage" },
      { name: "API Services", href: "/products#api-services" }
    ],
  },
  {
    title: "Pricing",
    icon: "line-md:text-box",
    items: ["Free", "Pro", "Team", "Enterprise"],
  },
  {
    title: "About",
    icon: "line-md:account",
    items: ["Our Story", "Team", "Careers", "Contact"],
  },
];

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className={cn("fixed top-4 sm:top-6 lg:top-6 left-0 right-0 z-50 px-3 sm:px-4 lg:px-8 overflow-visible", className)}>
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="cursor-pointer">
            <img src="logo/logo_dark.png" alt="Trimesha Logo" className="h-12 sm:h-16 lg:h-28" />
          </Link>
        </div>

        {/* Desktop menu - centered */}
        <div className="hidden lg:flex flex-1 justify-center">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Services" href="/services">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/services#web-development">Web Development</HoveredLink>
                <HoveredLink href="/services#interface-design">Interface Design</HoveredLink>
                <HoveredLink href="/services#seo">Search Engine Optimization</HoveredLink>
                <HoveredLink href="/services#branding">Branding</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Products" href="/products">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/products#analytics-platform">Analytics Platform</HoveredLink>
                <HoveredLink href="/products#ai-assistant">AI Assistant</HoveredLink>
                <HoveredLink href="/products#cloud-storage">Cloud Storage</HoveredLink>
                <HoveredLink href="/products#api-services">API Services</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Pricing">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#">Free</HoveredLink>
                <HoveredLink href="#">Pro</HoveredLink>
                <HoveredLink href="#">Team</HoveredLink>
                <HoveredLink href="#">Enterprise</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="About">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#">Our Story</HoveredLink>
                <HoveredLink href="#">Team</HoveredLink>
                <HoveredLink href="#">Careers</HoveredLink>
                <HoveredLink href="#">Contact</HoveredLink>
              </div>
            </MenuItem>
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
                  <button className="w-full py-3 rounded-xl bg-white text-violet-600 font-semibold hover:bg-violet-50 transition-colors">
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
