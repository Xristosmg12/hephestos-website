import { Wrench, Zap, Globe } from "lucide-react";
import { Reveal, TextReveal, Overline } from "./Reveal";

const items = [
  { icon: Wrench, title: "Built From Scratch", desc: "Every automation is designed around your exact workflow. Nothing generic." },
  { icon: Zap, title: "Delivered Fast", desc: "First call to live automation in days. No bloated onboarding." },
  { icon: Globe, title: "Any Industry", desc: "We've automated workflows across maritime, e-commerce, logistics, healthcare and beyond." },
];

export const WhyHephestos = () => (
  <section id="why" data-testid="why-section" className="relative py-24 lg:py-32 px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <div className="text-center max-w-3xl mx-auto">
          <Overline>Why Hephestos</Overline>
          <TextReveal text="Not Templates. Not Software. Custom-Forged." className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white" />
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <Reveal key={it.title} delay={i * 0.1}>
              <div data-testid={`why-col-${i}`} className="text-center md:text-left">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-[#3B82F6]/40 bg-[#3B82F6]/10 animate-glow-pulse">
                  <Icon className="h-6 w-6 text-[#3B82F6]" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{it.title}</h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
