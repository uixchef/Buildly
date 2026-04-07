"use client";

import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildlyAssets } from "@/lib/buildly-assets";
import { cn } from "@/lib/utils";

/** Figma 571:13661 — nav links */
const navLinkClass =
  "text-[16px] font-normal leading-none tracking-[-0.16px] text-white";

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { title: string; href: string }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-1 rounded-lg py-1 text-white outline-none",
          "hover:text-washed-200 focus-visible:ring-2 focus-visible:ring-washed-300/40",
          "data-[state=open]:text-washed-200",
        )}
      >
        <span className={navLinkClass}>{label}</span>
        <span className="relative size-6 shrink-0" aria-hidden>
          <Image
            src={buildlyAssets.navChevron}
            alt=""
            fill
            className="object-contain object-center"
            sizes="24px"
            unoptimized
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[12rem]">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} className="cursor-pointer">
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function GetStartedLink() {
  return (
    <Link
      href="#get-started"
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-white p-[12px] text-[16px] font-medium leading-none text-white outline-none transition [text-shadow:0_0_1px_rgba(0,0,0,0.2)] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-washed-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010619]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0f214a_0%,#0f214a_100%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_120%_at_85%_-10%,rgba(255,255,255,0.2),transparent_55%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_15%_110%,rgba(255,255,255,0.12),transparent_50%)]"
      />
      <span className="relative z-10">Get Started</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_4px_0px_rgb(255,255,255)]"
      />
    </Link>
  );
}

/** Softer + slower than prompt card so the CTA field stays the focal point */
const navBarConic =
  "bg-[conic-gradient(from_0deg,rgba(118,154,255,0)_0deg,rgba(118,154,255,0.32)_34deg,rgba(118,154,255,0.1)_64deg,rgba(118,154,255,0)_102deg,rgba(118,154,255,0)_360deg)]";

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto w-full max-w-[1168px] shrink-0 px-4 pt-5">
      <div className="relative overflow-hidden rounded-[16px]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[220%] min-h-[120px] w-[220%] min-w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-[0.85]"
          aria-hidden
        >
          <div
            className={cn(
              "h-full w-full",
              navBarConic,
              "motion-safe:animate-[prompt-border-spin_22s_linear_infinite] motion-reduce:animate-none",
            )}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-px z-[1] rounded-[15px] bg-[rgba(1,6,25,0.05)] backdrop-blur-[10px] shadow-[inset_0_0_0_1px_rgba(253,253,253,0.05)]"
          aria-hidden
        />
        <div
          className={cn(
            "relative z-10 flex w-full items-center justify-between gap-4 p-4",
          )}
        >
          <Link
            href="/"
            className="flex w-[127px] shrink-0 items-center gap-[12px] text-white"
          >
            <span className="relative size-10 shrink-0">
              <Image
                src={buildlyAssets.logo}
                alt=""
                fill
                className="object-contain"
                sizes="40px"
                priority
                unoptimized
              />
            </span>
            <span className="text-center text-[20px] font-extrabold leading-none tracking-tight">
              Buildly
            </span>
          </Link>

          <nav
            className="hidden shrink-0 items-center gap-8 md:flex"
            aria-label="Primary"
          >
            <Link
              href="#buildly-hero-heading"
              className={cn(navLinkClass, "hover:text-washed-200")}
            >
              Features
            </Link>
            <NavDropdown
              label="Templates"
              items={[
                { title: "SaaS starter", href: "#" },
                { title: "Portfolio", href: "#" },
                { title: "Docs site", href: "#" },
              ]}
            />
            <NavDropdown
              label="Docs"
              items={[
                { title: "Getting started", href: "#" },
                { title: "API reference", href: "#" },
                { title: "Changelog", href: "#" },
              ]}
            />
            <NavDropdown
              label="Pricing"
              items={[
                { title: "Individuals", href: "#" },
                { title: "Teams", href: "#" },
                { title: "Enterprise", href: "#" },
              ]}
            />
          </nav>

          <div className="flex shrink-0 items-center gap-[12px]">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 text-[16px] font-normal leading-none tracking-[-0.16px] text-white hover:text-washed-200"
            >
              Sign in
            </Link>
            <GetStartedLink />
          </div>
        </div>
      </div>
    </header>
  );
}
