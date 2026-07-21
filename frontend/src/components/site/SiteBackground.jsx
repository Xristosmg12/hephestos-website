import { useMemo } from "react";

/*
 * Global background — the forge floor. A fine machine grid, heat pooling at the
 * base of the viewport, and sparse embers drifting up from it. No blobs, no
 * aurora, no cursor-follow glow: the ambiance is structural, not decorative.
 * Purely presentational: pointer-events-none, aria-hidden, and fully static
 * under prefers-reduced-motion (see index.css).
 */
const SPARK_COUNT = 14;

export const SiteBackground = () => {
  // Fixed per mount so sparks don't re-randomise on every render
  const sparks = useMemo(
    () =>
      Array.from({ length: SPARK_COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 7.3 + ((i * 31) % 11)) % 100}%`,
        delay: `${(i * 1.37) % 9}s`,
        duration: `${7 + ((i * 3) % 6)}s`,
        drift: `${((i % 5) - 2) * 14}px`,
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      data-testid="site-background"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* Machine grid — structure, faint enough to read as texture */}
      <div className="mill-grid absolute inset-0 opacity-60" />

      {/* Heat pooling at the floor of the viewport */}
      <div className="heat-floor absolute inset-x-0 bottom-0 h-[45vh]" />

      {/* Embers rising off the forge */}
      {sparks.map((s) => (
        <span
          key={s.id}
          className="spark"
          style={{
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
            "--drift": s.drift,
          }}
        />
      ))}
    </div>
  );
};
