import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import AIChatbot from "@/components/ui/AIChatbot";
import { IntroProvider } from "@/components/intro/IntroProvider";
import IntroVideo from "@/components/intro/IntroVideo";

// ── Fonts ─────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// ── Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Nayan Kumar | Full Stack Developer Portfolio",
  description:
    "Professional portfolio of Nayan Kumar, Full Stack Developer, React Developer, AI Enthusiast and B.Tech Student.",
  keywords: [
    "Nayan Kumar",
    "Full Stack Developer",
    "React Developer",
    "Portfolio",
    "Software Engineer",
    "Bihar",
    "India",
  ],
  authors: [{ name: "Nayan Kumar", url: "https://github.com/nayankumar" }],
  creator: "Nayan Kumar",
  metadataBase: new URL("https://potfilolie.vercel.app"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Nayan Kumar | Full Stack Developer Portfolio",
    description:
      "Professional portfolio of Nayan Kumar, Full Stack Developer, React Developer, AI Enthusiast and B.Tech Student.",
    siteName: "Nayan Kumar Portfolio",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Nayan Kumar — Full Stack Developer Portfolio",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayan Kumar | Full Stack Developer Portfolio",
    description:
      "Professional portfolio of Nayan Kumar, Full Stack Developer, React Developer, AI Enthusiast and B.Tech Student.",
    images: ["/api/og"],
    creator: "@nayankumar",
  },
  robots: { index: true, follow: true },

  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ── JSON-LD Schema ────────────────────────────────────────────
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nayan Kumar",
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer and AI enthusiast building polished web applications, cloud systems, and performance-focused user experiences.",
    url: "https://potfilolie.vercel.app",
    sameAs: [
      "https://github.com/nayankumar",
      "https://www.linkedin.com/in/nayan-kumar",
      "https://twitter.com/nayankumar",
      "https://www.instagram.com/nayankumar",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Desh Bhagat University",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://potfilolie.vercel.app",
    name: "Nayan Kumar Portfolio",
    description:
      "Portfolio website showcasing full-stack development, AI projects, education, certifications, and contact details for recruiters.",
    publisher: {
      "@type": "Organization",
      name: "Nayan Kumar",
      url: "https://potfilolie.vercel.app",
    },
  },
];

// ── Root layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="cyber-dark" /* default — ThemeProvider overrides from localStorage */
      suppressHydrationWarning /* required by next-themes */
    >
      <body
        className={`${inter.variable} ${jetbrains.variable}`}
        suppressHydrationWarning
      >
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider>
          {/* Skip to Main Content (Accessibility) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--accent-1)] focus:text-black focus:font-bold focus:rounded-md focus:outline-none"
          >
            Skip to main content
          </a>

          {/* Custom cursor (hidden on touch) */}
          <CustomCursor />

          <IntroProvider>
            {/* Sticky navigation */}
            <Navbar />

            {/* Intro overlay */}
            <IntroVideo />

            {/* Page content */}
            <main id="main-content">{children}</main>

            <Footer />
            <AIChatbot />

            {/* Floating theme switcher (bottom-right) */}
            <ThemeSwitcher />
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
