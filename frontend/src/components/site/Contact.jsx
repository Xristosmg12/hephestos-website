import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { industries } from "../../data/industries";

// Contact submissions are emailed via FormSubmit (no backend/database needed).
// Change this address to wherever you want inquiries delivered.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/hephestos.solutions@gmail.com";

const empty = { full_name: "", company_name: "", industry: "", email: "", automate: "", website: "" };

// Flat, unboxed fields: a hairline underneath, brightens when focused.
const fieldCls =
  "w-full border-b border-[var(--line-strong)] bg-transparent py-3 text-base text-bone placeholder:text-[var(--ash-dim)] focus:border-steel-bright focus:outline-none transition-colors";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="ledger-key">{label}</span>
    <div className="mt-1.5">{children}</div>
  </label>
);

export const Contact = ({ defaultIndustry = "" }) => {
  const [form, setForm] = useState({ ...empty, industry: defaultIndustry });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.company_name || !form.industry || !form.email || !form.automate) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!consent) {
      toast.error("Please accept the Privacy Policy to continue.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(FORM_ENDPOINT, {
        name: form.full_name,
        company: form.company_name,
        industry: form.industry,
        email: form.email,
        message: form.automate,
        _subject: `New Hephestos inquiry — ${form.company_name}`,
        _template: "table",
        _honey: form.website, // honeypot (bots fill this; humans don't)
      });
      toast.success("Message forged. We'll be in touch shortly.");
      setForm({ ...empty, industry: defaultIndustry });
      setConsent(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 lg:py-36 px-6 lg:px-10"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-16">
        {/* ---- The ask ---- */}
        <div className="lg:col-span-5">
          <Reveal>
            <Overline index="07">Start Here</Overline>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2.2rem,5.6vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-bone">
              Ready to Automate?
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ash">
              Tell us what's slowing you down. We'll forge the fix.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-12 max-w-md">
              {[
                ["First step", "Discovery call"],
                ["Turnaround", "Days, not months"],
                ["Based", "Cyprus · Global clients"],
              ].map(([k, v]) => (
                <div key={k} className="rule flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="ledger-key">{k}</dt>
                  <dd className="text-sm text-bone">{v}</dd>
                </div>
              ))}
              <div className="rule flex items-baseline justify-between gap-6 py-3.5">
                <dt className="ledger-key">Direct</dt>
                <dd className="text-sm">
                  <a
                    href="mailto:hephestos.solutions@gmail.com"
                    className="wipe text-steel-bright"
                  >
                    hephestos.solutions@gmail.com
                  </a>
                </dd>
              </div>
              <div className="rule" />
            </dl>
          </Reveal>
        </div>

        {/* ---- The form ---- */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <form onSubmit={submit} data-testid="contact-form" className="space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <Field label="Full name">
                  <input
                    data-testid="contact-full-name"
                    className={fieldCls}
                    placeholder="Jane Doe"
                    value={form.full_name}
                    onChange={update("full_name")}
                  />
                </Field>
                <Field label="Company">
                  <input
                    data-testid="contact-company"
                    className={fieldCls}
                    placeholder="Acme Shipping Ltd"
                    value={form.company_name}
                    onChange={update("company_name")}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <Field label="Industry">
                  <select
                    data-testid="contact-industry"
                    className={`${fieldCls} appearance-none`}
                    value={form.industry}
                    onChange={update("industry")}
                  >
                    <option value="" disabled className="bg-ink-raised">
                      Select one
                    </option>
                    {industries.map((i) => (
                      <option key={i.slug} value={i.name} className="bg-ink-raised">
                        {i.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Email address">
                  <input
                    data-testid="contact-email"
                    type="email"
                    className={fieldCls}
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={update("email")}
                  />
                </Field>
              </div>

              <Field label="What do you want to automate?">
                <textarea
                  data-testid="contact-automate"
                  rows={4}
                  className={`${fieldCls} resize-none`}
                  placeholder="The manual process that's costing you the most time."
                  value={form.automate}
                  onChange={update("automate")}
                />
              </Field>

              {/* Honeypot — hidden from users, catches bots */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={update("website")}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <label className="flex items-start gap-3 text-xs leading-relaxed text-ash cursor-pointer">
                <input
                  type="checkbox"
                  data-testid="contact-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#1E4E8C]"
                />
                <span>
                  I agree to the processing of my data as described in the{" "}
                  <Link to="/privacy" className="text-steel-bright underline underline-offset-2">
                    Privacy Policy
                  </Link>{" "}
                  and consent to being contacted.
                </span>
              </label>

              <button
                type="submit"
                data-testid="contact-submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 bg-steel px-8 py-5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-steel-hover disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Forge the Fix
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
