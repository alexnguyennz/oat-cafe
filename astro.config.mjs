import { defineConfig, fontProviders } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

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
    tailwind({
      applyBaseStyles: false,
    }),
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
});
