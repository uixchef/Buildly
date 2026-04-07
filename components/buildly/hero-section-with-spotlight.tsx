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

  const spotlightMask = `radial-gradient(ellipse min(52vw, 720px) min(42vh, 520px) at ${x}% ${y}%, black 12%, transparent 68%)`;

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-x-hidden bg-buildly-bg pb-16 pt-0 sm:pb-20 md:pb-24 [@media(min-height:721px)]:flex [@media(min-height:721px)]:h-full [@media(min-height:721px)]:min-h-0 [@media(min-height:721px)]:flex-1 [@media(min-height:721px)]:flex-col [@media(min-height:721px)]:pb-6"
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

        {/* Brighter grid only inside the moving spotlight */}
        <div
          className="absolute inset-0 opacity-[0.34]"
          style={{
            backgroundImage: GRID_BG,
            backgroundSize: "56px 56px",
            maskImage: spotlightMask,
            WebkitMaskImage: spotlightMask,
          }}
        />

        {/* Blue glow follows cursor */}
        <div
          className="pointer-events-none absolute h-[min(680px,80vw)] w-[min(680px,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,57,192,0.48),transparent_62%)] blur-3xl"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      </div>

      {children}
    </section>
  );
}
