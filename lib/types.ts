export type OfferKey = "urodziny" | "szkolne" | "firmowe" | "animacje" | "komunie" | "wesela" | "pikniki" | "bale" | "mikolajki";

export type OfferSection = {
  key: string; // ID for internal use (e.g., oferta-1234567890)
  category: string; // Category slug (e.g., urodziny, wesela)
  categoryLabel: string; // Display name (e.g., Urodziny, Wesela)
  title: string;
  description: string;
  price: string;
  bullets: string[];
  images: string[];
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
