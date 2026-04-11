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
import Link from "next/link";
import { ServiceVisual } from "@/components/ui/service-visual";
import type { ServiceWithId } from "@/types/service";
import { Icon } from "@iconify/react";
import { serviceIconForSlug } from "@/lib/service-visuals";

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

          <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                Services
              </p>
              <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
                Engineering and design, scoped like a product team
              </h1>
              <p className="mx-auto mb-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Every engagement ships documented outcomes: what we are building,
                how you will review it, and what production ready means for your
                stack. Pick a line item below or talk to us when the brief is still
                forming.
              </p>
              <div className="mx-auto mb-8 grid max-w-3xl grid-cols-1 gap-3 text-center text-xs text-muted-foreground sm:grid-cols-3 sm:gap-4 sm:text-sm md:gap-8">
                <div className="rounded-2xl border border-violet-200/40 bg-card/60 px-3 py-4 backdrop-blur-sm dark:border-violet-900/40">
                  <p className="text-xl font-bold text-violet-600 sm:text-2xl dark:text-violet-400">
                    8
                  </p>
                  <p className="mt-1 leading-snug">
                    core service lines
                  </p>
                </div>
                <div className="rounded-2xl border border-violet-200/40 bg-card/60 px-3 py-4 backdrop-blur-sm dark:border-violet-900/40">
                  <p className="text-xl font-bold text-violet-600 sm:text-2xl dark:text-violet-400">
                    2 to 12 wk
                  </p>
                  <p className="mt-1 leading-snug">
                    typical first release
                  </p>
                </div>
                <div className="rounded-2xl border border-violet-200/40 bg-card/60 px-3 py-4 backdrop-blur-sm dark:border-violet-900/40">
                  <p className="text-xl font-bold text-violet-600 sm:text-2xl dark:text-violet-400">
                    100%
                  </p>
                  <p className="mt-1 leading-snug">
                    staging before prod
                  </p>
                </div>
              </div>
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

        <section
          id="how-we-work"
          className="relative border-y border-violet-200/20 bg-muted/20 py-16 dark:border-violet-900/30 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                How we work
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                From first call to shipped outcomes
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                Fixed checkpoints, shared docs, and demos you can invite stakeholders
                to. No black box builds: you see working software on staging at
                each milestone before we talk about production.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Discover",
                  body: "Workshops and a written scope: users, integrations, non negotiables (performance, compliance, uptime), and what done looks like. You leave with a backlog ordered by risk and value.",
                  icon: "material-symbols:manage-search-rounded",
                },
                {
                  step: "02",
                  title: "Design",
                  body: "UX flows and technical approach signed off together. For greenfield work that means prototypes or API sketches. For existing systems we map touchpoints so refactors stay safe.",
                  icon: "material-symbols:draw-rounded",
                },
                {
                  step: "03",
                  title: "Build",
                  body: "Time boxed iterations with deployable increments. Each slice includes tests where they matter, logging you can read, and a short changelog so support is never guessing.",
                  icon: "material-symbols:construction-rounded",
                },
                {
                  step: "04",
                  title: "Launch and grow",
                  body: "Production cutover with monitoring, ownership of runbooks, and optional retainer for roadmap work. We train your team on deploy and rollback before we step back.",
                  icon: "material-symbols:rocket-launch-rounded",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-violet-200/30 bg-card/80 p-6 shadow-sm backdrop-blur-sm dark:border-violet-900/40"
                >
                  <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/15 text-violet-600 dark:text-violet-400">
                    <Icon icon={item.icon} className="size-8" aria-hidden />
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {item.step}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="capabilities"
          className="relative overflow-hidden py-16 sm:py-24"
        >
          <div className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-[0.08]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.2),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.15),transparent_45%)]" />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Capability map
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground md:text-lg">
                Full stack delivery across product, platform, and experience, so
                you can route work through one accountable team instead of many
                vendors pointing at each other.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Product engineering",
                  desc: "Customer facing surfaces and the APIs behind them, built so your next hire can extend the codebase without a rewrite.",
                  icon: "material-symbols:devices-rounded",
                  bullets: [
                    "Next.js, React, TypeScript on the web",
                    "React Native or Flutter for mobile",
                    "REST and GraphQL services with contracts",
                  ],
                },
                {
                  title: "Platform and reliability",
                  desc: "Environments and pipelines that survive traffic spikes, failed deploys, and new engineers joining mid flight.",
                  icon: "material-symbols:dns-rounded",
                  bullets: [
                    "IaC and environment parity dev through prod",
                    "CI/CD, secrets, and release approvals",
                    "Metrics, logs, backups, and restore drills",
                  ],
                },
                {
                  title: "Design and insight",
                  desc: "Interfaces people understand the first time, plus reporting tied to definitions your leadership already uses.",
                  icon: "material-symbols:auto-awesome-rounded",
                  bullets: [
                    "UX research, UI systems, and Figma handoff",
                    "Dashboards wired to your warehouse or product events",
                    "Accessibility and performance as acceptance criteria",
                  ],
                },
              ].map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-3xl border border-violet-200/35 bg-card/90 p-8 shadow-sm backdrop-blur-sm dark:border-violet-900/40"
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400">
                    <Icon icon={cap.icon} className="size-8" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {cap.desc}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm text-muted-foreground">
                    {cap.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-500/70"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="partnering"
          className="border-y border-violet-200/20 bg-background py-16 dark:border-violet-900/30 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                How we stay aligned
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                What you get besides code
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                These are standard on every engagement, whether the deliverable is
                a marketing site or a multi tenant backend.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Single thread of communication",
                  body: "A named lead engineer or PM in your Slack or Teams, plus a weekly written status: shipped, in progress, blocked, and decisions needed by you.",
                  icon: "material-symbols:forum-rounded",
                },
                {
                  title: "Living documentation",
                  body: "Scope, architecture notes, and runbooks live in a repo or wiki you own. We do not trap knowledge in private channels.",
                  icon: "material-symbols:description-rounded",
                },
                {
                  title: "Staging first culture",
                  body: "No surprise deploys. You approve what goes to production after you have clicked through the same build your users will see.",
                  icon: "material-symbols:labs-rounded",
                },
                {
                  title: "Security aware defaults",
                  body: "Secrets out of git, least privilege access, and dependency hygiene appropriate to what you store. Deeper audits available as a separate line item.",
                  icon: "material-symbols:verified-user-rounded",
                },
              ].map((row) => (
                <div
                  key={row.title}
                  className="flex gap-4 rounded-2xl border border-violet-200/30 bg-card/70 p-6 dark:border-violet-900/40"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/12 text-violet-600 dark:text-violet-400">
                    <Icon icon={row.icon} className="size-7" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{row.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {row.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
                Service lines in detail
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                Each card links to a dedicated page with deliverables, timelines,
                and fit. Open the modal for a quick scan without leaving this view.
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
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-violet-200/40 bg-card/90 shadow-sm backdrop-blur-sm transition hover:border-violet-400/60 hover:shadow-xl hover:shadow-violet-500/15 dark:border-violet-900/40 dark:bg-gray-950/70"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full blur-3xl transition-opacity group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${s.color}44, transparent 65%)`,
                      opacity: 0.55,
                    }}
                  />
                  <Link
                    href={`/services/${s.slug}`}
                    className="relative isolate block aspect-[21/10] w-full overflow-hidden sm:aspect-[2/1]"
                  >
                    <div className="absolute inset-0 transition duration-500 group-hover:scale-[1.03]">
                      <ServiceVisual
                        slug={s.slug}
                        color={s.color}
                        variant="card"
                        className="absolute inset-0 size-full"
                      />
                    </div>
                    <div
                      className="absolute left-4 top-4 flex size-[3.25rem] items-center justify-center rounded-2xl border border-white/30 bg-black/35 shadow-lg shadow-black/30 backdrop-blur-md"
                      aria-hidden
                    >
                      <Icon
                        icon={serviceIconForSlug(s.slug)}
                        className="size-9 text-white drop-shadow-md"
                      />
                    </div>
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
                      aria-hidden
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                        {s.title}
                      </h3>
                      <p className="mt-1 max-w-xl text-sm text-white/85 sm:text-base">
                        {s.description}
                      </p>
                    </div>
                  </Link>
                  <div className="relative z-10 min-w-0 p-5 sm:p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {s.overview}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-violet-600 dark:text-violet-400">
                      Typical timeline: {s.typicalTimeline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.goodFor.map((g) => (
                        <span
                          key={g}
                          className="rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-2.5 py-1 text-[11px] font-medium text-violet-800 dark:text-violet-200"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={`/services/${s.slug}`}
                          className="rounded-full border border-violet-500/40 bg-violet-500/5 px-3 py-1 text-xs font-semibold text-violet-700 transition hover:bg-violet-500/10 dark:text-violet-300"
                        >
                          View page
                        </Link>
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
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/60 shadow-lg shadow-violet-500/10 sm:aspect-auto sm:h-52 sm:w-72">
                                  <ServiceVisual
                                    slug={s.slug}
                                    color={s.color}
                                    variant="modal"
                                    className="absolute inset-0 size-full"
                                  />
                                  <div
                                    className="absolute left-3 top-3 flex size-11 items-center justify-center rounded-xl border border-white/30 bg-white/15 backdrop-blur-md dark:bg-black/30"
                                    aria-hidden
                                  >
                                    <Icon
                                      icon={serviceIconForSlug(s.slug)}
                                      className="size-7 text-white"
                                    />
                                  </div>
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
                </motion.article>
              ))}
            </div>
            ) : null}
          </div>
        </section>

        <section
          id="faq"
          className="relative overflow-hidden py-16 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-[0.06]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.2),transparent_50%)]" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
              Common questions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
              Straight answers before you book time. Anything specific to your
              stack we cover on a call.
            </p>
            <div className="mt-10 space-y-3">
              {[
                {
                  q: "Do you work with our existing repo and hosting?",
                  a: "Yes. We join your Git org, follow your branch rules, and deploy to the provider you already pay for, or recommend one if you are starting fresh.",
                },
                {
                  q: "How do change requests work once we are underway?",
                  a: "We keep a shared backlog. Small clarifications fold into the current sprint. Larger scope shifts get a short written addendum so budget and dates stay honest.",
                },
                {
                  q: "Can you overlap with our in house team?",
                  a: "That is common. We agree who owns infra, who reviews PRs, and how releases are gated so nobody is blocked waiting on access.",
                },
                {
                  q: "What happens after launch?",
                  a: "You get handover docs, a walkthrough recording, and optional retainer hours for fixes, upgrades, and roadmap work. No forced lock in.",
                },
                {
                  q: "Where are you comfortable legally and operationally?",
                  a: "We sign NDAs and MSAs as needed, use your vendor onboarding if you have one, and can work within your SSO and ticketing tools.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="rounded-2xl border border-violet-200/35 bg-card/90 px-4 py-3 dark:border-violet-900/40"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <Icon
                      icon="material-symbols:expand-more-rounded"
                      className="faq-chevron size-6 shrink-0 text-muted-foreground transition-transform duration-200"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="timelines"
          className="border-t border-violet-200/20 bg-muted/15 py-16 dark:border-violet-900/30 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Typical timelines
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground md:text-lg">
                Ranges assume a focused squad and stakeholders who can decide
                within a few business days. We refine dates after the discovery
                week.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-violet-200/35 bg-card/90 shadow-sm dark:border-violet-900/40">
              <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
                {[
                  {
                    label: "Sprint style",
                    range: "2 to 6 weeks",
                    detail:
                      "Landing pages, MVPs, and focused product slices with weekly demos and a tight backlog.",
                  },
                  {
                    label: "Program",
                    range: "6 to 16 weeks",
                    detail:
                      "Multi module apps, integrations, and platform work with staged releases and UAT checkpoints.",
                  },
                  {
                    label: "Embedded",
                    range: "Ongoing",
                    detail:
                      "Monthly capacity for roadmap, reliability, security patches, and production support.",
                  },
                ].map((row) => (
                  <div key={row.label} className="p-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                      {row.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {row.range}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {row.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="book-call"
          className="relative overflow-hidden py-16 sm:py-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/15 via-transparent to-blue-600/10 dark:from-violet-500/10" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to talk through your roadmap?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Book a complimentary discovery call. We will confirm scope,
              timeline, and the right team shape for your goals.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  prepareBookingModalTheme();
                  setOpen(true);
                }}
                className="inline-flex rounded-xl bg-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40"
              >
                Book a call
              </button>
              <Link
                href="/pricing"
                className="inline-flex rounded-xl border-2 border-purple-500/50 bg-background/80 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition hover:border-purple-400 hover:bg-purple-500/10"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
