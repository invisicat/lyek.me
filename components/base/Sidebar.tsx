import Link from "next/link";
import Image from "next/image";
import { Coffee, Github, Linkedin, Mail } from "lucide-react";
import BaseNav from "@/components/base/BaseNav";
import ThemeToggle from "@/components/base/ThemeToggle";

export default function Sidebar() {
  return (
    <aside className="flex flex-col py-10 md:py-20 md:pr-8">
      <Link
        href="/"
        className="sidebar-logo block h-12 w-12 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <Image src="/favicon.svg" alt="Andy Lyek" width={48} height={48} className="sidebar-logo-img h-12 w-12 rounded-lg" />
      </Link>

      <BaseNav />

      <div className="mt-auto flex items-center gap-4 pt-12">
        <a
          href="https://github.com/invisicat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/andy-lyek/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://ko-fi.com/riceontopp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
          aria-label="Ko-fi"
        >
          <Coffee size={20} />
        </a>
        <a
          href="mailto:andy@lyek.me"
          className="text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
      </div>

      <ThemeToggle />
    </aside>
  );
}
