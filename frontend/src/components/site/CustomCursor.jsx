import { useEffect, useRef } from "react";

/*
 * Custom cursor: a small precision dot pinned exactly to the pointer, plus a
 * ring that springs along behind it. Over interactive elements the ring is
 * "magnetic" — it snaps to the element's box and softly outlines it. Native
 * cursor is restored inside text fields. Disabled on touch / reduced motion.
 */
export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    document.documentElement.classList.add("hf-cursor-on");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    // Ring state (position + size), all lerped toward their targets
    let rx = mx;
    let ry = my;
    let rw = 34;
    let rh = 34;
    let rr = 999;
    // Targets
    let tx = mx;
    let ty = my;
    let tw = 34;
    let th = 34;
    let tr = 999;
    let down = false;
    let visible = false;
    let raf;

    const SELECTOR = "a, button, [role='button'], summary, label, .hf-magnetic";
    let magnet = null;

    const setTargets = () => {
      // Drop the magnet if its element left the DOM (e.g. route change)
      if (magnet && !magnet.isConnected) {
        magnet = null;
        ring.classList.remove("is-magnet");
        dot.classList.remove("is-magnet");
      }
      if (magnet) {
        // Snap the ring onto the element's own box
        // Very large targets would make a silly-looking ring — skip those
        const b = magnet.getBoundingClientRect();
        if (b.width > 420 || b.height > 200) {
          magnet = null;
          ring.classList.remove("is-magnet");
          dot.classList.remove("is-magnet");
        }
      }
      if (magnet) {
        const b = magnet.getBoundingClientRect();
        const pad = 6;
        tx = b.left + b.width / 2;
        ty = b.top + b.height / 2;
        tw = b.width + pad * 2;
        th = b.height + pad * 2;
        const radius = parseFloat(getComputedStyle(magnet).borderRadius) || 0;
        tr = Math.min(radius + pad, Math.min(tw, th) / 2);
      } else {
        tx = mx;
        ty = my;
        const s = down ? 24 : 34;
        tw = s;
        th = s;
        tr = 999;
      }
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      setTargets();
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      // Dot is exact — no smoothing, so clicking always feels precise
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      // Ring springs toward its target; snaps faster when magnetised
      const ease = magnet ? 0.24 : 0.16;
      rx = lerp(rx, tx, ease);
      ry = lerp(ry, ty, ease);
      rw = lerp(rw, tw, 0.2);
      rh = lerp(rh, th, 0.2);
      rr = lerp(rr, tr, 0.2);

      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      ring.style.width = `${rw}px`;
      ring.style.height = `${rh}px`;
      ring.style.borderRadius = `${rr}px`;

      raf = requestAnimationFrame(loop);
    };
    loop();

    const onOver = (e) => {
      const el = e.target.closest && e.target.closest(SELECTOR);
      if (el !== magnet) {
        magnet = el || null;
        ring.classList.toggle("is-magnet", !!magnet);
        dot.classList.toggle("is-magnet", !!magnet);
      }
      setTargets();
    };

    const onDown = () => {
      down = true;
      ring.classList.add("is-down");
      dot.classList.add("is-down");
      setTargets();
    };
    const onUp = () => {
      down = false;
      ring.classList.remove("is-down");
      dot.classList.remove("is-down");
      setTargets();
    };

    // Keep the ring glued to its element while the page moves under it
    const onScroll = () => setTargets();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("hf-cursor-on");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="hf-ring" aria-hidden style={{ opacity: 0 }} />
      <div ref={dotRef} className="hf-dot" aria-hidden style={{ opacity: 0 }} />
    </>
  );
};
