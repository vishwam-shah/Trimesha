import type { ServiceWithId } from "@/types/service";

export function serializeServiceDoc(doc: {
  _id: unknown;
  slug: string;
  title: string;
  description: string;
  image: string;
  color: string;
  overview: string;
  deliverables: string[];
  goodFor: string[];
  typicalTimeline: string;
  sortOrder: number;
}): ServiceWithId {
  return {
    id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    image: doc.image,
    color: doc.color,
    overview: doc.overview,
    deliverables: doc.deliverables ?? [],
    goodFor: doc.goodFor ?? [],
    typicalTimeline: doc.typicalTimeline,
    sortOrder: doc.sortOrder,
  };
}
