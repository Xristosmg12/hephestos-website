import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ done }) => (
  <AnimatePresence>
    {!done && (
      <motion.div
        data-testid="preloader"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <motion.img
            src="/hs-mark.png"
            alt="Hephestos"
            className="h-10 w-10 object-contain logo-bright"
            animate={{
              filter: [
                "brightness(1.6) saturate(1.2) drop-shadow(0 0 6px rgba(59,130,246,0.3))",
                "brightness(1.7) saturate(1.25) drop-shadow(0 0 24px rgba(59,130,246,0.85))",
                "brightness(1.6) saturate(1.2) drop-shadow(0 0 6px rgba(59,130,246,0.3))",
              ],
            }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
          <span className="font-display text-3xl font-bold tracking-tight text-white">Hephestos</span>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
