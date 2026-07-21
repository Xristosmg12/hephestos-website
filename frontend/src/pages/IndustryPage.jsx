import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { Reveal, Overline } from "../components/site/Reveal";
import { Contact } from "../components/site/Contact";
import { getIndustry } from "../data/industries";
import { useCountUp, useInViewOnce } from "../hooks/useCountUp";

const ResultMetric = ({ r, index }) => {
  const [ref, inView] = useInViewOnce("-40px");
  const count = useCountUp(r.value, { start: inView });
  return (
    <div ref={ref} className="rule pt-6">
      <span className="ledger-key">{String(index + 1).padStart(2, "0")}</span>
      <div className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] text-ember tabular-nums">
        {r.zeroText ? r.zeroText : `${r.prefix || ""}${count}${r.suffix || ""}`}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ash">{r.label}</p>
    </div>
  );
};

export default function IndustryPage() {
  const { slug } = useParams();
  const industry = getIndustry(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!industry) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen antialiased">
      <Navbar startDelay={0.05} />

      {/* Hero */}
      <section
        data-testid="industry-hero"
        className="relative h-[68vh] min-h-[460px] flex items-end overflow-hidden"
      >
        <img
          src={industry.image}
          alt={industry.name}
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-10 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/#industries"
              data-testid="industry-back"
              className="ledger-key mb-8 inline-flex items-center gap-2 transition-colors hover:text-bone"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All industries
            </Link>
            <Overline>Industry</Overline>
            <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.94] tracking-[-0.04em] text-bone">
              {industry.name}
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* The Problem */}
        <section className="py-20 lg:py-28">
          <Reveal>
            <Overline index="01">The Problem</Overline>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-4xl font-display text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.1] tracking-[-0.025em] text-bone">
              {industry.problem}
            </p>
          </Reveal>
        </section>

        {/* What We Automate */}
        <section className="py-16 rule-strong">
          <Reveal>
            <Overline index="02">What We Automate</Overline>
          </Reveal>
          <div className="mt-8">
            {industry.automations.map((a, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="led-row group flex gap-6 sm:gap-10 py-6">
                  <span className="ledger-key pt-1 transition-colors group-hover:text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-bone">{a}</p>
                </div>
              </Reveal>
            ))}
            <div className="rule" />
          </div>
        </section>

        {/* The Result */}
        <section className="py-16 rule-strong">
          <Reveal>
            <Overline index="03">The Result</Overline>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {industry.results.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <ResultMetric r={r} index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 rule-strong">
          <Reveal>
            <div className="flex flex-col items-start gap-8 pt-4 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl font-display text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.04] tracking-[-0.03em] text-bone">
                Ready to automate your {industry.name} business?
              </h2>
              <a
                href="#contact"
                data-testid="industry-cta"
                className="group inline-flex shrink-0 items-center gap-3 bg-ember px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-ember-dim"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Contact defaultIndustry={industry.name} />
      <Footer />
    </div>
  );
}
