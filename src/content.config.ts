import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blogs = defineCollection({
    loader: glob({ pattern: "**\/[^_]*.mdx", base: "./src/content/blogs" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).default(["others"]),
        author: z.string().optional(),
        draft: z.boolean().optional(),
        featured: z.boolean().optional(),
    }),
});

export const collections = { blogs };
