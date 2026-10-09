import { useCallback, useEffect, useRef, useState } from "react";
import { Blobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import "blobatar/motion.css";
import "blobatar/gaze.css";
import { FRIENDS, ME, look } from "@/lib/cast";
import { MOODS, type Mood } from "./moods";

type Msg = { mood: Mood; line: string };

/** Said once on load, never again. */
const GREETING = "Hi! Poke me.";

/** Poked at random, never the same one twice in a row. */
const pokes: Msg[] = [
    { mood: "wink", line: "Hi again." },
    { mood: "surprised", line: "Oh! Hello." },
    { mood: "love", line: "I really like Convex. Don't tell Postgres." },
    { mood: "scared", line: "Is that a prod deploy?" },
    { mood: "sick", line: "Works on my machine." },
    { mood: "smug", line: "Yes, this site is Astro." },
    { mood: "unsure", line: "Tabs or spaces? Don't answer." },
    { mood: "happy", line: "Ship it." },
    { mood: "sleepy", line: "Five more minutes." },
    { mood: "thinking", line: "Was that a semicolon?" },
    { mood: "shy", line: "Please don't look at my git history." },
];

/** A beat, plus time to read it. */
const lingerFor = (line: string) => Math.max(3200, 1600 + line.length * 60);

const friends = [
    {
        key: "work",
        href: "/work",
        label: "Work",
        friend: FRIENDS.work,
        hover: "wink" as Mood,
        hero: {
            mood: "smug" as Mood,
            line: "Software engineer at ElitAxis. Before that: IEEE and a data science lab.",
        },
    },
    {
        key: "projects",
        href: "/projects",
        label: "Projects",
        friend: FRIENDS.projects,
        hover: "surprised" as Mood,
        hero: {
            mood: "happy" as Mood,
            line: "ChopChop splits the bill. Aulora is team chat you host yourself.",
        },
    },
    {
        key: "writing",
        href: "/blogs",
        label: "Writing",
        friend: FRIENDS.writing,
        hover: "thinking" as Mood,
        hero: {
            mood: "thinking" as Mood,
            line: "I write things down so I only have to figure them out once.",
        },
    },
    {
        key: "resume",
        href: "/pdfs/my_resume",
        label: "Résumé",
        friend: FRIENDS.resume,
        hover: "shy" as Mood,
        external: true,
        hero: { mood: "wink" as Mood, line: "One page. I counted." },
    },
];

const SLEEP_AFTER = 30_000;
const FLAIRS: Mood[] = ["happy", "wink", "smug", "unsure", "thinking", "shy"];

function Friend({
    item,
    active,
    onActive,
}: {
    item: (typeof friends)[number];
    active: boolean;
    onActive: (key: string | null) => void;
}) {
    const { ref } = useGaze({ travel: 4, lookAt: "pointer" });
    const { traits, palette } = look(item.friend.shape, item.friend.tone);

    return (
        <a
            href={item.href}
            className={`friend friend--${item.key}`}
            data-tone={item.friend.tone}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            onPointerEnter={() => onActive(item.key)}
            onPointerLeave={() => onActive(null)}
            onFocus={() => onActive(item.key)}
            onBlur={() => onActive(null)}
        >
            <span className="friend__blob">
                <Blobatar
                    ref={ref}
                    name={item.friend.seed}
                    animate="always"
                    background={false}
                    traits={traits}
                    palette={palette}
                    expression={MOODS[active ? item.hover : "idle"]}
                />
            </span>
            <span className="friend__tag">{item.label}</span>
        </a>
    );
}

/**
 * The hero's thought: three dots first, then the line, like it's typing. A null
 * line fades it away. The trail of small circles is its own element, pinned to
 * the head, so the bubble itself can be as wide as the line needs.
 */
function Bubble({ line }: { line: string | null }) {
    const [shown, setShown] = useState<string | null>(line);
    const [typing, setTyping] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [pops, setPops] = useState(0);
    const first = useRef(true);

    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        if (line === null) {
            setTyping(false);
            setLeaving(true);
            const t = setTimeout(() => {
                setShown(null);
                setLeaving(false);
            }, 280);
            return () => clearTimeout(t);
        }
        setLeaving(false);
        setPops((n) => n + 1);
        const still =
            line.startsWith("zzz") ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (still) {
            setTyping(false);
            setShown(line);
            return;
        }
        setTyping(true);
        const t = setTimeout(() => {
            setShown(line);
            setTyping(false);
        }, 340);
        return () => clearTimeout(t);
    }, [line]);

    if (shown === null && !typing) return null;

    const out = leaving ? " is-out" : "";
    return (
        <>
            <span className={`trail${out}`} aria-hidden="true" key={`t${pops}`}>
                <i />
                <i />
            </span>
            <p className={`bubble${out}`} aria-hidden="true" key={`b${pops}`}>
                {typing ? (
                    <span className="bubble__dots">
                        <i />
                        <i />
                        <i />
                    </span>
                ) : (
                    shown
                )}
            </p>
        </>
    );
}

