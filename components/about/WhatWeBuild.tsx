"use client";

import { Brain, Smartphone, Globe, Zap } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { ABOUT_SERVICES } from "@/lib/constants";

const icons = [Brain, Smartphone, Globe, Zap];

export function WhatWeBuild() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-zinc-50 py-14 md:py-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-[1120px] mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-2xl font-medium tracking-tight text-neutral-900 mb-8">
          What we build
        </h2>
        <div className="rounded-xl border border-neutral-200/70 bg-white divide-y divide-neutral-100 overflow-hidden">
          {ABOUT_SERVICES.map((service, index) => {
            const Icon = icons[index];
            return (
              <div
                key={service.label}
                className="flex items-start gap-4 p-5 hover:bg-white transition-colors duration-150 cursor-default"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${service.bg} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <Icon className={`w-4 h-4 ${service.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {service.label}
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
