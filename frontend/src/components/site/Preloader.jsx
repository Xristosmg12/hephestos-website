import { motion, AnimatePresence } from "framer-motion";

/* Cold open: the wordmark sits on the ink, a rule strikes across, lifts away. */
export const Preloader = ({ done }) => (
  <AnimatePresence>
    {!done && (
      <motion.div
        data-testid="preloader"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <img
            src={`${process.env.PUBLIC_URL}/hs-mark.png`}
            alt="Hephestos"
            className="h-9 w-9 object-contain logo-bright"
          />
          <span className="font-display text-3xl tracking-[-0.03em] text-bone">Hephestos</span>
        </motion.div>

        <motion.div
          className="mt-6 h-px w-40 origin-left bg-bone"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);