export default function Cast() {
    const [active, setActive] = useState<string | null>(null);
    const [msg, setMsg] = useState<string | null>(GREETING);
    const [poke, setPoke] = useState<Msg | null>(null);
    const [asleep, setAsleep] = useState(false);
    const [flair, setFlair] = useState<Mood | null>(null);

    const msgRef = useRef<string | null>(GREETING);
    const msgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pokeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sleepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const asleepRef = useRef(false);
    const bag = useRef<Msg[]>([]);
    const lastPoke = useRef("");

    const { ref: heroRef } = useGaze({ travel: 5, lookAt: "pointer" });
    const { traits, palette } = look(ME.shape, ME.tone);

    /** Put a line up. With `ms` it fades on its own; without, it stays. */
    const say = useCallback((line: string | null, ms?: number) => {
        msgRef.current = line;
        setMsg(line);
        if (msgTimer.current) clearTimeout(msgTimer.current);
        if (line !== null && ms) {
            msgTimer.current = setTimeout(() => {
                msgRef.current = null;
                setMsg(null);
            }, ms);
        }
    }, []);

    /** A reaction: the mood for a moment, the line for a little longer. */
    const react = useCallback(
        (m: Msg) => {
            setPoke(m);
            if (pokeTimer.current) clearTimeout(pokeTimer.current);
            pokeTimer.current = setTimeout(() => setPoke(null), 1900);
            say(m.line, lingerFor(m.line));
        },
        [say],
    );

    // Shuffle a bag, so every line comes up before any repeats.
    const nextPoke = () => {
        if (bag.current.length === 0) {
            const next = [...pokes];
            for (let i = next.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [next[i], next[j]] = [next[j]!, next[i]!];
            }
            if (next[next.length - 1]!.line === lastPoke.current) {
                [next[0], next[next.length - 1]] = [
                    next[next.length - 1]!,
                    next[0]!,
                ];
            }
            bag.current = next;
        }
        const m = bag.current.pop()!;
        lastPoke.current = m.line;
        return m;
    };

    const resetSleep = useCallback(() => {
        if (sleepTimer.current) clearTimeout(sleepTimer.current);
        sleepTimer.current = setTimeout(() => {
            asleepRef.current = true;
            setAsleep(true);
            say("zzz…");
        }, SLEEP_AFTER);
    }, [say]);

    useEffect(() => {
        // The greeting is a one-off: up for a few seconds, then gone for good.
        say(GREETING, 7000);
        const wake = () => {
            if (asleepRef.current) {
                asleepRef.current = false;
                setAsleep(false);
                react({
                    mood: "surprised",
                    line: "Oh! I was resting my eyes.",
                });
            }
            resetSleep();
        };
        resetSleep();
        window.addEventListener("pointermove", wake, { passive: true });
        window.addEventListener("keydown", wake);
        window.addEventListener("touchstart", wake, { passive: true });
        return () => {
            window.removeEventListener("pointermove", wake);
            window.removeEventListener("keydown", wake);
            window.removeEventListener("touchstart", wake);
            if (sleepTimer.current) clearTimeout(sleepTimer.current);
            if (pokeTimer.current) clearTimeout(pokeTimer.current);
            if (msgTimer.current) clearTimeout(msgTimer.current);
        };
    }, [react, resetSleep, say]);

    // Every so often it does something unprompted, like anyone sitting still.
    useEffect(() => {
        let wait: ReturnType<typeof setTimeout>;
        let rest: ReturnType<typeof setTimeout>;
        const tick = () => {
            wait = setTimeout(
                () => {
                    if (!document.hidden) {
                        setFlair(
                            FLAIRS[Math.floor(Math.random() * FLAIRS.length)]!,
                        );
                        rest = setTimeout(() => setFlair(null), 1700);
                    }
                    tick();
                },
                6000 + Math.random() * 5000,
            );
        };
        tick();
        return () => {
            clearTimeout(wait);
            clearTimeout(rest);
        };
    }, []);

    const handleActive = (key: string | null) => {
        setActive(key);
        const f = friends.find((x) => x.key === key);
        if (f) {
            // Held for as long as the pointer is on the friend...
            say(f.hero.line);
        } else if (msgRef.current !== null) {
            // ...then left up long enough to finish reading.
            say(msgRef.current, lingerFor(msgRef.current));
        }
    };

    const hovered = friends.find((f) => f.key === active);
    const mood: Mood = asleep
        ? "sleepy"
        : (poke?.mood ?? hovered?.hero.mood ?? flair ?? "idle");

    return (
        <div className="stage">
            <div className="stage__hero">
                <Bubble line={msg} />
                <button
                    type="button"
                    className="hero-blob"
                    aria-label="Poke the blobatar"
                    onClick={() => react(nextPoke())}
                >
                    <Blobatar
                        ref={heroRef}
                        name={ME.seed}
                        animate="always"
                        background={false}
                        traits={traits}
                        palette={palette}
                        expression={MOODS[mood]}
                    />
                </button>
            </div>

            {friends.map((item) => (
                <Friend
                    key={item.key}
                    item={item}
                    active={active === item.key}
                    onActive={handleActive}
                />
            ))}
        </div>
    );
}
