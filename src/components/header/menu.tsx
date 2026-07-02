import { useState } from "react";

import { Dropdown, Button, Label, Link, cn } from "@heroui/react";

import { links } from "@/lib/data";

export const Menu = ({ pathname }: { pathname: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="border-separator sticky top-0 z-40 w-full border-b bg-black backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
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
          </button>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          {/*  <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-accent font-medium"
              aria-current="page"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>*/}

          {links.map((link) => (
            <li className="relative">
              <a
                href={link.href}
                className={cn(
                  "group underline-animation relative z-20 mx-2 inline-flex rounded-lg font-semibold text-white uppercase transition-colors before:!h-[3px] hover:text-white",
                  link.href === "/"
                    ? pathname === "/" && "underline-active before:!h-[3px]"
                    : pathname.startsWith(link.href) && "underline-active",
                )}
                data-astro-prefetch
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </header>
      {isMenuOpen && (
        <div className="border-separator border-t md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="#" className="block py-2">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="text-accent block py-2 font-medium">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2">
                Pricing
              </Link>
            </li>
            <li className="border-separator mt-4 flex flex-col gap-2 border-t pt-4">
              <Link href="#" className="block py-2">
                Login
              </Link>
              <Button className="w-full">Sign Up</Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
