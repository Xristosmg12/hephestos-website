import { SectionHead, Reveal } from "./Reveal";
import { useCountUp, useInViewOnce } from "../../hooks/useCountUp";

const cases = [
  { tag: "Maritime Company", value: 12, suffix: "h", metricLabel: "saved per week", desc: "Automated vessel quotation and PO approval process." },
  { tag: "E-commerce Store", value: 80, suffix: "%", metricLabel: "faster response time", desc: "Automated order processing and support workflows." },
];

const CaseRow = ({ c, index }) => {
  const [ref, inView] = useInViewOnce("-60px");
  const count = useCountUp(c.value, { start: inView });
  return (
    <div
      ref={ref}
      data-testid={`case-card-${index}`}
      className="led-row group grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-10 py-12"
    >
      <span className="ledger-key md:col-span-3 md:pt-6 transition-colors group-hover:text-steel-bright">
        {c.tag}
      </span>

      {/* The figure is the headline — set at display scale */}
      <div className="md:col-span-4 flex items-baseline gap-1">
        <span className="font-display text-bone text-[clamp(4rem,11vw,8.5rem)] leading-[0.85] tabular-nums">
          {count}
        </span>
        {/* Unit sits back from the figure — in a monochrome system the
            hierarchy has to come from value, not colour */}
        <span className="font-display text-ash text-[clamp(2rem,5vw,4rem)] leading-none">
          {c.suffix}
        </span>
      </div>

      <div className="md:col-span-5 md:pt-6">
        <p className="ledger-key !text-ash">{c.metricLabel}</p>
        <p className="mt-3 text-base leading-relaxed text-bone">{c.desc}</p>
      </div>
    </div>
  );
};

export const CaseStudies = () => (
  <section
    id="results"
    data-testid="results-section"
    className="relative py-24 lg:py-36 px-6 lg:px-10"
  >
    <div className="max-w-[1400px] mx-auto">
      <SectionHead
        index="05"
        label="Case Studies"
        title="What it looks like once it's running."
        className="max-w-3xl"
      />

      <div className="mt-14">
        {cases.map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.08}>
            <CaseRow c={c} index={i} />
          </Reveal>
        ))}
        <div className="rule" />
      </div>
    </div>
  </section>
);
