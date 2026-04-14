"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { format, startOfToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Video,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookingCalendarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageTitle?: string;
  duration?: string;
  price?: string;
}

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

function calendlyBaseFromEnv(): string | null {
  const u = process.env.NEXT_PUBLIC_CALENDLY_EVENT_URL?.trim();
  return u || null;
}

function buildPrefilledCalendlyUrl(
  base: string,
  fd: { name: string; email: string },
): string {
  try {
    const u = new URL(base);
    if (fd.name.trim()) u.searchParams.set("name", fd.name.trim());
    if (fd.email.trim()) u.searchParams.set("email", fd.email.trim());
    return u.toString();
  } catch {
    return base;
  }
}

function ensureCalendlyScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    const w = window as unknown as { Calendly?: { initInlineWidget?: unknown } };
    if (w.Calendly?.initInlineWidget) {
      resolve();
      return;
    }
    const src = "https://assets.calendly.com/assets/external/widget.js";
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

type StepLegacy = "datetime" | "details" | "confirmed";
type StepCalendly = "details" | "calendly" | "confirmed";

export default function BookingCalendar({
  open,
  onOpenChange,
  packageTitle = "Discovery call",
  duration = "30 minutes",
  price = "Complimentary",
}: BookingCalendarProps) {
  const calendlyBase = useMemo(() => calendlyBaseFromEnv(), []);
  const useCalendly = calendlyBase != null;

  const [stepLegacy, setStepLegacy] = useState<StepLegacy>("datetime");
  const [stepCal, setStepCal] = useState<StepCalendly>("details");
  const [lockedCalendlyUrl, setLockedCalendlyUrl] = useState<string | null>(
    null,
  );
  const calendlyNotifyDone = useRef(false);

  const step = useCalendly ? stepCal : stepLegacy;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailsDispatched, setEmailsDispatched] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const calendlyParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setStepLegacy("datetime");
      setStepCal("details");
      setLockedCalendlyUrl(null);
      setSelectedDate(undefined);
      setSelectedTime(null);
      setFormData({ name: "", email: "", phone: "", notes: "" });
      setSubmitting(false);
      setSubmitError(null);
      setEmailsDispatched(false);
      calendlyNotifyDone.current = false;
    }
  }, [open]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    window.setTimeout(() => setStepLegacy("details"), 280);
  };

  const submitLegacyBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/v1/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "site",
          packageTitle,
          duration,
          price,
          date: selectedDate?.toISOString(),
          time: selectedTime,
          ...formData,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        emailed?: boolean;
      };
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setEmailsDispatched(data.emailed === true);
      setStepLegacy("confirmed");
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const notifyCalendlyBooked = useCallback(
    async (payload: {
      calendlyEventUri: string;
      calendlyInviteeUri: string;
    }) => {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const res = await fetch("/api/v1/booking-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "calendly",
            packageTitle,
            duration,
            price,
            ...formData,
            calendlyEventUri: payload.calendlyEventUri,
            calendlyInviteeUri: payload.calendlyInviteeUri,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          emailed?: boolean;
        };
        if (!res.ok) {
          setSubmitError(data.error ?? "Something went wrong. Please try again.");
          return;
        }
        setEmailsDispatched(data.emailed === true);
      } catch {
        setSubmitError("Network error. Check your connection and try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [duration, formData, packageTitle, price],
  );

  useEffect(() => {
    if (!open || !useCalendly || stepCal !== "calendly" || !lockedCalendlyUrl) {
      return;
    }
    const parent = calendlyParentRef.current;
    if (!parent) return;
    let cancelled = false;
    (async () => {
      await ensureCalendlyScript();
      if (cancelled || !parent) return;
      parent.innerHTML = "";
      const w = window as unknown as {
        Calendly?: {
          initInlineWidget: (opts: {
            url: string;
            parentElement: HTMLElement;
          }) => void;
        };
      };
      w.Calendly?.initInlineWidget({
        url: lockedCalendlyUrl,
        parentElement: parent,
      });
    })();
    return () => {
      cancelled = true;
      parent.innerHTML = "";
    };
  }, [open, useCalendly, stepCal, lockedCalendlyUrl]);

  useEffect(() => {
    if (!open || !useCalendly || stepCal !== "calendly") return;

    const onMessage = (e: MessageEvent) => {
      const data = e.data as { event?: string; payload?: unknown } | undefined;
      if (data?.event !== "calendly.event_scheduled") return;
      if (calendlyNotifyDone.current) return;
      calendlyNotifyDone.current = true;
      const payload = data.payload as
        | {
            event?: { uri?: string };
            invitee?: { uri?: string };
          }
        | undefined;
      const calendlyEventUri = payload?.event?.uri ?? "";
      const calendlyInviteeUri = payload?.invitee?.uri ?? "";
      void notifyCalendlyBooked({ calendlyEventUri, calendlyInviteeUri });
      setStepCal("confirmed");
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, useCalendly, stepCal, notifyCalendlyBooked]);

  const resetBooking = () => onOpenChange(false);

  const handleBack = () => {
    if (useCalendly) {
      if (stepCal === "calendly") setStepCal("details");
      return;
    }
    if (stepLegacy === "details") setStepLegacy("datetime");
  };

  const goToCalendlyFromDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calendlyBase) return;
    calendlyNotifyDone.current = false;
    const url = buildPrefilledCalendlyUrl(calendlyBase, formData);
    setLockedCalendlyUrl(url);
    setStepCal("calendly");
  };

  const showDetailsBack =
    (useCalendly && stepCal === "calendly") ||
    (!useCalendly && stepLegacy === "details");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto border-violet-200/30 bg-background dark:border-violet-800/40">
        <DialogHeader>
          <div className="flex items-start gap-3">
            {showDetailsBack ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="mt-0.5 shrink-0 text-violet-600 hover:bg-violet-500/10 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            ) : null}
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {step === "confirmed"
                  ? "You are booked"
                  : useCalendly && step === "calendly"
                    ? "Pick a time"
                    : packageTitle}
              </DialogTitle>
              {useCalendly && step === "details" ? (
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5 text-violet-600 dark:text-violet-400" />
                    {duration}
                  </span>
                  <span className="font-semibold text-violet-600 dark:text-violet-400">
                    {price}
                  </span>
                </div>
              ) : null}
              {!useCalendly && stepLegacy === "datetime" ? (
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5 text-violet-600 dark:text-violet-400" />
                    {duration}
                  </span>
                  <span className="font-semibold text-violet-600 dark:text-violet-400">
                    {price}
                  </span>
                </div>
              ) : null}
              {step === "details" ? (
                <DialogDescription className="mt-1">
                  {useCalendly
                    ? "Add your details, then choose an available slot. The meeting is created in Calendly and syncs to our calendar."
                    : "Add your details so we can confirm your call."}
                </DialogDescription>
              ) : null}
              {useCalendly && step === "calendly" ? (
                <DialogDescription className="mt-1">
                  Select a time below. You will receive a confirmation from
                  Calendly with the video link and calendar invite.
                </DialogDescription>
              ) : null}
              {step === "confirmed" ? (
                <DialogDescription className="mt-1">
                  {useCalendly
                    ? emailsDispatched
                      ? "We emailed you a short summary. Calendly also sends the official confirmation and adds the event to calendars."
                      : "Your time is reserved in Calendly. Email delivery from this server may be off; you should still get Calendly’s confirmation."
                    : emailsDispatched
                      ? "Check your inbox for a confirmation. We will send the video link and any prep details before your call."
                      : "Your request is saved. Email delivery is not configured on this server yet. Please email admin@trimesha.com so we can confirm your call."}
                </DialogDescription>
              ) : null}
            </div>
          </div>
        </DialogHeader>

        {useCalendly && stepCal === "calendly" ? (
          <div className="min-h-[min(640px,70vh)] w-full">
            <div ref={calendlyParentRef} className="min-h-[min(640px,70vh)] w-full" />
          </div>
        ) : null}

        {!useCalendly && stepLegacy === "datetime" ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-base font-semibold text-foreground">
                Select a date
              </h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={{ before: startOfToday() }}
              />
            </div>
            <div>
              <h3 className="mb-3 text-base font-semibold text-foreground">
                {selectedDate
                  ? format(selectedDate, "EEEE, MMMM d")
                  : "Choose a date first"}
              </h3>
              {selectedDate ? (
                <div className="custom-scrollbar max-h-[min(400px,42vh)] space-y-2 overflow-y-auto pr-1">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all",
                        selectedTime === time
                          ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-500/25 dark:border-violet-500 dark:bg-violet-600"
                          : "border-border bg-card text-foreground hover:border-violet-400/60 hover:bg-violet-500/5 dark:hover:bg-violet-500/10",
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex h-[min(400px,42vh)] flex-col items-center justify-center rounded-xl border border-dashed border-violet-300/40 bg-muted/30 text-center dark:border-violet-700/40">
                  <CalendarIcon
                    className="mb-3 size-12 text-muted-foreground opacity-50"
                    aria-hidden
                  />
                  <p className="max-w-xs text-sm text-muted-foreground">
                    Pick a date on the left to see available times.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {step === "details" ? (
          <div className="space-y-6">
            {!useCalendly ? (
              <Card className="border-violet-500/25 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 dark:border-violet-500/30">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="size-[18px] text-violet-600 dark:text-violet-400" />
                        <span className="font-semibold text-foreground">
                          {selectedDate
                            ? format(selectedDate, "MMM d, yyyy")
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-[18px] text-violet-600 dark:text-violet-400" />
                        <span className="font-semibold text-foreground">
                          {selectedTime}
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStepLegacy("datetime")}
                      className="text-violet-600 hover:bg-violet-500/10 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                    >
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <form
              onSubmit={
                useCalendly ? goToCalendlyFromDetails : submitLegacyBooking
              }
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bk-name">Full name *</Label>
                  <Input
                    id="bk-name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bk-email">Email *</Label>
                  <Input
                    id="bk-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bk-phone">Phone *</Label>
                <Input
                  id="bk-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 …"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bk-notes">Notes (optional)</Label>
                <Textarea
                  id="bk-notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={4}
                  placeholder="What should we prepare for?"
                  className="resize-none"
                />
              </div>
              {submitError ? (
                <p
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                {useCalendly ? null : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStepLegacy("datetime")}
                    className="flex-1 border-violet-300/50 dark:border-violet-700/50"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500"
                >
                  {useCalendly
                    ? "Continue to schedule"
                    : submitting
                      ? "Sending…"
                      : "Confirm booking"}
                </Button>
              </div>
            </form>
          </div>
        ) : null}

        {step === "confirmed" ? (
          <div className="space-y-6 py-4 text-center">
            <div className="flex justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-violet-500/15 ring-2 ring-violet-500/30">
                <CheckCircle2 className="size-10 text-violet-600 dark:text-violet-400" />
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
                All set
              </h3>
              <p className="text-muted-foreground">
                {useCalendly ? (
                  <>
                    {formData.email ? (
                      <>
                        Details were sent for{" "}
                        <span className="font-semibold text-foreground">
                          {formData.email}
                        </span>
                        .{" "}
                      </>
                    ) : null}
                    Use the Calendly email for your exact time, link, and
                    calendar invite.
                  </>
                ) : emailsDispatched ? (
                  <>
                    A confirmation has been sent to{" "}
                    <span className="font-semibold text-foreground">
                      {formData.email}
                    </span>
                    . If you do not see it in a few minutes, check spam or
                    contact us at{" "}
                    <a
                      href="mailto:admin@trimesha.com"
                      className="font-medium text-violet-600 underline-offset-2 hover:underline dark:text-violet-400"
                    >
                      admin@trimesha.com
                    </a>
                    .
                  </>
                ) : (
                  <>
                    We did not send email from this environment. Please reach
                    out at{" "}
                    <a
                      href="mailto:admin@trimesha.com"
                      className="font-medium text-violet-600 underline-offset-2 hover:underline dark:text-violet-400"
                    >
                      admin@trimesha.com
                    </a>{" "}
                    with your preferred time so we can confirm.
                  </>
                )}
              </p>
            </div>
            <Card className="mx-auto max-w-md border-violet-500/25 bg-gradient-to-br from-violet-500/8 to-blue-500/8 dark:border-violet-500/30">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start gap-3 border-b border-border pb-4">
                  <Video className="mt-1 size-5 shrink-0 text-violet-600 dark:text-violet-400" />
                  <div className="min-w-0 flex-1 text-left">
                    <h4 className="font-semibold text-foreground">
                      {packageTitle}
                    </h4>
                    <p className="text-sm text-muted-foreground">Trimesha</p>
                  </div>
                </div>
                {useCalendly ? (
                  <p className="text-left text-sm text-muted-foreground">
                    Time and meeting link are in your Calendly confirmation. The
                    event appears on our calendar through Calendly.
                  </p>
                ) : (
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="size-[18px] text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {selectedDate &&
                          format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="size-[18px] text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {selectedTime} ({duration})
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Listed as</span>
                  <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                    {price}
                  </span>
                </div>
              </CardContent>
            </Card>
            <div className="mx-auto flex max-w-md flex-col gap-3">
              <Button
                type="button"
                onClick={resetBooking}
                className="bg-violet-600 text-white hover:bg-violet-700"
              >
                Done
              </Button>
            </div>
          </div>
        ) : null}

        <style>{`
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(139,92,246,.4) transparent; }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139,92,246,.35); border-radius: 999px; }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
