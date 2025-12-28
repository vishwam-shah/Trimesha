"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { BookCallButton } from "@/components/ui/button-rotate";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={cn("fixed top-4 left-0 right-0 z-50 px-4", className)}>
      <div className="mx-auto max-w-6xl flex items-center justify-center relative">
        <div className="absolute left-4 flex items-center gap-4">
          {/* <a href="#" className="text-2xl md:text-xl font-bold text-black dark:text-white">
            TRIMESHA
          </a> */}
          <img src="logo/logo_dark.png" alt="Trimesha Logo" className="h-45 mt-10"  />
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#">Web Development</HoveredLink>
                <HoveredLink href="#">Interface Design</HoveredLink>
                <HoveredLink href="#">Search Engine Optimization</HoveredLink>
                <HoveredLink href="#">Branding</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#">Analytics Platform</HoveredLink>
                <HoveredLink href="#">AI Assistant</HoveredLink>
                <HoveredLink href="#">Cloud Storage</HoveredLink>
                <HoveredLink href="#">API Services</HoveredLink>
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

        {/* Mobile controls */}
        <div className="absolute right-4 md:hidden flex items-center gap-2">
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen((s) => !s)}
            className="p-2 rounded-md bg-white/80 dark:bg-black/60 backdrop-blur-sm border border-transparent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile centered BookCallButton */}
      <div className="md:hidden absolute left-1/2 top-2 transform -translate-x-1/2">
        <BookCallButton />
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 p-6">
          <div className="flex items-center justify-between">
            <a href="#" className="text-xl font-bold text-black dark:text-white">TRIMESHA</a>
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mt-8 space-y-6 text-lg">
            <a href="#" className="block text-black dark:text-white">Services</a>
            <a href="#" className="block text-black dark:text-white">Products</a>
            <a href="#" className="block text-black dark:text-white">Pricing</a>
            <a href="#" className="block text-black dark:text-white">About</a>
          </nav>
        </div>
      )}
    </div>
  );
}
