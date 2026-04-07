import { BuildlyHero } from "@/components/buildly/buildly-hero";

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col [@media(min-height:721px)]:min-h-0 [@media(min-height:721px)]:flex-1">
      <BuildlyHero />
    </main>
  );
}
