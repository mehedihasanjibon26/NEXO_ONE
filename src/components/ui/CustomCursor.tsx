"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({
    x: -100,
    y: -100,
  });

  const ringPositionRef = useRef({
    x: -100,
    y: -100,
  });

  const visibleRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (!supportsFinePointer) {
      return;
    }

    /*
     * Hide the native desktop cursor.
     * Injected outside React to avoid Fast Refresh DOM conflicts.
     */
    const cursorStyle = document.createElement("style");

    cursorStyle.textContent = `
      @media (hover: hover) and (pointer: fine) {
        html.nexo-custom-cursor,
        html.nexo-custom-cursor body,
        html.nexo-custom-cursor body * {
          cursor: none !important;
        }
      }
    `;

    document.head.append(cursorStyle);
    document.documentElement.classList.add("nexo-custom-cursor");

    const showCursor = () => {
      if (visibleRef.current) return;

      visibleRef.current = true;
      setIsVisible(true);
    };

    const hideCursor = () => {
      if (!visibleRef.current) return;

      visibleRef.current = false;
      setIsVisible(false);
      setIsHovering(false);
      setLabel("");
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;

      showCursor();

      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        setIsHovering(false);
        setLabel("");
        return;
      }

      const interactive = target.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );

      if (!interactive) {
        setIsHovering(false);
        setLabel("");
        return;
      }

      setIsHovering(true);

      const customLabel = interactive.dataset.cursor;

      if (customLabel) {
        setLabel(customLabel);
        return;
      }

      if (interactive.tagName === "A") {
        setLabel("VIEW");
        return;
      }

      if (interactive.tagName === "BUTTON") {
        setLabel("SELECT");
        return;
      }

      setLabel("");
    };

    const handlePointerDown = () => {
      setIsPressed(true);
    };

    const handlePointerUp = () => {
      setIsPressed(false);
    };

    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.transform = `
          translate3d(
            ${mouseRef.current.x}px,
            ${mouseRef.current.y}px,
            0
          )
          translate(-50%, -50%)
        `;
      }

      ringPositionRef.current.x +=
        (mouseRef.current.x - ringPositionRef.current.x) * 0.14;

      ringPositionRef.current.y +=
        (mouseRef.current.y - ringPositionRef.current.y) * 0.14;

      if (ring) {
        ring.style.transform = `
          translate3d(
            ${ringPositionRef.current.x}px,
            ${ringPositionRef.current.y}px,
            0
          )
          translate(-50%, -50%)
        `;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("pointerenter", showCursor);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerleave", hideCursor);

      window.removeEventListener("pointerenter", showCursor);

      window.removeEventListener("pointerdown", handlePointerDown);

      window.removeEventListener("pointerup", handlePointerUp);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      document.documentElement.classList.remove("nexo-custom-cursor");

      /*
       * .remove() is safer than parent.removeChild()
       * during Next.js Fast Refresh.
       */
      cursorStyle.remove();
    };
  }, []);

  return (
    <>
      {/* Delayed outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden items-center justify-center md:flex"
        style={{
          width: isHovering ? "72px" : "38px",
          height: isHovering ? "72px" : "38px",

          opacity: isVisible ? 1 : 0,

          borderRadius: "9999px",

          border: isHovering
            ? "1px solid rgba(255,255,255,0.55)"
            : "1px solid rgba(255,255,255,0.35)",

          backgroundColor: isHovering
            ? "rgba(255,255,255,0.08)"
            : "transparent",

          backdropFilter: isHovering ? "blur(5px)" : "none",

          mixBlendMode: "difference",

          transition: [
            "width 280ms cubic-bezier(0.22,1,0.36,1)",
            "height 280ms cubic-bezier(0.22,1,0.36,1)",
            "opacity 180ms ease",
            "background-color 280ms ease",
            "border-color 280ms ease",
          ].join(", "),
        }}
      >
        <span
          className="text-[0.46rem] font-medium tracking-[0.16em] text-white uppercase"
          style={{
            opacity: isHovering && label ? 1 : 0,
            transition: "opacity 180ms ease",
          }}
        >
          {label}
        </span>
      </div>

      {/* Precise center dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden rounded-full bg-white md:block"
        style={{
          width: isPressed ? "4px" : "6px",
          height: isPressed ? "4px" : "6px",

          opacity: isVisible ? 1 : 0,

          mixBlendMode: "difference",

          transition: "width 140ms ease, height 140ms ease, opacity 180ms ease",
        }}
      />
    </>
  );
}

