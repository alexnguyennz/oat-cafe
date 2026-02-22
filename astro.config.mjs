import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://oatcafe.co.nz",
  integrations: [
    tailwind({
      applyBaseStyles: false,
      //nesting: true
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
