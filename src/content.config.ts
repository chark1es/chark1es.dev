import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const skillSchema = z.object({
    skill: z.string(),
    skillLogo: z.string(),
});

const linkSchema = z.object({
    link: z.string(),
    linkLogo: z.string(),
});

const blogs = defineCollection({
    loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/blogs" }),
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

const experiences = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/experiences" }),
    schema: z.object({
        location: z.string(),
        position: z.string(),
        years: z.string(),
        logo: z.string(),
        logoWidth: z.number().optional(),
        logoHeight: z.number().optional(),
        skillType: z.string().optional(),
        skills: z.array(skillSchema).optional(),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: z.object({
        projectName: z.string(),
        projectRole: z.string(),
        projectTeamSize: z.string(),
        projectCompany: z.string(),
        projectCategory: z.string(),
        years: z.string(),
        logo: z.string(),
        logoWidth: z.number().optional(),
        logoHeight: z.number().optional(),
        technologies: z.array(skillSchema).optional(),
        links: z.array(linkSchema).optional(),
    }),
});

export const collections = { blogs, experiences, projects };
