import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@config";

export async function GET(context) {
    const posts = await getCollection("blogs", ({ data }) => !data.draft);
    return rss({
        title: SITE.title,
        description: SITE.desc,
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: `/blogs/${post.id}/`,
        })),
    });
}
