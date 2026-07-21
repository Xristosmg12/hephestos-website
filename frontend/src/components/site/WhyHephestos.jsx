import { motion } from "framer-motion";
import { SectionHead } from "./Reveal";

const items = [
  { title: "Built From Scratch", desc: "Every automation is designed around your exact workflow. Nothing generic." },
  { title: "Delivered Fast", desc: "First call to live automation in days. No bloated onboarding." },
  { title: "Any Industry", desc: "We've automated workflows across maritime, e-commerce, logistics, healthcare and beyond." },
];

export const WhyHephestos = () => (
  <section
    id="why"
    data-testid="why-section"
    className="relative py-24 lg:py-36 px-6 lg:px-10"
  >
    <div className="max-w-[1400px] mx-auto">
      <SectionHead
        index="04"
        label="Why Hephestos"
        title="Not templates. Not software. Custom-forged."
        className="max-w-4xl"
      />

      <div className="mt-16">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            data-testid={`why-col-${i}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="led-row group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-9"
          >
            <span className="ledger-key md:col-span-1 md:pt-3 transition-colors group-hover:text-bone">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="md:col-span-6 font-display text-3xl sm:text-4xl leading-[1.05] text-bone">
              {it.title}
            </h3>
            <p className="md:col-span-5 md:pt-2 text-base leading-relaxed text-ash">
              {it.desc}
            </p>
          </motion.div>
        ))}
        <div className="rule" />
      </div>
    </div>
  </section>
);
