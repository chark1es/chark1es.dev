import {
    happy,
    idle,
    love,
    sad,
    scared,
    shy,
    sick,
    sleepy,
    smug,
    surprised,
    thinking,
    unsure,
    wink,
    type Expression,
} from "blobatar/expression";

export const MOODS = {
    idle,
    happy,
    love,
    sad,
    scared,
    shy,
    sick,
    sleepy,
    smug,
    surprised,
    thinking,
    unsure,
    wink,
} satisfies Record<string, Expression>;

export type Mood = keyof typeof MOODS;
