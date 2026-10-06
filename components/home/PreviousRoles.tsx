import { Fragment } from "react";
import Image from "next/image";

const companies: Record<string, { href: string; icon: string; iconClassName?: string }> = {
  photon: {
    href: "https://photon.codes/",
    icon: "/company-icons/photon.png",
  },
  "polylabs.ai": {
    href: "https://polylabs.ai/",
    icon: "/company-icons/polylabs.jpg",
    iconClassName: "size-[22px] max-w-none shrink-0",
  },
  craftigames: {
    href: "https://www.craftigames.net/",
    icon: "/company-icons/craftigames.png",
  },
};

export default function PreviousRoles({ text }: { text: string }) {
  const mentions = Array.from(
    text.matchAll(/\b(Photon|polylabs\.ai|CraftiGames)\b(\s*\([^)]*\))?/gi),
  );
  let end = 0;

  return (
    <p className="mt-5 text-xs leading-relaxed text-[var(--text-tertiary)]">
      {mentions.map((mention) => {
        const [fullMatch, name, role] = mention;
        const before = text.slice(end, mention.index);
        end = mention.index + fullMatch.length;
        const company = companies[name.toLowerCase()];

        return (
          <Fragment key={mention.index}>
            {before}
            <span className="inline-block whitespace-nowrap">
              <a
                href={company.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 align-baseline underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--text)] hover:decoration-current"
              >
                <span className="inline-flex size-3.5 shrink-0 items-center justify-center overflow-hidden">
                  <Image
                    src={company.icon}
                    alt=""
                    width={14}
                    height={14}
                    unoptimized
                    className={company.iconClassName ?? "size-3.5 object-contain"}
                  />
                </span>
                {name}
              </a>
              {role}
            </span>
          </Fragment>
        );
      })}
      {text.slice(end)}
    </p>
  );
}
