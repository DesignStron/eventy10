import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import CookieConsent from "@/components/cookie-consent";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pinky Party Animacje & Eventy - Animacje dla dzieci Wrocław | Animator na urodziny, wesela, eventy",
    template: "%s - Pinky Party Animacje & Eventy",
  },
  description:
    "Pinky Party Animacje & Eventy - profesjonalny animator dla dzieci Wrocław. Organizujemy urodziny dla dzieci, animacje na wesela, komunie, Mikołajki, bale karnawałowe, festyny rodzinne, eventy firmowe i team building we Wrocławiu oraz Dolnym Śląsku. DJ, konferansjer, warsztaty kreatywne.",
  keywords: [
    "animacje dla dzieci Wrocław",
    "animator dla dzieci Wrocław",
    "animatorka dla dzieci Wrocław",
    "animator na urodziny Wrocław",
    "animacje na urodziny Wrocław",
    "urodziny dla dzieci Wrocław",
    "organizacja urodzin dla dzieci Wrocław",
    "atrakcje na urodziny dla dzieci Wrocław",
    "animacje dla dzieci na weselu Wrocław",
    "animacje na wesele Wrocław",
    "animator na wesele Wrocław",
    "atrakcje dla dzieci na weselu Wrocław",
    "animacje komunijne Wrocław",
    "animator na komunię Wrocław",
    "atrakcje na komunię Wrocław",
    "animacje na chrzciny Wrocław",
    "animator na chrzciny Wrocław",
    "animacje halloween Wrocław",
    "animator na Halloween Wrocław",
    "animacje mikołajkowe Wrocław",
    "Mikołajki dla dzieci Wrocław",
    "Mikołajki dla szkół Wrocław",
    "Mikołajki dla przedszkoli Wrocław",
    "bale karnawałowe dla dzieci Wrocław",
    "bal karnawałowy Wrocław",
    "dzień dziecka Wrocław",
    "atrakcje na dzień dziecka Wrocław",
    "festyny rodzinne Wrocław",
    "animator na festyn Wrocław",
    "atrakcje na festyn Wrocław",
    "pikniki firmowe Wrocław",
    "atrakcje na piknik firmowy Wrocław",
    "eventy dla dzieci Wrocław",
    "eventy rodzinne Wrocław",
    "eventy firmowe Wrocław",
    "animacje dla firm Wrocław",
    "warsztaty dla dzieci Wrocław",
    "warsztaty kreatywne dla dzieci Wrocław",
    "organizacja imprez dla dzieci Wrocław",
    "atrakcje dla dzieci Wrocław",
    "rozrywka dla dzieci Wrocław",
    "zabawy dla dzieci Wrocław",
    "animator dla przedszkola Wrocław",
    "animator dla szkoły Wrocław",
    "animacje dla przedszkoli Wrocław",
    "animacje dla szkół Wrocław",
    "oprawa muzyczna imprez Wrocław",
    "DJ na studniówkę Wrocław",
    "DJ na imprezę Wrocław",
    "DJ na event Wrocław",
    "prowadzenie imprez Wrocław",
    "konferansjer Wrocław",
    "team building Wrocław",
    "integracja firmowa Wrocław",
    "organizacja eventów Wrocław",
    "organizacja imprez firmowych Wrocław",
    "animator dla dzieci Dolny Śląsk",
    "animacje dla dzieci Dolny Śląsk",
    "animator dla dzieci Oleśnica",
    "animator dla dzieci Oława",
    "animator dla dzieci Trzebnica",
    "animator dla dzieci Legnica",
    "animator dla dzieci Lubin",
    "Pinky Party",
    "Pinky Party Wrocław",
    "Pinky Party Animacje i Eventy",
  ],
  metadataBase: new URL("https://pinkyparty.pl"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://pinkyparty.pl",
    siteName: "Pinky Party",
    title: "Pinky Party Animacje & Eventy",
    description:
      "Nowoczesna organizacja imprez: urodziny dla dzieci, eventy szkolne i imprezy firmowe. Profesjonalnie, dynamicznie i z energią.",
    images: [
      {
        url: "/Logo_1_raster_lowres.png",
        width: 1200,
        height: 630,
        alt: "Pinky Party Animacje & Eventy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinky Party Animacje & Eventy",
    description:
      "Nowoczesna organizacja imprez: urodziny dla dzieci, eventy szkolne i imprezy firmowe.",
    images: ["/Logo_1_raster_lowres.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/Plyta_raster_lowres.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
      style={{ height: "100vh", width: "100%" }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.classList.toggle('theme-light', theme === 'light');
                document.documentElement.classList.toggle('theme-dark', theme === 'dark');
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Pinky Party Animacje & Eventy",
              "description": "Profesjonalny animator dla dzieci Wrocław. Organizujemy urodziny dla dzieci, animacje na wesela, komunie, Mikołajki, bale karnawałowe, festyny rodzinne, eventy firmowe i team building we Wrocławiu oraz Dolnym Śląsku.",
              "url": "https://pinkyparty.pl",
              "telephone": "+48 XXX XXX XXX",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Wrocław",
                "addressRegion": "Dolny Śląsk",
                "addressCountry": "PL"
              },
              "areaServed": [
                "Wrocław",
                "Oleśnica",
                "Oława",
                "Trzebnica",
                "Legnica",
                "Lubin",
                "Dolny Śląsk"
              ],
              "priceRange": "$$",
              "openingHours": "Mo-Su 00:00-23:59",
              "sameAs": [
                "https://www.instagram.com/pinkyparty.eventy"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Usługi animacji i eventów",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Animacje dla dzieci Wrocław",
                      "description": "Profesjonalne animacje dla dzieci we Wrocławiu i okolicach"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Animator na urodziny Wrocław",
                      "description": "Animator na urodziny dla dzieci we Wrocławiu"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Animacje na wesela Wrocław",
                      "description": "Animacje dla dzieci na weselach we Wrocławiu"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Animacje komunijne Wrocław",
                      "description": "Atrakcje komunijne dla dzieci we Wrocławiu"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mikołajki dla dzieci Wrocław",
                      "description": "Animacje mikołajkowe dla szkół i przedszkoli"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Eventy firmowe Wrocław",
                      "description": "Organizacja eventów firmowych i integracji"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "DJ na imprezę Wrocław",
                      "description": "Oprawa muzyczna imprez i eventów"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Team building Wrocław",
                      "description": "Integracja firmowa i team building"
                    }
                  }
                ]
              }
            }),
          }}
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column", margin: 0, overflowX: "hidden" }}>
        <SiteHeader />
        <main style={{ flex: 1 }}>{children}</main>
        <CookieConsent />
      </body>
    </html>
  );
}