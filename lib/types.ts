export type OfferKey = "urodziny" | "animacje" | "komunie" | "wesela" | "pikniki" | "bale" | "mikolajki";

export type OfferSection = {
  key: OfferKey;
  title: string;
  description: string;
  priceFromPLN: number;
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
  createdAt: string;
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
  createdAt: string;
  status: "nowe" | "w_toku" | "zamkniete";
};

export type ContactData = {
  updatedAt: string;
  messages: ContactMessage[];
};
