import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"blogs">[]) =>
    posts
        .filter(({ data }) => !data.draft)
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

export default getSortedPosts;
