import { useState } from "react";

import { Button, cn } from "@heroui/react";

import { links } from "@/lib/data";

export const MobileMenu = ({ pathname }: { pathname: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex w-full flex-col items-center md:hidden">
      <Button
        variant="ghost"
        isIconOnly
        className="hover:bg-white/25"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Menu</span>
        <svg className="size-6" fill="none" stroke="white" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </Button>

      {isMenuOpen && (
        <ul className="mt-3 flex w-full flex-col items-center gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative isolate z-20 inline-flex overflow-hidden px-2 py-0.5 font-semibold uppercase transition-colors",
                  "text-white before:absolute before:inset-x-0 before:bottom-0 before:z-0 before:h-0 before:bg-white before:content-['']",
                  "before:transition-[height] before:duration-200 before:ease-out hover:text-black hover:before:h-full",
                  link.href === "/"
                    ? pathname === "/" && "bg-white text-black before:h-full"
                    : pathname.startsWith(link.href) &&
                        "bg-white text-black before:h-full",
                )}
                data-astro-prefetch
              >
                <span className="relative z-10">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
