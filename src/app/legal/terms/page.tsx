import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Terms of Service — Topykit",
  description: "The rules for using Topykit.",
};

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="May 8, 2026">
      <Section title="1. Agreement to terms">
        <p>
          By accessing or using Topykit (the &ldquo;Service&rdquo;), you agree
          to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you
          do not agree, do not use the Service.
        </p>
        <p>
          The Service is operated by{" "}
          <strong>[YOUR LEGAL NAME or COMPANY NAME]</strong>
          (&ldquo;Topykit&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
        </p>
      </Section>

      <Section title="2. The service">
        <p>
          Topykit is a browser-based tool that scores prospect lists provided
          by users via CSV upload. The Service does not connect to LinkedIn or
          any other third-party platform; it processes only files that you
          explicitly upload.
        </p>
        <p>
          The Service is currently in <strong>beta</strong>. Features,
          pricing, and availability may change without notice.
        </p>
      </Section>

      <Section title="3. Eligibility and account">
        <p>
          You must be at least 16 years old and have the legal capacity to
          enter into binding agreements to use the Service. By using Topykit,
          you represent that you meet these requirements.
        </p>
        <p>
          The Service does not currently require an account. Where account
          creation becomes available, you are responsible for maintaining the
          confidentiality of your credentials.
        </p>
      </Section>

      <Section title="4. Acceptable use">
        <p>You agree NOT to use the Service to:</p>
        <ul>
          <li>Violate any applicable law or regulation.</li>
          <li>
            Process personal data in violation of GDPR or other privacy laws —
            you are responsible for ensuring you have a lawful basis to
            process the prospect data you upload.
          </li>
          <li>
            Attempt to scrape, reverse-engineer, or interfere with the
            Service.
          </li>
          <li>Resell, sublicense, or redistribute the Service.</li>
          <li>
            Use the Service to harass, defame, or harm others, or to send
            unsolicited communications.
          </li>
          <li>Upload malicious files or attempt to inject malicious code.</li>
        </ul>
      </Section>

      <Section title="5. Your data">
        <p>
          Files you upload to the Service are processed{" "}
          <strong>entirely in your browser</strong>. We do not receive,
          store, or have access to the contents of those files.
        </p>
        <p>
          You retain all rights to the data you upload. By using the Service
          to process this data, you confirm that you have the legal right to
          do so.
        </p>
      </Section>

      <Section title="6. Intellectual property">
        <p>
          The Service, including its source code, design, branding, and
          content, is the exclusive property of Topykit. You are granted a
          limited, non-exclusive, non-transferable license to use the Service
          for its intended purpose.
        </p>
      </Section>

      <Section title="7. Beta disclaimer">
        <p>
          The Service is provided <strong>&ldquo;as is&rdquo;</strong> and
          <strong> &ldquo;as available&rdquo;</strong>, without warranties of
          any kind, express or implied. We do not guarantee that the Service
          will be uninterrupted, error-free, or that scoring results will
          meet your specific business needs.
        </p>
        <p>
          Scoring is based on rules you configure. The Service does not make
          any representations about the quality, fit, or conversion potential
          of any specific prospect.
        </p>
      </Section>

      <Section title="8. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Topykit shall not be liable
          for any indirect, incidental, special, consequential, or punitive
          damages, including but not limited to loss of profits, data, or
          business opportunities, arising out of or in connection with your
          use of the Service.
        </p>
        <p>
          Our total liability for any claim arising from these Terms shall
          not exceed the amount you have paid us in the 12 months preceding
          the claim, or 100 EUR if no payment has been made.
        </p>
      </Section>

      <Section title="9. Termination">
        <p>
          We may suspend or terminate your access to the Service at any time,
          for any reason, with or without notice. You may stop using the
          Service at any time.
        </p>
      </Section>

      <Section title="10. Changes to the Terms">
        <p>
          We may update these Terms occasionally. The &ldquo;last
          updated&rdquo; date at the top of this page reflects the latest
          revision. Continued use of the Service after changes constitutes
          acceptance of the new Terms.
        </p>
      </Section>

      <Section title="11. Governing law">
        <p>
          These Terms are governed by the laws of <strong>France</strong>.
          Any dispute arising from these Terms shall be submitted to the
          competent courts of <strong>[YOUR JURISDICTION CITY]</strong>,
          unless otherwise required by mandatory consumer protection laws.
        </p>
      </Section>

      <Section title="12. Contact">
        <p>
          For any question about these Terms, contact:{" "}
          <a href="mailto:hello@topykit.com" className="text-[#ff5b2e] underline">
            hello@topykit.com
          </a>
        </p>
      </Section>
    </LegalLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="space-y-3 leading-relaxed [&_a]:text-[#ff5b2e] [&_a]:underline [&_li]:ml-6 [&_li]:list-disc [&_strong]:text-zinc-900 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
