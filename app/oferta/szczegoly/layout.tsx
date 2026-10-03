import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Szczegóły oferty animacji i eventów Wrocław | Pinky Party",
  description:
    "Szczegółowy cennik i program animacji dla dzieci oraz eventów we Wrocławiu i okolicach: urodziny, wesela, komunie, bale karnawałowe, festyny i warsztaty CardBlocks.",
  alternates: {
    canonical: "/oferta/szczegoly",
  },
  openGraph: {
    title: "Szczegóły oferty i cennik – Pinky Party Wrocław",
    description:
      "Szczegółowy program animacji dla dzieci i eventów okolicznościowych we Wrocławiu. Sprawdź pakiety i cennik.",
    url: "/oferta/szczegoly",
  },
};

export default function OfferDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
