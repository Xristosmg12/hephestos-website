import { Link } from "react-router-dom";

const links = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Industries", href: "/#industries" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const Footer = () => (
  <footer
    data-testid="footer"
    className="relative border-t border-[var(--line-strong)] px-6 lg:px-10 pt-16 pb-10"
  >
    <div className="max-w-[1400px] mx-auto">
      {/* Wordmark set large — the stamp on the finished piece */}
      <Link to="/" className="flex items-center gap-4">
        <img
          src={`${process.env.PUBLIC_URL}/hs-mark.png`}
          alt="Hephestos"
          className="h-10 w-10 object-contain logo-bright"
        />
        <span className="font-display text-[clamp(2.5rem,9vw,6rem)] leading-none tracking-[-0.04em] text-bone">
          Hephestos
        </span>
      </Link>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10">
        <div className="md:col-span-5 rule pt-6">
          <p className="ledger-key">What we do</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
            We Build What Others Can't Automate. We don't sell software — we forge
            solutions to your exact problem.
          </p>
        </div>

        <nav className="md:col-span-3 rule pt-6">
          <p className="ledger-key">Index</p>
          <div className="mt-4 flex flex-col gap-2.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="w-fit text-sm text-ash transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="md:col-span-4 rule pt-6">
          <p className="ledger-key">Contact</p>
          <a
            href="mailto:hephestos.solutions@gmail.com"
            className="wipe mt-4 block w-fit text-sm text-steel-bright"
          >
            hephestos.solutions@gmail.com
          </a>
          <p className="mt-2 text-sm text-ash">Cyprus · Global Clients</p>
          <div className="mt-5 flex gap-5">
            <Link
              to="/privacy"
              data-testid="footer-privacy"
              className="ledger-key transition-colors hover:text-bone"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              data-testid="footer-terms"
              className="ledger-key transition-colors hover:text-bone"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="rule mt-14 pt-6">
        <p className="ledger-key">© 2025 Hephestos · All rights reserved · Cyprus</p>
      </div>
    </div>
  </footer>
);
