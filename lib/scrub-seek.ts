import type { ScrollTrigger } from "gsap/ScrollTrigger";

export function seekScrub(
  trigger: ScrollTrigger | undefined | null,
  index: number,
  count: number,
): void {
  if (!trigger || count < 1) {
    return;
  }
  const clamped = Math.max(0, Math.min(count - 1, index));
  const progress = (clamped + 0.5) / count;
  trigger.scroll(trigger.start + (trigger.end - trigger.start) * progress);
}

export function phaseFromProgress(progress: number, count: number): number {
  if (count < 1) {
    return 0;
  }
  return Math.min(count - 1, Math.floor(progress * count - 1e-6));
}
