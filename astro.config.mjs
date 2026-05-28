import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";

export default defineConfig({
    site: "https://chark1es.dev/",
    output: "static",

    markdown: {
        remarkPlugins: [remarkToc, remarkReadingTime],
    },

    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
    },

    server: {
        host: true,
        port: 1341,
    },

    integrations: [
        AutoImport({
            imports: ["@/components/blog/Alert.astro"],
        }),
        expressiveCode({
            themes: ["github-light", "github-dark"],
            themeCssSelector: (theme) => `.${theme.name}`,
            defaultProps: {
                wrap: false,
                showLineNumbers: true,
            },
            styleOverrides: {
                borderRadius: "0.375rem",
                frames: {
                    shadowColor: "transparent",
                },
            },
        }),
        mdx(),
        sitemap(),
        react({
            include: ["**/react/*"],
        }),
    ],
});
