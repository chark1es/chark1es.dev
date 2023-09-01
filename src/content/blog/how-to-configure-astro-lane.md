---
title: "How to configure Astro Lane Theme"
description: "Astro Lane is an awesome customizable blog theme for Astro, You'll be able to easily personalize everything to suit your unique style. In this post, we'll walk you through some simple ways to make customizations in the config file."
pubDate: 2023-04-15
heroImage: ""
featured: true
draft: false
tags:
    - config
    - docs
---

Astro Lane is a great customizable blog theme for Astro, allowing you to easily make changes and give your site a personal touch. In this post, we'll show you some straightforward ways to customize the default data on your site.

## Table of contents

## Configuring SITE defaults

If you're looking to configure some global data on your site, you'll want to modify the SITE constant in the <code>/src/config.ts</code> file. Here, you can change things like your site's URL, author, description, title, and more. You can also set the number of posts to display per page.

```ts
export const SITE: Site = {
    siteUrl: "https:/www.lane.avenuelabs.co", // Global Site URL
    author: "Christian Luntok | Avenue Labs", // Author for Posts
    desc: "A personal portfolio landing template for developers and designers. Made by Avenue Labs.", // Default site description
    title: "Astro Lane | Avenue Labs", // Default site title
    ogImage: "images/lane.png", // Default ogImage
    keywords:
        "Personal portfolio, landing page, page template, developer portfoliom designer portfolio", //Default Keywords
    postPerPage: 3 // Default number of posts per page
};
```

## Configuring Project data

Astro Lane allows you to display your projects on the homepage using the card components provided. You can configure the project data in two ways:

### Option 1: Add project data to the data folder

You can add your project data to the data folder in your project directory. You can create a new JSON file, for example projects.json, and add your project data to it:

```json
[
    {
        "id": "1",
        "title": "Avenue Labs",
        "logo": "/icons/avenue-icon.png",
        "link": "https://www.avenuelabs.co/",
        "shortExcerpt": "After-hours digital playground."
    }
]
```

### Option 2: Fetch project data from an API

Alternatively, you can fetch your project data from an API using fetch or a library like axios. You can create an endpoint that returns your project data in JSON format, and then use fetch. <code>.astro</code> files can fetch remote data at build time to help generate your pages.

> For more information about Astro's API data fetching documentation - Please see [https://docs.astro.build/en/guides/data-fetching/](https://docs.astro.build/en/guides/data-fetching/).

```jsx
---
const response = await fetch('https://randomuser.me/api/');
const projectResponse = await response.json();
const { project } = projectResponse.data;
---
<p>{project.title}</p>
```

## Configuring Social links

The SOCIALS constant in the <code>config.ts</code> file is where you can set up the social links for your site. You can add links to various social media platforms such as Facebook, Twitter, Instagram, LinkedIn, and more. For each social media object, you can specify the name, URL, icon, and title. You can also enable or disable the link's visibility on your site.

By configuring these settings in your <code>config.ts</code> file, you can easily make your site more unique and tailored to your preferences. With Astro Lane, you'll have full control over your blog's appearance and functionality, so go ahead and start customizing!
