import { connect } from "@/dbconfig/dbconnect";
import TeamMember from "@/models/TeamMember";

/** Shape used on the public About page and in admin APIs */
export type PublicTeamMember = {
  name: string;
  role: string;
  bio: string;
  quote: string;
  expertise: string[];
  badge: string;
  badgeColor: string;
  image: string;
  hasImage: boolean;
  icon: string;
  isFounder: boolean;
};

export type AdminTeamMemberRow = PublicTeamMember & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

/** Shown when the collection is empty or DB is unavailable.
 *  Regenerate from MongoDB: `npm run seed:team-defaults` (needs `MONGO_URI`). */
// SYNC_TEAM_DEFAULTS_START
export const DEFAULT_PUBLIC_TEAM_MEMBERS: PublicTeamMember[] = [
  {
    name: "Siddhant Shah",
    role: "Founder & Mobile Lead",
    image: "",
    hasImage: false,
    badge: "Founder",
    badgeColor: "from-amber-500 to-orange-500",
    bio: "Siddhant drives Trimesha's mobile division - architecting native iOS and Android experiences that are fast, intuitive, and built to handle real-world scale. From Flutter cross-platform builds to native Swift and Kotlin apps, he owns the full mobile lifecycle: UI/UX prototyping, state management, performance tuning, and Play Store / App Store submissions.",
    expertise: [
      "Flutter & Dart",
      "Swift / SwiftUI",
      "Kotlin / Jetpack Compose",
      "Firebase & Supabase",
      "Mobile CI/CD",
      "App Store Optimization",
    ],
    quote:
      "Great mobile apps don't just look good - they feel right. Every tap, every transition, every loading state matters.",
    icon: "ph:device-mobile-speaker-duotone",
    isFounder: true,
  },
  {
    name: "Vishwam Shah",
    role: "Founder & Web Lead",
    image: "",
    hasImage: false,
    badge: "Founder",
    badgeColor: "from-violet-500 to-purple-600",
    bio: "Vishwam leads web engineering at Trimesha - designing and building full-stack platforms that handle complex business logic without breaking a sweat. From interactive landing pages to enterprise SaaS dashboards, he brings deep expertise in React ecosystems, Node.js back-ends, database architecture, and cloud infrastructure. He also drives the team's AI integration work, connecting intelligent models to production-ready web interfaces.",
    expertise: [
      "React / Next.js",
      "Node.js & Express",
      "TypeScript",
      "MongoDB & PostgreSQL",
      "AWS / Vercel / Railway",
      "AI/ML Integration",
    ],
    quote:
      "The web should feel alive. I build interfaces that are as smart as the systems behind them.",
    icon: "ph:globe-hemisphere-west-duotone",
    isFounder: true,
  },
  {
    name: "Diya",
    role: "Full Stack Developer",
    image: "/testimonial/diya.jpeg",
    hasImage: false,
    badge: "Developer",
    badgeColor: "from-sky-500 to-indigo-500",
    bio: "Diya is a full-stack developer focused on turning designs into reliable features - clean React surfaces, solid APIs, and data models that stay understandable as the product grows. She likes pairing on reviews, writing tests that catch regressions early, and leaving breadcrumbs in the repo so the next person can move fast.",
    expertise: [
      "React & Next.js",
      "TypeScript",
      "REST APIs",
      "Databases",
      "Testing & QA",
      "Collaboration & docs",
    ],
    quote:
      "I care about code that the team can read six months from now - and users can trust on day one.",
    icon: "ph:stack-duotone",
    isFounder: false,
  },
  {
    name: "Mayank Gautam",
    role: "Full Stack Developer · Intern",
    image: "/testimonial/mayank.jpeg",
    hasImage: true,
    badge: "Intern",
    badgeColor: "from-teal-500 to-cyan-500",
    bio: "Mayank is a versatile full-stack developer interning at Trimesha, contributing across both the web and mobile stacks. He works on building features end-to-end - from designing responsive UI components and REST APIs to database schemas and deployment pipelines. Eager to learn and ship, Mayank brings fresh energy and a builder's mindset to every project he touches.",
    expertise: [
      "React & Next.js",
      "Node.js & APIs",
      "Flutter Development",
      "Database Design",
      "Git & DevOps",
      "Problem Solving",
    ],
    quote:
      "Every line of code is a chance to learn something new. I'm here to build, break, and improve - fast.",
    icon: "ph:code-duotone",
    isFounder: false,
  },
  {
    name: "Mehek",
    role: "Social Media Manager · Intern",
    image: "/testimonial/mehek.jpeg",
    hasImage: true,
    badge: "Intern",
    badgeColor: "from-pink-500 to-rose-500",
    bio: "Mehek shapes how Trimesha shows up online - from short-form content and campaign calendars to community replies and brand voice. She experiments with formats, tracks what resonates, and keeps our story clear across channels so the work our engineers ship is easy to discover and understand.",
    expertise: [
      "Content & storytelling",
      "Social strategy",
      "Community engagement",
      "Brand voice",
      "Analytics & iteration",
      "Creative production",
    ],
    quote:
      "Good social isn't noise - it's a clear signal. I focus on content that earns attention and trust.",
    icon: "ph:megaphone-simple-duotone",
    isFounder: false,
  },
];
// SYNC_TEAM_DEFAULTS_END

export function sortPublicTeamMembers(
  members: PublicTeamMember[],
): PublicTeamMember[] {
  const founders = members
    .filter((m) => m.isFounder)
    .sort((a, b) => a.name.localeCompare(b.name));
  const rest = members
    .filter((m) => !m.isFounder)
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...founders, ...rest];
}

function docToPublic(doc: {
  name: string;
  role: string;
  bio: string;
  quote: string;
  expertise?: string[];
  badge: string;
  badgeColor: string;
  image?: string;
  hasImage?: boolean;
  icon: string;
  isFounder?: boolean;
}): PublicTeamMember {
  return {
    name: doc.name,
    role: doc.role,
    bio: doc.bio,
    quote: doc.quote,
    expertise: Array.isArray(doc.expertise) ? doc.expertise : [],
    badge: doc.badge,
    badgeColor: doc.badgeColor,
    image: doc.image ?? "",
    hasImage: !!doc.hasImage,
    icon: doc.icon,
    isFounder: !!doc.isFounder,
  };
}

export async function getPublicTeamMembers(): Promise<PublicTeamMember[]> {
  try {
    await connect();
    const count = await TeamMember.countDocuments();
    if (count === 0) {
      return sortPublicTeamMembers([...DEFAULT_PUBLIC_TEAM_MEMBERS]);
    }
    const docs = await TeamMember.find().lean();
    const mapped = docs.map((d) => docToPublic(d));
    return sortPublicTeamMembers(mapped);
  } catch {
    return sortPublicTeamMembers([...DEFAULT_PUBLIC_TEAM_MEMBERS]);
  }
}

export function toAdminRow(
  doc: {
    _id: unknown;
    name: string;
    role: string;
    bio: string;
    quote: string;
    expertise?: string[];
    badge: string;
    badgeColor: string;
    image?: string;
    hasImage?: boolean;
    icon: string;
    isFounder?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  },
): AdminTeamMemberRow {
  const base = docToPublic(doc);
  return {
    ...base,
    id: String(doc._id),
    createdAt:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : new Date().toISOString(),
    updatedAt:
      doc.updatedAt instanceof Date
        ? doc.updatedAt.toISOString()
        : new Date().toISOString(),
  };
}
