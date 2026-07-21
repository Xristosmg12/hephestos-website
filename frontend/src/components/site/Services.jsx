import { motion } from "framer-motion";
import { SectionHead } from "./Reveal";

const services = [
  { title: "Personal Productivity", desc: "AI assistants managing your emails, calendar, documents and daily operations." },
  { title: "Marketing & Business", desc: "CRM automation, social media workflows, onboarding sequences and full sales pipelines." },
  { title: "E-commerce", desc: "Order processing, inventory sync, customer support and returns — fully automated." },
  { title: "Data & Reporting", desc: "Multi-source data pulled, cleaned, and delivered as automated reports on your schedule." },
  { title: "Home & Lifestyle", desc: "Smart routines triggered by time, location, or behaviour — life beyond the office automated." },
  { title: "AI Integrations", desc: "Language models, image tools, custom APIs and intelligent agents wired into your stack." },
];

export const Services = () => (
  <section
    id="services"
    data-testid="services-section"
    className="relative py-24 lg:py-36 px-6 lg:px-10"
  >
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-12">
      {/* Header sits in the margin and stays put while the list runs past it */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <SectionHead index="01" label="What We Forge" title="Six kinds of work we take off your desk." />
        </div>
      </div>

      {/* The ledger */}
      <div className="lg:col-span-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            data-testid={`service-card-${i}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="led-row group py-7 sm:py-8"
          >
            <div className="flex gap-6 sm:gap-10">
              <span className="ledger-key pt-1.5 transition-colors group-hover:text-bone">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-2xl sm:text-3xl text-bone">{s.title}</h3>
                <p className="mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-ash">
                  {s.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="rule" />
      </div>
    </div>
  </section>
);
