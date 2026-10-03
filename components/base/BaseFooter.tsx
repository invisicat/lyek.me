import ThemeToggle from "@/components/base/ThemeToggle";

const contactLinks = [
  { href: "mailto:andy@lyek.me", label: "Email" },
  { href: "https://github.com/invisicat", label: "GitHub" },
  { href: "https://www.linkedin.com/in/andy-lyek/", label: "LinkedIn" },
  { href: "https://ko-fi.com/riceontopp", label: "Ko-fi" },
];

export default function BaseFooter() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] pt-4 pb-7 text-sm sm:mt-16 sm:pb-9">
      <nav aria-label="Contact links">
        <ul className="flex flex-wrap gap-x-5">
          {contactLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="inline-flex min-h-11 items-center text-[var(--text-secondary)] hover:text-[var(--text)] hover:underline underline-offset-4"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 text-xs text-[var(--text-tertiary)]">
        <p>&copy; Andy Lyek</p>
        <ThemeToggle />
      </div>
    </footer>
  );
}
