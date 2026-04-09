export type OfferKey = "urodziny" | "szkolne" | "firmowe" | "animacje" | "komunie" | "wesela" | "pikniki" | "bale" | "mikolajki";

export type OfferSection = {
  key: OfferKey;
  title: string;
  description: string;
  price: string;
  bullets: string[];
};

export type OfferData = {
  updatedAt: string;
  sections: OfferSection[];
};

export type GalleryImage = {
  id: string;
  title: string;
  url: string;
  category: OfferKey | "inne";
  created_at?: string;
};

export type GalleryData = {
  updatedAt: string;
  images: GalleryImage[];
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status?: string;
  created_at?: string;
};

export type ContactData = {
  updatedAt: string;
  messages: ContactMessage[];
};
