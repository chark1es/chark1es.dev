import { useEffect, useRef, useState } from "react";
import { Blobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import "blobatar/motion.css";
import "blobatar/gaze.css";
import { look, type Shape, type Tone } from "@/lib/cast";
import { MOODS, type Mood } from "./moods";

interface Props {
    seed: string;
    shape: Shape;
    tone: Tone;
    /** Mood worn while the pointer is over it. */
    hover?: Mood;
    /** Mood it rests in. */
    rest?: Mood;
    /** Moods it cycles through when poked. */
    pokes?: Mood[];
    /** Excursion of the eyes, in blobatar units. */
    travel?: number;
    label?: string;
}

/** One animated creature. Follows the pointer, reacts to it, and can be poked. */
export default function Mascot({
    seed,
    shape,
    tone,
    hover = "happy",
    rest = "idle",
    pokes = ["wink", "surprised", "love", "smug"],
    travel = 3.5,
    label,
}: Props) {
    const { ref } = useGaze({ travel, lookAt: "pointer" });
    const [mood, setMood] = useState<Mood>(rest);
    const over = useRef(false);
    const poked = useRef(0);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => void (timer.current && clearTimeout(timer.current)),
        [],
    );

    const settle = (delay: number) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setMood(over.current ? hover : rest);
        }, delay);
    };

    const { traits, palette } = look(shape, tone);

    return (
        <button
            type="button"
            className="mascot"
            aria-label={label ?? "Poke this blobatar"}
            onPointerEnter={() => {
                over.current = true;
                setMood(hover);
            }}
            onPointerLeave={() => {
                over.current = false;
                setMood(rest);
            }}
            onClick={() => {
                const next = pokes[poked.current++ % pokes.length] ?? "happy";
                setMood(next);
                settle(1400);
            }}
        >
            <Blobatar
                ref={ref}
                name={seed}
                animate="always"
                background={false}
                traits={traits}
                palette={palette}
                expression={MOODS[mood]}
            />
        </button>
    );
}
