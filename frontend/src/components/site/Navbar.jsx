import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", id: "services" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Industries", id: "industries" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export const Navbar = ({ startDelay = 0 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  const hrefFor = (id) => (onHome ? `#${id}` : `${process.env.PUBLIC_URL}/#${id}`);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink border-b border-[var(--line)]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[76px] flex items-center justify-between">
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center gap-3 font-display text-lg tracking-[-0.02em] text-bone"
        >
          <img
            src={`${process.env.PUBLIC_URL}/hs-mark.png`}
            alt="Hephestos"
            className="h-7 w-7 object-contain logo-bright"
          />
          Hephestos
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l, i) => (
            <motion.a
              key={l.id}
              href={hrefFor(l.id)}
              data-testid={`nav-link-${l.id}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: startDelay + i * 0.07, duration: 0.4 }}
              className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                active === l.id && onHome ? "text-steel-bright" : "text-ash hover:text-bone"
              }`}
            >
              {l.label}
            </motion.a>
          ))}
          <motion.a
            href={hrefFor("contact")}
            data-testid="nav-book-demo"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: startDelay + links.length * 0.07, duration: 0.4 }}
            className="bg-steel px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-steel-hover"
          >
            Get a Quote
          </motion.a>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-bone p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          data-testid="nav-mobile-menu"
          className="md:hidden bg-ink border-b border-[var(--line)] px-6 pb-8 pt-2 flex flex-col"
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={hrefFor(l.id)}
              onClick={() => setOpen(false)}
              className="rule py-4 font-display text-xl text-bone"
            >
              {l.label}
            </a>
          ))}
          <a
            href={hrefFor("contact")}
            onClick={() => setOpen(false)}
            className="mt-6 bg-steel px-5 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white"
          >
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
};
