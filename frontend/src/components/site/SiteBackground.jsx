import { useEffect, useRef } from "react";

/*
 * Global animated background — fixed behind the entire site so every section
 * shares the same living aurora + tech-grid ambiance, plus an interactive
 * glow that follows the cursor across the whole page.
 * Purely decorative: pointer-events-none, aria-hidden, respects
 * prefers-reduced-motion (see index.css), and stays static on touch devices.
 */
export const SiteBackground = () => {
  const orbRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const orb = orbRef.current;
    const grid = gridRef.current;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let ox = tx;
    let oy = ty;
    let raf;
    let shown = false;

    const reveal = () => {
      if (shown) return;
      shown = true;
      if (orb) orb.style.opacity = "1";
      if (grid) grid.style.opacity = "1";
    };
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      reveal();
    };
    const onLeave = () => {
      shown = false;
      if (orb) orb.style.opacity = "0";
      if (grid) grid.style.opacity = "0";
    };

    const loop = () => {
      ox += (tx - ox) * 0.14;
      oy += (ty - oy) * 0.14;
      if (orb) orb.style.transform = `translate(${ox}px, ${oy}px) translate(-50%, -50%)`;
      if (grid) {
        const mask = `radial-gradient(240px circle at ${tx}px ${ty}px, #000 0%, rgba(0,0,0,0.35) 46%, transparent 72%)`;
        grid.style.webkitMaskImage = mask;
        grid.style.maskImage = mask;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-testid="site-background"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Slowly shifting blue-violet gradient wash */}
      <div className="absolute inset-0 animated-gradient animate-gradient-shift opacity-70" />

      {/* Faint schematic grid, fading toward the edges */}
      <div className="site-bg-grid absolute inset-0" />

      {/* Brighter grid that lights up around the cursor — whole page */}
      <div ref={gridRef} className="site-igrid absolute inset-0 transition-opacity duration-300" style={{ opacity: 0 }} />

      {/* Drifting aurora blobs */}
      <div className="site-bg-blob site-bg-blob--blue" />
      <div className="site-bg-blob site-bg-blob--violet" />
      <div className="site-bg-blob site-bg-blob--cyan" />

      {/* Colour orb that follows the cursor across the whole site */}
      <div ref={orbRef} className="site-cursor-orb transition-opacity duration-500" style={{ opacity: 0 }} />

      {/* Depth vignette to keep content the focus */}
      <div className="site-bg-vignette absolute inset-0" />
    </div>
  );
};
