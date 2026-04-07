import type { CSSProperties } from "react";
import Image from "next/image";

import { buildlyAssets } from "@/lib/buildly-assets";

import { BuildlyLogoMarquee } from "./buildly-logo-marquee";
import { HeroSectionWithSpotlight } from "./hero-section-with-spotlight";
import { PromptCard } from "./prompt-card";
import { SiteHeader } from "./site-header";

/** Figma 570:13558 — hero headline gradient */
const headlineGradient =
  "linear-gradient(93.15deg, #ffffff 4.83%, #afbef7 24.68%, #ffffff 65.57%, #7f95e8 98.02%)";
/** Figma 570:13559 — hero subline gradient */
const sublineGradient =
  "linear-gradient(90.74deg, #d9e1ff 3.61%, #aebeff 99.94%)";

/**
 * Gradient “border” that respects border-radius. Plain `border-image` ignores
 * radius and draws a rectangle — this uses stacked backgrounds + clip instead.
 */
const eyebrowPillStyle: CSSProperties = {
  border: "1px solid transparent",
  backgroundImage: `
    linear-gradient(rgba(62, 78, 145, 0.5), rgba(62, 78, 145, 0.5)),
    radial-gradient(ellipse at 50% 50%, rgba(177, 193, 255, 1) 0%, rgba(177, 193, 255, 0) 100%)
  `,
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
};

/** Figma 570:13553 — eyebrow pill (sparkle + label) */
function HeroEyebrowBadge() {
  return (
    <div
      className="inline-flex items-center gap-3 rounded-[1000px] px-[10px] py-[8px]"
      style={eyebrowPillStyle}
    >
      <span className="relative size-5 shrink-0" aria-hidden>
        <Image
          src={buildlyAssets.badgeIcon}
          alt=""
          fill
          className="object-contain"
          sizes="20px"
          unoptimized
        />
      </span>
      <p className="m-0 text-center text-[16px] font-medium leading-none text-washed-200">
        From prompt to product fast.
      </p>
    </div>
  );
}

export function BuildlyHero() {
  return (
    <HeroSectionWithSpotlight aria-labelledby="buildly-hero-heading">
      <SiteHeader />
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1200px] flex-1 flex-col items-center px-4 [@media(min-height:721px)]:min-h-0">
        <div className="flex min-h-0 w-full flex-1 flex-col justify-between gap-4 [@media(min-height:721px)]:min-h-0 [@media(min-height:721px)]:py-2">
          <div className="mx-auto flex w-full max-w-[872px] flex-col items-center gap-8 pb-10 pt-28 text-center [@media(min-height:721px)]:flex-1 [@media(min-height:721px)]:justify-start [@media(min-height:721px)]:gap-6 [@media(min-height:721px)]:pb-4 [@media(min-height:721px)]:pt-10 [@media(min-width:1921px)_and_(min-height:721px)]:pt-[144px]">
            <div className="flex flex-col items-center gap-6 [@media(min-height:721px)]:gap-4">
              <HeroEyebrowBadge />

              <h1
                id="buildly-hero-heading"
                className="max-w-[920px] bg-clip-text px-2 text-center text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-transparent sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[1.05] lg:tracking-[-1.44px]"
                style={{ backgroundImage: headlineGradient }}
              >
                <span className="block whitespace-nowrap">
                  Build Your App or Website.
                </span>
                <span className="block whitespace-nowrap">Just Describe It.</span>
              </h1>
            </div>

            <p
              className="max-w-[560px] bg-clip-text px-2 text-center text-base font-normal leading-[26px] text-transparent"
              style={{ backgroundImage: sublineGradient }}
            >
              AIBuilder turns your ideas into real, working apps and websites.
              Simply describe what you need—we’ll handle the code, design, and
              logic.
            </p>

            <PromptCard className="mt-2 [@media(min-height:721px)]:mt-0" />
          </div>

        {/* Social proof strip: centered under prompt; mt matches hero vertical rhythm (gap-8 / headline padding) */}
        <div
          className="relative mt-12 w-full max-w-[1100px] shrink-0 px-3 sm:mt-14 sm:px-4 [@media(min-height:721px)]:mt-4 [@media(min-height:721px)]:pb-2"
          role="region"
          aria-label="Trusted by teams: Airplane, Railway, Clerk, Mintlify, Trigger.dev"
        >
          <BuildlyLogoMarquee />
        </div>
        </div>
      </div>
    </HeroSectionWithSpotlight>
  );
}
