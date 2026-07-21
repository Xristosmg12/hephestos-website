import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const KEY = "hephestos_cookie_consent";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) {
      const t = setTimeout(() => setShow(true), 1600);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (value) => {
    localStorage.setItem(KEY, value);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="cookie-consent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[80] border border-[var(--line-strong)] bg-ink-raised p-5"
        >
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-bone flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-ash leading-relaxed">
                We use only essential cookies to make this site work. We don't track
                you or sell your data. See our{" "}
                <Link to="/privacy" className="text-bone underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  data-testid="cookie-accept"
                  onClick={() => decide("accepted")}
                  className="bg-bone px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white"
                >
                  Accept
                </button>
                <button
                  data-testid="cookie-decline"
                  onClick={() => decide("declined")}
                  className="border border-[var(--line-strong)] px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-bone transition-colors hover:border-bone"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
