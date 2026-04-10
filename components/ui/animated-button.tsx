"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/components/ui/animated-modal";
import { prepareBookingModalTheme } from "@/lib/booking-cta";

export const BookCallButton = () => {
  const text = "BOOK A CALL • BOOK A CALL •";
  const { setOpen } = useModal();

  return (
    <div className="hidden cursor-pointer rounded-full border-2 border-dotted border-purple-600 p-1 dark:border-purple-400 sm:block">
      <Button
        onClick={() => {
          prepareBookingModalTheme();
          setOpen(true);
        }}
        aria-label="Book a call"
        className="group relative grid size-24 place-content-center overflow-hidden rounded-full bg-purple-600 p-0 text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
      >
        <p className="absolute inset-0 animate-[text-rotation_8s_linear_infinite] text-white">
          {Array.from(text).map((char, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                inset: "6px",
                transform: `rotate(${14 * i}deg)`,
                transformOrigin: "50% 50%",
                userSelect: "none",
                display: "inline-block",
                fontSize: "11px",
                fontWeight: "600",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

        <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-white group-hover:scale-110">
          <svg
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hover-arrow-out absolute size-4 text-purple-600 transition-transform duration-300 ease-in-out"
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hover-arrow-in absolute size-4 text-purple-600 transition-transform duration-300 ease-in-out"
            style={{ transform: "translate(-150%, 150%)" }}
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            />
          </svg>
        </div>

        <style>{`
          @keyframes text-rotation {
            to {
              rotate: 360deg;
            }
          }
          .animate-\\[text-rotation_8s_linear_infinite\\] {
            animation: text-rotation 8s linear infinite;
          }
          button:hover .hover-arrow-out {
            transform: translate(150%, -150%);
          }
          button:hover .hover-arrow-in {
            transform: translate(0);
            transition-delay: 0.1s;
          }
        `}</style>
      </Button>
    </div>
  );
};
