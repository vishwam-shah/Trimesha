"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Header } from "@/components/layout/header";
import { PageLoader } from "@/components/common/page-loader";

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


export default function ProductsPage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let isCancelled = false;
    const data = slides;

    const CARD_W = 180;
    const CARD_H = 270;
    const GAP    = 16;
    const NUM_SZ = 50;
    const EASE   = "sine.inOut";

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
          box-shadow:8px 8px 24px 4px rgba(0,0,0,0.85);
          border-radius:14px;overflow:hidden;will-change:transform;">
          <div style="position:absolute;inset:0;
            background:linear-gradient(160deg,rgba(0,0,0,0.30) 0%,rgba(0,0,0,0.70) 55%,rgba(0,0,0,0.94) 100%);">
          </div>
        </div>`).join("");

    const makeContents = () =>
      data.map((item, idx) => `
        <div id="card-content-${idx}" style="
          position:absolute;left:0;top:0;
          color:#fff;box-sizing:border-box;
          padding:10px 10px 0;pointer-events:none;overflow:hidden;">
          <div style="width:18px;height:3px;border-radius:99px;background:#ecad29;margin-bottom:6px;"></div>
          <div style="font-size:8px;font-weight:600;text-transform:uppercase;
            letter-spacing:0.12em;opacity:0.7;line-height:1.3;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${item.place}
          </div>
          <div style="font-weight:700;font-size:14px;font-family:'Oswald',sans-serif;
            line-height:1.15;margin-top:3px;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${item.title}
          </div>
          <div style="font-weight:700;font-size:14px;font-family:'Oswald',sans-serif;
            line-height:1.15;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${item.title2}
          </div>
        </div>`).join("");

    const makeNumbers = () =>
      data.map((_, idx) => `
        <div id="slide-item-${idx}" style="
          width:${NUM_SZ}px;height:${NUM_SZ}px;
          position:absolute;top:0;left:0;
          display:grid;place-items:center;
          font-size:26px;font-weight:700;color:#fff;
          font-family:'Oswald',sans-serif;">
          ${idx + 1}
        </div>`).join("");

    const demoEl    = document.getElementById("demo");
    const slideNums = document.getElementById("slide-numbers");
    if (!demoEl || !slideNums) return;

    demoEl.innerHTML    = makeCards() + makeContents();
    slideNums.innerHTML = makeNumbers();

    function animate(target: gsap.TweenTarget, duration: number, props: gsap.TweenVars) {
      return new Promise<void>((res) =>
        gsap.to(target, { ...props, duration, onComplete: () => res() })
      );
    }

    function init() {
      const HEADER_H = 80;
      const [active, ...rest] = order;
      const detActive   = detailsEven ? "#details-even" : "#details-odd";
      const detInactive = detailsEven ? "#details-odd"  : "#details-even";
      const W = window.innerWidth;
      const H = window.innerHeight;
      const usableHeight = H - HEADER_H;
      offsetTop  = HEADER_H + usableHeight - CARD_H - 210;
      offsetLeft = Math.max(Math.round(W * 0.46), W - data.length * (CARD_W + GAP) - 40);
      set("#pagination", {
        top: offsetTop + CARD_H + 24,
        left: offsetLeft,
        y: 80, opacity: 0, zIndex: 60,
      });

      set(getCard(active), { x: 0, y: 0, width: W, height: H, borderRadius: 0, zIndex: 20 });
      set(getContent(active), { x: 0, y: 0, opacity: 0 });

      set(detActive,   { opacity: 0, zIndex: 22, x: -220 });
      set(detInactive, { opacity: 0, zIndex: 12 });
      set(`${detInactive} .text`,         { y: 100 });
      set(`${detInactive} .title-1`,      { y: 100 });
      set(`${detInactive} .title-2`,      { y: 100 });
      set(`${detInactive} .desc`,         { y: 50  });
      set(`${detInactive} .features-row`, { y: 40, opacity: 0 });
      set(`${detInactive} .cta`,          { y: 60  });
      set(".progress-sub-foreground", { width: 240 * (1 / order.length) * (active + 1) });

      rest.forEach((i, idx) => {
        set(getCard(i), {
          x: W + idx * (CARD_W + GAP), y: offsetTop,
          width: CARD_W, height: CARD_H, zIndex: 30, borderRadius: 14,
        });
        set(getContent(i), {
          x: W + idx * (CARD_W + GAP), y: offsetTop,
          width: CARD_W, height: CARD_H, zIndex: 40,
        });
        set(getNum(i), { x: (idx + 1) * NUM_SZ });
      });

      set(".indicator", { x: -W });

      const START = 0.6;
      gsap.to(".cover", {
        x: W + 400, delay: 0.5, ease: EASE,
        onComplete: () => { setTimeout(() => { if (!isCancelled) loop(); }, 500); },
      });
      rest.forEach((i, idx) => {
        gsap.to(getCard(i), {
          x: offsetLeft + idx * (CARD_W + GAP), zIndex: 30,
          delay: START + 0.06 * idx, ease: EASE,
        });
        gsap.to(getContent(i), {
          x: offsetLeft + idx * (CARD_W + GAP), y: offsetTop,
          width: CARD_W, height: CARD_H,
          zIndex: 40, delay: START + 0.06 * idx, ease: EASE,
        });
      });

      gsap.to("#pagination", { y: 0, opacity: 1, ease: EASE, delay: START });
      gsap.to(detActive,     { opacity: 1, x: 0,  ease: EASE, delay: START });
    }
    function step() {
      return new Promise<void>((resolve) => {
        order.push(order.shift() as number);
        detailsEven = !detailsEven;

        const detActive   = detailsEven ? "#details-even" : "#details-odd";
        const detInactive = detailsEven ? "#details-odd"  : "#details-even";
        const d = data[order[0]];

        const q = <T extends Element>(sel: string) =>
          document.querySelector<T>(`${detActive} ${sel}`);

        const placeEl    = q<HTMLElement>(".place-box .text");
        const t1El       = q<HTMLElement>(".title-1");
        const t2El       = q<HTMLElement>(".title-2");
        const descEl     = q<HTMLElement>(".desc");
        const featEl     = q<HTMLElement>(".features-row");
        const linkEl     = q<HTMLAnchorElement>(".cta a");
        const catEl      = q<HTMLElement>(".category-pill");

        if (placeEl) placeEl.textContent = d.place;
        if (t1El)    t1El.textContent    = d.title;
        if (t2El)    t2El.textContent    = d.title2;
        if (descEl)  descEl.textContent  = d.description;
        if (linkEl)  linkEl.href         = d.url;
        if (catEl)   catEl.textContent   = d.category;
        if (featEl)  featEl.innerHTML    = d.features.map(f =>
          `<span style="display:inline-flex;align-items:center;
            background:rgba(236,173,41,0.15);border:1px solid rgba(236,173,41,0.45);
            color:#ecad29;font-size:9.5px;font-weight:600;text-transform:uppercase;
            letter-spacing:0.1em;padding:4px 10px;border-radius:99px;white-space:nowrap;">
            ${f}
          </span>`).join("");

        set(detActive, { zIndex: 22 });
        gsap.to(detActive,                      { opacity: 1, delay: 0.4,  ease: EASE });
        gsap.to(`${detActive} .text`,           { y: 0, delay: 0.10, duration: 0.7, ease: EASE });
        gsap.to(`${detActive} .title-1`,        { y: 0, delay: 0.15, duration: 0.7, ease: EASE });
        gsap.to(`${detActive} .title-2`,        { y: 0, delay: 0.15, duration: 0.7, ease: EASE });
        gsap.to(`${detActive} .desc`,           { y: 0, delay: 0.30, duration: 0.4, ease: EASE });
        gsap.to(`${detActive} .features-row`,   { y: 0, opacity: 1, delay: 0.33, duration: 0.4, ease: EASE });
        gsap.to(`${detActive} .cta`, {
          y: 0, delay: 0.38, duration: 0.4, ease: EASE,
          onComplete: () => resolve(),
        });

        set(detInactive, { zIndex: 12 });

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];

        set(getCard(prv), { zIndex: 10 });
        set(getCard(active), { zIndex: 20 });
        gsap.to(getCard(prv), { scale: 1.5, ease: EASE });

        gsap.to(getContent(active), { opacity: 0, duration: 0.3, ease: EASE });
        gsap.to(getNum(active),     { x: 0,          ease: EASE });
        gsap.to(getNum(prv),        { x: -NUM_SZ,    ease: EASE });
        gsap.to(".progress-sub-foreground", {
          width: 240 * (1 / order.length) * (active + 1), ease: EASE,
        });

        gsap.to(getCard(active), {
          x: 0,
          y: 0,
          ease: EASE,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          onComplete: () => {
            const xNew = offsetLeft + (rest.length - 1) * (CARD_W + GAP);

            set(getCard(prv), {
              x: xNew, y: offsetTop,
              width: CARD_W, height: CARD_H,
              zIndex: 30, borderRadius: 14, scale: 1,
            });
            set(getContent(prv), {
              x: xNew, y: offsetTop,
              width: CARD_W, height: CARD_H,
              opacity: 1, zIndex: 40,
            });
            set(getNum(prv), { x: rest.length * NUM_SZ });

            set(detInactive,                        { opacity: 0 });
            set(`${detInactive} .text`,             { y: 100 });
            set(`${detInactive} .title-1`,          { y: 100 });
            set(`${detInactive} .title-2`,          { y: 100 });
            set(`${detInactive} .desc`,             { y: 50  });
            set(`${detInactive} .features-row`,     { y: 40, opacity: 0 });
            set(`${detInactive} .cta`,              { y: 60  });
          },
        });

        rest.forEach((i, idx) => {
          if (i === prv) return;
          const xNew = offsetLeft + idx * (CARD_W + GAP);
          set(getCard(i), { zIndex: 30 });
          gsap.to(getCard(i), {
            x: xNew, y: offsetTop, width: CARD_W, height: CARD_H,
            ease: EASE, delay: 0.1 * (idx + 1),
          });
          gsap.to(getContent(i), {
            x: xNew, y: offsetTop, width: CARD_W, height: CARD_H,
            opacity: 1, zIndex: 40, ease: EASE, delay: 0.1 * (idx + 1),
          });
          gsap.to(getNum(i), { x: (idx + 1) * NUM_SZ, ease: EASE });
        });
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
    const handlePrev = () => {
      order.unshift(order.pop() as number);
      detailsEven = !detailsEven;
      step();
    };

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

    Promise.all(data.map(({ image }) => loadImg(image))).then(() => {
      if (!isCancelled) init();
    });

    return () => {
      isCancelled = true;
      arrowR?.removeEventListener("click", handleNext);
      arrowL?.removeEventListener("click", handlePrev);
      gsap.killTweensOf("*");
    };
  }, []);

  const DetailsPanel = ({ id, slide }: { id: string; slide: ProductSlide }) => (
    <div
      id={id}
      className="details absolute z-[22] pointer-events-none"
      style={{ left: 52, top: "calc(var(--hh) + 60px)", maxWidth: 520 }}
    >
      <div className="place-box relative overflow-hidden mb-1" style={{ height: 44 }}>
        <div
          className="text relative text-white/90 font-medium"
          style={{ paddingTop: 16, paddingLeft: 36, fontSize: 16, letterSpacing: "0.04em" }}
        >
          <span
            style={{
              position: "absolute", left: 0, top: 19,
              width: 24, height: 3, borderRadius: 99,
              background: "#ecad29", display: "block",
            }}
          />
          {slide.place}
        </div>
      </div>
      <div className="title-box-1 overflow-hidden" style={{ height: 96, marginTop: 0 }}>
        <div
          className="title-1 font-bold text-white leading-none break-words"
          style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(32px,10vw,60px)" }}
        >
          {slide.title}
        </div>
      </div>

      <div className="title-box-2 overflow-hidden" style={{ height: 96, marginTop: 2 }}>
        <div
          className="title-2 font-bold text-white leading-none break-words"
          style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(32px,10vw,60px)" }}
        >
          {slide.title2}
        </div>
      </div>
      <div
        className="desc leading-relaxed"
        style={{
          marginTop: 14,
          fontSize: "clamp(12px,2.6vw,13.5px)",
          maxWidth: "min(420px, 92vw)",
          color: "rgba(255,255,255,0.86)",
        }}
      >
        {slide.description}
      </div>
      <div
        className="features-row flex flex-wrap gap-2"
        style={{ marginTop: 14, maxWidth: "min(440px, 94vw)" }}
      >
        {slide.features.map((f) => (
          <span
            key={f}
            style={{
              display: "inline-flex", alignItems: "center",
              background: "rgba(236,173,41,0.15)",
              border: "1px solid rgba(236,173,41,0.45)",
              color: "#ecad29",
              fontSize: 9.5, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.1em",
              padding: "4px 10px", borderRadius: 99,
              whiteSpace: "nowrap",
            }}
          >
            {f}
          </span>
        ))}
      </div>
      <div
        className="cta flex items-center gap-3 pointer-events-auto"
        style={{ marginTop: 20 }}
      >
        <span
          className="category-pill"
          style={{
            fontSize: 10, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.1em",
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.22)",
            color: "rgba(255,255,255,0.85)",
            padding: "5px 14px", borderRadius: 99,
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
            display: "inline-flex", alignItems: "center", gap: 7,
            height: 38, borderRadius: 99,
            padding: "0 22px",
            background: "#ecad29", color: "#1a1a1a",
            fontSize: 11, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.15em",
            textDecoration: "none", whiteSpace: "nowrap",
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
            <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
          </svg>
          View Product
        </a>
      </div>
    </div>
  );

  return (
    <PageLoader>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap');

        /* expose header height so detail panel top is always below the nav */
        :root { --hh: 80px; }

        /* arrows clickable */
        .arrow-left, .arrow-right { cursor: pointer; }
        .arrow-left:hover  { border-color: rgba(255,255,255,0.7) !important; }
        .arrow-right:hover { border-color: rgba(255,255,255,0.7) !important; }

        /* details panel – pointer-events off by default, re-enabled on .cta */
        .details { pointer-events: none; }
        .details .cta { pointer-events: auto; }
      `}</style>

      <Header />

      <main
        ref={mainRef}
        className="relative bg-[#111] text-white overflow-hidden"
        style={{ height: "100dvh" }}
      >
        <div
          className="indicator fixed left-0 right-0 top-0 z-[60]"
          style={{ height: 4, background: "#ecad29", transform: "translateX(-100vw)" }}
        />

        <section className="absolute inset-0">
          <div id="demo" className="absolute inset-0" />

          <DetailsPanel id="details-even" slide={slides[0]} />
          <DetailsPanel id="details-odd"  slide={slides[1]} />

          <div
            id="pagination"
            className="absolute inline-flex items-center"
            style={{ gap: 0, zIndex: 60 }}
          >
            <button
              className="arrow-left grid place-items-center rounded-full transition-colors"
              style={{
                width: 42, height: 42, flexShrink: 0,
                border: "1.5px solid rgba(255,255,255,0.28)",
                background: "transparent", color: "rgba(255,255,255,0.7)",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" width={18} height={18} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              className="arrow-right grid place-items-center rounded-full transition-colors"
              style={{
                width: 42, height: 42, flexShrink: 0, marginLeft: 8,
                border: "1.5px solid rgba(255,255,255,0.28)",
                background: "transparent", color: "rgba(255,255,255,0.7)",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" width={18} height={18} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <div
              className="progress-sub-container flex items-center"
              style={{ marginLeft: 16, width: 240, height: 42, flexShrink: 0 }}
            >
              <div
                className="progress-sub-background overflow-hidden"
                style={{ width: 240, height: 2, background: "rgba(255,255,255,0.18)" }}
              >
                <div
                  className="progress-sub-foreground"
                  style={{ height: 2, background: "#ecad29", width: 0 }}
                />
              </div>
            </div>

            <div
              id="slide-numbers"
              className="relative overflow-hidden"
              style={{ width: 44, height: 44, marginLeft: 6, flexShrink: 0 }}
            />
          </div>
        </section>
        <div
          className="cover absolute inset-0 z-[100]"
          style={{ background: "#fff" }}
        />
      </main>
    </PageLoader>
  );
}