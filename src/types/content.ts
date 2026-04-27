export type ModelSpec = {
  power: string;
  workArea: string;
  speed: string;
  materialThickness: string;
};

export type MachineModel = {
  id: string;
  name: string;
  tier: string;
  badge: string;
  summary: string;
  image?: string;
  idealFor: string[];
  advantages: string[];
  specs: ModelSpec;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  id?: string;
  title: string;
  h1?: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  socialTitle?: string;
  socialDescription?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  status: 'draft' | 'published';
};
