import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, TextReveal, Overline } from "./Reveal";

export const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="about" ref={ref} data-testid="about-section" className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
      <div className="absolute left-1/4 top-1/3 w-[400px] h-[400px] max-w-[80vw] rounded-full bg-[#7C3AED]/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center">
            <Overline>Who We Are</Overline>
            <TextReveal text="Who Is Hephestos" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote className="mt-12 text-center font-display text-2xl sm:text-3xl font-medium leading-snug text-white">
            "Named after the god of the forge — we build with the same{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
              obsession for precision.
            </span>
            "
          </blockquote>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400 leading-relaxed">
          <Reveal delay={0.15}>
            <p>
              Hephestos is a Cyprus-based AI automation agency made up of a young,
              talented, and relentlessly driven team of AI developers and engineers.
              We are not a legacy consultancy — we are builders. We move fast, think
              differently, and treat every client's problem as our own to solve.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p>
              We started Hephestos because we saw businesses losing thousands of hours
              every year to work that machines should be doing. Our mission is simple:
              give that time back. We are motivated by what AI makes possible today and
              inspired by where it takes us tomorrow.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
