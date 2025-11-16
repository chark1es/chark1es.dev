import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCodeTitles from "remark-code-titles";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import expressiveCode from "astro-expressive-code";
// https://astro.build/config
export default defineConfig({
    site: "https://chark1es.dev/",
    markdown: {
        syntaxHighlight: "prism",
        remarkPlugins: [remarkToc, remarkReadingTime],
    },
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
        ssr: {
            noExternal: ["path-to-regexp"],
            external: ["svgo"],
        },
    },

    output: "server",
    adapter: node({
        mode: "standalone",
    }),

    server: {
        host: true,
        port: process.env.PORT ? Number(process.env.PORT) : 8080,
    },

    integrations: [
        AutoImport({
            imports: [
                "@/components/blog/Alert.astro",
                {
                    "accessible-astro-components": ["Notification"],
                }, // "@/components/blog/Codeblock.astro"
            ],
        }),
        expressiveCode(),
        mdx(),
        sitemap(),
        tailwind(),
        react({
            include: ["**/react/*"],
        }),
    ],

    content: {
        collections: {
            blogs: {
                directory: "src/content/blogs",
            },
        },
    },
});
