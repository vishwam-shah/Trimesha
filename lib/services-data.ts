export type ServiceSummary = {
  id: string;
  title: string;
  description: string;
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
      "Production websites and web apps on Next.js and React: accessible UI, Core Web Vitals tuned for search, and deployments you can repeat without drama.",
    color: "#1e3a5f",
    details: {
      overview:
        "You get routes and components that are easy to extend, metadata and structure that search engines understand, and a front end that stays fast on real devices and networks. We agree acceptance criteria up front (performance budgets, key flows, SEO must haves) and ship in slices you can review in staging before anything hits production.",
      deliverables: [
        "Responsive layouts and shared component library",
        "Metadata, sitemap, and structured data where it matters",
        "Analytics hooks and conversion events wired to your stack",
        "Lighthouse and accessibility pass with documented tradeoffs",
        "CI deploy to your host (Vercel, AWS, Azure, or on prem)",
        "Runbook: env vars, rollback, and how to ship the next release",
      ],
      goodFor: [
        "Marketing and product sites that must rank and convert",
        "Internal admin and ops tools your team uses daily",
        "Customer portals, bookings, and lightweight commerce",
      ],
      typicalTimeline: "2 to 8 weeks from signed scope to first production release",
    },
  },
  {
    id: "mobile-applications",
    title: "Mobile Applications",
    description:
      "Native feel on iOS and Android using React Native or Flutter: offline aware flows, store ready builds, and telemetry so you see crashes before users churn.",
    color: "#3b1f6e",
    details: {
      overview:
        "We treat mobile as a product surface, not a shrunken website. Navigation, gestures, and loading states are designed for one handed use. We align on app store requirements early, wire up push and deep links where needed, and leave you with versioning and release notes that match how Apple and Google review apps.",
      deliverables: [
        "Screen map, navigation, and state handling documented",
        "Auth, storage, and API layer with clear error states",
        "TestFlight and Play internal testing before public listing",
        "Store listings, screenshots, and privacy text drafted with you",
        "Crash and ANR reporting with alerts into your channel",
      ],
      goodFor: [
        "Consumer apps with accounts and subscriptions",
        "Field and logistics apps that work with spotty signal",
        "Companion apps for an existing web or hardware product",
      ],
      typicalTimeline: "4 to 12 weeks for a first store release, then iteration",
    },
  },
  {
    id: "custom-software",
    title: "Custom Software",
    description:
      "Bespoke systems for how your company actually works: roles, approvals, audit trails, and integrations so teams stop living in spreadsheets.",
    color: "#0d3b2e",
    details: {
      overview:
        "We start from interviews and a living requirements doc, not a generic template. You get data models that match your business, permissions that match your org chart, and exports or APIs so finance and ops are not locked in. Every milestone ends in something your staff can try on staging with real sample data.",
      deliverables: [
        "Process map and role matrix signed by stakeholders",
        "Core modules with admin tools and audit friendly logs",
        "Imports, exports, or sync to your CRM, ERP, or warehouse",
        "User acceptance test plan and training walkthrough recorded",
        "Handover: schema docs, backup expectations, and support path",
      ],
      goodFor: [
        "CRMs, partner portals, and vendor onboarding",
        "Approval chains and policy heavy workflows",
        "Replacing legacy internal tools without a big bang cutover",
      ],
      typicalTimeline: "8 to 16 weeks for a first usable department wide rollout",
    },
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Research grounded UX, high fidelity UI, and a component spec your engineers can implement without interpretation gaps.",
    color: "#6b1540",
    details: {
      overview:
        "We combine lightweight research (interviews, task analysis, competitive scan) with fast iteration in Figma. You receive flows that show edge cases, a prototype you can user test, and tokens or variables that map cleanly to your codebase. Developers get spacing, type scale, and interaction notes so the shipped product matches the signed off frames.",
      deliverables: [
        "Information architecture and primary user journeys",
        "Low fidelity flows, then pixel level UI for agreed breakpoints",
        "Clickable prototype for stakeholders or moderated tests",
        "Component inventory aligned to your design system or a new one",
        "Redlines or dev mode handoff with motion and empty states",
      ],
      goodFor: [
        "New products before engineering commits to architecture",
        "Redesigns when metrics show drop off or support noise",
        "Design systems that need to scale across squads",
      ],
      typicalTimeline: "3 to 7 weeks depending on surface area and review cycles",
    },
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description:
      "AWS, Azure, or GCP environments that are repeatable: infrastructure as code, pipelines, observability, and backups you can restore in a drill.",
    color: "#7a2c0a",
    details: {
      overview:
        "We define environments (dev, staging, production) with the same building blocks, wire CI so merges become deploys with approvals where you need them, and add metrics and logs that answer who changed what and why latency spiked. Cost and security baselines are documented so you are not surprised at month end or audit time.",
      deliverables: [
        "IaC repo (Terraform, Pulumi, or Bicep) with environment split",
        "Build and deploy pipeline with secrets in a vault or managed store",
        "Dashboards for CPU, memory, queues, and error rates",
        "Backup schedule, retention, and a tested restore checklist",
        "Network layout: VPC, subnets, and least privilege IAM notes",
      ],
      goodFor: [
        "Teams outgrowing manual deploys or single server setups",
        "Regulated workloads that need separation and evidence",
        "Migrations from on prem or between cloud vendors",
      ],
      typicalTimeline: "2 to 5 weeks for a standard three environment setup",
    },
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Practical hardening for web and APIs: auth review, dependency and config checks, and a prioritized fix list your team can schedule.",
    color: "#003d4d",
    details: {
      overview:
        "We focus on the risks that match your data and exposure, not generic scare slides. Review covers authentication, session handling, headers, rate limits, and dependency surface. You receive severities, reproduction steps, and suggested patches. We can pair on fixes or verify after your team lands changes.",
      deliverables: [
        "Threat model scoped to your app and user roles",
        "Findings ranked with effort estimates and references",
        "Auth, session, and cookie configuration review",
        "Guidance on secrets, env separation, and CI secret scanning",
        "Re test pass after critical items are addressed",
      ],
      goodFor: [
        "Products handling PII or payments",
        "Pre launch or post incident hardening",
        "Vendor diligence questionnaires that need concrete answers",
      ],
      typicalTimeline: "1 to 3 weeks from access to final report",
    },
  },
  {
    id: "api-development",
    title: "API Development",
    description:
      "Versioned REST or GraphQL services with schemas, validation, and traces so mobile and web teams ship in parallel without breaking contracts.",
    color: "#5c1a1a",
    details: {
      overview:
        "We design resources and error shapes with your client teams, document with OpenAPI or GraphQL SDL, and add request IDs plus structured logs for support. Pagination, idempotency, and rate limits are decided before launch. Postman or automated contract tests can ship with the repo so regressions show up in CI.",
      deliverables: [
        "OpenAPI 3 or GraphQL schema as source of truth",
        "Auth model: tokens, scopes, or m2m clients documented",
        "Validation, error codes, and consistent envelope for failures",
        "Postman collection or automated contract tests in CI",
        "Staging data fixtures and example integration snippets",
      ],
      goodFor: [
        "Mobile and web sharing one backend",
        "Partner and public APIs with SLA expectations",
        "Event driven or webhook style integrations",
      ],
      typicalTimeline: "3 to 8 weeks for a first stable public or partner API",
    },
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description:
      "Dashboards and pipelines around metrics you already collect: definitions everyone agrees on, refreshes you can trust, and exports finance can reconcile.",
    color: "#0a3d3d",
    details: {
      overview:
        "We workshop the questions leadership actually asks, map them to events or warehouse tables, and build visuals with filters that match how teams segment users. Data quality checks and owner notes reduce silent wrong numbers. Scheduled reports or Slack digests can land where people already work.",
      deliverables: [
        "Metric dictionary: formula, source, and refresh cadence",
        "Dashboards with role based access in your BI tool",
        "SQL or dbt models with tests on key assumptions",
        "Scheduled email or Slack summaries for core KPIs",
        "Handover session and query cookbook for analysts",
      ],
      goodFor: [
        "Growth and product teams needing one source of truth",
        "Ops and revenue reporting without manual spreadsheet merges",
        "Investor or board ready views built from the same definitions",
      ],
      typicalTimeline: "3 to 8 weeks depending on warehouse maturity",
    },
  },
];
