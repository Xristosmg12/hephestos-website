import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { industries } from "../../data/industries";

// Contact submissions are emailed via FormSubmit (no backend/database needed).
// Change this address to wherever you want inquiries delivered.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/hephestos.solutions@gmail.com";

const empty = { full_name: "", company_name: "", industry: "", email: "", automate: "", website: "" };

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

  const inputCls =
    "w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-[#3B82F6] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] transition-colors";

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 animated-gradient animate-gradient-shift" />
      <div className="absolute left-1/2 top-1/2 w-[720px] h-[520px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Ready to Automate?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              Tell us what's slowing you down. We'll forge the fix.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} data-testid="contact-form" className="mt-12 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input data-testid="contact-full-name" className={inputCls} placeholder="Full Name" value={form.full_name} onChange={update("full_name")} />
              <input data-testid="contact-company" className={inputCls} placeholder="Company" value={form.company_name} onChange={update("company_name")} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select data-testid="contact-industry" className={`${inputCls} appearance-none`} value={form.industry} onChange={update("industry")}>
                <option value="" disabled className="bg-[#0f0f10]">Industry</option>
                {industries.map((i) => (
                  <option key={i.slug} value={i.name} className="bg-[#0f0f10]">{i.name}</option>
                ))}
              </select>
              <input data-testid="contact-email" type="email" className={inputCls} placeholder="Email Address" value={form.email} onChange={update("email")} />
            </div>
            <textarea data-testid="contact-automate" rows={4} className={inputCls} placeholder="What do you want to automate?" value={form.automate} onChange={update("automate")} />

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

            <label className="flex items-start gap-3 text-xs text-gray-400 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                data-testid="contact-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#3B82F6]"
              />
              <span>
                I agree to the processing of my data as described in the{" "}
                <a href="#/privacy" className="text-[#3B82F6] underline hover:text-[#7C3AED]">
                  Privacy Policy
                </a>{" "}
                and consent to being contacted.
              </span>
            </label>

            <button
              type="submit"
              data-testid="contact-submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(59,130,246,0.6)] transition-all disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
              ) : (
                <>Forge the Fix <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
