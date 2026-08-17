"use client";

import { useEffect } from "react";

/**
 * Counts every `[data-count]` inside `ref` up to its target once, the first
 * time the element scrolls into view. Elements opt in with:
 *
 *   data-count="12400" data-decimals="0" data-suffix="+"
 *
 * Respects prefers-reduced-motion by rendering the final value immediately.
 */
export default function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  durationMs = 1100
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let raf = 0;
    let started = false;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-count]")
    ).map((el) => ({
      el,
      to: Number(el.dataset.count),
      decimals: Number(el.dataset.decimals ?? 0),
      suffix: el.dataset.suffix ?? "",
    }));

    const render = (progress: number) => {
      for (const target of targets) {
        const value = target.to * progress;
        target.el.textContent =
          value.toLocaleString("en-US", {
            minimumFractionDigits: target.decimals,
            maximumFractionDigits: target.decimals,
          }) + target.suffix;
      }
    };

    const run = () => {
      if (started) return;
      started = true;

      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        // easeOutExpo — fast rise, gentle settle
        render(t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      render(1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, durationMs]);
}
