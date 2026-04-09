import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

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
    default: "Różowy Event — Organizacja Imprez",
    template: "%s — Różowy Event",
  },
  description:
    "Nowoczesna organizacja imprez: urodziny dla dzieci, eventy szkolne i imprezy firmowe. Profesjonalnie, dynamicznie i z energią.",
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
      style={{ height: "100%" }}
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
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column", margin: 0 }}>
        <SiteHeader />
        <main style={{ flex: 1 }}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}