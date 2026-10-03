"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/AndyLyek_Resume.pdf", label: "Resume", target: "_blank" },
];

export default function BaseNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-5 text-sm sm:gap-6">
        {links.map(({ href, label, target }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                target={target}
                rel={target ? "noopener noreferrer" : undefined}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-h-11 items-center py-1 hover:text-[var(--text)] hover:underline underline-offset-4 ${
                  isActive ? "text-[var(--text)] underline" : "text-[var(--text-secondary)]"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
