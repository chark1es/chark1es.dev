# DESIGN.md: chark1es.dev

The visual system, recorded from the built site. PRODUCT.md owns product truth;
this file owns the durable look.

## World: the blobatar cast

The site is populated by blobatars (blobatar.dev). Every section, employer,
project and post has its own creature, and the colour of the site comes from
them rather than from a brand accent. Dark ground, flat colour, soft shapes,
one big character on the home page.

Rules the design holds to:

- No gradients, glass, hairline-rule tables, mono-caps eyebrows or numbered
  sections. Dividers are dotted; labels are stickers cut slightly off-square.
- Colour is flat and always belongs to a creature: coral (Charles), butter
  (work), mint (projects), sky (writing), pink (résumé).
- Anything that moves is a blobatar or reacts to one. Motion is springy
  (`cubic-bezier(0.3, 1.6, 0.5, 1)`) and always off under reduced motion.
- Copy is first person and plain. No em dashes, no "seamless", no taglines.

## Palette (`src/styles/tokens.css`)

| Token                              | Value                                             | Role                                  |
| ---------------------------------- | ------------------------------------------------- | ------------------------------------- |
| `--color-bg`                       | `#102127`                                         | Night-garden ground                   |
| `--color-bg-2`                     | `#0c1a1f`                                         | Footer, code, cast shadows            |
| `--color-surface`                  | `#16303a`                                         | Chips, sleeping giants (tone on tone) |
| `--color-text`                     | `#f6f1e6`                                         | Cream, display and body               |
| `--color-text-muted`               | `#bccbc9`                                         | Secondary prose                       |
| `--color-text-faint`               | `#8fa6a6`                                         | Dates, credits                        |
| `--color-ink`                      | `#102127`                                         | Text and eyes on any pastel           |
| coral / butter / mint / sky / pink | `#ff7a59` `#ffd166` `#7fe0b5` `#9fb4ff` `#ff9fc6` | The cast                              |

Pastels only ever carry ink text. Cream text only sits on the dark ground.

## Light theme

Same cast on warm cream paper. Toggle in the masthead (persisted in
localStorage) or `?theme=light` / `?theme=dark` in the URL. Dark stays the
default. `html[data-theme="light"]` in `tokens.css` swaps the neutrals and the
`--color-line-*` set (pastel lines go deeper so they read on cream). Pastels
still only carry ink text; code blocks stay a dark plate in both themes; the
sleeping background giants are drawn once per theme (`.on-dark` / `.on-light`).

## Type (self-hosted in `/public/fonts`)

- **Bricolage Grotesque** (variable) for headings, labels, buttons. Weight 700,
  mixed case, slight negative tracking.
- **Figtree** for everything you read: body 1rem/1.65, lede 1.2–1.3rem/1.5,
  article prose 1.0625rem/1.75.

## The cast (`src/lib/cast.ts`)

Shapes are pinned by position in blobatar's shape bands; the seed still picks
the face.

| Who                                | Shape                    | Tone   |
| ---------------------------------- | ------------------------ | ------ |
| Charles                            | organic                  | coral  |
| Work                               | boxy                     | butter |
| Projects                           | sun                      | mint   |
| Writing                            | droplet                  | sky    |
| Résumé                             | capsule                  | pink   |
| Employers, smaller projects, posts | from `creatureFor(name)` |        |

## Behaviour (React islands in `src/components/react`)

- `Cast.tsx`, the home stage. The hero follows the pointer, wears a different
  mood while a friend is hovered or focused, answers pokes with a rotating line,
  does a small unprompted mood every 6–11 s, falls asleep after 30 s idle and
  wakes startled.
- `Mascot.tsx`, a single creature for the inner pages: gaze, hover mood, poke.
- `Blobatar.astro` renders static ones (header mark, sleeping background giants).

Pages are plain full loads (no client router). The router was swapping pages
in place and left the home stage in a stale state after navigating back; a full
load always starts from a clean hero.

## Layout

- Home fits one viewport at desktop widths (no scroll). The stage is a size
  container (`cqw`/`cqh`), so the hero and the friends scale with it. The speech
  bubble is anchored by its right edge and tail, so it always points at the
  hero's head. Below 56rem it stacks: copy, then the hero, then the four friends
  in a staggered row. Below 36rem the nav becomes its own full-width row.
- Inner pages: big title with the section's creature at the right, then content
  in a ~52rem column. Featured projects are flat pastel panels with a creature
  peeking over the top edge.
