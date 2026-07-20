import { Reveal, TextReveal, Overline } from "./Reveal";
import { useCountUp, useInViewOnce } from "../../hooks/useCountUp";

const cases = [
  { tag: "Maritime Company", value: 12, suffix: "h", metricLabel: "saved per week", desc: "Automated vessel quotation and PO approval process." },
  { tag: "E-commerce Store", value: 80, suffix: "%", metricLabel: "faster response time", desc: "Automated order processing and support workflows." },
];

const CaseCard = ({ c, index }) => {
  const [ref, inView] = useInViewOnce("-60px");
  const count = useCountUp(c.value, { start: inView });
  return (
    <div
      ref={ref}
      data-testid={`case-card-${index}`}
      className="group h-full rounded-r-2xl border-l-2 border-[#3B82F6] bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:shadow-[0_0_28px_rgba(59,130,246,0.15)]"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">{c.tag}</p>
      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-5xl font-bold text-[#7C3AED]">
          {count}
          {c.suffix}
        </span>
        <span className="text-sm text-gray-400">{c.metricLabel}</span>
      </div>
      <p className="mt-5 text-base text-gray-300 leading-relaxed">{c.desc}</p>
    </div>
  );
};

export const CaseStudies = () => (
  <section id="results" data-testid="results-section" className="relative py-24 lg:py-32 px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <div className="text-center max-w-3xl mx-auto">
          <Overline>Case Studies</Overline>
          <TextReveal text="Results" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white" />
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.1}>
            <CaseCard c={c} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
