import type { Service } from "@/types/service";
import { SERVICES } from "@/lib/services-data";

/** Seeded into MongoDB when the services collection is empty */
export const DEFAULT_SERVICES: Omit<Service, "sortOrder">[] = SERVICES.map(
  (s) => ({
    slug: s.id,
    title: s.title,
    description: s.description,
    image: s.image,
    color: s.color,
    overview: s.details.overview,
    deliverables: s.details.deliverables,
    goodFor: s.details.goodFor,
    typicalTimeline: s.details.typicalTimeline,
  }),
);

