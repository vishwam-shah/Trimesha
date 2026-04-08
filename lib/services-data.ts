export type ServiceSummary = {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  details: {
    overview: string;
    deliverables: string[];
    goodFor: string[];
    typicalTimeline: string;
  };
};

export const SERVICES: ServiceSummary[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "We build fast, secure websites and web apps with Next.js, React, and TypeScript. Expect clean UX, strong SEO fundamentals, and performance that feels instant.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    color: "#1e3a5f",
    details: {
      overview:
        "We build websites and web applications that load quickly, rank well, and stay easy to maintain. You get a clean codebase and a UI that feels polished on every device.",
      deliverables: [
        "Responsive pages and components",
        "SEO basics set up correctly",
        "Analytics and event tracking",
        "Performance pass and cleanup",
        "Deployment and handover",
      ],
      goodFor: [
        "Landing pages and marketing sites",
        "Dashboards and internal tools",
        "Ecommerce and booking flows",
      ],
      typicalTimeline: "2 to 6 weeks depending on scope",
    },
  },
  {
    id: "mobile-applications",
    title: "Mobile Applications",
    description:
      "We ship iOS and Android apps with React Native or Flutter. You get smooth UI, reliable offline support, and a product that scales with your users.",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&auto=format&fit=crop&q=80",
    color: "#3b1f6e",
    details: {
      overview:
        "We build mobile apps with great UX, stable performance, and clear release management. Your app is designed for real usage, not just screenshots.",
      deliverables: [
        "App screens and navigation",
        "Authentication and core flows",
        "API integration",
        "App store release support",
        "Crash and performance monitoring",
      ],
      goodFor: ["Consumer apps", "Field team apps", "Companion apps for SaaS"],
      typicalTimeline: "4 to 10 weeks depending on features",
    },
  },
  {
    id: "custom-software",
    title: "Custom Software",
    description:
      "We design software around your workflows, not the other way around. CRMs, ERPs, portals, and internal tools built for real teams and real constraints.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80",
    color: "#0d3b2e",
    details: {
      overview:
        "We translate messy processes into clean software. The goal is fewer manual steps, better visibility, and reliable operations across teams.",
      deliverables: [
        "Workflow mapping and requirements",
        "Role based access and admin tools",
        "Core modules and integrations",
        "Audit logs and reporting",
        "Documentation and training handover",
      ],
      goodFor: ["CRMs", "ERPs", "Portals", "Approval workflows"],
      typicalTimeline: "6 to 14 weeks depending on modules",
    },
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "We turn ideas into usable interfaces with wireframes, prototypes, and design systems. The result is a product that looks premium and feels easy to use.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop&q=80",
    color: "#6b1540",
    details: {
      overview:
        "We design user journeys that remove confusion and increase conversion. The output is design that developers can build without guessing.",
      deliverables: [
        "User flows and information architecture",
        "Wireframes and high fidelity designs",
        "Clickable prototype",
        "Design system and components",
        "Developer ready specs",
      ],
      goodFor: ["New products", "Redesigns", "Design systems for teams"],
      typicalTimeline: "2 to 5 weeks depending on screens",
    },
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description:
      "We deploy on AWS, Azure, or Google Cloud with CI/CD, monitoring, and sensible security defaults. Your stack stays reliable as traffic grows.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80",
    color: "#7a2c0a",
    details: {
      overview:
        "We set up environments that are repeatable, observable, and easy to deploy. This reduces downtime and makes releases safer.",
      deliverables: [
        "CI/CD pipeline setup",
        "Environment configuration",
        "Monitoring and alerting",
        "Backups and rollback plan",
        "Basic security hardening",
      ],
      goodFor: ["Startups scaling traffic", "Teams migrating to cloud"],
      typicalTimeline: "1 to 3 weeks depending on stack",
    },
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description:
      "We harden apps, review attack surfaces, and run practical audits. You get clear fixes, safer deployments, and fewer surprises in production.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&auto=format&fit=crop&q=80",
    color: "#003d4d",
    details: {
      overview:
        "We focus on realistic risks and actionable fixes. You get a clear report, prioritized items, and help implementing the important changes.",
      deliverables: [
        "Security review and threat model",
        "Checklist of fixes by priority",
        "Auth and permissions hardening",
        "Basic rate limiting guidance",
        "Final verification pass",
      ],
      goodFor: ["Apps handling user data", "Pre launch hardening"],
      typicalTimeline: "1 to 2 weeks depending on surface area",
    },
  },
  {
    id: "api-development",
    title: "API Development",
    description:
      "We build REST and GraphQL APIs with clear contracts, versioning, and observability. Integrations stay stable even as your product evolves.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    color: "#5c1a1a",
    details: {
      overview:
        "We build APIs that are predictable for frontend teams and safe for production. Clear schemas, sensible validation, and logs you can trust.",
      deliverables: [
        "API design and endpoints",
        "Validation and error handling",
        "Documentation for teams",
        "Logging and basic observability",
        "Integration support",
      ],
      goodFor: ["Mobile backends", "SaaS platforms", "Third party integrations"],
      typicalTimeline: "2 to 6 weeks depending on endpoints",
    },
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description:
      "We create dashboards and reporting that teams actually use. Track the right metrics, automate insights, and make decisions with confidence.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    color: "#0a3d3d",
    details: {
      overview:
        "We build dashboards that answer the questions your team asks every day. The goal is faster decisions and less time spent in spreadsheets.",
      deliverables: [
        "Metric definitions and event plan",
        "Dashboards and filters",
        "Automated reports",
        "Data quality checks",
        "Handover and documentation",
      ],
      goodFor: ["Founders tracking growth", "Ops and sales reporting"],
      typicalTimeline: "2 to 5 weeks depending on data sources",
    },
  },
];

