import { Bot, Megaphone, ShoppingCart, BarChart3, Home, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, TextReveal, Overline } from "./Reveal";

const services = [
  { icon: Bot, title: "Personal Productivity", desc: "AI assistants managing your emails, calendar, documents and daily operations." },
  { icon: Megaphone, title: "Marketing & Business", desc: "CRM automation, social media workflows, onboarding sequences and full sales pipelines." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Order processing, inventory sync, customer support and returns — fully automated." },
  { icon: BarChart3, title: "Data & Reporting", desc: "Multi-source data pulled, cleaned, and delivered as automated reports on your schedule." },
  { icon: Home, title: "Home & Lifestyle", desc: "Smart routines triggered by time, location, or behaviour — life beyond the office automated." },
  { icon: Cpu, title: "AI Integrations", desc: "Language models, image tools, custom APIs and intelligent agents wired into your stack." },
];

export const Services = () => (
  <section id="services" data-testid="services-section" className="relative py-24 lg:py-32 px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <div className="text-center max-w-3xl mx-auto">
          <Overline>What We Forge</Overline>
          <TextReveal text="What We Forge" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white" />
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              data-testid={`service-card-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-[#3B82F6]/40 to-[#7C3AED]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_32px_rgba(59,130,246,0.3)]"
            >
              <div className="shimmer-sweep relative h-full overflow-hidden rounded-2xl bg-[#0d0d0f]/80 backdrop-blur-xl p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED]/30 to-[#3B82F6]/30 border border-white/10">
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
