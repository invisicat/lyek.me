import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Sidebar from "@/components/base/Sidebar";
import MobileHeader from "@/components/base/MobileHeader";
import BaseFooter from "@/components/base/BaseFooter";
import ConvexProvider from "@/components/providers/ConvexProvider";
import ThemeScript from "@/components/providers/ThemeScript";
import JsonLd from "@/components/seo/JsonLd";
import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/jetbrains-mono";
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
    <html lang="en" className="dark">
      <body className="mx-auto flex min-h-screen max-w-6xl flex-col bg-[var(--bg)] px-4 text-[var(--text)] transition-colors duration-300 md:flex-row md:px-8">
        <ThemeScript />
        <JsonLd baseUrl={baseUrl} />
        <ConvexProvider>
          <MobileHeader />
          <div className="mb-8 h-fit md:sticky md:top-0 md:mb-0 md:self-start">
            <Sidebar />
          </div>
          <div className="flex flex-1 flex-col md:pl-16 lg:pl-24">
            <section className="w-full max-w-2xl flex-1 py-6 md:py-16">
              {children}
            </section>
            <BaseFooter />
          </div>
        </ConvexProvider>
        <Analytics />
      </body>
    </html>
  );
}
