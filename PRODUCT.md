# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: Astro 6 (static output), Tailwind CSS v4, React islands
(`@astrojs/react`), MDX blog, `@blobatar/react` for avatars. Deployment is a
static build served by Bun/serve behind Coolify.

## Users

Recruiters, hiring managers, and technical peers evaluating a recent UC San Diego CS
graduate for software-engineering roles. They arrive from a resume, LinkedIn, or
a link in an application, and they skim — often on a laptop with several other
tabs open, sometimes on a phone. They want to know who Charles is and whether
the work is real, in seconds.

## Product Purpose

A personal portfolio for Charles Nguyen. It exists to earn a reply: get a
recruiter to open the resume or send an email, and get a peer to recognize that
the projects are actually shipped. Success is a visitor who understands the
person and the work without effort and takes one next action.

## Positioning

Not a template CV page — a builder's portfolio with a face. The work spans
whole products (ChopChop, Aulora, IEEE's self-hosted infrastructure) rather than
isolated assignments, and the site itself is a demonstration of that craft.

## Operating Context

Visitors review fast and rarely scroll far. The resume PDF, GitHub, and email
are the real destinations. Experience and projects are the evidence; the blog is
optional depth. Everything must read correctly on mobile.

## Capabilities and Constraints

Static Astro site. Content lives in `src/content` (experiences, projects, blogs)
and must be preserved. Static routes: home, work, projects, blog index, blog
posts, resume PDF, RSS, sitemap, 404. Blobatar is available for deterministic
avatars. No backend, no fabricated claims, no invented testimonials or metrics.

## Brand Commitments

- Name and handle: Charles Nguyen / chark1es.dev.
- The user asked for a **playful**, personal feel rather than a corporate one.
- **Dark mode** was chosen by the user. The whole site is themed around blobatars.
- Blobatars (blobatar.dev) were explicitly requested and must remain part of the
  identity.

## Evidence on Hand

Real experience: ElitAxis LLC (Software Engineer), IEEE UCSD (Vice Chair
Projects, Vice Chair Finance, Webmaster), HDSI Lab 3.0, Chadwick School, Ralphs.
Real projects: ChopChop, Aulora, IEEE dashboard/infrastructure, GDPT Anoma,
this site. One blog post. Resume PDF. Real logos for ChopChop and Aulora.
Absent: testimonials, press, user numbers, employer-verified metrics.

## Product Principles

1. The work leads; the interface gets out of its way.
2. One idea per screen, readable in seconds.
3. Playful is a point of view, not decoration; every playful move must earn its
   place.
4. Show shipped products, not a list of technologies.
5. Always give an obvious next action (email, resume, source).

## Accessibility & Inclusion

Standard web accessibility: keyboard navigable, visible focus, sufficient
contrast, respects `prefers-reduced-motion`.
