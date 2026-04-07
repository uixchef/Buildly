import Image from "next/image";

/** One row: Airplane → Railway → Clerk → Mintlify → Trigger.dev (then duplicated for the loop). */
const TRUSTED_LOGOS = [
  { src: "/buildly/logo-airplane.svg", width: 96 },
  { src: "/buildly/logo-railway.svg", width: 125 },
  { src: "/buildly/logo-clerk.svg", width: 90 },
  { src: "/buildly/logo-mintlify.svg", width: 110 },
  { src: "/buildly/logo-trigger.svg", width: 155 },
] as const;

function LogoRow({
  idSuffix,
  "aria-hidden": ariaHidden,
}: {
  idSuffix: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-12 opacity-[0.92]"
      aria-hidden={ariaHidden}
    >
      {TRUSTED_LOGOS.map((logo, i) => (
        <Image
          key={`${idSuffix}-${i}`}
          src={logo.src}
          alt=""
          width={logo.width}
          height={29}
          className="h-[29px] shrink-0 object-contain object-left"
          style={{ width: logo.width }}
          sizes={`${logo.width}px`}
          unoptimized
        />
      ))}
    </div>
  );
}

export function BuildlyLogoMarquee() {
  return (
    <div className="buildly-logo-marquee-viewport relative mx-auto w-full max-w-[900px]">
      <div className="buildly-logo-marquee-track">
        <LogoRow idSuffix="a" />
        <LogoRow idSuffix="b" aria-hidden />
      </div>
    </div>
  );
}
