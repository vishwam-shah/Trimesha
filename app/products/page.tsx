"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Header } from "@/components/layout/header";
import { Spotlight } from "@/components/ui/spotlight";
import type { ProductSlide } from "@/types/product";

function ProductDetailsPanel({ id, slide }: { id: string; slide: ProductSlide }) {
  return (
    <div
      id={id}
      className="details pointer-events-none absolute left-2 right-2 z-[40] sm:left-[52px] sm:right-auto lg:max-w-[min(520px,100%)]"
      style={{
        top: "max(4.5rem, calc(var(--hh) + 16px))",
        maxWidth: "min(520px, calc(100vw - 16px))",
        opacity: 0,
        visibility: "hidden",
      }}
    >
      <div
        className="max-sm:rounded-2xl max-sm:border max-sm:border-border/50 max-sm:bg-background/70 max-sm:p-4 max-sm:pb-6 max-sm:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] max-sm:backdrop-blur-xl dark:max-sm:border-border/30 dark:max-sm:bg-background/60 sm:p-0"
      >
          <div className="place-box relative mb-0 min-h-0 h-10 overflow-hidden sm:mb-1 sm:h-11">
            <div className="text relative pl-8 pt-3 text-[15px] font-medium tracking-[0.06em] text-muted-foreground sm:pl-9 sm:pt-4">
              <span className="absolute left-0 top-[15px] block h-[2.5px] w-5 rounded-full bg-[#ecad29] sm:top-[17px] sm:h-[3px] sm:w-6" />
              {slide.place}
            </div>
          </div>
          <div
            className="title-box-1 mt-0 min-h-[44px] overflow-hidden sm:min-h-[96px]"
            style={{ marginTop: 2 }}
          >
            <div
              className="title-1 text-balance font-bold break-words leading-[0.92] tracking-tight text-foreground max-sm:line-clamp-2"
              style={{
                fontFamily: "'Oswald',sans-serif",
                fontSize: "clamp(22px, 6.5vw, 60px)",
              }}
            >
              {slide.title}
            </div>
          </div>

          <div
            className="title-box-2 mt-0.5 min-h-[44px] overflow-hidden sm:mt-0 sm:min-h-[96px]"
            style={{ marginTop: 4 }}
          >
            <div
              className="title-2 text-balance font-bold break-words leading-[0.92] tracking-tight text-foreground max-sm:line-clamp-2"
              style={{
                fontFamily: "'Oswald',sans-serif",
                fontSize: "clamp(22px, 6.5vw, 60px)",
              }}
            >
              {slide.title2}
            </div>
          </div>
          <div
            className="desc line-clamp-3 overflow-hidden leading-[1.55] text-muted-foreground sm:line-clamp-none sm:overflow-visible sm:leading-relaxed"
            style={{
              marginTop: 10,
              fontSize: "clamp(12px, 3.4vw, 13.5px)",
              maxWidth: "min(420px, 92vw)",
            }}
          >
            {slide.description}
          </div>
          <div
            className="features-row flex flex-wrap gap-1 sm:gap-2"
            style={{ marginTop: 10, maxWidth: "min(440px, 94vw)" }}
          >
            {slide.features.map((f) => (
              <span
                key={f}
                className="text-[9px] font-semibold uppercase tracking-wider sm:text-[9.5px]"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "rgba(236,173,41,0.12)",
                  border: "1px solid rgba(236,173,41,0.38)",
                  color: "#ecad29",
                  padding: "4px 9px",
                  borderRadius: 99,
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <div className="cta pointer-events-auto mt-3 flex max-w-full flex-col gap-2 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <span
              className="category-pill w-fit border border-border bg-muted/50 text-foreground dark:bg-muted/35"
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "5px 12px",
                borderRadius: 99,
                whiteSpace: "nowrap",
              }}
            >
              {slide.category}
            </span>

            <a
              href={slide.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 min-h-[44px] w-full min-w-0 items-center justify-center gap-2 rounded-full bg-[#ecad29] px-5 text-[#1a1a1a] shadow-md shadow-[#ecad29]/25 transition-[transform,background,color] active:scale-[0.98] sm:h-[38px] sm:min-h-0 sm:w-auto sm:min-w-0 sm:justify-start sm:px-[22px] sm:shadow-none"
              style={{
                borderRadius: 99,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                const el = e.currentTarget;
                el.style.background = "#fff";
                el.style.color = "#1a1a1a";
              }}
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                const el = e.currentTarget;
                el.style.background = "#ecad29";
                el.style.color = "#1a1a1a";
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width={13} height={13}>
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
              View Product
            </a>
          </div>
        </div>
    </div>
  );
}

const RESIZE_DEBOUNCE_MS = 120;

export default function ProductsPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [slides, setSlides] = useState<ProductSlide[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/v1/products");
        if (!r.ok) throw new Error("bad response");
        const data = (await r.json()) as ProductSlide[];
        if (!cancelled) setSlides(data);
      } catch {
        if (!cancelled) {
          setLoadError("Could not load products.");
          setSlides([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    for (const id of ["details-even", "details-odd"] as const) {
      const el = document.getElementById(id);
      if (!el) continue;
      el.style.setProperty("opacity", "0");
      el.style.setProperty("visibility", "hidden");
    }
    const pag = document.getElementById("pagination");
    if (pag) {
      pag.style.setProperty("opacity", "0");
      pag.style.setProperty("visibility", "hidden");
    }
  }, []);

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    let isCancelled = false;
    let introDelayTween: gsap.core.Tween | undefined;
    const data = slides;
    let CARD_W = 320;
    let CARD_H = 440;
    let CARD_LABEL_H = 110;
    let GAP = 40;
    let NUM_SZ = 50;
    let PROGRESS_W = 500;
    const EASE   = "sine.inOut";
    const INTRO_EASE = "power3.out";
    const INTRO_DUR = 0.88;
    const INTRO_DELAY = 0.38;
    const INTRO_STAGGER = 0.06;
    let CARD_ENTRANCE_X = 56;
    let LABEL_TITLE_FS = 16;
    let LABEL_PLACE_FS = 10;

    let CARDS_BOTTOM_MARGIN = 100;
    let PAGINATION_BELOW_CARDS = 24;

    function getStageWidth(): number {
      const demo = document.getElementById("demo");
      const w = demo?.clientWidth ?? 0;
      return w > 0 ? w : Math.max(0, window.innerWidth);
    }

    function getViewportHeight(): number {
      const vv = window.visualViewport;
      return Math.max(window.innerHeight, vv?.height ?? window.innerHeight);
    }

    function padXForWidth(W: number) {
      return W < 400 ? 8 : W < 480 ? 10 : W < 640 ? 12 : W < 1024 ? 16 : W < 1280 ? 24 : 40;
    }

    function refreshMetrics() {
      const W = getStageWidth();
      const bw = typeof window !== "undefined" ? window.innerWidth : W;
      const n = Math.max(1, order.length);
      const padX = padXForWidth(W);
      const availableW = Math.max(0, W - padX * 2);

      if (bw < 1024) {
        GAP = bw < 400 ? 4 : bw < 480 ? 6 : bw < 640 ? 8 : 12;
      } else {
        GAP = bw < 1280 ? 16 : bw < 1536 ? 22 : 28;
      }

      let raw =
        n <= 1
          ? Math.floor(availableW)
          : Math.floor((availableW - (n - 1) * GAP) / n);

      if (bw < 1024) {
        const cap = bw < 480 ? 232 : bw >= 800 ? 320 : 296;
        CARD_W = Math.min(raw, cap);
        CARD_W = Math.max(64, CARD_W);
      } else {
        const maxCard = bw >= 1920 ? 560 : bw >= 1536 ? 540 : bw >= 1280 ? 520 : 480;
        const minDesktopCard = bw >= 1920 ? 340 : bw >= 1536 ? 320 : bw >= 1280 ? 300 : 280;
        CARD_W = Math.min(maxCard, Math.max(minDesktopCard, raw));
        if (raw > 0) CARD_W = Math.min(CARD_W, raw);
      }

      let stripW = n * CARD_W + (n - 1) * GAP;
      while (stripW > availableW && CARD_W > 56) {
        CARD_W -= 2;
        stripW = n * CARD_W + (n - 1) * GAP;
      }
      while (stripW > availableW && GAP > 1 && n > 1) {
        GAP -= 1;
        stripW = n * CARD_W + (n - 1) * GAP;
      }
      if (n === 1 && CARD_W > availableW) CARD_W = availableW;

      CARD_H = Math.round(CARD_W * (bw < 1024 ? 1.35 : 1.375));
      CARD_LABEL_H = Math.min(110, Math.max(56, Math.round(CARD_H * 0.22)));
      CARD_ENTRANCE_X = bw < 480 ? 10 : bw < 1024 ? 18 : 40;
      NUM_SZ = Math.min(50, Math.max(22, Math.round(CARD_W * 0.17)));
      PROGRESS_W = Math.min(520, Math.max(100, Math.min(500, availableW - (bw < 640 ? 148 : bw < 1024 ? 176 : 220))));

      if (bw < 1024) {
        CARDS_BOTTOM_MARGIN = bw < 480 ? 52 : 64;
        PAGINATION_BELOW_CARDS = bw < 480 ? 12 : 16;
      } else {
        CARDS_BOTTOM_MARGIN = bw < 1280 ? 88 : 100;
        PAGINATION_BELOW_CARDS = bw < 1280 ? 48 : 56;
      }

      LABEL_TITLE_FS = Math.min(16, Math.max(11, Math.round(CARD_W * 0.052)));
      LABEL_PLACE_FS = Math.min(10, Math.max(8, Math.round(CARD_W * 0.036)));
    }

    let offsetTop  = 0;
    let offsetLeft = 0;
    let order      = data.map((_, i) => i);
    let detailsEven = true;

    const set = (target: gsap.TweenTarget, vars: gsap.TweenVars) => {
      if (isCancelled) return;
      if (gsap.utils.toArray(target).length === 0) return;
      gsap.set(target, vars);
    };

    const tweenTo = (target: gsap.TweenTarget, vars: gsap.TweenVars) => {
      if (isCancelled) return;
      if (gsap.utils.toArray(target).length === 0) return;
      gsap.to(target, vars);
    };

    const getCard    = (i: number) => `#card${i}`;
    const getContent = (i: number) => `#card-content-${i}`;
    const getNum     = (i: number) => `#slide-item-${i}`;

    const makeCards = () =>
      data.map((item, idx) => `
        <div id="card${idx}" style="
          position:absolute;left:0;top:0;
          background:center/cover no-repeat url('${item.image}');
          box-shadow:6px 6px 10px 2px rgba(0,0,0,0.45);
          border-radius:10px;overflow:hidden;will-change:transform;">
          <div style="position:absolute;inset:0;
            background:linear-gradient(160deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.5) 55%,rgba(0,0,0,0.82) 100%);pointer-events:none;">
          </div>
        </div>`).join("");

    const makeContents = () =>
      data.map((item, idx) => `
        <div id="card-content-${idx}" style="
          position:absolute;left:0;top:0;
          color:#fff;box-sizing:border-box;
          padding:8px 10px 8px;
          pointer-events:none;overflow:hidden;
          display:flex;flex-direction:column;justify-content:flex-end;gap:3px;
          height:${CARD_LABEL_H}px;">
          <div style="width:22px;height:4px;border-radius:99px;background:#ecad29;flex-shrink:0;"></div>
          <div style="font-size:${LABEL_PLACE_FS}px;font-weight:600;text-transform:uppercase;
            letter-spacing:0.12em;opacity:0.9;line-height:1.25;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;">
            ${item.place}
          </div>
          <div style="font-weight:700;font-size:${LABEL_TITLE_FS}px;font-family:'Oswald',sans-serif;
            line-height:1.2;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;">
            ${item.title}
          </div>
          <div style="font-weight:700;font-size:${LABEL_TITLE_FS}px;font-family:'Oswald',sans-serif;
            line-height:1.2;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;">
            ${item.title2}
          </div>
        </div>`).join("");

    const numFs = () => Math.min(26, Math.max(14, Math.round(NUM_SZ * 0.52)));
    const makeNumbers = () =>
      data.map((_, idx) => `
        <div id="slide-item-${idx}" style="
          width:${NUM_SZ}px;height:${NUM_SZ}px;
          position:absolute;top:0;left:0;
          display:grid;place-items:center;
          font-size:${numFs()}px;font-weight:700;
          font-family:'Oswald',sans-serif;color:var(--foreground);">
          ${idx + 1}
        </div>`).join("");

    const demoEl    = document.getElementById("demo");
    const slideNums = document.getElementById("slide-numbers");
    if (!demoEl || !slideNums) return;

    function animate(target: gsap.TweenTarget, duration: number, props: gsap.TweenVars) {
      return new Promise<void>((res) => {
        if (isCancelled || gsap.utils.toArray(target).length === 0) { res(); return; }
        tweenTo(target, { ...props, duration, onComplete: () => res() });
      });
    }

    function updateDetailsColumnHeight() {
      const col = document.getElementById("details-column");
      if (!col) return;
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        col.style.removeProperty("min-height");
        return;
      }
      const id = detailsEven ? "details-even" : "details-odd";
      const panel = document.getElementById(id);
      if (!panel) return;
      const bottomPad = 12;
      const h = Math.ceil(panel.offsetTop + panel.offsetHeight + bottomPad);
      col.style.minHeight = `${Math.max(h, 0)}px`;
    }

    function updateStageMinHeight() {
      const section = document.getElementById("products-stage");
      if (!section) return;
      const W = getStageWidth();
      const bw = typeof window !== "undefined" ? window.innerWidth : W;
      const pagBand = bw < 640 ? 118 : bw < 1024 ? 96 : 88;
      const bottom = offsetTop + CARD_H + PAGINATION_BELOW_CARDS + pagBand + 24;
      const H = getViewportHeight();
      section.style.minHeight = `${Math.max(H, bottom)}px`;
    }

    function isSplitDesktopLayout() {
      return typeof window !== "undefined" && window.innerWidth >= 1024;
    }

    function applySplitDesktopLayoutFromDOM() {
      const demo = document.getElementById("demo");
      const id = detailsEven ? "details-even" : "details-odd";
      const panel = document.getElementById(id);
      if (!demo || !panel) {
        offsetTop = 120;
        demo?.style.removeProperty("min-width");
        return;
      }

      const titleEl1 = panel.querySelector<HTMLElement>(".title-box-1");
      const titleEl2 = panel.querySelector<HTMLElement>(".title-box-2");
      const ctaEl = panel.querySelector<HTMLElement>(".cta");
      if (!titleEl1 || !ctaEl) {
        offsetTop = 120;
        demo.style.removeProperty("min-width");
        return;
      }

      const demoRect = demo.getBoundingClientRect();
      const r1 = titleEl1.getBoundingClientRect();
      const r2 = titleEl2?.getBoundingClientRect();
      const ctaRect = ctaEl.getBoundingClientRect();

      const titleTop = Math.min(r1.top, r2?.top ?? r1.top);
      const spanH = Math.round(ctaRect.bottom - titleTop);
      if (spanH < 80) {
        offsetTop = 120;
        demo.style.removeProperty("min-width");
        return;
      }

      const lowerNudgePx = -10;
      offsetTop = Math.max(12, Math.round(titleTop - demoRect.top + lowerNudgePx));

      const aspect = 1.28;
      let nextH = Math.max(300, Math.min(spanH, 1200));
      let nextW = Math.round(nextH / aspect);

      const n = Math.max(1, order.length);
      const W = getStageWidth();
      const padX = padXForWidth(W);
      const availableW = Math.max(0, W - padX * 2);

      let gap = GAP;
      let stripW = n * nextW + Math.max(0, n - 1) * gap;
      while (stripW > availableW && gap > 8 && n > 1) {
        gap -= 1;
        stripW = n * nextW + (n - 1) * gap;
      }
      GAP = gap;
      CARD_W = nextW;
      CARD_H = nextH;

      const stripWFinal = n * CARD_W + (n - 1) * GAP;
      const contentMinW = Math.ceil(2 * padX + stripWFinal);
      const railEl = document.getElementById("carousel-rail");
      const railW = railEl?.clientWidth ?? availableW;
      if (contentMinW > railW) {
        demo.style.minWidth = `${contentMinW}px`;
      } else {
        demo.style.removeProperty("min-width");
      }

      CARD_LABEL_H = Math.min(110, Math.max(56, Math.round(CARD_H * 0.22)));
      NUM_SZ = Math.min(50, Math.max(22, Math.round(CARD_W * 0.17)));
      PROGRESS_W = Math.min(520, Math.max(100, Math.min(500, availableW - 220)));
      LABEL_TITLE_FS = Math.min(16, Math.max(11, Math.round(CARD_W * 0.052)));
      LABEL_PLACE_FS = Math.min(10, Math.max(8, Math.round(CARD_W * 0.036)));
      CARD_ENTRANCE_X = 40;
    }

    function layoutOffsets() {
      refreshMetrics();
      const W = getStageWidth();
      const stripW = order.length * CARD_W + Math.max(0, order.length - 1) * GAP;
      const padX = padXForWidth(W);
      const split = isSplitDesktopLayout();

      if (split) {
        applySplitDesktopLayoutFromDOM();
        offsetLeft = padX;
      } else {
        const centered = Math.max(padX, (W - stripW) / 2);
        const maxLeft = W - stripW - padX;
        if (W >= 768) {
          const minAfterCopy = Math.min(580, Math.max(280, W * 0.46));
          const rightAligned = Math.max(padX, maxLeft);
          offsetLeft =
            rightAligned >= minAfterCopy
              ? rightAligned
              : Math.max(padX, Math.min(maxLeft, Math.max(centered, minAfterCopy)));
        } else if (W >= 640) {
          const minAfterCopy = Math.min(560, Math.max(260, W * 0.45));
          offsetLeft = Math.max(padX, Math.min(maxLeft, Math.max(centered, minAfterCopy)));
        } else {
          offsetLeft = Math.max(padX, Math.min(centered, maxLeft));
        }
        offsetTop = 18;
        document.getElementById("demo")?.style.removeProperty("min-width");
      }

      set("#pagination", {
        top: offsetTop + CARD_H + PAGINATION_BELOW_CARDS,
        left: offsetLeft,
      });

      updateStageMinHeight();
    }

    function syncLayoutAfterResize() {
      if (isCancelled) return;
      refreshMetrics();
      layoutOffsets();
      order.forEach((cardIdx, idx) => {
        const x = offsetLeft + idx * (CARD_W + GAP);
        set(getCard(cardIdx), { x, y: offsetTop, width: CARD_W, height: CARD_H, zIndex: 30, borderRadius: 10, scale: 1, opacity: 1 });
        set(getContent(cardIdx), { x, y: offsetTop + CARD_H - CARD_LABEL_H, width: CARD_W, height: CARD_LABEL_H, opacity: 1, zIndex: 50 - idx });
        set(getNum(cardIdx), { x: idx * NUM_SZ });
      });
      set(".progress-sub-foreground", { width: PROGRESS_W * (1 / data.length) * (order[0] + 1) });
      const detActive = detailsEven ? "#details-even" : "#details-odd";
      set(detActive, { x: window.innerWidth < 1024 ? 0 : -28 });
      data.forEach((_, idx) => {
        const el = document.getElementById(`card-content-${idx}`);
        if (el) {
          el.style.height = `${CARD_LABEL_H}px`;
          const divs = el.querySelectorAll<HTMLElement>("div");
          if (divs[1]) divs[1].style.fontSize = `${LABEL_PLACE_FS}px`;
          if (divs[2]) divs[2].style.fontSize = `${LABEL_TITLE_FS}px`;
          if (divs[3]) divs[3].style.fontSize = `${LABEL_TITLE_FS}px`;
        }
        const sn = document.getElementById(`slide-item-${idx}`);
        if (sn) {
          sn.style.width = `${NUM_SZ}px`;
          sn.style.height = `${NUM_SZ}px`;
          sn.style.fontSize = `${Math.min(26, Math.max(14, Math.round(NUM_SZ * 0.52)))}px`;
        }
      });
      requestAnimationFrame(() => { updateDetailsColumnHeight(); });
    }

    function hideInactivePanel(inactiveSel: string) {
      set(inactiveSel, { autoAlpha: 0, zIndex: 12 });
      set(`${inactiveSel} .text`, { y: 100 });
      set(`${inactiveSel} .title-1`, { y: 100 });
      set(`${inactiveSel} .title-2`, { y: 100 });
      set(`${inactiveSel} .desc`, { y: 50 });
      set(`${inactiveSel} .features-row`, { y: 40, opacity: 0 });
      set(`${inactiveSel} .cta`, { y: 60 });
    }

    function prepDetailLines(panelSel: string) {
      set(`${panelSel} .text`, { y: 20, opacity: 0 });
      set(`${panelSel} .title-1`, { y: 28, opacity: 0 });
      set(`${panelSel} .title-2`, { y: 28, opacity: 0 });
      set(`${panelSel} .desc`, { y: 18, opacity: 0 });
      set(`${panelSel} .features-row`, { y: 14, opacity: 0 });
      set(`${panelSel} .cta`, { y: 12, opacity: 0 });
    }

    function revealDetailLines(panelSel: string, baseDelay: number, ease: string, onLastComplete?: () => void) {
      const D = 0.52;
      const S = 0.055;
      tweenTo(`${panelSel} .text`, { y: 0, opacity: 1, duration: D, delay: baseDelay, ease });
      tweenTo(`${panelSel} .title-1`, { y: 0, opacity: 1, duration: D + 0.04, delay: baseDelay + S * 1, ease });
      tweenTo(`${panelSel} .title-2`, { y: 0, opacity: 1, duration: D + 0.04, delay: baseDelay + S * 2, ease });
      tweenTo(`${panelSel} .desc`, { y: 0, opacity: 1, duration: D, delay: baseDelay + S * 3, ease });
      tweenTo(`${panelSel} .features-row`, { y: 0, opacity: 1, duration: 0.42, delay: baseDelay + S * 4, ease });
      tweenTo(`${panelSel} .cta`, { y: 0, opacity: 1, duration: 0.42, delay: baseDelay + S * 5, ease, onComplete: onLastComplete });
    }

    function init() {
      if (isCancelled) return;
      layoutOffsets();
      set("#demo", { autoAlpha: 1 });
      const detActive   = detailsEven ? "#details-even" : "#details-odd";
      const detInactive = detailsEven ? "#details-odd"  : "#details-even";
      const narrowStage = window.innerWidth < 1024;

      set("#pagination", { y: 36, autoAlpha: 0, zIndex: 60 });
      set(".progress-sub-foreground", { width: PROGRESS_W * (1 / data.length) * (order[0] + 1) });

      order.forEach((i, idx) => {
        set(getCard(i), { x: offsetLeft + CARD_ENTRANCE_X + idx * (CARD_W + GAP), y: offsetTop + 20, width: CARD_W, height: CARD_H, zIndex: 30, borderRadius: 10, scale: 1, opacity: 0 });
        set(getContent(i), { x: offsetLeft + CARD_ENTRANCE_X + idx * (CARD_W + GAP), zIndex: 50 - idx, y: offsetTop + CARD_H - CARD_LABEL_H + 14, width: CARD_W, height: CARD_LABEL_H, opacity: 0 });
        set(getNum(i), { x: idx * NUM_SZ });
      });

      hideInactivePanel(detInactive);
      set(detActive, { autoAlpha: 1, zIndex: 40, x: narrowStage ? 0 : -28 });
      prepDetailLines(detActive);
      requestAnimationFrame(() => { updateDetailsColumnHeight(); });

      const textRevealDone = INTRO_DELAY + 0.22 + 0.055 * 5 + 0.52 + 0.35;
      const introDone = Math.max(INTRO_DELAY + INTRO_STAGGER * (order.length - 1) + INTRO_DUR, textRevealDone) + 0.45;
      introDelayTween?.kill();
      introDelayTween = gsap.delayedCall(introDone, () => {
        introDelayTween = undefined;
        if (!isCancelled) loop();
      });

      order.forEach((i, idx) => {
        const stagger = INTRO_DELAY + INTRO_STAGGER * idx;
        tweenTo(getCard(i), { x: offsetLeft + idx * (CARD_W + GAP), y: offsetTop, opacity: 1, zIndex: 30, duration: INTRO_DUR, delay: stagger, ease: INTRO_EASE });
        tweenTo(getContent(i), { x: offsetLeft + idx * (CARD_W + GAP), y: offsetTop + CARD_H - CARD_LABEL_H, width: CARD_W, height: CARD_LABEL_H, zIndex: 50 - idx, opacity: 1, duration: INTRO_DUR, delay: stagger, ease: INTRO_EASE });
      });

      tweenTo("#pagination", { y: 0, autoAlpha: 1, duration: INTRO_DUR * 0.92, delay: INTRO_DELAY + 0.16, ease: INTRO_EASE });
      tweenTo(detActive, { x: 0, duration: INTRO_DUR, delay: INTRO_DELAY + 0.22, ease: INTRO_EASE });
      revealDetailLines(detActive, INTRO_DELAY + 0.28, INTRO_EASE, () => { updateDetailsColumnHeight(); });
    }

    function applySlideContent() {
      const detActive = detailsEven ? "#details-even" : "#details-odd";
      const d = data[order[0]];
      const q = <T extends Element>(sel: string) => document.querySelector<T>(`${detActive} ${sel}`);

      const placeEl = q<HTMLElement>(".place-box .text");
      const t1El = q<HTMLElement>(".title-1");
      const t2El = q<HTMLElement>(".title-2");
      const descEl = q<HTMLElement>(".desc");
      const featEl = q<HTMLElement>(".features-row");
      const linkEl = q<HTMLAnchorElement>(".cta a");
      const catEl = q<HTMLElement>(".category-pill");

      if (placeEl) placeEl.textContent = d.place;
      if (t1El) t1El.textContent = d.title;
      if (t2El) t2El.textContent = d.title2;
      if (descEl) descEl.textContent = d.description;
      if (linkEl) linkEl.href = d.url;
      if (catEl) catEl.textContent = d.category;
      if (featEl)
        featEl.innerHTML = d.features.map((f) =>
          `<span style="display:inline-flex;align-items:center;
            background:rgba(236,173,41,0.15);border:1px solid rgba(236,173,41,0.45);
            color:#ecad29;font-size:9.5px;font-weight:600;text-transform:uppercase;
            letter-spacing:0.1em;padding:4px 10px;border-radius:99px;white-space:nowrap;">
            ${f}
          </span>`
        ).join("");
    }

    function animateRowAfterOrderChange(resolve: () => void) {
      const detActive   = detailsEven ? "#details-even" : "#details-odd";
      const detInactive = detailsEven ? "#details-odd"  : "#details-even";
      const leadId = order[0];

      hideInactivePanel(detInactive);
      applySlideContent();
      layoutOffsets();

      set(detActive, { zIndex: 40, autoAlpha: 1, x: 0 });
      prepDetailLines(detActive);
      revealDetailLines(detActive, 0.06, INTRO_EASE, () => {
        updateDetailsColumnHeight();
        resolve();
      });

      const [active, ...rest] = order;
      const prv = rest[rest.length - 1];

      set(getCard(prv), { zIndex: 10 });
      set(getCard(active), { zIndex: 25 });
      tweenTo(getCard(prv), { scale: 1.08, ease: EASE });
      tweenTo(getNum(active), { x: 0, ease: EASE });
      tweenTo(getNum(prv), { x: -NUM_SZ, ease: EASE });
      tweenTo(".progress-sub-foreground", { width: PROGRESS_W * (1 / data.length) * (leadId + 1), ease: EASE });

      tweenTo(getCard(active), {
        x: offsetLeft, y: offsetTop, width: CARD_W, height: CARD_H, borderRadius: 10, ease: EASE,
        onComplete: () => {
          const xNew = offsetLeft + rest.length * (CARD_W + GAP);
          set(getCard(prv), { x: xNew, y: offsetTop, width: CARD_W, height: CARD_H, zIndex: 30, borderRadius: 10, scale: 1 });
          set(getContent(prv), { x: xNew, y: offsetTop + CARD_H - CARD_LABEL_H, width: CARD_W, height: CARD_LABEL_H, opacity: 1, zIndex: 30 });
          set(getNum(prv), { x: rest.length * NUM_SZ });
        },
      });

      tweenTo(getContent(active), { x: offsetLeft, y: offsetTop + CARD_H - CARD_LABEL_H, width: CARD_W, height: CARD_LABEL_H, opacity: 1, zIndex: 50, duration: 0.35, ease: EASE });

      rest.forEach((i, idx) => {
        if (i === prv) return;
        const slotIdx = idx + 1;
        const xNew = offsetLeft + slotIdx * (CARD_W + GAP);
        set(getCard(i), { zIndex: 30 });
        tweenTo(getCard(i), { x: xNew, y: offsetTop, width: CARD_W, height: CARD_H, ease: EASE, delay: 0.1 * slotIdx });
        tweenTo(getContent(i), { x: xNew, y: offsetTop + CARD_H - CARD_LABEL_H, width: CARD_W, height: CARD_LABEL_H, opacity: 1, zIndex: 50 - slotIdx, ease: EASE, delay: 0.1 * slotIdx });
        tweenTo(getNum(i), { x: slotIdx * NUM_SZ, ease: EASE });
      });
    }

    function step() {
      return new Promise<void>((resolve) => {
        order.push(order.shift() as number);
        detailsEven = !detailsEven;
        animateRowAfterOrderChange(resolve);
      });
    }

    function stepBackward() {
      return new Promise<void>((resolve) => {
        order.unshift(order.pop() as number);
        detailsEven = !detailsEven;
        animateRowAfterOrderChange(resolve);
      });
    }

    async function loop() {
      if (isCancelled) return;
      await animate(".indicator", 5, { x: 0 });
      if (isCancelled) return;
      await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
      if (isCancelled) return;
      set(".indicator", { x: -window.innerWidth });
      if (isCancelled) return;
      await step();
      if (!isCancelled) loop();
    }

    const handleNext = () => { step(); };
    const handlePrev = () => { stepBackward(); };

    const arrowR = document.querySelector(".arrow-right");
    const arrowL = document.querySelector(".arrow-left");
    arrowR?.addEventListener("click", handleNext);
    arrowL?.addEventListener("click", handlePrev);

    const loadImg = (src: string) =>
      new Promise<void>((res) => {
        const img = new Image();
        img.onload = () => res();
        img.onerror = () => res();
        img.src = src;
      });

    refreshMetrics();
    demoEl.innerHTML = makeCards() + makeContents();
    slideNums.innerHTML = makeNumbers();
    layoutOffsets();
    set("#demo", { autoAlpha: 0 });
    set("#pagination", { autoAlpha: 0, y: 36, zIndex: 60 });
    order.forEach((i, idx) => {
      set(getCard(i), { x: offsetLeft + CARD_ENTRANCE_X + idx * (CARD_W + GAP), y: offsetTop + 20, width: CARD_W, height: CARD_H, zIndex: 30, borderRadius: 10, scale: 1, opacity: 0 });
      set(getContent(i), { x: offsetLeft + CARD_ENTRANCE_X + idx * (CARD_W + GAP), zIndex: 50 - idx, y: offsetTop + CARD_H - CARD_LABEL_H + 14, width: CARD_W, height: CARD_LABEL_H, opacity: 0 });
      set(getNum(i), { x: idx * NUM_SZ });
    });

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleLayout = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { syncLayoutAfterResize(); }, RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener("resize", scheduleLayout);
    window.addEventListener("orientationchange", scheduleLayout);
    window.visualViewport?.addEventListener("resize", scheduleLayout);

    const stageEl = document.getElementById("products-stage");
    const ro = typeof ResizeObserver !== "undefined" && stageEl ? new ResizeObserver(() => scheduleLayout()) : null;
    if (ro && stageEl) ro.observe(stageEl);

    Promise.all(data.map(({ image }) => loadImg(image))).then(() => {
      if (isCancelled) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!isCancelled) init();
        });
      });
    });

    return () => {
      isCancelled = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleLayout);
      window.removeEventListener("orientationchange", scheduleLayout);
      window.visualViewport?.removeEventListener("resize", scheduleLayout);
      ro?.disconnect();
      introDelayTween?.kill();
      introDelayTween = undefined;
      arrowR?.removeEventListener("click", handleNext);
      arrowL?.removeEventListener("click", handlePrev);
      gsap.killTweensOf("*");
      document.getElementById("products-stage")?.style.removeProperty("min-height");
      document.getElementById("details-column")?.style.removeProperty("min-height");
      document.getElementById("demo")?.style.removeProperty("min-width");
    };
  }, [slides]);

  if (slides === null) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <p className="text-muted-foreground">Loading products…</p>
        </main>
      </>
    );
  }

  if (slides.length === 0) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center text-foreground">
          <p className="text-muted-foreground">{loadError ?? "No products to show."}</p>
        </main>
      </>
    );
  }

  const slideA = slides[0];
  const slideB = slides[1] ?? slides[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap');

        /* ── Details panels ──────────────────────────────────────────────── */
        #details-even,
        #details-odd {
          opacity: 0;
          visibility: hidden;
        }

        #pagination {
          opacity: 0;
          visibility: hidden;
        }

        :root { --hh: 72px; }
        @media (max-width: 639px) {
          :root { --hh: 56px; }
        }

        .arrow-left, .arrow-right { cursor: pointer; }
        .arrow-left:hover, .arrow-right:hover {
          border-color: color-mix(in oklab, var(--foreground) 35%, transparent) !important;
        }

        .details { pointer-events: none; }
        .details .cta { pointer-events: auto; }

        #carousel-rail {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        #carousel-rail::-webkit-scrollbar { display: none; }

        @media (min-width: 1024px) {
          #details-even,
          #details-odd {
            top: max(6.75rem, calc(var(--hh) + 44px)) !important;
          }
        }
      `}</style>

      <Header />

      <main
        ref={mainRef}
        className="relative min-h-[100dvh] overflow-x-hidden overflow-y-auto bg-background pb-36 text-foreground sm:min-h-screen sm:pb-20"
      >
        <div className="pointer-events-none absolute inset-0 z-0 min-h-screen overflow-hidden max-sm:opacity-90">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgb(139, 92, 246)" />
          <Spotlight className="top-10 left-full md:left-80 md:top-20" fill="rgb(59, 130, 246)" />
          <Spotlight className="-top-20 right-full md:right-60 md:top-10" fill="rgb(168, 85, 247)" />
          <div className="absolute inset-0 opacity-20 dark:opacity-[0.08] sm:opacity-30 sm:dark:opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>
          <motion.div
            className="absolute top-20 left-10 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl dark:bg-purple-500/8 sm:h-72 sm:w-72 sm:bg-purple-500/20 sm:dark:bg-purple-500/10"
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-10 bottom-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-500/8 sm:h-96 sm:w-96 sm:bg-blue-500/20 sm:dark:bg-blue-500/10"
            animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div
          className="indicator fixed left-0 right-0 top-0 z-[60]"
          style={{ height: 5, background: "#ecad29", transform: "translateX(-100vw)" }}
        />

        <section
          id="products-stage"
          className="relative z-[1] grid min-h-[100dvh] grid-cols-1 gap-4 pb-36 pt-4 sm:min-h-screen sm:pb-0 sm:pt-6 lg:grid-cols-[minmax(280px,min(560px,42vw))_minmax(0,1fr)] lg:items-stretch lg:gap-10 lg:px-8 lg:pt-10"
        >
          <div
            id="details-column"
            className="relative z-40 min-h-0 w-full lg:min-h-[min(100vh,900px)] lg:shrink-0"
          >
            <ProductDetailsPanel id="details-even" slide={slideA} />
            <ProductDetailsPanel id="details-odd"  slide={slideB} />
          </div>

          <div
            id="carousel-rail"
            className="relative z-20 min-h-[min(50vh,440px)] w-full min-w-0 lg:min-h-[min(92vh,960px)] lg:overflow-x-auto lg:overflow-y-visible"
          >
            <div id="demo" className="absolute inset-0 z-20 min-h-full min-w-0" aria-hidden />

            <div
              id="pagination"
              className="absolute inline-flex max-w-[calc(100vw-1rem)] flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-2xl border border-border/40 bg-background/75 px-2.5 py-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md dark:border-border/25 dark:bg-background/65 sm:max-w-none sm:flex-nowrap sm:gap-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:backdrop-blur-none"
              style={{ zIndex: 60, opacity: 0, visibility: "hidden" }}
            >
              <button
                type="button"
                className="arrow-left z-[60] order-1 grid size-11 shrink-0 touch-manipulation place-items-center rounded-full border border-foreground/20 bg-background/85 text-foreground shadow-sm backdrop-blur-sm transition-[transform,colors] active:scale-95 sm:order-1 sm:size-[50px] sm:border-2 sm:border-foreground/25 sm:bg-background/70 sm:text-muted-foreground sm:shadow-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5 sm:size-6" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div
                id="slide-numbers"
                className="relative z-[60] order-2 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden sm:order-4 sm:h-[50px] sm:w-[50px]"
              />
              <button
                type="button"
                className="arrow-right z-[60] order-3 grid size-11 shrink-0 touch-manipulation place-items-center rounded-full border border-foreground/20 bg-background/85 text-foreground shadow-sm backdrop-blur-sm transition-[transform,colors] active:scale-95 sm:order-2 sm:ml-5 sm:size-[50px] sm:border-2 sm:border-foreground/25 sm:bg-background/70 sm:text-muted-foreground sm:shadow-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5 sm:size-6" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              <div className="progress-sub-container z-[60] order-4 flex h-11 w-full min-w-0 max-w-[min(100%,420px)] shrink basis-full items-center sm:order-3 sm:ml-6 sm:h-[50px] sm:w-[500px] sm:max-w-[min(500px,calc(100vw-220px))] sm:basis-auto">
                <div className="progress-sub-background h-[4px] w-full overflow-hidden rounded-full bg-foreground/18 sm:h-[3px] sm:bg-foreground/20">
                  <div className="progress-sub-foreground h-[4px] rounded-full bg-[#ecad29] sm:h-[3px]" style={{ width: 0 }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}