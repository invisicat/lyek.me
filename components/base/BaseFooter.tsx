import ThemeToggle from "@/components/base/ThemeToggle";
import { CONTACT_LINKS } from "@/lib/contactLinks";

export default function BaseFooter() {
  return (
    <footer className="mt-auto pt-16 pb-8 text-xs">
      <nav aria-label="Contact and site links">
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {CONTACT_LINKS.map((link) => {
            const target = "target" in link ? link.target : undefined;

            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  target={target}
                  rel={target ? "noopener noreferrer" : undefined}
                  className="-mx-1 inline-flex min-h-6 items-center px-1 py-1 text-[var(--text-secondary)] hover:text-[var(--text)] hover:underline underline-offset-4"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-1 text-[var(--text-tertiary)]">
        <ThemeToggle />
      </div>
    </footer>
  );
}
