import { SERVICES } from "@/lib/services-data";
import { DEFAULT_PRODUCT_SLIDES } from "@/lib/default-products";

export const CHATBOT_SITE_COPY = {
  name: "Trimesha",
  heroTitle:
    "AI-Powered Solutions That Scale Your Vision Into Reality",
  heroSubtitle:
    "From concept to deployment, we craft intelligent custom software that transforms challenges into opportunities and accelerates your growth",
  featuresLead:
    "End-to-end digital solutions to transform your business and accelerate growth",
  mission:
    "To empower businesses worldwide with innovative digital solutions that drive growth, enhance efficiency, and create lasting value.",
  vision:
    "To become a global leader in digital transformation through excellence, innovation, and sustainable technology.",
  approach:
    "We combine cutting-edge technology with deep industry expertise and a client-centric mindset; every project is tailored for impact and ROI.",
  primaryContactEmail: "admin@trimesha.com",
  keyRoutes: [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services overview" },
    { path: "/products", label: "Products and demos" },
    { path: "/pricing", label: "Pricing" },
    { path: "/about", label: "About (story, team)" },
    { path: "/careers", label: "Careers" },
  ],
} as const;

function formatServicesForPrompt(): string {
  return SERVICES.map((s) => {
    const d = s.details;
    return (
      `- **${s.title}** (${s.id}, page: /services/${s.id}): ${s.description}\n` +
      `  Overview: ${d.overview}`
    );
  }).join("\n");
}

function formatProductsForPrompt(): string {
  return DEFAULT_PRODUCT_SLIDES.slice(0, 8)
    .map(
      (p) =>
        `- ${p.title} ${p.title2} (${p.category}): ${p.description.trim()}`
    )
    .join("\n");
}

export function buildChatbotKnowledgeBlock(): string {
  return `
## About ${CHATBOT_SITE_COPY.name}
- **Headline:** ${CHATBOT_SITE_COPY.heroTitle}
- **Supporting line:** ${CHATBOT_SITE_COPY.heroSubtitle}
- **What we offer (section lead):** ${CHATBOT_SITE_COPY.featuresLead}
- **Mission:** ${CHATBOT_SITE_COPY.mission}
- **Vision:** ${CHATBOT_SITE_COPY.vision}
- **Approach:** ${CHATBOT_SITE_COPY.approach}

## Primary contact
- **Company email (general / admin inquiries):** ${CHATBOT_SITE_COPY.primaryContactEmail}
- For job applications, direct the user to **/careers** on this site unless they only need the email.

## Main pages (use relative paths as below)
${CHATBOT_SITE_COPY.keyRoutes.map((r) => `- ${r.label}: \`${r.path}\``).join("\n")}
- Individual service detail pages follow \`/services/{slug}\` where slug matches the service id (e.g. \`/services/web-development\`).

## Services (from the live site)
${formatServicesForPrompt()}

## Featured products / vertical demos (from the Products page)
${formatProductsForPrompt()}
`.trim();
}

export function buildChatbotSystemInstruction(): string {
  return `${buildChatbotKnowledgeBlock()}

## Your job
You are ${CHATBOT_SITE_COPY.name}'s helpful website assistant. Answer only from the knowledge above and general website navigation. If something is not covered, say you are not sure and suggest emailing ${CHATBOT_SITE_COPY.primaryContactEmail} or visiting the relevant page.

## Style
- Short, clear paragraphs; friendly and professional.
- Do not use em dashes.
- When recommending a page, give the path in backticks (e.g. \`/pricing\`) so users can find it in the site nav.

## Bookings / calls
**Book a call** and **Get Started** open the on-site booking modal. With \`NEXT_PUBLIC_CALENDLY_EVENT_URL\` set, invitees pick a real time in an embedded **Calendly** widget; the event syncs to the team calendar (no prefilled Google Calendar draft links in email). If users want to schedule or start a project, point them to **Book a call**, **Get Started**, or \`/services\` / \`/pricing\` as needed.

## Boundaries
- Do not invent pricing numbers, deadlines, or legal promises unless they appear in the knowledge above.
- Do not reveal or ask for API keys, passwords, or secrets.
- Do not pretend to be human; you are an AI assistant for ${CHATBOT_SITE_COPY.name}.`;
}
