import { LegalLayout, Section } from "./LegalLayout";

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" updated="June 2026">
      <p className="mt-8 text-sm leading-relaxed text-ash">
        These Terms of Service ("Terms") govern your use of the Hephestos website and
        your engagement with our services. By using this website or contacting us, you
        agree to these Terms.
      </p>

      <Section title="1. Services">
        <p>
          Hephestos is a Cyprus-based AI automation agency providing custom automation
          tools, workflows, bots, and integrations. Any specific engagement, scope,
          deliverables, and pricing are agreed separately in writing.
        </p>
      </Section>

      <Section title="2. Use of the Website">
        <p>
          You agree to use this website lawfully and not to attempt to disrupt, abuse,
          or gain unauthorised access to it. Automated scraping, spamming of forms, or
          attempts to overload our systems are prohibited.
        </p>
      </Section>

      <Section title="3. Intellectual Property">
        <p>
          All content, branding, logos, and design on this website are the property of
          Hephestos and may not be reproduced without permission.
        </p>
      </Section>

      <Section title="4. No Warranty">
        <p>
          This website is provided "as is" without warranties of any kind. While we
          strive for accuracy, we make no guarantees that the content is complete,
          current, or error-free.
        </p>
      </Section>

      <Section title="5. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Hephestos shall not be liable for any
          indirect, incidental, or consequential damages arising from the use of this
          website. Liability for any engagement is governed by the relevant service
          agreement.
        </p>
      </Section>

      <Section title="6. Third-Party Links">
        <p>
          This website may reference third-party services. We are not responsible for the
          content or practices of external sites.
        </p>
      </Section>

      <Section title="7. Governing Law">
        <p>
          These Terms are governed by the laws of the Republic of Cyprus, and any disputes
          shall be subject to the exclusive jurisdiction of the Cypriot courts.
        </p>
      </Section>

      <Section title="8. Contact">
        <p>
          Questions about these Terms? Email{" "}
          <a href="mailto:hephestos.solutions@gmail.com" className="text-ember underline underline-offset-2">
            hephestos.solutions@gmail.com
          </a>.
        </p>
      </Section>
    </LegalLayout>
  );
}
