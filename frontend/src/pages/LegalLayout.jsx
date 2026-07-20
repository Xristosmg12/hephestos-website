import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";

const Section = ({ title, children }) => (
  <div className="mt-10">
    <h2 className="font-display text-xl font-bold text-white">{title}</h2>
    <div className="mt-3 space-y-3 text-sm text-gray-400 leading-relaxed">{children}</div>
  </div>
);

export const LegalLayout = ({ title, updated, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen text-white antialiased">
      <Navbar startDelay={0.05} />
      <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <Link to="/" data-testid="legal-back" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-3 text-xs text-gray-500">Last updated: {updated}</p>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { Section };
