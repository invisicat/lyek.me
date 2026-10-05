import ThemeToggle from "@/components/base/ThemeToggle";

const contactLinks = [
  { href: "mailto:andy@lyek.me", label: "Email" },
  { href: "https://github.com/invisicat", label: "GitHub" },
  { href: "https://www.linkedin.com/in/andy-lyek/", label: "LinkedIn" },
  { href: "/AndyLyek_Resume.pdf", label: "Resume", target: "_blank" },
  { href: "https://ko-fi.com/riceontopp", label: "Ko-fi" },
  { href: "/projects", label: "Projects" },
];

export default function BaseFooter() {
  return (
    <footer className="mt-auto pt-16 pb-8 text-xs">
      <nav aria-label="Contact and site links">
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {contactLinks.map(({ href, label, target }) => (
            <li key={href}>
              <a
                href={href}
                target={target}
                rel={target ? "noopener noreferrer" : undefined}
                className="-mx-1 inline-flex min-h-6 items-center px-1 py-1 text-[var(--text-secondary)] hover:text-[var(--text)] hover:underline underline-offset-4"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-1 text-[var(--text-tertiary)]">
        <ThemeToggle />
      </div>
    </footer>
  );
}
