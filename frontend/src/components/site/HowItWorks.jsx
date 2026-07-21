import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHead } from "./Reveal";
import { RobotRunner } from "./RobotRunner";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We get on a call with you, learn your business, map every manual workflow, and identify exactly where time and money is being lost. No generic solutions — we listen first.",
  },
  {
    num: "02",
    title: "We Build",
    desc: "Custom automation designed, built, and tested — delivered in days not months.",
  },
  {
    num: "03",
    title: "You Scale",
    desc: "Manual work disappears. Your team focuses entirely on growth.",
  },
];

/*
 * Track geometry. The node is 44px square (h-11 w-11), so its centre is 22px
 * from the column's left edge. A segment therefore runs from 22px to
 * (column width + grid gap + 22px) — i.e. exactly one column plus one gap long.
 */
const NODE_CENTER = "22px";
const SEGMENT_WIDTH = "calc(100% + 2.5rem)"; // gap-10 = 2.5rem

const Node = ({ num, index }) => (
  <div
    data-node={index}
    className="relative z-10 flex h-11 w-11 items-center justify-center border border-steel-bright bg-ink font-mono text-xs font-semibold text-steel-bright"
  >
    {num}
  </div>
);

export const HowItWorks = () => {
  const trackRef = useRef(null);
  const inView = useInView(trackRef, { once: false, margin: "-120px" });

  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="relative py-24 lg:py-36 px-6 lg:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <SectionHead
          index="03"
          label="Process"
          title="From problem to automated in days."
          className="max-w-3xl"
        />

        {/*
          Desktop timeline track. It mirrors the text row's grid exactly — same
          three columns, same gap — so each node sits on its own step's left
          edge. Anything positioned by fixed percentages drifts away from the
          columns as soon as the grid gap is accounted for.
        */}
        <div ref={trackRef} className="hidden md:grid grid-cols-3 gap-10 relative h-14 mt-24 mb-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative flex items-center">
              {/* Line segment reaching from this node's centre to the next one */}
              {i < steps.length - 1 && (
                <>
                  <span
                    className="absolute top-1/2 h-px -translate-y-1/2 bg-[var(--line-strong)]"
                    style={{ left: NODE_CENTER, width: SEGMENT_WIDTH }}
                  />
                  <span
                    className="absolute top-1/2 h-px -translate-y-1/2 overflow-hidden"
                    style={{ left: NODE_CENTER, width: SEGMENT_WIDTH }}
                  >
                    <span
                      className={`hf-line-fill block h-full w-full bg-steel-bright ${inView ? "drawn" : ""}`}
                      style={{ animationDelay: `${i * 0.6}s` }}
                    />
                  </span>
                </>
              )}
              <Node num={s.num} index={i} />
            </div>
          ))}
          {/* running robot */}
          <RobotRunner active={inView} trackRef={trackRef} />
        </div>

        {/* Text row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              data-testid={`step-${s.num}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start rule pt-6"
            >
              <div className="md:hidden mb-5">
                <Node num={s.num} />
              </div>
              <h3 className="font-display text-2xl text-bone">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
