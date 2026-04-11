"use client";

import { useEffect, useState } from "react";
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

function parseDurationMinutes(duration: string): number {
  const m = /^(\d+)/.exec(duration.trim());
  return m ? parseInt(m[1], 10) : 30;
}

export default function BookingCalendar({
  open,
  onOpenChange,
  packageTitle = "Discovery call",
  duration = "30 minutes",
  price = "Complimentary",
}: BookingCalendarProps) {
  const [step, setStep] = useState<"datetime" | "details" | "confirmed">(
    "datetime",
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  /** After successful submit: whether Resend actually sent mail (false if API key missing). */
  const [emailsDispatched, setEmailsDispatched] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (!open) {
      setStep("datetime");
      setSelectedDate(undefined);
      setSelectedTime(null);
      setFormData({ name: "", email: "", phone: "", notes: "" });
      setSubmitting(false);
      setSubmitError(null);
      setEmailsDispatched(false);
    }
  }, [open]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    window.setTimeout(() => setStep("details"), 280);
  };

  const createGoogleCalendarEvent = () => {
    if (!selectedDate || !selectedTime) return "";
    const [timePart, period] = selectedTime.split(" ");
    if (!timePart || !period) return "";
    let [hours, minutes] = timePart.split(":").map(Number);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return "";
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0, 0);
    const endDate = new Date(startDate);
    endDate.setMinutes(
      endDate.getMinutes() + parseDurationMinutes(duration),
    );
    const formatGoogleDate = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `${packageTitle} · Trimesha`,
      details: `Session with Trimesha\n\nPackage: ${packageTitle}\nDuration: ${duration}\nPrice: ${price}\n\nGuest: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nNotes: ${formData.notes || "N/A"}`,
      dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
      location: "Video call (link sent by email)",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const calendarUrl = createGoogleCalendarEvent();
      const res = await fetch("/api/v1/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageTitle,
          duration,
          price,
          date: selectedDate?.toISOString(),
          time: selectedTime,
          ...formData,
          googleCalendarUrl: calendarUrl,
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
      setStep("confirmed");
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetBooking = () => onOpenChange(false);

  const handleBack = () => {
    if (step === "details") setStep("datetime");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto border-violet-200/30 bg-background dark:border-violet-800/40">
        <DialogHeader>
          <div className="flex items-start gap-3">
            {step === "details" ? (
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
                {step === "confirmed" ? "You are booked" : packageTitle}
              </DialogTitle>
              {step === "datetime" ? (
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
                  Add your details so we can confirm your call.
                </DialogDescription>
              ) : null}
              {step === "confirmed" ? (
                <DialogDescription className="mt-1">
                  {emailsDispatched
                    ? "Check your inbox for a confirmation. We will send the video link and any prep details before your call."
                    : "Your timeslot is saved. Email delivery is not configured on this server yet. Please email admin@trimesha.com so we can confirm your call."}
                </DialogDescription>
              ) : null}
            </div>
          </div>
        </DialogHeader>

        {step === "datetime" ? (
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
                    onClick={() => setStep("datetime")}
                    className="text-violet-600 hover:bg-violet-500/10 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                  >
                    Change
                  </Button>
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("datetime")}
                  className="flex-1 border-violet-300/50 dark:border-violet-700/50"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500"
                >
                  {submitting ? "Sending…" : "Confirm booking"}
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
                {emailsDispatched ? (
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
                variant="outline"
                className="border-violet-300/50 dark:border-violet-700/50"
                onClick={() => {
                  const url = createGoogleCalendarEvent();
                  if (url) window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                <CalendarIcon className="mr-2 size-4" />
                Add to Google Calendar
              </Button>
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
