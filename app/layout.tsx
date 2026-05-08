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
    default: "Pinky Party Animacje & Eventy",
    template: "%s - Pinky Party",
  },
  description:
    "Nowoczesna organizacja imprez: urodziny dla dzieci, eventy szkolne i imprezy firmowe. Profesjonalnie, dynamicznie i z energią.",
  metadataBase: new URL("https://pinkyparty.pl"),
  alternates: {
    canonical: "/",
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
    icon: "/Plyta_raster_lowres.png",
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
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column", margin: 0, overflowX: "hidden" }}>
        <SiteHeader />
        <main style={{ flex: 1 }}>{children}</main>
        <CookieConsent />
      </body>
    </html>
  );
}