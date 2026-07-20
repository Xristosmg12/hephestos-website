import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, TextReveal, Overline } from "./Reveal";
import { industries } from "../../data/industries";

export const Industries = () => (
  <section id="industries" data-testid="industries-section" className="relative py-24 lg:py-32 px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <div className="text-center max-w-3xl mx-auto">
          <Overline>Industries</Overline>
          <TextReveal text="Every Industry. One Agency." className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white" />
          <p className="mt-5 text-base sm:text-lg text-gray-400">
            If your business has a manual process, we eliminate it.
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/industries/${ind.slug}`}
              data-testid={`industry-card-${ind.slug}`}
              className="group relative block h-40 overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-[#3B82F6] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:scale-[1.03]"
            >
              <img
                src={ind.image}
                alt={ind.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                <h3 className="font-display text-base font-bold text-white drop-shadow-lg">
                  {ind.name}
                </h3>
                <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#3B82F6] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Explore <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
