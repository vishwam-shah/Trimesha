"use client";

import { Header } from "@/components/layout/header";
import Link from "next/link";
import { ServiceVisual } from "@/components/ui/service-visual";
import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";
import { useModal } from "@/components/ui/animated-modal";
import { prepareBookingModalTheme } from "@/lib/booking-cta";
import type { ServiceWithId } from "@/types/service";
import { Icon } from "@iconify/react";
import { serviceIconForSlug } from "@/lib/service-visuals";

export function ServiceDetailClient({ service }: { service: ServiceWithId }) {
  const { setOpen } = useModal();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <section className="relative overflow-hidden bg-background pb-12 pt-28 sm:pt-32 lg:pt-36">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="rgb(139, 92, 246)"
          />
          <Spotlight
            className="top-10 left-full md:left-80 md:top-20"
            fill="rgb(59, 130, 246)"
          />
          <div className="absolute inset-0 opacity-30 dark:opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full blur-3xl opacity-70"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${service.color}66, transparent 65%)`,
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="grid items-start gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-violet-200/50 bg-violet-500/10 px-4 py-2 dark:border-violet-800/50 dark:bg-violet-500/15">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 text-violet-700 dark:text-violet-300">
                    <Icon
                      icon={serviceIconForSlug(service.slug)}
                      className="size-7"
                      aria-hidden
                    />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 dark:text-purple-300">
                    Service
                  </span>
                </div>
                <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {service.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                  {service.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      prepareBookingModalTheme();
                      setOpen(true);
                    }}
                    className="inline-flex rounded-xl bg-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40"
                  >
                    Get a Quote
                  </button>
                  <Link
                    href="/services"
                    className="inline-flex rounded-xl border border-border/60 bg-background/80 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:bg-muted/30"
                  >
                    All services
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
                    Typical timeline: {service.typicalTimeline}
                  </span>
                  <span className="inline-flex rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-semibold text-foreground/90">
                    Staging demos included
                  </span>
                  <span className="inline-flex rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-semibold text-foreground/90">
                    Documented handover
                  </span>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-violet-200/40 shadow-2xl shadow-violet-500/10 ring-1 ring-black/5 dark:border-violet-900/50 dark:ring-white/10">
                  <ServiceVisual
                    slug={service.slug}
                    color={service.color}
                    variant="hero"
                    className="absolute inset-0 size-full"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/12 to-transparent"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-60"
                    aria-hidden
                    style={{
                      background:
                        "radial-gradient(circle at 25% 20%, rgba(139,92,246,0.28), transparent 52%), radial-gradient(circle at 85% 65%, rgba(59,130,246,0.2), transparent 55%)",
                    }}
                  />
                  <div
                    className="absolute left-5 top-5 flex size-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15 shadow-lg backdrop-blur-md sm:left-6 sm:top-6 sm:size-16"
                    aria-hidden
                  >
                    <Icon
                      icon={serviceIconForSlug(service.slug)}
                      className="size-9 text-white drop-shadow-md sm:size-10"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      Outcomes
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-white/90">
                      {service.deliverables.slice(0, 3).map((d) => (
                        <li key={d} className="flex gap-2">
                          <span
                            aria-hidden
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-white/80"
                          />
                          <span className="line-clamp-1">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-[0.07]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.18),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.14),transparent_40%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-violet-200/40 bg-card/90 p-6 shadow-sm backdrop-blur-sm dark:border-violet-900/40 dark:bg-gray-950/70 sm:p-10"
            >
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                    Overview
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {service.overview}
                  </p>

                  <div className="mt-7 rounded-2xl border border-border/60 bg-background/60 p-5">
                    <p className="text-sm font-bold text-foreground">
                      Ideal when you need
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.goodFor.slice(0, 6).map((g) => (
                        <span
                          key={g}
                          className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                    What you get
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {service.deliverables.slice(0, 6).map((d) => (
                      <div
                        key={d}
                        className="rounded-2xl border border-border/60 bg-background/60 p-5"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/18 to-blue-500/12 text-violet-700 ring-1 ring-violet-500/20 dark:text-violet-300"
                          >
                            <Icon
                              icon="material-symbols:check-circle-rounded"
                              className="size-6"
                              aria-hidden
                            />
                          </span>
                          <p className="text-sm font-semibold text-foreground">
                            {d}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                      How we deliver
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {[
                        {
                          k: "01",
                          t: "Scope and success criteria",
                          b: "We turn your brief into an agreed checklist: performance, SEO, security, and the flows that must work on day one.",
                        },
                        {
                          k: "02",
                          t: "Build in reviewable slices",
                          b: "Weekly demos on staging so you can approve direction early, with no surprise launches.",
                        },
                        {
                          k: "03",
                          t: "Quality where it matters",
                          b: "Accessibility checks, realistic device testing, and instrumentation so you can see what users see.",
                        },
                        {
                          k: "04",
                          t: "Handover and next steps",
                          b: "Docs + runbooks + a clear path for iteration, whether we stay on retainer or your team takes over.",
                        },
                      ].map((s) => (
                        <div
                          key={s.k}
                          className="rounded-2xl border border-border/60 bg-background/60 p-5"
                        >
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {s.k}
                          </p>
                          <p className="mt-1 font-bold text-foreground">{s.t}</p>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {s.b}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-violet-200/35 bg-gradient-to-br from-violet-500/[0.08] via-background to-blue-500/[0.06] p-6 dark:border-violet-900/40 sm:p-8">
                <div className="min-w-0">
                  <p className="text-lg font-bold tracking-tight sm:text-xl">
                    Want to scope this into a shipped release?
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Book a call and we’ll turn your requirements into a timeline, deliverables, and a clear definition of done.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      prepareBookingModalTheme();
                      setOpen(true);
                    }}
                    className="inline-flex rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40"
                  >
                    Book a call
                  </button>
                  <Link
                    href="/pricing"
                    className="inline-flex rounded-xl border border-border/60 bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:bg-muted/30"
                  >
                    View pricing
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
