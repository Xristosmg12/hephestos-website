import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 30 }) => (
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

/* Per-letter text reveal for section titles */
export const TextReveal = ({ text, className = "", gradientWord }) => {
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <h2 className={`font-display ${className}`} aria-label={text}>
      {words.map((word, wi) => {
        const isGradient = gradientWord && word.replace(/[^a-zA-Z']/g, "") === gradientWord;
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const idx = charIndex++;
              return (
                <motion.span
                  key={idx}
                  className={`inline-block ${isGradient ? "bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent" : ""}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: idx * 0.028, ease: [0.22, 1, 0.36, 1] }}
                >
                  {char}
                </motion.span>
              );
            })}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </h2>
  );
};

export const Overline = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#3B82F6] mb-4">
    {children}
  </p>
);
