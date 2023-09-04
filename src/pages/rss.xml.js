import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@config";

export async function GET(context) {
    const posts = await getCollection("blogs");
    return rss({
        title: SITE.title,
        description: SITE.desc,
        site: context.site,
        items: posts.map((post) => ({
            ...post.data,
            link: `/blogs/${post.slug}/`
        }))
    });
}
