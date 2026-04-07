"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { ApplicationForm } from "./application-form";
import type { CareerJobWithId } from "@/types/career-job";

function ApplyModalContent({ jobTitle }: { jobTitle: string }) {
  const { setOpen } = useModal();
  return (
    <ApplicationForm jobTitle={jobTitle} onClose={() => setOpen(false)} />
  );
}

export function JobListings() {
  const [jobs, setJobs] = useState<CareerJobWithId[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/v1/careers");
        if (!r.ok) throw new Error("bad");
        const data = (await r.json()) as CareerJobWithId[];
        if (!cancelled) setJobs(data);
      } catch {
        if (!cancelled) setErr("Could not load openings.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="open-positions"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center sm:mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            Careers
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Open positions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore our latest opportunities and join our mission to redefine
            digital excellence.
          </p>
        </motion.div>

        {err ? (
          <p className="text-center text-muted-foreground">{err}</p>
        ) : null}

        {!jobs && !err ? (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-3xl border border-border/60 bg-muted/30"
              />
            ))}
          </div>
        ) : null}

        {jobs && jobs.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-violet-500/30 bg-violet-500/5 py-16 text-center text-muted-foreground">
            No openings listed yet. Check back soon.
          </p>
        ) : null}

        {jobs && jobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {jobs.map((job, index) => (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                viewport={{ once: true, margin: "-40px" }}
                className="group relative overflow-hidden rounded-3xl border border-violet-200/50 bg-card shadow-sm transition-all duration-300 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/10 dark:border-violet-900/40 dark:bg-gray-950/80 dark:hover:border-violet-600/50"
              >
                <div className="absolute -right-24 -top-24 size-72 rounded-full bg-gradient-to-br from-violet-500/15 to-blue-500/10 blur-3xl transition-all duration-500 group-hover:from-violet-500/25" />
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-transparent opacity-80" />

                <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-8 md:flex-row md:items-stretch md:justify-between md:gap-10">
                  <div className="min-w-0 flex-1">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400 sm:text-3xl">
                      {job.title}
                    </h3>
                    <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon
                          icon="line-md:briefcase-twotone"
                          className="size-4 shrink-0 text-violet-500"
                        />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Icon
                          icon="line-md:person-twotone"
                          className="size-4 shrink-0 text-violet-500"
                        />
                        {job.experience}
                      </span>
                    </div>
                    {job.compensation?.trim() ? (
                      <div className="mb-6 flex w-fit max-w-full items-start gap-2 rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-2.5 dark:border-emerald-800/50 dark:bg-emerald-950/40">
                        <Icon
                          icon="line-md:money"
                          className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                        />
                        <span className="text-xs font-semibold leading-snug text-emerald-800 dark:text-emerald-200">
                          {job.compensation}
                        </span>
                      </div>
                    ) : null}
                    <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {job.description}
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
                      {job.benefits.map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-start gap-3 text-sm text-foreground/90"
                        >
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                            <Icon
                              icon="line-md:confirm"
                              className="size-3 text-green-600 dark:text-green-400"
                            />
                          </span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col justify-end md:w-52 lg:w-56">
                    <Modal>
                      <ModalTrigger asChild>
                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-700 hover:shadow-violet-500/35"
                        >
                          Apply now
                          <Icon
                            icon="line-md:arrow-right"
                            className="size-5 transition-transform group-hover:translate-x-0.5"
                          />
                        </button>
                      </ModalTrigger>
                      <ModalBody className="max-h-[90vh] max-w-2xl bg-background">
                        <div className="absolute left-6 right-14 top-4 z-10 md:left-8">
                          <h2 className="text-xl font-bold text-foreground md:text-2xl">
                            Apply for {job.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {job.type}
                          </p>
                        </div>
                        <ModalContent className="mt-14 max-h-[min(72vh,640px)] overflow-y-auto pr-1">
                          <ApplyModalContent jobTitle={job.title} />
                        </ModalContent>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
