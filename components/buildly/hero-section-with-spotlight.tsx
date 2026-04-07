"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

/** Same grid as the original hero; reused for dim + spotlight layers */
const GRID_BG = `
  linear-gradient(rgba(99, 116, 181, 0.35) 1px, transparent 1px),
  linear-gradient(90deg, rgba(99, 116, 181, 0.35) 1px, transparent 1px)
`;

const DEFAULT_X = 50;
const DEFAULT_Y = 32;

/** Blue glow — shared max + viewport cap (desktop pointer, mobile orbit, mobile static). */
const GLOW_SIZE =
  "h-[min(880px,94vw)] w-[min(880px,94vw)] -translate-x-1/2 -translate-y-1/2";

/** Mobile / tablet orbit ring — must clear GLOW_SIZE so the blob does not clip. */
const AMBIENT_ORBIT_SIZE = "h-[min(100vw,1040px)] w-[min(100vw,1040px)]";

/** Full-hero mask: ellipse at pointer or default position (desktop / static mobile). */
const SPOTLIGHT_MASK = (x: number, y: number) =>
  `radial-gradient(ellipse min(52vw, 720px) min(42vh, 520px) at ${x}% ${y}%, black 12%, transparent 68%)`;

type Spotlight = { x: number; y: number };

export function HeroSectionWithSpotlight({
  children,
  "aria-labelledby": ariaLabelledBy,
}: {
  children: ReactNode;
  "aria-labelledby": string;
}) {
  const [spotlight, setSpotlight] = useState<Spotlight>({
    x: DEFAULT_X,
    y: DEFAULT_Y,
  });
  const [reduceMotion, setReduceMotion] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<Spotlight>({ x: DEFAULT_X, y: DEFAULT_Y });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const applyPointer = useCallback(
    (clientX: number, clientY: number, rect: DOMRect) => {
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      pendingRef.current = { x, y };
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setSpotlight(pendingRef.current);
      });
    },
    [],
  );

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    applyPointer(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };

  const onPointerLeave = () => {
    if (reduceMotion) return;
    setSpotlight({ x: DEFAULT_X, y: DEFAULT_Y });
  };

  const { x, y } = spotlight;

  const spotlightMask = SPOTLIGHT_MASK(x, y);
  const defaultSpotlightMask = SPOTLIGHT_MASK(DEFAULT_X, DEFAULT_Y);

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-x-hidden bg-buildly-bg pb-16 pt-0 tablet:pb-20 desktop:pb-24 [@media(min-height:721px)]:flex [@media(min-height:721px)]:h-full [@media(min-height:721px)]:min-h-0 [@media(min-height:721px)]:flex-1 [@media(min-height:721px)]:flex-col [@media(min-height:721px)]:pb-6"
      aria-labelledby={ariaLabelledBy}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-buildly-bg" />

        {/* Ambient grid — full field, stays subtle */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: GRID_BG,
            backgroundSize: "56px 56px",
          }}
        />

        {/* Desktop: brighter grid + glow follow pointer */}
        <div
          className="absolute inset-0 hidden opacity-[0.34] desktop:block"
          style={{
            backgroundImage: GRID_BG,
            backgroundSize: "56px 56px",
            maskImage: spotlightMask,
            WebkitMaskImage: spotlightMask,
          }}
        />

        <div
          className={`pointer-events-none absolute hidden rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,57,192,0.48),transparent_62%)] blur-3xl desktop:block ${GLOW_SIZE}`}
          style={{ left: `${x}%`, top: `${y}%` }}
        />

        {/*
          Mobile / tablet: fixed brighter grid (default ellipse); only the blue glow orbits.
          Reduced motion: same grid + static glow (no orbit).
        */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden desktop:hidden">
          <div
            className="absolute inset-0 opacity-[0.34]"
            style={{
              backgroundImage: GRID_BG,
              backgroundSize: "56px 56px",
              maskImage: defaultSpotlightMask,
              WebkitMaskImage: defaultSpotlightMask,
            }}
          />

          <div
            className={`absolute left-1/2 top-1/2 block ${AMBIENT_ORBIT_SIZE} motion-reduce:hidden motion-safe:animate-[buildly-hero-ambient-orbit_30.909s_linear_infinite]`}
            aria-hidden
          >
            <div className="absolute left-1/2 top-0 w-[min(52vw,720px)] -translate-x-1/2">
              <div className="relative h-[min(42vh,520px)] w-full">
                <div
                  className={`pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,57,192,0.48),transparent_62%)] blur-3xl ${GLOW_SIZE}`}
                />
              </div>
            </div>
          </div>

          <div
            className={`pointer-events-none absolute hidden rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,57,192,0.48),transparent_62%)] blur-3xl motion-reduce:block ${GLOW_SIZE}`}
            style={{ left: `${DEFAULT_X}%`, top: `${DEFAULT_Y}%` }}
            aria-hidden
          />
        </div>
      </div>

      {children}
    </section>
  );
}
