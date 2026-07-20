import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { Reveal } from "../components/site/Reveal";
import { Contact } from "../components/site/Contact";
import { getIndustry } from "../data/industries";
import { useCountUp, useInViewOnce } from "../hooks/useCountUp";

const ResultMetric = ({ r }) => {
  const [ref, inView] = useInViewOnce("-40px");
  const count = useCountUp(r.value, { start: inView });
  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
      <div className="font-display text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
        {r.zeroText ? r.zeroText : `${r.prefix || ""}${count}${r.suffix || ""}`}
      </div>
      <p className="mt-3 text-sm text-gray-400">{r.label}</p>
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
    <div className="min-h-screen bg-[#080808] text-white antialiased">
      <Navbar startDelay={0.05} />

      {/* Hero */}
      <section data-testid="industry-hero" className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <img src={industry.image} alt={industry.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/30" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/#industries" data-testid="industry-back" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to all industries
            </Link>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#3B82F6]">Industry</p>
            <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
              {industry.name}
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* The Problem */}
        <section className="py-20 lg:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7C3AED] mb-4">The Problem</p>
            <p className="font-display text-2xl sm:text-3xl font-medium leading-snug text-white">
              {industry.problem}
            </p>
          </Reveal>
        </section>

        {/* What We Automate */}
        <section className="py-16 border-t border-white/10">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#3B82F6] mb-8">What We Automate</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {industry.automations.map((a, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#3B82F6]/60 hover:shadow-[0_0_24px_rgba(59,130,246,0.2)]">
                  <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/40">
                    <Check className="h-4 w-4 text-[#3B82F6]" />
                  </span>
                  <p className="text-base text-gray-200 leading-relaxed">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* The Result */}
        <section className="py-16 border-t border-white/10">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7C3AED] mb-8">The Result</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {industry.results.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <ResultMetric r={r} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 p-10 sm:p-14 text-center">
              <div className="absolute inset-0 animated-gradient animate-gradient-shift opacity-80" />
              <div className="absolute left-1/2 top-1/2 w-[400px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#3B82F6]/25 to-[#7C3AED]/25 blur-[90px]" />
              <div className="relative z-10">
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  Ready to automate your {industry.name} business?
                </h2>
                <a
                  href="mailto:hephestos.solutions@gmail.com?subject=Get%20a%20Quote"
                  data-testid="industry-cta"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:scale-105 hover:shadow-[0_0_34px_rgba(59,130,246,0.6)] transition-all"
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Contact defaultIndustry={industry.name} />
      <Footer />
    </div>
  );
}
