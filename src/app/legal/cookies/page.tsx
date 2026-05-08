import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Cookie Policy — Topykit",
  description: "How Topykit uses cookies and local storage.",
};

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="May 8, 2026">
      <Section title="1. What are cookies and local storage">
        <p>
          <strong>Cookies</strong> are small text files placed on your device
          by websites you visit. <strong>Local storage</strong> is a similar
          mechanism that allows websites to store data in your browser.
        </p>
      </Section>

      <Section title="2. What we use">
        <p>
          Topykit currently uses <strong>no tracking cookies</strong> and{" "}
          <strong>no third-party advertising cookies</strong>.
        </p>
        <p>We use only:</p>
        <ul>
          <li>
            <strong>Functional local storage</strong>: to remember your
            scoring rules and templates between sessions. This data stays on
            your device and is never sent to our servers.
          </li>
          <li>
            <strong>Strictly necessary cookies</strong> (if any): set by our
            hosting provider (Vercel) to ensure the site functions correctly.
            These cannot be disabled without breaking the site.
          </li>
        </ul>
      </Section>

      <Section title="3. Why we don't need a cookie banner today">
        <p>
          Under EU law (ePrivacy Directive and GDPR), only{" "}
          <strong>non-essential cookies</strong> require explicit consent.
          Since we currently use no analytics, advertising, or tracking
          technologies, no consent banner is required.
        </p>
        <p>
          If we add analytics or tracking in the future, we will update this
          policy and request your consent before any non-essential cookie is
          set.
        </p>
      </Section>

      <Section title="4. How to clear stored data">
        <p>
          If you want to remove the data Topykit has saved in your browser,
          you can:
        </p>
        <ul>
          <li>
            Click the &ldquo;Clear all&rdquo; button on the scoring page when
            available.
          </li>
          <li>
            Clear your browser&apos;s site data via your browser settings:
            <ul>
              <li>Chrome: Settings → Privacy → Clear browsing data</li>
              <li>Firefox: Settings → Privacy → Cookies and Site Data</li>
              <li>Safari: Preferences → Privacy → Manage Website Data</li>
            </ul>
          </li>
        </ul>
      </Section>

      <Section title="5. Third-party services">
        <p>
          Some pages may load resources from third-party providers (fonts,
          libraries). These providers may set their own cookies. We use:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> (hosting) — may set strictly necessary
            cookies for security and performance.
          </li>
          <li>
            <strong>Supabase</strong> (database) — used only for the waitlist
            email storage; does not set cookies on your browser.
          </li>
        </ul>
      </Section>

      <Section title="6. Updates to this policy">
        <p>
          We may update this Cookie Policy if our use of cookies changes. The
          &ldquo;last updated&rdquo; date reflects the most recent revision.
        </p>
      </Section>

      <Section title="7. Contact">
        <p>
          Questions about this Cookie Policy? Email us at{" "}
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
