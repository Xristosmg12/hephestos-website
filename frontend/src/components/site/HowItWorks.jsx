import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal, TextReveal, Overline } from "./Reveal";
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
    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#3B82F6] bg-[#080808] font-display text-sm font-bold text-[#3B82F6] shadow-[0_0_22px_rgba(59,130,246,0.5)]"
  >
    {num}
  </div>
);

export const HowItWorks = () => {
  const trackRef = useRef(null);
  const inView = useInView(trackRef, { once: false, margin: "-120px" });

  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="relative py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Overline>Process</Overline>
            <TextReveal text="From Problem to Automated in Days" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white" />
          </div>
        </Reveal>

        {/* Desktop timeline track */}
        <div ref={trackRef} className="hidden md:block relative h-14 mt-20 mb-6">
          {/* base line (node1 center -> node3 center) */}
          <div className="absolute top-1/2 left-[16.66%] right-[16.66%] h-[2px] -translate-y-1/2 bg-white/10" />
          {/* animated draw line */}
          <div className="absolute top-1/2 left-[16.66%] right-[16.66%] h-[2px] -translate-y-1/2 overflow-hidden">
            <div className={`hf-line-fill h-full w-full bg-gradient-to-r from-[#3B82F6] via-[#7C3AED] to-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.5)] ${inView ? "drawn" : ""}`} />
          </div>
          {/* nodes */}
          {steps.map((s, i) => (
            <div key={s.num} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${16.66 + i * 33.33}%` }}>
              <Node num={s.num} index={i} />
            </div>
          ))}
          {/* running robot */}
          <RobotRunner active={inView} trackRef={trackRef} />
        </div>

        {/* Text row */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              data-testid={`step-${s.num}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="md:hidden mb-4">
                <Node num={s.num} />
              </div>
              <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
