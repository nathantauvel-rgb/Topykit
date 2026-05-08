import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Legal Notice — Topykit",
  description: "Legal information about Topykit.",
};

export default function LegalNotice() {
  return (
    <LegalLayout title="Legal Notice" lastUpdated="May 8, 2026">
      <Section title="Site editor">
        <p>
          This website (the &ldquo;Site&rdquo;) is published by:
        </p>
        <ul>
          <li>
            <strong>Name:</strong> [YOUR FULL LEGAL NAME or COMPANY NAME]
          </li>
          <li>
            <strong>Status:</strong> [Self-employed / Auto-entrepreneur / SAS / SARL / Sole trader / etc.]
          </li>
          <li>
            <strong>Address:</strong> [YOUR FULL POSTAL ADDRESS]
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:hello@topykit.com" className="text-[#ff5b2e] underline">
              hello@topykit.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong> [Optional — your business phone]
          </li>
          <li>
            <strong>SIREN / SIRET:</strong> [Required if French business — 9 or 14 digits]
          </li>
          <li>
            <strong>VAT number:</strong> [If applicable, format FR + 11 digits]
          </li>
          <li>
            <strong>Publication director:</strong> [Usually your name, the natural
            person legally responsible]
          </li>
        </ul>
      </Section>

      <Section title="Hosting provider">
        <p>The Site is hosted by:</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong>
          </li>
          <li>
            440 N Barranca Avenue #4133, Covina, CA 91723, United States
          </li>
          <li>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff5b2e] underline"
            >
              vercel.com
            </a>
          </li>
        </ul>
        <p>
          Database services are provided by <strong>Supabase Inc.</strong>,
          970 Toa Payoh North #07-04, Singapore 318992 (servers used by
          Topykit are hosted in the European Union).
        </p>
      </Section>

      <Section title="Intellectual property">
        <p>
          All content on this Site (text, graphics, logo, images, software,
          source code) is the exclusive property of [YOUR LEGAL NAME or
          COMPANY NAME], unless otherwise stated. Any reproduction,
          representation, modification, or distribution, in whole or in part,
          without prior written authorization is strictly prohibited and
          constitutes an infringement under articles L.335-2 and following of
          the French Intellectual Property Code.
        </p>
      </Section>

      <Section title="Liability">
        <p>
          The information provided on this Site is for general informational
          purposes only. Despite the care taken in preparing this Site, the
          editor cannot guarantee the accuracy, completeness, or relevance of
          the information provided. Use of the information is at the
          user&apos;s own risk.
        </p>
      </Section>

      <Section title="Personal data">
        <p>
          See our{" "}
          <a href="/legal/privacy" className="text-[#ff5b2e] underline">
            Privacy Policy
          </a>{" "}
          for information on how we collect and process personal data.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          See our{" "}
          <a href="/legal/cookies" className="text-[#ff5b2e] underline">
            Cookie Policy
          </a>{" "}
          for information on cookies and local storage used on this Site.
        </p>
      </Section>

      <Section title="Applicable law">
        <p>
          This Legal Notice is governed by French law. In case of dispute,
          and after attempting to find an amicable solution, French courts
          have sole jurisdiction.
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
