"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Progressive, low-amplitude versions of In View and Tilted Card for cover art. */
export function GardenCover({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || !media.matches || cleanup) return;
      observer.disconnect();
      const { animate } = await import("motion/mini");
      if (disposed || !media.matches) return;
      const reveal = animate(element, { transform: ["translateY(5px)", "translateY(0)"] }, { duration: 0.35 });
      function tilt(event: PointerEvent) {
        if (!element || !media.matches) return;
        const bounds = element.getBoundingClientRect();
        const angle = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4;
        element.style.transform = "perspective(700px) rotateY(" + angle + "deg)";
      }
      const reset = () => { element.style.transform = ""; reveal.cancel(); };
      element.addEventListener("pointermove", tilt);
      element.addEventListener("pointerleave", reset);
      media.addEventListener("change", reset);
      cleanup = () => {
        reset();
        element.removeEventListener("pointermove", tilt);
        element.removeEventListener("pointerleave", reset);
        media.removeEventListener("change", reset);
      };
    });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); cleanup?.(); };
  }, []);
  return <div ref={ref}>{children}</div>;
}
