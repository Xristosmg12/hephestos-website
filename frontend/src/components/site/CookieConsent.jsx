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
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[80] rounded-2xl border border-white/10 bg-[#0c0c0f]/95 backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-300 leading-relaxed">
                We use only essential cookies to make this site work. We don't track
                you or sell your data. See our{" "}
                <Link to="/privacy" className="text-[#3B82F6] hover:text-[#7C3AED] underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  data-testid="cookie-accept"
                  onClick={() => decide("accepted")}
                  className="rounded-full bg-[#3B82F6] px-5 py-2 text-xs font-semibold text-white hover:scale-105 transition-transform"
                >
                  Accept
                </button>
                <button
                  data-testid="cookie-decline"
                  onClick={() => decide("declined")}
                  className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold text-white hover:bg-white/5 transition-colors"
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
