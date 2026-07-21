import { LegalLayout, Section } from "./LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 2026">
      <p className="mt-8 text-sm leading-relaxed text-ash">
        Hephestos ("we", "us", "our") is a Cyprus-based AI automation agency. This
        Privacy Policy explains how we collect, use, and protect your personal data
        in accordance with the EU General Data Protection Regulation (GDPR) and Cyprus
        data protection law.
      </p>

      <Section title="1. Data Controller">
        <p>
          The data controller responsible for your personal data is Hephestos. For any
          privacy-related questions or to exercise your rights, contact us at{" "}
          <a href="mailto:hephestos.solutions@gmail.com" className="text-ember underline underline-offset-2">
            hephestos.solutions@gmail.com
          </a>.
        </p>
      </Section>

      <Section title="2. What Data We Collect">
        <p>
          We only collect the information you voluntarily provide through our contact
          form: your full name, company name, industry, email address, and the details
          of what you would like to automate. We also record that you gave consent and
          the time of submission.
        </p>
        <p>We do not collect special categories of personal data, and we do not track you across the web.</p>
      </Section>

      <Section title="3. Legal Basis & Purpose">
        <p>
          We process your data on the basis of your <strong>consent</strong> (Article 6(1)(a)
          GDPR), given when you tick the consent box and submit the form. We use it solely
          to respond to your enquiry and discuss potential automation services.
        </p>
      </Section>

      <Section title="4. Cookies">
        <p>
          This website uses only strictly necessary cookies and local storage required for
          the site to function and to remember your cookie preference. We do not use
          advertising or cross-site tracking cookies.
        </p>
      </Section>

      <Section title="5. Data Retention">
        <p>
          We keep contact submissions only for as long as necessary to handle your enquiry
          and any resulting business relationship, after which the data is deleted. You may
          request deletion at any time.
        </p>
      </Section>

      <Section title="6. Data Sharing">
        <p>
          We do not sell your personal data. We do not share it with third parties except
          where strictly necessary to provide our services or where required by law.
        </p>
      </Section>

      <Section title="7. Security">
        <p>
          We apply appropriate technical and organisational measures to protect your data,
          including encrypted transport (HTTPS), input validation, rate limiting to prevent
          abuse, and restricted access to stored submissions.
        </p>
      </Section>

      <Section title="8. Your Rights">
        <p>Under the GDPR you have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request erasure ("right to be forgotten")</li>
          <li>Restrict or object to processing</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
          <li>Lodge a complaint with the Cyprus Data Protection Commissioner</li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a href="mailto:hephestos.solutions@gmail.com" className="text-ember underline underline-offset-2">
            hephestos.solutions@gmail.com
          </a>.
        </p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The latest version will
          always be available on this page.
        </p>
      </Section>
    </LegalLayout>
  );
}
