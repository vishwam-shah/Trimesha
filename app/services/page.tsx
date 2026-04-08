"use client";

import { Header } from "@/components/layout/header";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { prepareBookingModalTheme } from "@/lib/booking-cta";
import Image from "next/image";
import type { ServiceWithId } from "@/types/service";

export default function ServicesPage() {
  const { setOpen } = useModal();
  const [services, setServices] = useState<ServiceWithId[] | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/v1/services");
        if (!r.ok) throw new Error("bad");
        const data = (await r.json()) as ServiceWithId[];
        if (!cancelled) setServices(data);
      } catch {
        if (!cancelled) setLoadErr("Could not load services.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <>
      <Header />

      <style>{`
        /* Hide scrollbar but keep scroll for Learn more modal content */
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <main className="min-h-screen bg-background text-foreground">
        {/* Hero (same theme as Careers) */}
        <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-background pt-28 sm:pt-32 lg:pt-36">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="rgb(139, 92, 246)"
          />
          <Spotlight
            className="top-10 left-full md:left-80 md:top-20"
            fill="rgb(59, 130, 246)"
          />
          <Spotlight
            className="-top-20 right-full md:right-60 md:top-10"
            fill="rgb(168, 85, 247)"
          />
          <div className="absolute inset-0 opacity-30 dark:opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>
          <motion.div
            className="absolute left-10 top-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/10"
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10"
            animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                Services
              </p>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Built for real teams
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Choose a service that matches your goal. We focus on clarity,
                quality, and results you can measure.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#services"
                  className="inline-flex rounded-xl bg-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40"
                >
                  Explore services
                </a>
                <button
                  type="button"
                  onClick={() => {
                    prepareBookingModalTheme();
                    setOpen(true);
                  }}
                  className="inline-flex rounded-xl border-2 border-purple-500/60 bg-background/80 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition hover:border-purple-400 hover:bg-purple-500/10"
                >
                  Book a call
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services list */}
        <section id="services" className="relative overflow-hidden py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-[0.07]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.18),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.14),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(168,85,247,0.12),transparent_40%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                What we do
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                Clear scope, strong execution, and a finish you are proud to ship.
              </p>
            </div>

            {loadErr ? (
              <p className="rounded-2xl border border-dashed border-violet-500/30 bg-violet-500/5 py-10 text-center text-muted-foreground">
                {loadErr}
              </p>
            ) : null}

            {!services && !loadErr ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-32 animate-pulse rounded-3xl border border-border/60 bg-muted/30"
                  />
                ))}
              </div>
            ) : null}

            {services ? (
              <div className="grid gap-6 md:grid-cols-2">
              {services.map((s, idx) => (
                <motion.article
                  key={s.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="group relative overflow-hidden rounded-3xl border border-violet-200/40 bg-card/90 shadow-sm backdrop-blur-sm transition hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/10 dark:border-violet-900/40 dark:bg-gray-950/70"
                >
                  <div
                    aria-hidden
                    className="absolute -right-20 -top-20 size-64 rounded-full blur-3xl transition group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${s.color}55, transparent 65%)`,
                      opacity: 0.65,
                    }}
                  />
                  <div className="relative z-10 flex gap-5 p-5 sm:p-6">
                    <div className="relative hidden h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-violet-200/40 bg-muted/20 sm:block dark:border-violet-900/40">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover opacity-90 transition group-hover:scale-[1.03]"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {s.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Modal>
                          <ModalTrigger asChild>
                            <button
                              type="button"
                              className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700 transition hover:bg-violet-500/15 dark:text-violet-300"
                            >
                              Learn more
                            </button>
                          </ModalTrigger>
                          <ModalBody className="h-[min(86vh,860px)] w-[min(92vw,900px)] bg-background">
                            <ModalContent className="no-scrollbar h-full overflow-y-auto p-6 sm:p-8">
                              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                                <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-border/60 sm:h-44 sm:w-60">
                                  <Image
                                    src={s.image}
                                    alt={s.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 90vw, 240px"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                                    Service
                                  </p>
                                  <h3 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                                    {s.title}
                                  </h3>
                                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {s.overview}
                                  </p>
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
                                      Typical timeline: {s.typicalTimeline}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6 grid gap-6 md:grid-cols-2">
                                <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
                                  <h4 className="text-sm font-bold text-foreground">
                                    Deliverables
                                  </h4>
                                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                    {s.deliverables.map((d) => (
                                      <li key={d} className="flex gap-2">
                                        <span
                                          aria-hidden
                                          className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-500/70"
                                        />
                                        <span>{d}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
                                  <h4 className="text-sm font-bold text-foreground">
                                    Good for
                                  </h4>
                                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                    {s.goodFor.map((g) => (
                                      <li key={g} className="flex gap-2">
                                        <span
                                          aria-hidden
                                          className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-500/60"
                                        />
                                        <span>{g}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="mt-7 flex flex-wrap gap-3">
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
                                <a
                                  href="#services"
                                  className="inline-flex rounded-xl border border-border/60 bg-background/70 px-6 py-3 text-sm font-semibold text-foreground/90 transition hover:bg-muted/30"
                                >
                                  Back to services
                                </a>
                              </div>
                            </ModalContent>
                          </ModalBody>
                        </Modal>
                        <button
                          type="button"
                          onClick={() => {
                            prepareBookingModalTheme();
                            setOpen(true);
                          }}
                          className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-semibold text-foreground/90 transition hover:bg-muted/30"
                        >
                          Talk to us
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
}
