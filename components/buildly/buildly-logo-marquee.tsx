import Image from "next/image";

/** One row: Airplane → Railway → Clerk → Mintlify → Trigger.dev (then duplicated for the loop). */
const TRUSTED_LOGOS = [
  {
    src: "/buildly/logo-airplane.svg",
    className:
      "h-[22px] w-[72px] tablet:h-[29px] tablet:w-[96px]",
  },
  {
    src: "/buildly/logo-railway.svg",
    className:
      "h-[22px] w-[94px] tablet:h-[29px] tablet:w-[125px]",
  },
  {
    src: "/buildly/logo-clerk.svg",
    className:
      "h-[22px] w-[68px] tablet:h-[29px] tablet:w-[90px]",
  },
  {
    src: "/buildly/logo-mintlify.svg",
    className:
      "h-[22px] w-[83px] tablet:h-[29px] tablet:w-[110px]",
  },
  {
    src: "/buildly/logo-trigger.svg",
    className:
      "h-[22px] w-[116px] tablet:h-[29px] tablet:w-[155px]",
  },
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
      className="flex shrink-0 items-center opacity-[0.92]"
      style={{ gap: "var(--buildly-logo-inner-gap, 48px)" }}
      aria-hidden={ariaHidden}
    >
      {TRUSTED_LOGOS.map((logo, i) => (
        <Image
          key={`${idSuffix}-${i}`}
          src={logo.src}
          alt=""
          width={96}
          height={29}
          className={`shrink-0 object-contain object-left ${logo.className}`}
          sizes="(max-width: 809px) 72px, 96px"
          unoptimized
        />
      ))}
    </div>
  );
}

export function BuildlyLogoMarquee() {
  return (
    <div className="buildly-logo-marquee-viewport relative mx-auto w-full min-w-0 max-w-[min(100%,900px)]">
      <div className="buildly-logo-marquee-track">
        <LogoRow idSuffix="a" />
        <div className="shrink-0 motion-reduce:hidden">
          <LogoRow idSuffix="b" aria-hidden />
        </div>
      </div>
    </div>
  );
}
