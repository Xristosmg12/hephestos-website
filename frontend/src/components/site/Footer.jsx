import { Link } from "react-router-dom";

const links = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Industries", href: "/#industries" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const Footer = () => (
  <footer data-testid="footer" className="relative overflow-hidden border-t border-[#3B82F6]/25 px-6 lg:px-8 py-14">
    {/* Scan line animation */}
    <div className="pointer-events-none absolute inset-0 opacity-40">
      <div className="absolute left-0 right-0 h-24 animate-scanline bg-gradient-to-b from-transparent via-[#3B82F6]/10 to-transparent" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
      <div>
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white">
          <img src="/hs-mark.png" alt="Hephestos" className="h-8 w-8 object-contain logo-bright" />
          Hephestos
        </Link>
        <p className="mt-3 text-sm text-gray-500 max-w-xs">
          We Build What Others Can't Automate. We don't sell software — we forge
          solutions to your exact problem.
        </p>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-center">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
            {l.label}
          </a>
        ))}
      </div>

      <div className="md:text-right">
        <a href="mailto:hephestos.solutions@gmail.com" className="text-sm text-[#3B82F6] hover:text-[#7C3AED] transition-colors">
          hephestos.solutions@gmail.com
        </a>
        <p className="mt-1 text-sm text-gray-400">Cyprus · Global Clients</p>
        <div className="mt-3 flex gap-4 md:justify-end">
          <Link to="/privacy" data-testid="footer-privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" data-testid="footer-terms" className="text-xs text-gray-500 hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto mt-10 pt-8 border-t border-white/5">
      <p className="text-[11px] text-gray-600 text-center">© 2025 Hephestos. All rights reserved. · Cyprus</p>
    </div>
  </footer>
);
