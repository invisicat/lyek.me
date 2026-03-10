"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/AndyLyek_Resume.pdf", label: "Resume", target: "_blank" },
  { href: "/coming-soon", label: "Blog" },
];

export default function BaseNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-8 md:mt-12">
      <ul className="flex flex-col gap-4 md:gap-6">
        {links.map(({ href, label, target }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                target={target}
                className={[
                  "relative inline-flex min-h-11 items-center py-1 font-serif text-xl transition-colors duration-200",
                  "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-[var(--accent)] after:transition-all after:duration-300",
                  isActive
                    ? "text-[var(--text)] after:w-full"
                    : "text-[var(--text-secondary)] hover:text-[var(--text)] after:w-0 hover:after:w-full",
                ].join(" ")}
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
