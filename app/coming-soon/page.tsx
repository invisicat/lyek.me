import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coming Soon - Andy Lyek",
};

export default function ComingSoonPage() {
  return (
    <div className="stagger-1 animate-fade-in-up flex min-h-[50vh] flex-col items-start justify-center gap-6">
      <h1 className="font-serif text-4xl md:text-5xl">Coming Soon</h1>
      <p className="text-[var(--text-secondary)]">This page is still brewing.</p>
      <Image
        src="https://http.cat/418"
        alt="HTTP 418 - I'm a teapot"
        width={640}
        height={533}
        className="mt-4 w-full max-w-sm rounded opacity-80"
      />
    </div>
  );
}
