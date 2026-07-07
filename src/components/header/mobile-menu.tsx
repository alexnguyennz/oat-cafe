import { useState } from "react";

import { Button, Link, cn } from "@heroui/react";

import { links } from "@/lib/data";

export const MobileMenu = ({ pathname }: { pathname: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="mb-5 flex w-full justify-center md:hidden">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            isIconOnly
            className="hover:bg-white/25 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="size-6"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
            >
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
        </div>

        {isMenuOpen && (
          <ul className="mt-5 flex flex-col gap-2">
            {links.map((link) => (
              <li>
                <a
                  href={link.href}
                  className={cn(
                    "group underline-animation relative z-20 mx-2 inline-flex rounded-lg font-semibold text-white uppercase transition-colors before:h-0.75! hover:text-white",
                    link.href === "/"
                      ? pathname === "/" && "underline-active before:h-0.75!"
                      : pathname.startsWith(link.href) && "underline-active",
                  )}
                  data-astro-prefetch
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
};
