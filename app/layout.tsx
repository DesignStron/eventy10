import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import CookieConsent from "@/components/cookie-consent";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Pinky Party – Animacje dla dzieci Wrocław | Urodziny, wesela, eventy",
    template: "%s | Pinky Party Animacje & Eventy",
  },
  description:
    "Profesjonalne animacje dla dzieci i organizacja eventów we Wrocławiu i okolicach. Urodziny, wesela, komunie, Mikołajki, bale karnawałowe, festyny, eventy firmowe i team building. Pinky Party.",
  metadataBase: new URL("https://pinkyparty.pl"),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://pinkyparty.pl",
    siteName: "Pinky Party",
    title: "Pinky Party Animacje & Eventy",
    description:
      "Profesjonalne animacje dla dzieci i organizacja eventów we Wrocławiu i okolicach. Urodziny, wesela, komunie, festyny, eventy firmowe.",
    images: [
      {
        url: "/Logo_1_raster_lowres.png",
        width: 1200,
        height: 630,
        alt: "Pinky Party Animacje & Eventy – Wrocław",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinky Party Animacje & Eventy",
    description:
      "Profesjonalne animacje dla dzieci i organizacja eventów we Wrocławiu i okolicach.",
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
        <link rel="preconnect" href="https://qbcjyecssttdmvmtswcy.supabase.co" />
        <link rel="dns-prefetch" href="https://qbcjyecssttdmvmtswcy.supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://pinkyparty.pl/#localbusiness",
                "name": "Pinky Party Animacje & Eventy",
                "description": "Profesjonalne animacje dla dzieci i organizacja eventów we Wrocławiu i okolicach. Urodziny, wesela, komunie, Mikołajki, bale karnawałowe, festyny rodzinne, eventy firmowe i team building.",
                "url": "https://pinkyparty.pl",
                "telephone": "+48792987499",
                "email": "pinkyparty.eventy@gmail.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Wrocław",
                  "addressRegion": "Dolny Śląsk",
                  "addressCountry": "PL"
                },
                "areaServed": [
                  {
                    "@type": "City",
                    "name": "Wrocław"
                  },
                  {
                    "@type": "AdministrativeArea",
                    "name": "Dolny Śląsk"
                  }
                ],
                "sameAs": [
                  "https://www.instagram.com/pinkyparty.eventy",
                  "https://www.facebook.com/pinkyparty.eventy"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Usługi animacji i eventów",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Animacje dla dzieci",
                        "description": "Profesjonalne animacje dla dzieci we Wrocławiu i okolicach"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Animator na urodziny",
                        "description": "Animator na urodziny dla dzieci we Wrocławiu"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Animacje na wesele",
                        "description": "Animacje dla dzieci na weselach we Wrocławiu"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Animacje komunijne",
                        "description": "Atrakcje komunijne dla dzieci we Wrocławiu"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Mikołajki dla dzieci",
                        "description": "Animacje mikołajkowe dla szkół i przedszkoli we Wrocławiu"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Eventy firmowe i team building",
                        "description": "Organizacja eventów firmowych, pikników i integracji we Wrocławiu"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Oprawa muzyczna – DJ",
                        "description": "Profesjonalna oprawa muzyczna imprez i eventów we Wrocławiu"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Warsztaty CardBlocks",
                        "description": "Kreatywne warsztaty dla dzieci"
                      }
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://pinkyparty.pl/#website",
                "url": "https://pinkyparty.pl",
                "name": "Pinky Party Animacje & Eventy",
                "description": "Profesjonalne animacje dla dzieci i organizacja eventów we Wrocławiu i okolicach",
                "inLanguage": "pl-PL",
                "publisher": {
                  "@id": "https://pinkyparty.pl/#localbusiness"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://pinkyparty.pl/#magdalena",
                "name": "Magdalena Gałkowska",
                "jobTitle": "Animatorka i organizatorka eventów",
                "worksFor": {
                  "@id": "https://pinkyparty.pl/#localbusiness"
                },
                "url": "https://pinkyparty.pl/o-nas",
                "sameAs": [
                  "https://www.facebook.com/pinkyparty.eventy",
                  "https://www.instagram.com/pinkyparty.eventy"
                ]
              }
            ]),
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