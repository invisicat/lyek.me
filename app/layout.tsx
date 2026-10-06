import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import BaseHeader from "@/components/base/BaseHeader";
import BaseFooter from "@/components/base/BaseFooter";
import ConvexProvider from "@/components/providers/ConvexProvider";
import ThemeScript from "@/components/providers/ThemeScript";
import JsonLd from "@/components/seo/JsonLd";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Andy Lyek - Software Engineer",
  description:
    "Software engineer and EECS student at Stanford University. I build web, mobile, and backend systems.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Andy Lyek - Software Engineer",
    description:
      "Software engineer and EECS student at Stanford University. I build web, mobile, and backend systems.",
    images: ["/favicon3.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andy Lyek - Software Engineer",
    description:
      "Software engineer and EECS student at Stanford University. I build web, mobile, and backend systems.",
    images: ["/favicon3.svg"],
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mx-auto flex min-h-dvh w-full max-w-[34rem] flex-col px-6 pt-24 text-[var(--text)] sm:pt-[clamp(6rem,22vh,14rem)] has-[.projects-page]:max-w-[46rem] has-[.projects-page]:pt-12 sm:has-[.projects-page]:pt-16">
        <ThemeScript />
        <JsonLd baseUrl={baseUrl} />
        <ConvexProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <BaseHeader />
          <main id="main-content" className="pt-4" tabIndex={-1}>
            {children}
          </main>
          <BaseFooter />
        </ConvexProvider>
        <Analytics />
      </body>
    </html>
  );
}
