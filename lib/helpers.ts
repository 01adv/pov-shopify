import { staticNudges } from "./aiCuratedProductsStatic";

export function getRandomStylingTip(variantId: string): string | null {
  const nudge = staticNudges.find((n) => n.variantId === variantId);
  if (!nudge || nudge.styling_tips.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * nudge.styling_tips.length);
  return nudge.styling_tips[randomIndex];
}
