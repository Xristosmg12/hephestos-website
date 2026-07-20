import { useRef, useEffect } from "react";

/* Forge ember canvas: warm orange-to-blue sparks rising from the bottom. */
export const EmberCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];

    const colors = ["#f59e0b", "#f97316", "#3B82F6", "#7C3AED", "#fbbf24"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const count = Math.min(90, Math.floor(canvas.width / 16));
    const make = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 120,
      r: Math.random() * 2.2 + 0.6,
      vy: -(Math.random() * 0.8 + 0.3),
      vx: (Math.random() - 0.5) * 0.4,
      life: Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
    particles = Array.from({ length: count }, make);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.life += 0.004;
        const alpha = Math.max(0, 0.9 - p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 14;
        ctx.shadowColor = p.color;
        ctx.fill();
        if (p.y < canvas.height * 0.15 || alpha <= 0.02) particles[i] = make();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="ember-canvas"
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
};
