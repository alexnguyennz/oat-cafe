import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://oatcafe.co.nz",
  prefetch: true,
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "League Spartan",
      cssVariable: "--font-league-spartan",
      weights: [300, 400, 600, 700],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Literata",
      cssVariable: "--font-literata",
    },
  ],
  integrations: [
    react(),
    sitemap(),
    icon({
      iconDir: "src/assets/icons",
      include: {
        lucide: [
          "phone",
          "external-link",
          "map",
          "copyright",
          "corner-right-up",
          "clock-8",
          "at-sign",
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
