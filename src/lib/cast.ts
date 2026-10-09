/**
 * The cast: every creature on the site is a blobatar drawn from this palette.
 * Shapes are pinned to a position in the library's shape bands, so a "droplet"
 * stays a droplet; the seed still decides the face.
 */
export const INK = "#102127";

export const TONES = {
    coral: "#ff7a59",
    butter: "#ffd166",
    mint: "#7fe0b5",
    sky: "#9fb4ff",
    pink: "#ff9fc6",
} as const;

export type Tone = keyof typeof TONES;

export const SHAPES = {
    round: 0.1,
    organic: 0.35,
    boxy: 0.54,
    capsule: 0.65,
    nub: 0.745,
    cloud: 0.825,
    droplet: 0.89,
    hexagon: 0.93,
    sun: 0.965,
    triangle: 0.99,
} as const;

export type Shape = keyof typeof SHAPES;

export interface Look {
    traits: { shape: number };
    palette: { head: string; eye: string };
}

export const look = (shape: Shape, tone: Tone): Look => ({
    traits: { shape: SHAPES[shape] },
    palette: { head: TONES[tone], eye: INK },
});

const TONE_LIST = Object.keys(TONES) as Tone[];
const SHAPE_LIST: Shape[] = [
    "round",
    "organic",
    "boxy",
    "capsule",
    "nub",
    "cloud",
    "droplet",
    "hexagon",
];

const hash = (s: string) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
};

/** A stable creature for anything with a name: an employer, a post, a lab. */
export const creatureFor = (name: string) => {
    const h = hash(name.toLowerCase());
    const tone = TONE_LIST[h % TONE_LIST.length]!;
    const shape = SHAPE_LIST[(h >>> 8) % SHAPE_LIST.length]!;
    return { tone, shape };
};

/** The three section friends reused on the home page and their own pages. */
export const FRIENDS = {
    work: { seed: "work", shape: "boxy", tone: "butter" },
    projects: { seed: "projects", shape: "sun", tone: "mint" },
    writing: { seed: "writing", shape: "droplet", tone: "sky" },
    resume: { seed: "resume", shape: "capsule", tone: "pink" },
} as const satisfies Record<string, { seed: string; shape: Shape; tone: Tone }>;

export const ME = {
    seed: "Charles Nguyen",
    shape: "organic",
    tone: "coral",
} as const;
