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
      <p className="m-0 max-w-[20rem] text-center text-[15px] font-medium leading-snug text-washed-200 tablet:max-w-none tablet:text-[16px] tablet:leading-none">
        From prompt to product fast.
      </p>
    </div>
  );
}

export function BuildlyHero() {
  return (
    <HeroSectionWithSpotlight aria-labelledby="buildly-hero-heading">
      <SiteHeader />
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1200px] flex-1 flex-col items-center px-3 tablet:px-4 [@media(min-height:721px)]:min-h-0">
        <div className="flex min-h-0 w-full flex-1 flex-col justify-between gap-4 [@media(min-height:721px)]:min-h-0 [@media(min-height:721px)]:py-2">
          <div className="mx-auto flex w-full max-w-[872px] flex-col items-center gap-6 pb-8 pt-20 text-center tablet:gap-8 tablet:pb-10 tablet:pt-24 desktop:pt-28 [@media(min-height:721px)]:flex-1 [@media(min-height:721px)]:justify-start [@media(min-height:721px)]:gap-6 [@media(min-height:721px)]:pb-4 [@media(min-height:721px)]:pt-10 [@media(min-width:1921px)_and_(min-height:721px)]:pt-[144px]">
            <div className="flex w-full flex-col items-center gap-5 [@media(min-height:721px)]:gap-4 tablet:gap-6">
              <HeroEyebrowBadge />

              <h1
                id="buildly-hero-heading"
                className="max-w-[920px] bg-clip-text px-1 text-center text-[clamp(1.65rem,4.6vw,2.25rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-transparent text-balance tablet:px-2 tablet:text-5xl desktop:text-[72px] desktop:leading-[1.05] desktop:tracking-[-1.44px]"
                style={{ backgroundImage: headlineGradient }}
              >
                <span className="block tablet:whitespace-nowrap">
                  Build Your App or Website.
                </span>
                <span className="block tablet:whitespace-nowrap">Just Describe It.</span>
              </h1>
            </div>

            <p
              className="max-w-[560px] bg-clip-text px-1 text-center text-[15px] font-normal leading-[1.5] text-transparent tablet:px-2 tablet:text-base tablet:leading-[26px]"
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
          className="relative mt-8 w-full max-w-[1100px] shrink-0 px-1 tablet:mt-12 tablet:px-4 desktop:mt-14 [@media(min-height:721px)]:mt-4 [@media(min-height:721px)]:pb-2"
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
