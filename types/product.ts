export type ProductSlide = {
  place: string;
  title: string;
  title2: string;
  description: string;
  image: string;
  url: string;
  category: string;
  features: string[];
};

export type ProductSlideWithId = ProductSlide & { id: string };
