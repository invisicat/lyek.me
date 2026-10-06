import { Coffee, FileText, Github, Linkedin, Mail } from "lucide-react";
import { CONTACT_LINKS } from "@/lib/contactLinks";

const icons = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  resume: FileText,
  kofi: Coffee,
};

export default function ContactLinks() {
  return (
    <nav aria-label="Contact links">
      <ul className="flex items-center gap-1">
        {CONTACT_LINKS.filter((link) => link.id !== "projects").map((link) => {
          const Icon = icons[link.id];
          const target = "target" in link ? link.target : undefined;

          return (
            <li key={link.id}>
              <a
                href={link.href}
                target={target}
                rel={target ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                title={link.label}
                className="flex size-7 items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text)]"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
