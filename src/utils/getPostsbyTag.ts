import type { CollectionEntry } from "astro:content";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
    posts.filter((post) => post.data.tags.includes(tag));

export default getPostsByTag;
