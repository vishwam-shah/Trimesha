"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Header } from "@/components/layout/header";
import { PageLoader } from "@/components/common/page-loader";
import { Spotlight } from "@/components/ui/spotlight";

type ProductSlide = {
  place: string;
  title: string;
  title2: string;
  description: string;
  image: string;
  url: string;
  category: string;
  features: string[];
};

const slides: ProductSlide[] = [
  {
    place: "Product 01 · F&B / ERP",
    title: "RESTAURANT",
    title2: "ERP DASHBOARD",
    description:
      "Centralises every operational touchpoint of a food service business — from order management and table tracking to inventory, staff scheduling, and financial analytics.",
    image: "/products/product1.jpg",
    url: "https://restauranterpdashboardruchi.vercel.app",
    category: "F&B / ERP",
    features: ["Live Order Mgmt", "Table Planning", "Inventory Control", "Sales Analytics"],
  },
  {
    place: "Product 02 · Healthcare",
    title: "HOSPITAL",
    title2: "MANAGEMENT",
    description:
      "Connects every department of a hospital — from OPD registration and appointment booking to IPD, pharmacy, labs, and billing — for faster, safer patient care.",
    image: "/products/product2.jpg",
    url: "https://hms-khaki-eta.vercel.app",
    category: "Healthcare",
    features: ["Patient Registration", "Appointment Slots", "EHR Records", "Pharmacy Module"],
  },
  {
    place: "Product 03 · AI / Communication",
    title: "AI WHATSAPP",
    title2: "PLATFORM",
    description:
      "Build, deploy, and manage intelligent chatbot experiences on WhatsApp — combining AI-driven flows, broadcast campaigns, contact management, and analytics.",
    image: "/products/product3.jpg",
    url: "https://ai-whatsapp-platform.vercel.app",
    category: "AI / Comms",
    features: ["AI Chatbot Builder", "Broadcasts", "Unified Inbox", "WA Commerce"],
  },
  {
    place: "Product 04 · Design / UI-UX",
    title: "Pack &",
    title2: "Move",
    description:
      "High-fidelity UI/UX showcase for real-world mobile apps — a reference library of best-in-class patterns, interaction models, and component systems.",
    image: "/products/product4.jpg",
    url: "https://mobileapplicationdesign.vercel.app",
    category: "Utility",
    features: ["Pixel-Perfect UI", "Dark & Light Mode", "Component Library", "Prototypes"],
  },
  {
    place: "Product 05 · Automotive / CRM",
    title: "VEHICLE",
    title2: "CRM DASHBOARD",
    description:
      "Specialised trading and CRM platform for dealerships — 360° view of inventory, leads, pipelines, customer profiles, and deals with automotive-specific workflows.",
    image: "/products/product6.jpg",
    url: "https://vehiclecrmdashboard.vercel.app",
    category: "Auto / CRM",
    features: ["Vehicle Inventory", "Lead Pipeline", "Deal Tracking", "Finance Calc"],
  },
  {
    place: "Product 06 · Automation / DevTools",
    title: "PIPELINE",
    title2: "BUILDER",
    description:
      "Visual, node-based workflow automation — design, connect, and deploy complex data or logic pipelines on an infinite drag-and-drop canvas without writing code.",
    image: "/products/product7.jpg",
    url: "https://pipeline-builder-gold.vercel.app",
    category: "Automation",
    features: ["Visual Canvas", "Conditional Logic", "API Connectors", "1-click Deploy"],
  },
  {
    place: "Product 07 · Entertainment / Media",
    title: "VINYL",
    title2: "MUSIC PLAYER",
    description:
      "A premium web music player that unifies local files, YouTube, and JioSaavn into a single, beautiful listening experience with playlists and a vinyl-inspired UI.",
    image: "/products/product5.jpg",
    url: "https://music-player-ecru-six.vercel.app",
    category: "Media",
    features: ["Local Playback", "YouTube & JioSaavn", "Playlists", "Favourites"],
  },
  {
    place: "Product 08 · Computer Vision",
    title: "FACE",
    title2: "RECOGNITION",
    description:
      "A real‑time face recognition system for secure access control, attendance tracking, and visitor analytics across offices, campuses, and retail environments.",
    image: "/products/product8.jpg",
    url: "",
    category: "AI / Security",
    features: ["Live Detection", "Access Control", "Attendance Logs", "Alerts & Reports"],
  },
  {
    place: "Product 09 · Trading & Finance",
    title: "INTRADAY",
    title2: "TRADING DESK",
    description:
      "A high‑frequency intraday trading dashboard that unifies live market feeds, watchlists, P&L, and risk metrics for active traders and desks.",
    image: "/products/product9.jpg",
    url: "",
    category: "FinTech",
    features: ["Live Tickers", "Watchlists", "P&L Overview", "Risk Heatmaps"],
  },
  {
    place: "Product 10 · E‑commerce",
    title: "ONLINE",
    title2: "GROCERY STORE",
    description:
      "An end‑to‑end e‑commerce grocery experience with smart recommendations, quick re‑order lists, and delivery slot selection for everyday essentials.",
    image: "/products/product10.jpg",
    url: "",
    category: "E‑commerce",
    features: ["Smart Cart", "Repeat Orders", "Slot Booking", "Offers & Coupons"],
  },
  {
    place: "Product 11 · People Ops",
    title: "HR",
    title2: "INSIGHTS DESK",
    description:
      "A human resources analytics dashboard focusing on headcount, engagement, performance cycles, and hiring funnels in a single unified view.",
    image: "/products/product11.jpg",
    url: "",
    category: "HR / People",
    features: ["Headcount View", "Attrition Trends", "Hiring Funnel", "Engagement Metrics"],
  },
  {
    place: "Product 12 · Dairy Supply",
    title: "DAIRYFLOW",
    title2: "SUPPLY CHAIN",
    description:
      "A dairy supply management console to track milk collection, chilling centers, logistics, quality checks, and retailer deliveries in real time.",
    image: "/products/product12.jpg",
    url: "https://replicatedesignfromfile.vercel.app/",
    category: "Supply Chain",
    features: ["Milk Collection", "Route Tracking", "Quality Logs", "Outlet Orders"],
  },
  {
    place: "Product 13 · Secure Storage",
    title: "VAULT",
    title2: "",
    description: "",
    image: "/products/product13.jpg",
    url: "",
    category: "",
    features: [],
  },
];

