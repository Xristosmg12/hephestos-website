import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { industries } from "../../data/industries";

/*
 * Hero — a workshop title page, not a landing-page pitch.
 * Left: the statement, set as large as the viewport allows.
 * Right: a spec block, read like a parts list.
 * Foot: a running manifest of every sector we've worked in.
 */
const spec = [
  ["Based", "Cyprus"],
  ["Build time", "Days, not months"],
  ["Approach", "Custom, never templates"],
  ["Sectors", `${industries.length} and counting`],
];

/*
 * Everything below the headline fades in on view rather than on the preloader
 * flag — the sub-copy, the CTAs and the spec block are the conversion path, so
 * they must never be able to sit invisible waiting on a timer.
 */
const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
});

export const Hero = ({ ready }) => {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-end">
          {/* ---- Statement ---- */}
          <div className="lg:col-span-8">
            <h1 className="font-display text-bone text-[clamp(2.6rem,8.2vw,7rem)] leading-[0.93] tracking-[-0.04em]">
              {["We Build", "What Others", "Can't Automate"].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className={`block ${i === 2 ? "text-bone" : ""}`}
                    initial={{ y: "106%" }}
                    animate={ready ? { y: 0 } : { y: "106%" }}
                    transition={{
                      duration: 0.85,
                      delay: 0.18 + i * 0.11,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              {...rise(0.5)}
              className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-ash"
            >
              Custom AI tools, bots, workflows, and integrations — forged for
              businesses that refuse to waste time.
            </motion.p>

            <motion.div
              {...rise(0.6)}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <a
                href="#contact"
                data-testid="hero-get-contact"
                className="group inline-flex items-center justify-center gap-3 bg-steel px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-steel-hover"
              >
                Get in Contact
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                data-testid="hero-see-services"
                className="inline-flex items-center justify-center border border-[var(--line-strong)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:border-bone"
              >
                See Our Services
              </a>
            </motion.div>
          </div>

          {/* ---- Spec block ---- */}
          <motion.dl {...rise(0.7)} className="lg:col-span-4 lg:pb-3">
            {spec.map(([k, v]) => (
              <div
                key={k}
                className="rule flex items-baseline justify-between gap-6 py-3.5"
              >
                <dt className="ledger-key">{k}</dt>
                <dd className="text-right text-sm text-bone">{v}</dd>
              </div>
            ))}
            <div className="rule" />
          </motion.dl>
        </div>
      </div>

      {/* ---- Sector manifest ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.85, duration: 0.8 }}
        /* min-w-0: this is a column-flex item, and without it the ticker's
           max-content width sets the item's automatic minimum size, which
           widens the whole page past the viewport on narrow screens. */
        className="mt-16 w-full min-w-0 rule-strong"
      >
        <div className="ticker-mask overflow-hidden py-4">
          <div className="ticker-track">
            {[0, 1].map((pass) => (
              <div key={pass} className="flex shrink-0" aria-hidden={pass === 1}>
                {industries.map((ind) => (
                  <span
                    key={ind.slug}
                    className="ledger-key flex shrink-0 items-center gap-6 px-6"
                  >
                    {ind.name}
                    <span className="text-steel-bright">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
