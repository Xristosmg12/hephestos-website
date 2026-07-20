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
    window.addEventListener("scroll", onScroll);
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[#080808]/85 border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white"
        >
          <img src={`${process.env.PUBLIC_URL}/hs-mark.png`} alt="Hephestos" className="h-8 w-8 object-contain logo-bright" />
          Hephestos
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.a
              key={l.id}
              href={hrefFor(l.id)}
              data-testid={`nav-link-${l.id}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: startDelay + i * 0.08, duration: 0.4 }}
              className={`text-sm font-medium transition-colors ${
                active === l.id && onHome ? "text-[#3B82F6]" : "text-gray-300 hover:text-white"
              }`}
            >
              {l.label}
            </motion.a>
          ))}
          <motion.a
            href={hrefFor("contact")}
            data-testid="nav-book-demo"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: startDelay + links.length * 0.08, duration: 0.4 }}
            className="rounded-full bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:scale-105 hover:shadow-[0_0_28px_rgba(59,130,246,0.55)] transition-all"
          >
            Get a Quote
          </motion.a>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          data-testid="nav-mobile-menu"
          className="md:hidden backdrop-blur-xl bg-[#080808]/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={hrefFor(l.id)}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-gray-200 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={hrefFor("contact")}
            onClick={() => setOpen(false)}
            className="rounded-full bg-[#3B82F6] px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
};
