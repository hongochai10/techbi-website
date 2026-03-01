"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * CustomCursor
 * ─────────────────────────────────────────────────────────────
 * A two-layer cursor: a small dot (fast follow) + a larger ring
 * (lagged follow). Color shifts to purple when hovering interactive
 * elements. Hidden on touch/mobile via CSS.
 *
 * UX FLOW NOTE:
 * The cursor replaces the OS default to reinforce the cyberpunk
 * identity on desktop. On mobile / touch, it hides itself and
 * restores the native cursor so usability is never compromised.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Smoothed position for the ring (lerp)
  const ring = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const isHovering = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(function animateLoop() {
    ring.current.x = lerp(ring.current.x, target.current.x, 0.12);
    ring.current.y = lerp(ring.current.y, target.current.y, 0.12);

    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animateLoop);
  }, []);

  useEffect(() => {
    // Don't initialise on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      target.current = { x, y };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    };

    const onMouseEnterInteractive = () => {
      isHovering.current = true;
      dotRef.current?.classList.add("hover");
      ringRef.current?.classList.add("hover");
    };

    const onMouseLeaveInteractive = () => {
      isHovering.current = false;
      dotRef.current?.classList.remove("hover");
      ringRef.current?.classList.remove("hover");
    };

    const attachInteractiveListeners = () => {
      const els = document.querySelectorAll<HTMLElement>(
        "a, button, [data-cursor-hover], input, textarea, label"
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    attachInteractiveListeners();

    // Re-attach when DOM mutates (e.g., React re-renders)
    const observer = new MutationObserver(attachInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, [animate]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
