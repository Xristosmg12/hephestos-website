import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 24 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/*
 * Editorial mask reveal: each word rises out of its own clipped box. Reads as
 * type being set rather than the per-letter stagger every AI site ships.
 *
 * The viewport trigger must live on the OUTER span. The inner span starts
 * translated fully outside its clipping parent, so an observer attached to it
 * would never report as intersecting and the word would stay hidden forever.
 */
const wordVariants = { hidden: { y: "108%" }, show: { y: 0 } };

export const TextReveal = ({ text, className = "", as: Tag = "h2" }) => {
  const words = text.split(" ");
  return (
    <Tag className={`font-display ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i}>
          <motion.span
            className="inline-block overflow-hidden align-bottom"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.span
              className="inline-block"
              variants={wordVariants}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
};

/* Mono metadata key — the ledger voice */
export const Overline = ({ children, index }) => (
  <p className="ledger-key flex items-center gap-3 mb-5">
    {index && <span className="text-bone">{index}</span>}
    <span className="h-px w-8 bg-[var(--line-strong)]" />
    {children}
  </p>
);

/*
 * Standard section header: numbered ledger key on a hairline, then the title
 * set large and left-aligned. Every section on the page opens the same way.
 */
export const SectionHead = ({ index, label, title, lead, className = "" }) => (
  <div className={className}>
    <Reveal>
      <Overline index={index}>{label}</Overline>
    </Reveal>
    <TextReveal
      text={title}
      className="text-[2rem] leading-[1.02] sm:text-5xl lg:text-6xl text-bone"
    />
    {lead && (
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ash">{lead}</p>
      </Reveal>
    )}
  </div>
);
