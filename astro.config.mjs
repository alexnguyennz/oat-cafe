import { defineConfig, fontProviders } from "astro/config";
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
      name: "Literata",
      cssVariable: "--font-dm-serif-display",
    },
  ],
  integrations: [
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
