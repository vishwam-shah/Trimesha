"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";
import type { PublicTeamMember } from "@/lib/team-public";
import { cn } from "@/lib/utils";

function useTeamPerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return perView;
}

/* ─── Avatar with graceful fallback ─── */
function AvatarWithFallback({ member }: { member: PublicTeamMember }) {
  const [imgError, setImgError] = useState(false);
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const showPlaceholder =
    !member.hasImage || !member.image || imgError;

  return (
    <div className="relative aspect-[3/4] w-full max-h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-muted/20 shadow-inner ring-1 ring-black/5 dark:ring-white/10 sm:max-h-[400px]">
      {!showPlaceholder ? (
        <>
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 90vw, 45vw"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-80" />
        </>
      ) : (
        <div
          className={`flex size-full min-h-[220px] items-center justify-center bg-gradient-to-br ${member.badgeColor}`}
        >
          <span className="text-4xl font-bold text-white/95 select-none sm:text-5xl">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Individual member card ─── */
function MemberCard({ member }: { member: PublicTeamMember }) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-[1.75rem] border border-violet-200/40 bg-gradient-to-b from-card via-card to-muted/30",
        "shadow-[0_20px_50px_-24px_rgba(109,40,217,0.35),0_0_0_1px_rgba(255,255,255,0.06)_inset]",
        "transition-all duration-500 hover:border-violet-400/45 hover:shadow-[0_28px_60px_-24px_rgba(109,40,217,0.45)]",
        "dark:border-violet-500/20 dark:from-gray-950 dark:via-gray-950 dark:to-violet-950/30",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent opacity-70" />
      <div className="p-5 sm:p-6">
        <AvatarWithFallback member={member} />

        <div className="mt-5 min-w-0 text-center">
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {member.name}
          </h3>
          <p className="mt-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400">
            {member.role}
          </p>
          <p
            className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground line-clamp-2"
            title={member.bio}
          >
            {member.bio}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-16 -right-16 size-40 rounded-full bg-violet-500/[0.12] blur-3xl transition-opacity duration-700 group-hover:opacity-100 dark:bg-violet-400/10" />
    </div>
  );
}

function TeamCarousel({ members }: { members: PublicTeamMember[] }) {
  const perView = useTeamPerView();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const maxStart = Math.max(0, members.length - perView);
  const pageStart = Math.min(index, maxStart);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => {
      const cur = Math.min(i, maxStart);
      return cur >= maxStart ? 0 : cur + 1;
    });
  }, [maxStart]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => {
      const cur = Math.min(i, maxStart);
      return cur <= 0 ? maxStart : cur - 1;
    });
  }, [maxStart]);

  useEffect(() => {
    if (members.length <= perView) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => {
        const cur = Math.min(i, maxStart);
        return cur >= maxStart ? 0 : cur + 1;
      });
    }, 6500);
    return () => window.clearInterval(id);
  }, [members.length, perView, maxStart]);

  const visible = members.slice(pageStart, pageStart + perView);
  const pageCount = maxStart + 1;
  const canNavigate = members.length > perView;

  return (
    <div className="relative">
      <div className="relative overflow-hidden px-0 sm:px-2 md:px-12">
        {canNavigate ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous team members"
              className={cn(
                "absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-border bg-background/95 p-2.5 shadow-lg backdrop-blur-sm transition",
                "hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-700 dark:hover:text-violet-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 md:flex",
              )}
            >
              <ChevronLeft className="size-5" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="More team members"
              className={cn(
                "absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-border bg-background/95 p-2.5 shadow-lg backdrop-blur-sm transition",
                "hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-700 dark:hover:text-violet-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 md:flex",
              )}
            >
              <ChevronRight className="size-5" strokeWidth={2.25} />
            </button>
          </>
        ) : null}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pageStart}
            initial={{ opacity: 0, x: direction >= 0 ? 28 : -28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -20 : 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "grid gap-6",
              perView === 2 ? "lg:grid-cols-2" : "grid-cols-1",
            )}
          >
            {visible.map((member) => (
              <MemberCard
                key={`${member.name}-${pageStart}-${member.role}`}
                member={member}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {canNavigate ? (
          <div className="mt-5 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous team members"
              className={cn(
                "rounded-full border border-border bg-background/95 p-3 shadow-md backdrop-blur-sm transition",
                "hover:border-violet-400/50 hover:bg-violet-500/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
              )}
            >
              <ChevronLeft className="size-5" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="More team members"
              className={cn(
                "rounded-full border border-border bg-background/95 p-3 shadow-md backdrop-blur-sm transition",
                "hover:border-violet-400/50 hover:bg-violet-500/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
              )}
            >
              <ChevronRight className="size-5" strokeWidth={2.25} />
            </button>
          </div>
        ) : null}
      </div>

      {canNavigate ? (
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <button
            type="button"
            onClick={goNext}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-violet-300/60 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-800 shadow-sm transition",
              "hover:bg-violet-500/20 hover:border-violet-400 dark:border-violet-500/40 dark:text-violet-200 dark:hover:bg-violet-500/15",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
            )}
          >
            More team members
            <ChevronRight className="size-4" strokeWidth={2.5} aria-hidden />
          </button>

          <div className="flex items-center gap-1.5" aria-hidden>
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to team page ${i + 1}`}
                onClick={() => {
                  setDirection(i > pageStart ? 1 : -1);
                  setIndex(i);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === pageStart
                    ? "w-7 bg-violet-600 dark:bg-violet-400"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ─── Main Team Section ─── */
export function Team({ members }: { members: PublicTeamMember[] }) {
  return (
    <section
      id="team"
      className="w-full bg-background py-16 md:py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <span className="mb-4 inline-block rounded-full border border-violet-300 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-500/50 dark:bg-violet-950/80 dark:text-violet-300">
            The People Behind Trimesha
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Meet the Team
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We&apos;re a small, focused team that believes in shipping quality
            over quantity. Two founders who complement each other&apos;s
            strengths - one drives mobile, the other drives web - backed by
            developers and interns who care about craft. Every member owns
            their domain end-to-end.
          </p>
        </motion.div>

        {/* How we work callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12 rounded-2xl border border-border bg-gradient-to-br from-purple-500/[0.04] to-blue-500/[0.04] p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                <Icon
                  icon="ph:devices-duotone"
                  className="size-5 text-purple-600 dark:text-purple-400"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Mobile + Web Synergy
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  Siddhant and Vishwam collaborate closely so mobile and web
                  products share APIs, design tokens, and business logic -
                  reducing time-to-ship by 40%.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10">
                <Icon
                  icon="ph:git-branch-duotone"
                  className="size-5 text-teal-600 dark:text-teal-400"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Staging-First Culture
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  Nothing goes to production without a full staging pass. We
                  test against real data, real devices, and real edge cases
                  before launch.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                <Icon
                  icon="ph:users-three-duotone"
                  className="size-5 text-amber-600 dark:text-amber-400"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Ownership Mentality
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  Each team member owns their deliverable end-to-end - from
                  architecture decisions to deployment monitoring. No hand-offs
                  that break context.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <TeamCarousel members={members} />

        {/* Hiring banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-14 rounded-2xl border border-dashed border-purple-400/30 bg-purple-500/[0.03] p-6 text-center dark:border-purple-500/20 sm:p-8"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-500/10">
              <Icon
                icon="ph:sparkle-duotone"
                className="size-6 text-purple-600 dark:text-purple-400"
              />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              We&apos;re always looking for builders
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              If you&apos;re a developer, designer, or AI enthusiast who wants
              to work on real products with a small team that ships fast -
              we&apos;d love to hear from you.
            </p>
            <a
              href="/careers"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:bg-purple-500 hover:shadow-purple-500/30"
            >
              View Open Roles
              <Icon icon="ph:arrow-right-bold" className="size-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
