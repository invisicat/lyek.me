"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import BaseNav from "@/components/base/BaseNav";
import ThemeToggle from "@/components/base/ThemeToggle";

export default function MobileHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="md:hidden">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            aria-label="Go home"
            className="sidebar-logo block h-10 w-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Image src="/favicon.svg" alt="Andy Lyek" width={40} height={40} className="sidebar-logo-img h-10 w-10 rounded-lg" />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu-drawer"
            className="rounded-md p-2.5 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-40 bg-black/35 transition-opacity duration-200",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setIsOpen(false)}
      />

      <div
        id="mobile-menu-drawer"
        className={[
          "fixed top-14 right-0 left-0 z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b border-[var(--border)] bg-[var(--bg)] px-4 py-5 shadow-lg transition-all duration-300 ease-out",
          isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-[0.985] opacity-0",
        ].join(" ")}
      >
        <BaseNav />
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <a
            href="https://github.com/invisicat"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/andy-lyek/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://ko-fi.com/riceontopp"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Ko-fi"
          >
            <Coffee size={20} />
          </a>
          <a
            href="mailto:andy@lyek.me"
            className="rounded-md p-2 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
