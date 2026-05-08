import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Privacy Policy — Topykit",
  description: "How Topykit collects, uses, and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 8, 2026">
      <Section title="1. Who we are">
        <p>
          Topykit (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a
          web tool that helps users score and prioritize their LinkedIn /
          Sales Navigator prospect lists. This Privacy Policy explains how we
          handle your personal information.
        </p>
        <p>
          The data controller is{" "}
          <strong>[YOUR LEGAL NAME or COMPANY NAME]</strong>, located at{" "}
          <strong>[YOUR ADDRESS]</strong>. For any privacy-related question,
          contact us at{" "}
          <a href="mailto:hello@topykit.com" className="text-[#ff5b2e] underline">
            hello@topykit.com
          </a>
          .
        </p>
      </Section>

      <Section title="2. What data we collect">
        <p>We collect a minimal amount of personal data:</p>
        <ul>
          <li>
            <strong>Email address</strong> when you join our waitlist or contact us.
          </li>
          <li>
            <strong>Anonymous usage data</strong> (page views, browser type, country)
            via privacy-respecting analytics tools, if enabled.
          </li>
        </ul>
        <p>
          <strong>What we do NOT collect:</strong> the prospect data you upload
          to our scoring tool. CSV files you upload are processed{" "}
          <strong>entirely in your browser</strong> and never sent to our servers.
          We have no access to that data.
        </p>
      </Section>

      <Section title="3. Why we collect it">
        <p>We use your email address to:</p>
        <ul>
          <li>Notify you when Topykit launches or releases new features.</li>
          <li>Respond to your questions or feedback.</li>
          <li>Send important account or service-related communications.</li>
        </ul>
        <p>
          We do not sell, rent, or share your email address with third parties
          for marketing purposes.
        </p>
      </Section>

      <Section title="4. Where your data is stored">
        <p>
          Your email is stored in our database hosted by{" "}
          <strong>Supabase</strong> (servers located in the European Union).
          Our website is hosted by <strong>Vercel Inc.</strong> (United
          States). Both providers are GDPR-compliant data processors.
        </p>
      </Section>

      <Section title="5. How long we keep your data">
        <p>
          We keep your email until you ask us to delete it, or until our
          waitlist is closed and the launch communications have been sent. You
          can request deletion at any time.
        </p>
      </Section>

      <Section title="6. Your rights (GDPR)">
        <p>
          If you are a resident of the European Economic Area (EEA), United
          Kingdom, or Switzerland, you have the following rights regarding
          your personal data:
        </p>
        <ul>
          <li>
            <strong>Right of access</strong> — request a copy of the data we
            hold about you.
          </li>
          <li>
            <strong>Right to rectification</strong> — ask us to correct
            inaccurate data.
          </li>
          <li>
            <strong>Right to erasure</strong> — ask us to delete your data.
          </li>
          <li>
            <strong>Right to object</strong> — object to certain types of
            processing.
          </li>
          <li>
            <strong>Right to data portability</strong> — receive your data in
            a machine-readable format.
          </li>
          <li>
            <strong>Right to lodge a complaint</strong> — with your local data
            protection authority (in France: CNIL).
          </li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:hello@topykit.com" className="text-[#ff5b2e] underline">
            hello@topykit.com
          </a>
          . We will respond within 30 days.
        </p>
      </Section>

      <Section title="7. Cookies and local storage">
        <p>
          Topykit uses your browser&apos;s <strong>local storage</strong> to
          remember your scoring rules and templates between sessions. This
          data stays on your device and is never sent to our servers.
        </p>
        <p>
          We do not currently use tracking cookies. See our{" "}
          <a href="/legal/cookies" className="text-[#ff5b2e] underline">
            Cookie Policy
          </a>{" "}
          for details.
        </p>
      </Section>

      <Section title="8. Security">
        <p>
          We use industry-standard security measures to protect your data:
          HTTPS encryption, restricted database access, and secure
          authentication tokens. However, no system is 100% secure — if you
          believe your data has been compromised, please contact us
          immediately.
        </p>
      </Section>

      <Section title="9. Children's privacy">
        <p>
          Topykit is intended for professional use. We do not knowingly collect
          data from individuals under 16 years old. If you believe we have
          done so, please contact us and we will delete the data.
        </p>
      </Section>

      <Section title="10. Changes to this policy">
        <p>
          We may update this Privacy Policy occasionally. The &ldquo;last
          updated&rdquo; date at the top of this page reflects the latest
          revision. Significant changes will be communicated via email if you
          are on our waitlist.
        </p>
      </Section>

      <Section title="11. Contact">
        <p>
          For any question regarding this policy or your personal data,
          contact:{" "}
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
