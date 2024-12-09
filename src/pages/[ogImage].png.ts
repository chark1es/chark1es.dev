import { getCollection } from "astro:content";
import generateOgImage from "@/utils/generateOgImage";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
    const ogImage = await generateOgImage(params.ogImage);
    return new Response(JSON.stringify({ body: ogImage }), {
        headers: { "Content-Type": "application/json" },
    });
};

const postImportResult = await getCollection(
    "blogs",
    ({ data }) => !data.draft,
);
const posts = Object.values(postImportResult);

export const prerender = true;

export function getStaticPaths() {
    return posts
        .filter(({ data }) => !data.heroImage)
        .map(({ data }) => ({
            params: { ogImage: data.title },
        }));
}
