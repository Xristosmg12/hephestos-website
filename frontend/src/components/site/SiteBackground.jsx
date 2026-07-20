/*
 * Global animated background — sits fixed behind the entire site so every
 * section shares the same living, drifting aurora + tech-grid ambiance.
 * Purely decorative: pointer-events-none, aria-hidden, and it respects
 * prefers-reduced-motion (see index.css).
 */
export const SiteBackground = () => {
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

      {/* Drifting aurora blobs */}
      <div className="site-bg-blob site-bg-blob--blue" />
      <div className="site-bg-blob site-bg-blob--violet" />
      <div className="site-bg-blob site-bg-blob--cyan" />

      {/* Depth vignette to keep content the focus */}
      <div className="site-bg-vignette absolute inset-0" />
    </div>
  );
};
