import type { ProductSlide } from "@/types/product";

/** Seeded into MongoDB when the products collection is empty */
export const DEFAULT_PRODUCT_SLIDES: ProductSlide[] = [
  {
    place: "Product 01 · F&B / ERP",
    title: "RESTAURANT",
    title2: "ERP DASHBOARD",
    description:
      "Centralises every operational touchpoint of a food service business. This includes order management, table tracking, inventory, staff scheduling, and financial analytics.",
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
      "Connects every department of a hospital. It covers OPD registration, appointment booking, IPD, pharmacy, labs, and billing for faster, safer patient care.",
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
      "Build, deploy, and manage intelligent chatbot experiences on WhatsApp. Combine guided flows, broadcast campaigns, contact management, and analytics.",
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
      "High-fidelity UI and UX showcase for real-world mobile apps. A reference library of best-in-class patterns, interaction models, and component systems.",
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
      "Specialised trading and CRM platform for dealerships. Get a 360 degree view of inventory, leads, pipelines, customer profiles, and deals with automotive-specific workflows.",
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
      "Visual, node-based workflow automation. Design, connect, and deploy complex data or logic pipelines on an infinite drag-and-drop canvas without writing code.",
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
