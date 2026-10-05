import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import BaseHeader from "@/components/base/BaseHeader";
import BaseFooter from "@/components/base/BaseFooter";
import ConvexProvider from "@/components/providers/ConvexProvider";
import ThemeScript from "@/components/providers/ThemeScript";
import JsonLd from "@/components/seo/JsonLd";
import "@fontsource-variable/plus-jakarta-sans";
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="mx-auto flex min-h-screen w-full max-w-[62rem] flex-col px-6 text-[var(--text)] sm:px-8">
        <ThemeScript />
        <JsonLd baseUrl={baseUrl} />
        <ConvexProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <BaseHeader />
          <main id="main-content" className="pt-6 sm:pt-8" tabIndex={-1}>
            {children}
          </main>
          <BaseFooter />
        </ConvexProvider>
        <Analytics />
      </body>
    </html>
  );
}
