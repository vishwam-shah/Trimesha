"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import "react-day-picker/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <>
      <style>{`
        .rdp-trimesha .rdp-selected:not(.rdp-outside) .rdp-day_button {
          background: linear-gradient(155deg, #7c3aed 0%, #6d28d9 52%, #5b21b6 100%);
          color: #fff !important;
          border: 2px solid #4c1d95 !important;
          font-weight: 600;
          font-size: 0.9375rem;
          box-shadow: 0 6px 22px -5px rgba(124, 58, 237, 0.55);
        }
        .rdp-trimesha .rdp-selected:not(.rdp-outside) {
          font-weight: 600;
          font-size: inherit;
        }
        .rdp-trimesha .rdp-selected.rdp-today:not(.rdp-outside) .rdp-day_button {
          color: #fff !important;
        }
        .dark .rdp-trimesha .rdp-selected:not(.rdp-outside) .rdp-day_button {
          background: linear-gradient(155deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
          border-color: #a78bfa !important;
          box-shadow: 0 6px 24px -5px rgba(139, 92, 246, 0.45);
        }
      `}</style>
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "rdp-trimesha rounded-xl border border-border bg-card p-3 shadow-sm",
        "text-card-foreground",
        "[--rdp-accent-color:rgb(124,58,237)]",
        "dark:[--rdp-accent-color:rgb(167,139,250)]",
        "[--rdp-accent-background-color:rgba(139,92,246,0.14)]",
        "dark:[--rdp-accent-background-color:rgba(139,92,246,0.22)]",
        "[--rdp-selected-border:2px_solid_rgb(124,58,237)]",
        "dark:[--rdp-selected-border:2px_solid_rgb(167,139,250)]",
        "[--rdp-day_button-border-radius:0.5rem]",
        className,
      )}
      components={{
        Chevron: ({ orientation, className: chevronClass }) => {
          const cnBase = "size-4 text-violet-600 dark:text-violet-400";
          if (orientation === "left") {
            return (
              <ChevronLeft className={cn(cnBase, chevronClass)} aria-hidden />
            );
          }
          if (orientation === "right") {
            return (
              <ChevronRight className={cn(cnBase, chevronClass)} aria-hidden />
            );
          }
          return (
            <ChevronRight className={cn(cnBase, chevronClass)} aria-hidden />
          );
        },
      }}
      {...props}
    />
    </>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
