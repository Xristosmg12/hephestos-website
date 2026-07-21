import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";

const Section = ({ title, children }) => (
  <div className="rule mt-12 pt-6">
    <h2 className="font-display text-xl text-bone">{title}</h2>
    <div className="mt-4 space-y-3 text-sm leading-relaxed text-ash">{children}</div>
  </div>
);

export const LegalLayout = ({ title, updated, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen antialiased">
      <Navbar startDelay={0.05} />
      <main className="max-w-3xl mx-auto px-6 lg:px-10 pt-36 pb-24">
        <Link
          to="/"
          data-testid="legal-back"
          className="ledger-key mb-10 inline-flex items-center gap-2 transition-colors hover:text-bone"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>
        <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[0.98] tracking-[-0.035em] text-bone">
          {title}
        </h1>
        <p className="ledger-key mt-5">Last updated: {updated}</p>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { Section };
