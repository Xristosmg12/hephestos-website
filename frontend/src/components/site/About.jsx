import { SectionHead, Reveal } from "./Reveal";

export const About = () => (
  <section
    id="about"
    data-testid="about-section"
    className="relative py-24 lg:py-36 px-6 lg:px-10"
  >
    <div className="max-w-[1400px] mx-auto">
      <SectionHead index="06" label="Who We Are" title="Who is Hephestos" className="max-w-3xl" />

      <Reveal delay={0.1}>
        <blockquote className="mt-16 max-w-4xl font-display text-[clamp(1.75rem,4.4vw,3.5rem)] leading-[1.06] tracking-[-0.03em] text-bone">
          <span className="text-steel-bright">“</span>Named after the god of the forge — we build with
          the same obsession for precision.<span className="text-steel-bright">”</span>
        </blockquote>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12">
        <div className="md:col-span-2">
          <Reveal>
            <p className="ledger-key">The team</p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="md:col-span-5">
          <p className="rule pt-6 text-base leading-relaxed text-ash">
            Hephestos is a Cyprus-based AI automation agency made up of a young,
            talented, and relentlessly driven team of AI developers and engineers.
            We are not a legacy consultancy — we are builders. We move fast, think
            differently, and treat every client's problem as our own to solve.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="md:col-span-5">
          <p className="rule pt-6 text-base leading-relaxed text-ash">
            We started Hephestos because we saw businesses losing thousands of hours
            every year to work that machines should be doing. Our mission is simple:
            give that time back. We are motivated by what AI makes possible today and
            inspired by where it takes us tomorrow.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);
