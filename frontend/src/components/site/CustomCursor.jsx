import { useEffect, useRef } from "react";

/*
 * Custom cursor: a crisp pointed arrow that sits exactly on the pointer,
 * plus one soft glow that smoothly trails behind it. Grows/brightens over
 * interactive elements. Disabled on touch devices.
 */
export const CustomCursor = () => {
  const arrowRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const arrow = arrowRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      arrow.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const onLeave = () => {
      arrow.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      // Arrow tip pinned exactly to the pointer
      arrow.style.transform = `translate(${mx}px, ${my}px)`;
      // Glow lags smoothly behind
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const interactive = (el) =>
      el && el.closest("a, button, [role='button'], input, select, textarea, label, .group");

    const onOver = (e) => {
      if (interactive(e.target)) {
        arrow.classList.add("is-hover");
        ring.classList.add("is-hover");
      }
    };
    const onOut = (e) => {
      if (interactive(e.target)) {
        arrow.classList.remove("is-hover");
        ring.classList.remove("is-hover");
      }
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="hf-ring" aria-hidden style={{ opacity: 0 }} />
      <div ref={arrowRef} className="hf-arrow" aria-hidden style={{ opacity: 0 }}>
        <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
          <defs>
            <linearGradient id="hfCursorGrad" x1="0" y1="0" x2="20" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93C5FD" />
              <stop offset="0.55" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <path
            d="M1 1 L1 19.5 L6.1 14.7 L9.4 21.8 L12.4 20.4 L9.2 13.6 L15.6 13.1 Z"
            fill="url(#hfCursorGrad)"
            stroke="#0a0a12"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};
