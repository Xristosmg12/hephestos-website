import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHead } from "./Reveal";
import { industries } from "../../data/industries";

// The cards are only ~340px wide, so request a much smaller image than the
// full-size hero version (works for both Pexels and Unsplash URLs).
const cardImg = (url) =>
  url
    .replace(/w=\d+/, "w=640")
    .replace(/h=\d+/, "h=420")
    .replace(/dpr=\d+/, "dpr=1");

export const Industries = () => (
  <section
    id="industries"
    data-testid="industries-section"
    className="relative py-24 lg:py-36 px-6 lg:px-10"
  >
    <div className="max-w-[1400px] mx-auto">
      <SectionHead
        index="02"
        label="Industries"
        title="Every industry. One workshop."
        lead="If your business has a manual process, we eliminate it."
        className="max-w-3xl"
      />

      <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)]">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.slug}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            className="bg-ink"
          >
            <Link
              to={`/industries/${ind.slug}`}
              data-testid={`industry-card-${ind.slug}`}
              className="group relative flex h-44 sm:h-56 flex-col justify-end overflow-hidden p-5"
            >
              {/* Photograph, held back to a texture until you reach for it */}
              <img
                src={cardImg(ind.image)}
                alt={ind.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover grayscale opacity-30 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-55 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />

              <span className="ledger-key relative z-10 transition-colors group-hover:text-bone">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative z-10 mt-2 font-display text-lg sm:text-xl leading-tight text-bone">
                {ind.name}
              </h3>

              {/* Ember rule wipes across the foot of the frame on hover */}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-bone transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
