"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/components/ui/animated-modal";

export const BookCallButton = () => {
  const text = "BOOK A CALL • BOOK A CALL •";
  const { setOpen } = useModal();

  return (
    <div className="hidden sm:block border-2 p-1 rounded-full border-dotted border-purple-600 dark:border-purple-400 cursor-pointer">
      <Button
        onClick={() => {
          if (!document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.add("dark")
          }
          setOpen(true)
        }}
        aria-label="Book a call"
        className="relative w-25 h-25 rounded-full overflow-hidden p-0 grid place-content-center bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 cursor-pointer"
      >
        <p
          className="absolute inset-0 animate-[text-rotation_8s_linear_infinite] text-white"
        >
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

        <div className="group-hover:scale-110 relative w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-4 h-4 text-purple-600 transition-transform duration-300 ease-in-out hover-arrow-out"
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
            className="absolute w-4 h-4 text-purple-600 transition-transform duration-300 ease-in-out hover-arrow-in"
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
