/** Local assets in /public/buildly (from design export). */
const b = "/buildly";

export const buildlyAssets = {
  /** Nav bar (Figma 570:13511). */
  logo: `${b}/logo-union.svg`,
  navChevron: `${b}/nav-chevron.svg`,
  badgeIcon: `${b}/Vector-3.svg`,
  add: `${b}/add.svg`,
  mobile: `${b}/mobile.svg`,
  messageText: `${b}/message-text.svg`,
  /** Generate CTA (Figma 570:13632). */
  mdiStars: `${b}/generate-mdi-stars.svg`,
  generateShineA: `${b}/generate-shine-a.svg`,
  generateShineB: `${b}/generate-shine-b.svg`,
} as const;
