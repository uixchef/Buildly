"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { cn } from "@/lib/utils";

/** Rotating example prompts — typewriter cycles when the field is empty */
export const EXAMPLE_PROMPTS = [
  "A modern portfolio website with dark theme and contact form.",
  "A SaaS dashboard with analytics, roles, and Stripe billing.",
  "A mobile app landing page with waitlist and App Store badges.",
  "An internal wiki with search, permissions, and version history.",
  "A customer support portal with tickets and live chat handoff.",
  "A REST API with auth webhooks and rate limiting.",
] as const;

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type Props = {
  id: string;
  name: string;
  className?: string;
};

export function PromptTypewriterField({ id, name, className }: Props) {
  const hintId = useId();
  const [value, setValue] = useState("");
  const [ghost, setGhost] = useState("");
  const [focused, setFocused] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const valueRef = useRef(value);
  const focusedRef = useRef(false);
  const posRef = useRef(0);
  const modeRef = useRef<"typing" | "deleting">("typing");
  const idxRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimers();

    if (value.length > 0 || focused) {
      return () => clearTimers();
    }

    if (prefersReducedMotion) {
      return () => clearTimers();
    }

    posRef.current = 0;
    modeRef.current = "typing";

    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      timeoutRef.current = setTimeout(fn, ms);
    };

    const tick = () => {
      if (cancelled || valueRef.current.length > 0 || focusedRef.current) return;

      const text = EXAMPLE_PROMPTS[idxRef.current % EXAMPLE_PROMPTS.length];

      if (modeRef.current === "typing") {
        if (posRef.current < text.length) {
          posRef.current += 1;
          setGhost(text.slice(0, posRef.current));
          schedule(tick, 34 + Math.floor(Math.random() * 22));
        } else {
          schedule(() => {
            if (cancelled || valueRef.current.length > 0 || focusedRef.current)
              return;
            modeRef.current = "deleting";
            tick();
          }, 2600);
        }
      } else {
        if (posRef.current > 0) {
          posRef.current -= 1;
          setGhost(text.slice(0, posRef.current));
          schedule(tick, 16);
        } else {
          idxRef.current += 1;
          modeRef.current = "typing";
          schedule(tick, 480);
        }
      }
    };

    timeoutRef.current = setTimeout(() => {
      if (cancelled) return;
      setGhost("");
      schedule(tick, 320);
    }, 0);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [value, focused, restartKey, prefersReducedMotion, clearTimers]);

  const showGhost = value.length === 0 && !focused;

  const reducedStatic =
    prefersReducedMotion && showGhost ? EXAMPLE_PROMPTS[0] : null;

  return (
    <div className="relative w-full">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => {
          focusedRef.current = true;
          setFocused(true);
          clearTimers();
          setGhost("");
        }}
        onBlur={(e) => {
          focusedRef.current = false;
          setFocused(false);
          if (e.currentTarget.value === "") {
            setRestartKey((k) => k + 1);
          }
        }}
        placeholder=""
        rows={3}
        spellCheck={false}
        className={cn(
          "relative z-10 w-full resize-none border-0 bg-transparent text-left text-[15px] font-medium leading-snug tablet:text-base tablet:leading-normal",
          "min-h-[5.5rem] tablet:min-h-[4.5rem]",
          "text-washed-200 caret-washed-300",
          "shadow-none outline-none ring-0 ring-offset-0",
          "focus:border-0 focus:shadow-none focus:outline-none focus:ring-0",
          "focus-visible:border-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0",
          showGhost ? "text-transparent" : "text-washed-200",
          className,
        )}
        aria-describedby={hintId}
      />

      {showGhost && prefersReducedMotion && reducedStatic && (
        <div
          className="pointer-events-none absolute inset-0 z-[5] flex items-start text-left text-[15px] font-medium leading-snug text-washed-700 tablet:text-base tablet:leading-normal"
          aria-hidden
        >
          <span>{reducedStatic}</span>
        </div>
      )}

      {showGhost && !prefersReducedMotion && ghost.length > 0 && (
        <div
          className="pointer-events-none absolute inset-0 z-[5] flex items-start text-left text-[15px] font-medium leading-snug text-washed-700 tablet:text-base tablet:leading-normal"
          aria-hidden
        >
          <span className="inline-flex items-center gap-0.5">
            <span>{ghost}</span>
            <span
              className="mt-0.5 inline-block h-[0.95em] w-px shrink-0 animate-pulse bg-washed-500"
              aria-hidden
            />
          </span>
        </div>
      )}

      <p id={hintId} className="sr-only">
        When empty, example prompts type in the field. Click to write your own
        idea.
      </p>
    </div>
  );
}
