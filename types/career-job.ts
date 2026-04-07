export type CareerJob = {
  title: string;
  type: string;
  experience: string;
  compensation: string;
  description: string;
  benefits: string[];
  tags: string[];
  sortOrder: number;
};

export type CareerJobWithId = CareerJob & { id: string };
