import Image from "next/image";

import { buildlyAssets } from "@/lib/buildly-assets";
import { cn } from "@/lib/utils";

import { PromptTypewriterField } from "./prompt-typewriter-field";

export function PromptCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-[668px]", className)}
      id="get-started"
    >
      {/* Figma 570:13615 — fill + animated gradient border (conic spin; static SVG stroke replaced) */}
      <div
        className={cn(
          "relative overflow-hidden rounded-[11px]",
          "shadow-[0_4px_14px_-2px_rgba(0,0,0,0.55),0_2px_8px_-2px_rgba(0,0,0,0.4)]",
          "transition-shadow duration-300 ease-out",
          "motion-safe:hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.72),0_20px_44px_-10px_rgba(0,0,0,0.58),0_32px_64px_-14px_rgba(0,57,192,0.38),0_48px_96px_-28px_rgba(0,57,192,0.22)]",
          "motion-safe:focus-within:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.72),0_20px_44px_-10px_rgba(0,0,0,0.58),0_32px_64px_-14px_rgba(0,57,192,0.38),0_48px_96px_-28px_rgba(0,57,192,0.22)]",
          "motion-reduce:hover:shadow-[0_4px_14px_-2px_rgba(0,0,0,0.55),0_2px_8px_-2px_rgba(0,0,0,0.4)]",
          "motion-reduce:focus-within:shadow-[0_4px_14px_-2px_rgba(0,0,0,0.55),0_2px_8px_-2px_rgba(0,0,0,0.4)]",
        )}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[220%] min-h-[240px] w-[220%] min-w-[240px] -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <div
            className={cn(
              "h-full w-full bg-[conic-gradient(from_0deg,rgba(118,154,255,0)_0deg,rgba(118,154,255,0.95)_42deg,rgba(118,154,255,0.35)_78deg,rgba(118,154,255,0)_140deg,rgba(118,154,255,0)_360deg)]",
              "motion-safe:animate-[prompt-border-spin_10s_linear_infinite] motion-reduce:animate-none",
            )}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-[2px] z-[1] rounded-[9px] bg-[#0A112D] shadow-[inset_0_0_0_1px_rgba(253,253,253,0.05)]"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-0 flex-col items-stretch gap-4 pt-4 pr-3 pb-4 pl-3 sm:min-h-[170px] sm:gap-[74px] sm:pt-6 sm:pr-4 sm:pb-4 sm:pl-4 [@media(min-height:721px)]:min-h-[140px] [@media(min-height:721px)]:gap-10">
          <label className="sr-only" htmlFor="buildly-prompt-input">
            Describe what you want to build
          </label>
          <div className="min-h-0 w-full min-w-0">
            <PromptTypewriterField id="buildly-prompt-input" name="prompt" />
          </div>

          {/*
            Mobile: stack like ChatGPT / v0 — chips wrap, full-width Generate below.
            Desktop: single row, Generate end-aligned.
          */}
          <div className="flex w-full min-w-0 shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div
              className="flex w-full min-w-0 flex-wrap content-start items-center gap-2 sm:gap-[10px]"
              role="group"
              aria-label="Quick options"
            >
              <button
                type="button"
                className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-washed-900 bg-[#162048] text-washed-300 transition hover:border-washed-700 hover:bg-[#1a2754] sm:size-10"
                aria-label="Add attachment"
              >
                <span className="relative size-6">
                  <Image
                    src={buildlyAssets.add}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="24px"
                    unoptimized
                  />
                </span>
              </button>
              <span className="inline-flex min-h-11 min-w-0 shrink-0 items-center gap-2 overflow-hidden rounded-[12px] border border-washed-900 bg-[#162048] px-3 py-2 text-sm font-medium leading-tight text-washed-300 sm:min-h-0 sm:gap-[10px] sm:text-base sm:leading-none">
                <span className="relative size-6 shrink-0">
                  <Image
                    src={buildlyAssets.mobile}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="24px"
                    unoptimized
                  />
                </span>
                Mobile App
              </span>
              <span className="inline-flex min-h-11 min-w-0 shrink-0 items-center gap-2 overflow-hidden rounded-[12px] border border-washed-900 bg-[#162048] px-3 py-2 text-sm font-medium leading-tight text-washed-300 sm:min-h-0 sm:gap-[10px] sm:text-base sm:leading-none">
                <span className="relative size-6 shrink-0">
                  <Image
                    src={buildlyAssets.messageText}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="24px"
                    unoptimized
                  />
                </span>
                Landing page
              </span>
            </div>

            <div className="flex w-full shrink-0 sm:w-auto sm:justify-end">
              {/*
                Gradient edge: `border-image` ignores `border-radius` (sharp corners vs fill).
                1px gradient ring + inner radius 11px matches outer 12px exactly.
              */}
              <button
                type="button"
                className="relative inline-flex w-full min-h-[48px] shrink-0 rounded-[12px] bg-[linear-gradient(50deg,rgba(255,255,255,1)_0%,rgba(153,153,153,0)_100%)] p-px outline-none transition focus-visible:ring-2 focus-visible:ring-washed-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010619] sm:w-auto sm:min-h-0"
              >
                <span className="relative inline-flex min-h-[46px] w-full min-w-0 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[11px] bg-[#0039c0] px-4 py-2.5 text-base font-medium leading-none text-white shadow-[inset_0px_0px_4px_0px_rgba(255,255,255,0.5)] transition hover:brightness-110 sm:min-h-0 sm:gap-[10px] sm:px-3 sm:py-2">
                  <span className="relative z-10 size-6 shrink-0">
                    <Image
                      src={buildlyAssets.mdiStars}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="24px"
                      unoptimized
                    />
                  </span>
                  <span className="relative z-10 shrink-0 text-center whitespace-nowrap">
                    Generate
                  </span>
                  <span className="pointer-events-none absolute left-[3.59px] top-[-8.82px] z-[1] flex h-[52.518px] w-[40.423px] items-center justify-center">
                    <span className="flex-none -rotate-[34.03deg]">
                      <span className="relative block h-[55.942px] w-[11px]">
                        <Image
                          src={buildlyAssets.generateShineA}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="11px"
                          unoptimized
                        />
                      </span>
                    </span>
                  </span>
                  <span className="pointer-events-none absolute left-[48.65px] top-[-13.92px] z-[1] flex h-[52.962px] w-[45.522px] items-center justify-center">
                    <span className="flex-none -rotate-[38.72deg]">
                      <span className="relative block h-[59.06px] w-[11px]">
                        <Image
                          src={buildlyAssets.generateShineB}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="11px"
                          unoptimized
                        />
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