/** Stable component type (not defined inside the page) + inline hide so no FOUC before Tailwind/GSAP */
function ProductDetailsPanel({ id, slide }: { id: string; slide: ProductSlide }) {
  return (
    <div
      id={id}
      className="details pointer-events-none absolute z-[22]"
      style={{
        left: 52,
        top: "calc(var(--hh) + 48px)",
        maxWidth: 520,
        opacity: 0,
        visibility: "hidden",
      }}
    >
      <div className="place-box relative mb-1 overflow-hidden" style={{ height: 44 }}>
        <div
          className="text relative font-medium text-muted-foreground"
          style={{ paddingTop: 16, paddingLeft: 36, fontSize: 16, letterSpacing: "0.04em" }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 19,
              width: 24,
              height: 3,
              borderRadius: 99,
              background: "#ecad29",
              display: "block",
            }}
          />
          {slide.place}
        </div>
      </div>
      <div className="title-box-1 overflow-hidden" style={{ minHeight: 96, marginTop: 0 }}>
        <div
          className="title-1 font-bold break-words leading-none text-foreground"
          style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(32px,10vw,60px)" }}
        >
          {slide.title}
        </div>
      </div>

      <div className="title-box-2 overflow-hidden" style={{ minHeight: 96, marginTop: 2 }}>
        <div
          className="title-2 font-bold break-words leading-none text-foreground"
          style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(32px,10vw,60px)" }}
        >
          {slide.title2}
        </div>
      </div>
      <div
        className="desc leading-relaxed text-muted-foreground"
        style={{
          marginTop: 14,
          fontSize: "clamp(12px,2.6vw,13.5px)",
          maxWidth: "min(420px, 92vw)",
        }}
      >
        {slide.description}
      </div>
      <div className="features-row flex flex-wrap gap-2" style={{ marginTop: 14, maxWidth: "min(440px, 94vw)" }}>
        {slide.features.map((f) => (
          <span
            key={f}
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(236,173,41,0.15)",
              border: "1px solid rgba(236,173,41,0.45)",
              color: "#ecad29",
              fontSize: 9.5,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "4px 10px",
              borderRadius: 99,
              whiteSpace: "nowrap",
            }}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="cta pointer-events-auto mt-5 flex items-center gap-3">
        <span
          className="category-pill border border-border bg-muted/40 text-foreground"
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            padding: "5px 14px",
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
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            height: 38,
            borderRadius: 99,
            padding: "0 22px",
            background: "#ecad29",
            color: "#1a1a1a",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#fff";
            el.style.color = "#1a1a1a";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
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
  );
}

