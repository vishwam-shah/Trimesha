export type Service = {
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
};

export type ServiceWithId = Service & { id: string };

