import { useEffect, useRef } from "react";

const TRAIL = 7;

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const dots = trailRefs.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const trail = Array.from({ length: TRAIL }, () => ({ x: mouseX, y: mouseY }));
    let raf;
    let magnetEl = null;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      let px = mouseX;
      let py = mouseY;
      for (let i = 0; i < TRAIL; i++) {
        const t = trail[i];
        t.x += (px - t.x) * 0.35;
        t.y += (py - t.y) * 0.35;
        const el = dots[i];
        if (el) {
          el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
        }
        px = t.x;
        py = t.y;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const isInteractive = (el) =>
      el && el.closest("a, button, [role='button'], input, select, textarea, .group, [data-cursor='hover']");

    // Magnetic nudge only on plain links/buttons without transform-based hovers
    const magnetTarget = (el) => {
      const target = el && el.closest("a, button, [role='button']");
      if (!target) return null;
      const cls = target.className || "";
      if (typeof cls === "string" && /scale|translate|group/.test(cls)) return null;
      return target;
    };

    const onOver = (e) => {
      if (isInteractive(e.target)) cursor.classList.add("is-hover");
      const m = magnetTarget(e.target);
      if (m) magnetEl = m;
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) cursor.classList.remove("is-hover");
      if (magnetEl && (!e.relatedTarget || !magnetEl.contains(e.relatedTarget))) {
        magnetEl.style.transform = "";
        magnetEl = null;
      }
    };
    const onMagnetMove = (e) => {
      if (!magnetEl) return;
      const r = magnetEl.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.max(-3, Math.min(3, (e.clientX - cx) * 0.15));
      const dy = Math.max(-3, Math.min(3, (e.clientY - cy) * 0.15));
      magnetEl.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onClick = (e) => {
      const wrap = document.createElement("div");
      wrap.className = "hf-spark-wrap";
      wrap.style.left = `${e.clientX}px`;
      wrap.style.top = `${e.clientY}px`;
      const shock = document.createElement("div");
      shock.className = "hf-shock";
      wrap.appendChild(shock);
      for (let i = 0; i < 6; i++) {
        const spike = document.createElement("div");
        spike.className = "hf-spark";
        spike.style.setProperty("--a", `${i * 60}deg`);
        wrap.appendChild(spike);
      }
      document.body.appendChild(wrap);
      setTimeout(() => wrap.remove(), 450);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", onMagnetMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onMagnetMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="hf-cursor" aria-hidden>
        <div className="hf-cursor-spin">
          <svg className="hf-shape hf-diamond" width="24" height="24" viewBox="0 0 24 24">
            <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="#3B82F6" strokeWidth="1.6" />
          </svg>
          <svg className="hf-shape hf-hex" width="24" height="24" viewBox="0 0 24 24">
            <polygon points="7,3 17,3 22,12 17,21 7,21 2,12" fill="none" stroke="#7C3AED" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
      {Array.from({ length: TRAIL }).map((_, i) => {
        const size = 5 - (i / TRAIL) * 2.5;
        const ratio = i / (TRAIL - 1);
        const color = `rgba(${Math.round(59 + (124 - 59) * ratio)}, ${Math.round(130 + (58 - 130) * ratio)}, ${Math.round(246 + (237 - 246) * ratio)}, ${0.7 - ratio * 0.5})`;
        return (
          <div
            key={i}
            ref={(el) => (trailRefs.current[i] = el)}
            className="hf-trail"
            style={{ width: `${size}px`, height: `${size}px`, background: color }}
            aria-hidden
          />
        );
      })}
    </>
  );
};
