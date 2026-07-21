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

const Node = ({ num, index }) => (
  <div
    data-node={index}
    className="relative z-10 flex h-11 w-11 items-center justify-center border border-ember bg-ink font-mono text-xs font-semibold text-ember"
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

        {/* Desktop timeline track */}
        <div ref={trackRef} className="hidden md:block relative h-14 mt-24 mb-6">
          {/* base line (node1 center -> node3 center) */}
          <div className="absolute top-1/2 left-[16.66%] right-[16.66%] h-px -translate-y-1/2 bg-[var(--line-strong)]" />
          {/* animated draw line */}
          <div className="absolute top-1/2 left-[16.66%] right-[16.66%] h-px -translate-y-1/2 overflow-hidden">
            <div className={`hf-line-fill h-full w-full bg-ember ${inView ? "drawn" : ""}`} />
          </div>
          {/* nodes */}
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${16.66 + i * 33.33}%` }}
            >
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
