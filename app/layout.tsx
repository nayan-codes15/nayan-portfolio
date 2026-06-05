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
  title: "Nayan Deep | CS Student & Aspiring Software Developer",
  description:
    "Portfolio of Nayan Deep, B.Tech CSE student at Desh Bhagat University. Skilled in C, C++, Java, Python, AI basics, AWS, and more. Seeking SDE/AI/Cloud internships.",
  keywords: [
    "Nayan Deep",
    "CS Student",
    "Portfolio",
    "Software Developer",
    "Internship",
    "Cloud Computing",
    "AWS",
    "React",
    "TypeScript",
    "Desh Bhagat University",
    "AI basics",
    "Data Analytics",
    "C",
    "C++",
    "Java",
    "Python",
  ],
  authors: [{ name: "Nayan Deep", url: "https://github.com/nayan-codes15" }],
  creator: "Nayan Deep",
  metadataBase: new URL("https://potfilolie.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Nayan Deep | CS Student & Aspiring Software Developer",
    description:
      "Portfolio of Nayan Deep, B.Tech CSE student at Desh Bhagat University. Skilled in C, C++, Java, Python, AI basics, AWS, and more. Seeking SDE/AI/Cloud internships.",
    siteName: "Nayan Deep Portfolio",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Nayan Deep — CS Student & Aspiring Software Developer",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayan Deep | CS Student & Aspiring Software Developer",
    description:
      "Portfolio of Nayan Deep, B.Tech CSE student at Desh Bhagat University. Seeking SDE/AI/Cloud internships.",
    images: ["/api/og"],
    creator: "@nayandeep",
  },
  robots: { index: true, follow: true },

  icons: {
    apple: "/icon.png", // Add icon.png to public/
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
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nayan Deep",
  jobTitle: "CS Student & Aspiring Software Developer",
  url: "https://potfilolie.vercel.app",
  sameAs: [
    "https://github.com/nayan-codes15",
    "https://www.linkedin.com/in/nayan-deep-460119279",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Desh Bhagat University",
  },
};

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
