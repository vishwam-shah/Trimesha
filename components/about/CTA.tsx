"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export function CTA() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-zinc-50 py-14 md:py-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-[1120px] mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-medium text-neutral-900">
            Have an idea? Let&apos;s figure out if AI can help.
          </h2>
          <p className="text-base text-neutral-500 mt-3 leading-relaxed">
            Whether you&apos;re a founder sketching something out or a business
            looking to automate a real bottleneck — we&apos;re happy to talk
            through what&apos;s possible.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-neutral-900 text-white text-sm font-medium px-6 py-3 rounded-lg mt-6 hover:bg-neutral-700 transition-colors duration-150"
          >
            Start a conversation
          </Link>
          <p className="text-xs text-neutral-400 mt-3">
            No pitch decks needed. Just tell us your problem.
          </p>
        </div>
      </div>
    </section>
  );
}
