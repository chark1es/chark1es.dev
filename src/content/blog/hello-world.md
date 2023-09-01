---
title: "Testing Testing 123"
description: "First Post - Hello World"
pubDate: 2023-04-02
heroImage: "/images/placeholder-hero.jpg"
featured: true
draft: false
tags:
    - post
    - guide
    - markdown
---

## Hello World

This is the first blog post here!

You can find me at <code>/src/content/post/hello-world.md</code>.

Here you can add/update/delete details and watch the changes live when running in develop mode.

The following is an example of a table of contents.

## Table of contents

## Using some markdown elements

You can have more markdown style guides in this [page](/blog/markdown-style-guide).

### Code Blocks

Here we have a simple JavaScript code block.

```js
let Testing = "I am a JavaScript code block.";
```

### Syntax highlighting theme

This is styled by Prism, set via the [config](https://docs.astro.build/en/guides/markdown-content/#syntax-highlighting) for Astro.

You can choose your own theme from this [library](https://github.com/PrismJS/prism-themes), Grab a css file, drop it in <code>/public/styles/\*\*.css</code>.

The current theme installed is **Atom Dark**.

### Horizontal Line

Here is a horizontal rule.

---

### Lists

Here is a list:

-   Item number 1
-   Item number 2
-   Item number 3

And an ordered list:

1. Mills Lima
2. Germo Sojh
3. Luntok Christian

### Tables

Here is a table:

| Item                       | Price  | # In stock |
| -------------------------- | :----: | ---------: |
| This is a table item       | 10.55  |        123 |
| This is another table item | 420.69 |         23 |

## Tailwind CSS Prose styling

> This is a simple Block Quote
> I'm styled by Tailwind CSS prose plugin

<Image
    src="https://picsum.photos/600/380?random=1"
    alt="A random photo generated from picsum."
    width={600}
    height={380}
/>
