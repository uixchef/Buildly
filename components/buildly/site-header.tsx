"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
      className="relative inline-flex shrink-0 rounded-[12px] bg-[linear-gradient(50deg,rgba(255,255,255,1)_0%,rgba(153,153,153,0)_100%)] p-px outline-none transition focus-visible:ring-2 focus-visible:ring-washed-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010619]"
    >
      {/*
        Match Generate CTA: 1px gradient ring (12px outer / 11px inner) + inset highlight.
        Nav fill layers stay inside the inner face.
      */}
      <span className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[11px] p-[10px] text-[15px] font-medium leading-none text-white shadow-[inset_0px_0px_4px_0px_rgba(255,255,255,0.5)] transition [text-shadow:0_0_1px_rgba(0,0,0,0.2)] hover:brightness-110 tablet:p-[12px] tablet:text-[16px]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[11px] bg-[linear-gradient(90deg,#0f214a_0%,#0f214a_100%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[11px] bg-[radial-gradient(100%_120%_at_85%_-10%,rgba(255,255,255,0.2),transparent_55%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[11px] bg-[radial-gradient(90%_80%_at_15%_110%,rgba(255,255,255,0.12),transparent_50%)]"
        />
        <span className="relative z-10">Get Started</span>
      </span>
    </Link>
  );
}

/** Softer + slower than prompt card so the CTA field stays the focal point */
const navBarConic =
  "bg-[conic-gradient(from_0deg,rgba(118,154,255,0)_0deg,rgba(118,154,255,0.32)_34deg,rgba(118,154,255,0.1)_64deg,rgba(118,154,255,0)_102deg,rgba(118,154,255,0)_360deg)]";

function MobileNavMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger
        className={cn(
          "group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white outline-none tablet:hidden",
          "hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-washed-300/40",
          "data-[state=open]:bg-white/10",
        )}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span className="relative size-6">
          <Menu
            className={cn(
              "absolute inset-0 size-6 transition-[opacity,transform] duration-200 ease-out",
              "motion-reduce:transition-none",
              "opacity-100 scale-100 group-data-[state=open]:pointer-events-none group-data-[state=open]:scale-90 group-data-[state=open]:opacity-0",
            )}
            aria-hidden
            strokeWidth={2}
          />
          <X
            className={cn(
              "absolute inset-0 size-6 transition-[opacity,transform] duration-200 ease-out",
              "motion-reduce:transition-none",
              "scale-90 opacity-0 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100",
            )}
            aria-hidden
            strokeWidth={2}
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="bottom"
        sideOffset={8}
        collisionPadding={16}
        className="max-h-[min(70vh,28rem)] w-[min(calc(100vw-2rem),20rem)] overflow-y-auto"
      >
        <DropdownMenuItem asChild>
          <Link href="#buildly-hero-heading">Features</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Templates</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="#">SaaS starter</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">Portfolio</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">Docs site</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Docs</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="#">Getting started</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">API reference</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">Changelog</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Pricing</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="#">Individuals</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">Teams</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">Enterprise</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="#">Sign in</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto w-full max-w-[1168px] shrink-0 px-3 pt-4 tablet:px-4 tablet:pt-5">
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
            "relative z-10 flex min-w-0 w-full items-center justify-between gap-2 p-3 tablet:gap-4 tablet:p-4",
          )}
        >
          <Link
            href="/"
            className="flex min-w-0 max-w-[min(100%,11rem)] items-center gap-2 text-white tablet:max-w-none tablet:gap-3"
          >
            <span className="relative size-9 shrink-0 tablet:size-10">
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
            <span className="truncate text-[18px] font-extrabold leading-none tracking-tight tablet:text-[20px]">
              Buildly
            </span>
          </Link>

          <nav
            className="hidden shrink-0 items-center gap-8 tablet:flex"
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

          <div className="flex min-w-0 shrink-0 items-center gap-2 tablet:gap-3">
            <MobileNavMenu />
            <Link
              href="#"
              className="hidden items-center justify-center px-3 py-2 text-[16px] font-normal leading-none tracking-[-0.16px] text-white hover:text-washed-200 tablet:inline-flex"
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
