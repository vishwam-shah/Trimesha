"use client"

import { ChevronRight } from "lucide-react"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { useModal } from "@/components/ui/animated-modal"

interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  ctaLabel = "Explore Now",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full px-4 pt-28 text-center sm:px-6 sm:pt-32 md:pt-40 md:px-8
      min-h-screen overflow-hidden
      bg-[linear-gradient(to_bottom,#fff,#ffffff_50%,#e8e8e8_88%)]
      dark:bg-[linear-gradient(to_bottom,#000,#0000_30%,#898e8e_78%,#ffffff_99%_50%)]"
    >
      <div
        className="absolute inset-0 h-150 w-full
        bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-size-4rem_4rem
        mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)]
        h-125 w-175 md:h-125 md:w-275 lg:h-187.5 lg:w-[140%]
        -translate-x-1/2 rounded-[100%] border-2 border-secondary/30 bg-white dark:bg-black
        bg-[radial-gradient(closest-side,#fff_82%,#8B5CF6)]
        dark:bg-[radial-gradient(closest-side,#000_82%,#8B5CF6)]"
      />

      <div className="relative z-10">
        {eyebrow && (
          <a href="#" className="group inline-block">
            <span
              className="text-sm text-violet-600 dark:text-violet-300 mx-auto px-5 py-2
              bg-white/90 dark:bg-violet-950/80 backdrop-blur-sm
              border border-violet-300 dark:border-violet-500/50 rounded-full
              inline-flex items-center gap-1 shadow-sm
              hover:border-violet-500 dark:hover:border-violet-400 transition-colors"
            >
              {eyebrow}
              <ChevronRight className="w-4 h-4 text-violet-600 dark:text-violet-300 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        )}

        <h1 className="mt-8">
          <TextGenerateEffect
            words={title}
            className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]"
            duration={0.5}
          />
        </h1>

        <p
          className="mt-6 mb-10 text-balance
          text-base sm:text-lg md:text-xl
          text-gray-600 dark:text-gray-400
          max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </p>

        {ctaLabel && (
          <div className="flex justify-center">
            <HeroCta label={ctaLabel} />
          </div>
        )}
      </div>
    </section>
  )
}

function HeroCta({ label }: { label: string }) {
  const { setOpen } = useModal()

  return (
    <RainbowButton
      onClick={() => setOpen(true)}
      className="px-10 py-6 text-base md:text-lg font-semibold h-14 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {label}
    </RainbowButton>
  )
}