export default function ProductsPage() {
  const mainRef = useRef<HTMLElement>(null);

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
    let isCancelled = false;
    const data = slides;

    // FIX: Increased card dimensions
    const CARD_W = 320;
    const CARD_H = 440;
    const CARD_LABEL_H = 110;
    const GAP    = 40;
    const NUM_SZ = 50;
    const PROGRESS_W = 500;
    const EASE   = "sine.inOut";
    const INTRO_EASE = "power3.out";
    const INTRO_DUR = 0.88;
    const INTRO_DELAY = 0.38;
    const INTRO_STAGGER = 0.06;
    /** Horizontal nudge only — careers-style entrance is mostly opacity + vertical drift */
    const CARD_ENTRANCE_X = 56;

    const CARDS_BOTTOM_MARGIN = 100;
    const PAGINATION_BELOW_CARDS = 24;

    let offsetTop  = 0;
    let offsetLeft = 0;
    let order      = data.map((_, i) => i);
    let detailsEven = true;

    const { set } = gsap;
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
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;
            letter-spacing:0.12em;opacity:0.9;line-height:1.25;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;">
            ${item.place}
          </div>
          <div style="font-weight:700;font-size:16px;font-family:'Oswald',sans-serif;
            line-height:1.2;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;">
            ${item.title}
          </div>
          <div style="font-weight:700;font-size:16px;font-family:'Oswald',sans-serif;
            line-height:1.2;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;">
            ${item.title2}
          </div>
        </div>`).join("");

    const makeNumbers = () =>
      data.map((_, idx) => `
        <div id="slide-item-${idx}" style="
          width:${NUM_SZ}px;height:${NUM_SZ}px;
          position:absolute;top:0;left:0;
          display:grid;place-items:center;
          font-size:32px;font-weight:700;
          font-family:'Oswald',sans-serif;color:var(--foreground);">
          ${idx + 1}
        </div>`).join("");

    const demoEl    = document.getElementById("demo");
    const slideNums = document.getElementById("slide-numbers");
    if (!demoEl || !slideNums) return;

    function animate(target: gsap.TweenTarget, duration: number, props: gsap.TweenVars) {
      return new Promise<void>((res) =>
        gsap.to(target, { ...props, duration, onComplete: () => res() })
      );
    }

    function layoutOffsets() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      offsetTop = H - CARD_H - CARDS_BOTTOM_MARGIN;
      offsetLeft = Math.max(80, W - 900);
      set("#pagination", {
        top: offsetTop + CARD_H + PAGINATION_BELOW_CARDS,
        left: offsetLeft,
      });
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

    /** Lines stay in their boxes while opacity + y run — avoids a pile-up at the top */
    function prepDetailLines(panelSel: string) {
      set(`${panelSel} .text`, { y: 20, opacity: 0 });
      set(`${panelSel} .title-1`, { y: 28, opacity: 0 });
      set(`${panelSel} .title-2`, { y: 28, opacity: 0 });
      set(`${panelSel} .desc`, { y: 18, opacity: 0 });
      set(`${panelSel} .features-row`, { y: 14, opacity: 0 });
      set(`${panelSel} .cta`, { y: 12, opacity: 0 });
    }

    function revealDetailLines(
      panelSel: string,
      baseDelay: number,
      ease: string,
      onLastComplete?: () => void,
    ) {
      const D = 0.52;
      const S = 0.055;
      gsap.to(`${panelSel} .text`, {
        y: 0,
        opacity: 1,
        duration: D,
        delay: baseDelay,
        ease,
      });
      gsap.to(`${panelSel} .title-1`, {
        y: 0,
        opacity: 1,
        duration: D + 0.04,
        delay: baseDelay + S * 1,
        ease,
      });
      gsap.to(`${panelSel} .title-2`, {
        y: 0,
        opacity: 1,
        duration: D + 0.04,
        delay: baseDelay + S * 2,
        ease,
      });
      gsap.to(`${panelSel} .desc`, {
        y: 0,
        opacity: 1,
        duration: D,
        delay: baseDelay + S * 3,
        ease,
      });
      gsap.to(`${panelSel} .features-row`, {
        y: 0,
        opacity: 1,
        duration: 0.42,
        delay: baseDelay + S * 4,
        ease,
      });
      gsap.to(`${panelSel} .cta`, {
        y: 0,
        opacity: 1,
        duration: 0.42,
        delay: baseDelay + S * 5,
        ease,
        onComplete: onLastComplete,
      });
    }

    function init() {
      layoutOffsets();
      set("#demo", { autoAlpha: 1 });
      const detActive   = detailsEven ? "#details-even" : "#details-odd";
      const detInactive = detailsEven ? "#details-odd"  : "#details-even";
      const W = window.innerWidth;

      set("#pagination", {
        y: 36,
        autoAlpha: 0,
        zIndex: 60,
      });

      set(".progress-sub-foreground", {
        width: PROGRESS_W * (1 / data.length) * (order[0] + 1),
      });

      order.forEach((i, idx) => {
        set(getCard(i), {
          x: offsetLeft + CARD_ENTRANCE_X + idx * (CARD_W + GAP),
          y: offsetTop + 20,
          width: CARD_W,
          height: CARD_H,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
          opacity: 0,
        });
        // FIX: content z-index decreases as idx increases (front card = highest z)
        set(getContent(i), {
          x: offsetLeft + CARD_ENTRANCE_X + idx * (CARD_W + GAP),
          zIndex: 50 - idx,
          y: offsetTop + CARD_H - CARD_LABEL_H + 14,
          width: CARD_W,
          height: CARD_LABEL_H,
          opacity: 0,
        });
        set(getNum(i), { x: idx * NUM_SZ });
      });

      hideInactivePanel(detInactive);

      set(detActive, { autoAlpha: 1, zIndex: 22, x: -28 });
      prepDetailLines(detActive);

      set(".indicator", { x: -W });

      const textRevealDone =
        INTRO_DELAY + 0.22 + 0.055 * 5 + 0.52 + 0.35;
      const introDone = Math.max(
        INTRO_DELAY + INTRO_STAGGER * (order.length - 1) + INTRO_DUR,
        textRevealDone,
      ) + 0.45;
      gsap.delayedCall(introDone, () => {
        if (!isCancelled) loop();
      });

      order.forEach((i, idx) => {
        const stagger = INTRO_DELAY + INTRO_STAGGER * idx;
        gsap.to(getCard(i), {
          x: offsetLeft + idx * (CARD_W + GAP),
          y: offsetTop,
          opacity: 1,
          zIndex: 30,
          duration: INTRO_DUR,
          delay: stagger,
          ease: INTRO_EASE,
        });
        gsap.to(getContent(i), {
          x: offsetLeft + idx * (CARD_W + GAP),
          y: offsetTop + CARD_H - CARD_LABEL_H,
          width: CARD_W,
          height: CARD_LABEL_H,
          // FIX: front card gets highest z-index, each subsequent card lower
          zIndex: 50 - idx,
          opacity: 1,
          duration: INTRO_DUR,
          delay: stagger,
          ease: INTRO_EASE,
        });
      });

      gsap.to("#pagination", {
        y: 0,
        autoAlpha: 1,
        duration: INTRO_DUR * 0.92,
        delay: INTRO_DELAY + 0.16,
        ease: INTRO_EASE,
      });
      gsap.to(detActive, {
        x: 0,
        duration: INTRO_DUR,
        delay: INTRO_DELAY + 0.22,
        ease: INTRO_EASE,
      });
      revealDetailLines(detActive, INTRO_DELAY + 0.28, INTRO_EASE);
    }

    function applySlideContent() {
      const detActive = detailsEven ? "#details-even" : "#details-odd";
      const d = data[order[0]];
      const q = <T extends Element>(sel: string) =>
        document.querySelector<T>(`${detActive} ${sel}`);

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
        featEl.innerHTML = d.features
          .map(
            (f) =>
              `<span style="display:inline-flex;align-items:center;
            background:rgba(236,173,41,0.15);border:1px solid rgba(236,173,41,0.45);
            color:#ecad29;font-size:9.5px;font-weight:600;text-transform:uppercase;
            letter-spacing:0.1em;padding:4px 10px;border-radius:99px;white-space:nowrap;">
            ${f}
          </span>`
          )
          .join("");
    }

    function animateRowAfterOrderChange(resolve: () => void) {
      layoutOffsets();
      const detActive = detailsEven ? "#details-even" : "#details-odd";
      const detInactive = detailsEven ? "#details-odd" : "#details-even";
      const leadId = order[0];

      hideInactivePanel(detInactive);
      applySlideContent();

      set(detActive, { zIndex: 22, autoAlpha: 1, x: 0 });
      prepDetailLines(detActive);
      revealDetailLines(detActive, 0.06, INTRO_EASE, resolve);

      const [active, ...rest] = order;
      // last item in rest is the card that just came from the front (now going to back)
      const prv = rest[rest.length - 1];

      set(getCard(prv), { zIndex: 10 });
      set(getCard(active), { zIndex: 25 });
      gsap.to(getCard(prv), { scale: 1.08, ease: EASE });

      gsap.to(getNum(active), { x: 0, ease: EASE });
      gsap.to(getNum(prv), { x: -NUM_SZ, ease: EASE });
      gsap.to(".progress-sub-foreground", {
        width: PROGRESS_W * (1 / data.length) * (leadId + 1),
        ease: EASE,
      });

      // Animate the new front (active) card to slot 0
      gsap.to(getCard(active), {
        x: offsetLeft,
        y: offsetTop,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 10,
        ease: EASE,
        onComplete: () => {
          // FIX: place prv card at the correct tail position = rest.length (last slot)
          const xNew = offsetLeft + rest.length * (CARD_W + GAP);

          set(getCard(prv), {
            x: xNew,
            y: offsetTop,
            width: CARD_W,
            height: CARD_H,
            zIndex: 30,
            borderRadius: 10,
            scale: 1,
          });
          // FIX: prv content goes to last slot with lowest z-index
          set(getContent(prv), {
            x: xNew,
            y: offsetTop + CARD_H - CARD_LABEL_H,
            width: CARD_W,
            height: CARD_LABEL_H,
            opacity: 1,
            zIndex: 30,
          });
          set(getNum(prv), { x: rest.length * NUM_SZ });
        },
      });

      // FIX: active card's content goes to slot 0 with highest z-index (50)
      gsap.to(getContent(active), {
        x: offsetLeft,
        y: offsetTop + CARD_H - CARD_LABEL_H,
        width: CARD_W,
        height: CARD_LABEL_H,
        opacity: 1,
        zIndex: 50,
        duration: 0.35,
        ease: EASE,
      });

      // FIX: rest cards (excluding prv) animate to slots 1..N with correct x and z-index
      rest.forEach((i, idx) => {
        if (i === prv) return;
        // slot index is idx+1 because slot 0 is the active card
        const slotIdx = idx + 1;
        const xNew = offsetLeft + slotIdx * (CARD_W + GAP);
        set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: CARD_W,
          height: CARD_H,
          ease: EASE,
          delay: 0.1 * slotIdx,
        });
        // FIX: z-index decreases as slot index increases (further back = lower z)
        gsap.to(getContent(i), {
          x: xNew,
          y: offsetTop + CARD_H - CARD_LABEL_H,
          width: CARD_W,
          height: CARD_LABEL_H,
          opacity: 1,
          zIndex: 50 - slotIdx,
          ease: EASE,
          delay: 0.1 * slotIdx,
        });
        gsap.to(getNum(i), { x: slotIdx * NUM_SZ, ease: EASE });
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
      await animate(".indicator", 2, { x: 0 });
      await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
      set(".indicator", { x: -window.innerWidth });
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

    /** Inject after helpers exist; position + hide same tick so nothing stacks at (0,0). */
    demoEl.innerHTML = makeCards() + makeContents();
    slideNums.innerHTML = makeNumbers();
    layoutOffsets();
    set("#demo", { autoAlpha: 0 });
    set("#pagination", { autoAlpha: 0, y: 36, zIndex: 60 });
    order.forEach((i, idx) => {
      set(getCard(i), {
        x: offsetLeft + CARD_ENTRANCE_X + idx * (CARD_W + GAP),
        y: offsetTop + 20,
        width: CARD_W,
        height: CARD_H,
        zIndex: 30,
        borderRadius: 10,
        scale: 1,
        opacity: 0,
      });
      set(getContent(i), {
        x: offsetLeft + CARD_ENTRANCE_X + idx * (CARD_W + GAP),
        zIndex: 50 - idx,
        y: offsetTop + CARD_H - CARD_LABEL_H + 14,
        width: CARD_W,
        height: CARD_LABEL_H,
        opacity: 0,
      });
      set(getNum(i), { x: idx * NUM_SZ });
    });

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
      arrowR?.removeEventListener("click", handleNext);
      arrowL?.removeEventListener("click", handlePrev);
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <PageLoader>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap');

        /* First-paint guard until GSAP inline styles take over (no !important — GSAP must win) */
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

        .arrow-left, .arrow-right { cursor: pointer; }
        .arrow-left:hover, .arrow-right:hover { border-color: color-mix(in oklab, var(--foreground) 35%, transparent) !important; }

        .details { pointer-events: none; }
        .details .cta { pointer-events: auto; }
      `}</style>

      <Header />

      <main
        ref={mainRef}
        className="relative min-h-screen overflow-hidden bg-background text-foreground pb-20"
      >
        <div className="pointer-events-none absolute inset-0 z-0 min-h-screen overflow-hidden">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgb(139, 92, 246)" />
          <Spotlight className="top-10 left-full md:left-80 md:top-20" fill="rgb(59, 130, 246)" />
          <Spotlight className="-top-20 right-full md:right-60 md:top-10" fill="rgb(168, 85, 247)" />
          <div className="absolute inset-0 opacity-30 dark:opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>
          <motion.div
            className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/10"
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10"
            animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div
          className="indicator fixed left-0 right-0 top-0 z-[60]"
          style={{ height: 5, background: "#ecad29", transform: "translateX(-100vw)" }}
        />

        <section className="relative z-[1] min-h-screen">
          <div id="demo" className="absolute inset-0 min-h-screen" aria-hidden />

          <ProductDetailsPanel id="details-even" slide={slides[0]} />
          <ProductDetailsPanel id="details-odd" slide={slides[1]} />

          <div
            id="pagination"
            className="absolute inline-flex items-center"
            style={{ gap: 0, zIndex: 60, opacity: 0, visibility: "hidden" }}
          >
            <button
              type="button"
              className="arrow-left z-[60] grid place-items-center rounded-full border-2 border-foreground/25 bg-background/70 text-muted-foreground backdrop-blur-sm transition-colors"
              style={{ width: 50, height: 50, flexShrink: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              className="arrow-right z-[60] ml-5 grid place-items-center rounded-full border-2 border-foreground/25 bg-background/70 text-muted-foreground backdrop-blur-sm transition-colors"
              style={{ width: 50, height: 50, flexShrink: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <div
              className="progress-sub-container z-[60] ml-6 flex h-[50px] w-[500px] max-w-[min(500px,calc(100vw-220px))] shrink items-center"
            >
              <div className="progress-sub-background h-[3px] w-full overflow-hidden rounded-full bg-foreground/20">
                <div className="progress-sub-foreground h-[3px] rounded-full bg-[#ecad29]" style={{ width: 0 }} />
              </div>
            </div>

            <div
              id="slide-numbers"
              className="relative z-[60] h-[50px] w-[50px] shrink-0 overflow-hidden"
            />
          </div>
        </section>
      </main>
    </PageLoader>
  );
}