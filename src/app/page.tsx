import { Fragment } from "react";
import Logo from "@/components/Logo";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdf8f1] text-zinc-900">
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/60 bg-[#fdf8f1]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden gap-8 text-sm font-medium text-zinc-700 md:flex">
            <a href="#how" className="hover:text-[#ff5b2e]">How it works</a>
            <a href="#features" className="hover:text-[#ff5b2e]">Features</a>
            <a href="#pricing" className="hover:text-[#ff5b2e]">Pricing</a>
            <a href="#faq" className="hover:text-[#ff5b2e]">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="/app"
              className="hidden rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-[#ff5b2e] hover:text-[#ff5b2e] sm:inline-block"
            >
              Try it free →
            </a>
            <a
              href="#waitlist"
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#ff5b2e]"
            >
              Get early access
            </a>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60"></div>
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#ff5b2e]/20 blur-[120px]"></div>
        <div className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-amber-300/30 blur-[120px]"></div>

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#ff5b2e]/30 bg-[#ff5b2e]/10 px-4 py-1.5 text-xs font-semibold text-[#c43a14]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5b2e] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5b2e]"></span>
              </span>
              Early access — 50% off forever for first 100 users
            </div>

            <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Stop guessing which leads to{" "}
              <span className="relative inline-block">
                <span className="relative z-10">contact first.</span>
                <span className="absolute bottom-1 left-0 z-0 h-3 w-full -rotate-1 bg-[#ff5b2e]/30 md:h-4"></span>
              </span>
            </h1>

            <p className="mt-8 text-balance text-lg text-zinc-600 md:text-xl">
              Topykit scores your Sales Navigator exports in seconds — so you
              spend your time on the prospects most likely to convert, not
              scrolling through a 500-row spreadsheet.
            </p>

            <div id="waitlist" className="mx-auto mt-10 max-w-xl">
              <WaitlistForm />
              <p className="mt-3 text-xs text-zinc-500">
                No credit card. No spam. We&apos;ll only email you when Topykit
                is ready.
              </p>
            </div>

            <div className="mt-6">
              <a
                href="/app"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff5b2e] hover:text-[#c43a14]"
              >
                Or try the beta now (free, no signup) →
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Works with any CSV
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                No CRM required
              </div>
              <div className="hidden items-center gap-1.5 sm:flex">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Setup in 60 seconds
              </div>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#ff5b2e]/20 via-amber-200/30 to-[#ff5b2e]/20 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10">
              <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50/80 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <div className="ml-3 flex items-center gap-2 text-xs text-zinc-400">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zM12 11V7m0 4v4M5 11h14" /></svg>
                  app.topykit.com / dashboard
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
                {/* Sidebar */}
                <div className="hidden border-r border-zinc-100 bg-zinc-50/40 p-5 lg:block">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Scoring criteria
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { label: "Job title match", weight: 35 },
                      { label: "Company size", weight: 25 },
                      { label: "Industry", weight: 20 },
                      { label: "Location", weight: 15 },
                      { label: "Seniority", weight: 5 },
                    ].map((c) => (
                      <div key={c.label} className="rounded-lg border border-zinc-200 bg-white p-3">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span>{c.label}</span>
                          <span className="text-[#ff5b2e]">{c.weight}%</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#ff5b2e] to-amber-400"
                            style={{ width: `${c.weight * 2.5}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main */}
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
                    <div>
                      <div className="text-sm font-semibold">Q4 Outbound list</div>
                      <div className="text-xs text-zinc-500">312 prospects scored · 2 min ago</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-zinc-50">
                        Filter
                      </button>
                      <button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white">
                        Export CSV
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 border-b border-zinc-100 bg-zinc-50/50 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    <div className="col-span-4">Prospect</div>
                    <div className="col-span-4">Company</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2 text-right">Score</div>
                  </div>
                  {[
                    { name: "Sarah Mitchell", initials: "SM", company: "Acme SaaS", role: "Head of Growth", score: 94, color: "from-emerald-500 to-emerald-400", bg: "bg-emerald-50", text: "text-emerald-700" },
                    { name: "David Chen", initials: "DC", company: "Northwind", role: "VP Sales", score: 88, color: "from-emerald-500 to-emerald-400", bg: "bg-emerald-50", text: "text-emerald-700" },
                    { name: "Marie Dubois", initials: "MD", company: "Voltaire AI", role: "CMO", score: 76, color: "from-amber-500 to-amber-400", bg: "bg-amber-50", text: "text-amber-700" },
                    { name: "James O'Connor", initials: "JO", company: "Riverside", role: "Marketing", score: 54, color: "from-amber-500 to-amber-400", bg: "bg-amber-50", text: "text-amber-700" },
                    { name: "Anna Müller", initials: "AM", company: "Helix Labs", role: "Junior SDR", score: 22, color: "from-zinc-300 to-zinc-200", bg: "bg-zinc-100", text: "text-zinc-600" },
                  ].map((p, i) => (
                    <div key={p.name} className={`grid grid-cols-12 items-center px-5 py-3.5 text-sm ${i !== 4 ? "border-b border-zinc-50" : ""}`}>
                      <div className="col-span-4 flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-xs font-bold text-white">
                          {p.initials}
                        </div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                      <div className="col-span-4 text-zinc-600">{p.company}</div>
                      <div className="col-span-2 text-zinc-600">{p.role}</div>
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-zinc-100">
                          <div className={`h-full bg-gradient-to-r ${p.color}`} style={{ width: `${p.score}%` }}></div>
                        </div>
                        <span className={`min-w-[2.5rem] rounded-md px-2 py-0.5 text-center text-xs font-bold ${p.bg} ${p.text}`}>
                          {p.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="border-y border-zinc-200/60 bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Built for founders, sales reps & growth teams worldwide
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            {["FOUNDERHQ", "Northwind", "Voltaire", "Helix Labs", "Acme.io", "Riverside"].map((l) => (
              <div key={l} className="text-xl font-bold tracking-tight text-zinc-700">
                {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { num: "8x", label: "Faster prospect prioritization", sub: "vs manual Excel scoring" },
              { num: "47%", label: "Higher reply rates", sub: "when reps work top-scored leads first" },
              { num: "60s", label: "From CSV to ranked list", sub: "no setup, no CRM, no onboarding" },
            ].map((s) => (
              <div key={s.label} className="group relative rounded-2xl border border-zinc-200 bg-white p-8 transition-shadow hover:shadow-xl hover:shadow-[#ff5b2e]/5">
                <div className="text-5xl font-bold tracking-tight text-[#ff5b2e]">{s.num}</div>
                <div className="mt-3 text-base font-semibold">{s.label}</div>
                <div className="mt-1 text-sm text-zinc-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="relative overflow-hidden border-y border-zinc-200/60 bg-zinc-900 text-white">
        <div className="absolute inset-0 bg-dots opacity-20"></div>
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ff5b2e]">The problem</div>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Most reps work leads in the wrong order.
            </h2>
            <p className="mt-5 text-lg text-zinc-400">
              You export 300 leads from Sales Navigator. You stare at the
              spreadsheet. You start at the top and hope.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                emoji: "🎲",
                title: "Random prioritization",
                body: "Most reps work leads alphabetically or by gut feeling. The hottest prospects sit at row 247.",
              },
              {
                emoji: "💸",
                title: "Generic CRMs are overkill",
                body: "HubSpot and Salesforce cost €800+/mo and need weeks of setup before scoring a single lead.",
              },
              {
                emoji: "📊",
                title: "Excel doesn't cut it",
                body: "Manually weighting columns is slow, error-prone, and impossible to repeat or share.",
              },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.06]">
                <div className="text-3xl">{p.emoji}</div>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how" className="relative">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ff5b2e]">How it works</div>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Three steps. No CRM. No setup.
            </h2>
            <p className="mt-5 text-lg text-zinc-600">
              From messy export to prioritized list in under a minute.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload your CSV",
                body: "Drop your Sales Navigator, Apollo, or LinkedIn export. We auto-detect the columns, no mapping needed.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Define your criteria",
                body: "Tell Topykit what a great lead looks like — role, company size, industry, location. Pick weights with sliders.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Get a ranked list",
                body: "Every prospect is scored 0–100. Export the prioritized CSV and start contacting the hottest leads first.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
            ].map((s) => (
              <div key={s.step} className="relative rounded-2xl border border-zinc-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff5b2e]/10 text-[#ff5b2e]">
                    {s.icon}
                  </div>
                  <div className="font-mono text-2xl font-bold text-zinc-200">{s.step}</div>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="relative bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ff5b2e]">Features</div>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Auto column detection", body: "Sales Navigator, Apollo, ZoomInfo, custom — Topykit reads them all." },
              { title: "Custom scoring templates", body: "Save your criteria once, reuse them across every list, every campaign." },
              { title: "Weighted criteria", body: "Drag sliders to give more weight to job title, less to location. Your rules." },
              { title: "Bulk processing", body: "Score 5 000 prospects at once. Coffee break, not project deadline." },
              { title: "Export anywhere", body: "CSV, JSON, or copy a sorted list straight into your CRM or sequencer." },
              { title: "Privacy first", body: "We never scrape LinkedIn. Your data stays yours — delete anytime." },
            ].map((f) => (
              <div key={f.title} className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-[#ff5b2e]/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff5b2e]/10 text-[#ff5b2e]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-zinc-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ff5b2e]">Why Topykit</div>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              The simpler alternative
            </h2>
          </div>

          <div className="mt-14 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <div className="grid grid-cols-4 gap-px bg-zinc-100">
              <div className="bg-white p-5 font-semibold text-zinc-500"></div>
              <div className="bg-[#ff5b2e] p-5 text-center">
                <Logo size={24} showText={false} />
                <div className="mt-2 text-sm font-bold text-white">Topykit</div>
              </div>
              <div className="bg-white p-5 text-center text-sm font-bold text-zinc-700">HubSpot</div>
              <div className="bg-white p-5 text-center text-sm font-bold text-zinc-700">Apollo</div>

              {[
                ["Setup time", "60 seconds", "2–4 weeks", "1 week"],
                ["CRM required", "No", "Yes (own)", "Yes (own)"],
                ["Starting price", "€19/mo", "€800+/mo", "€99/mo"],
                ["Custom scoring", "Yes", "Yes", "Limited"],
                ["Works offline (CSV)", "Yes", "No", "No"],
                ["Annual contract", "No", "Often", "Often"],
              ].map(([feat, a, b, c]) => (
                <Fragment key={feat}>
                  <div className="bg-white p-4 text-sm font-medium">{feat}</div>
                  <div className="bg-[#fff5f0] p-4 text-center text-sm font-bold text-[#ff5b2e]">{a}</div>
                  <div className="bg-white p-4 text-center text-sm text-zinc-600">{b}</div>
                  <div className="bg-white p-4 text-center text-sm text-zinc-600">{c}</div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative border-y border-zinc-200/60 bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ff5b2e]">Loved by sales teams</div>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              What early users say
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "I was spending 2 hours every Monday sorting my Sales Nav exports in Excel. Topykit does it in 30 seconds and the prioritization is sharper.",
                name: "Marc Lefèvre",
                role: "Founder, B2B Agency",
                avatar: "ML",
              },
              {
                quote: "Finally a lead scoring tool that doesn't require a 6-week onboarding with a CSM. I uploaded a CSV and had ranked leads before lunch.",
                name: "Priya Sharma",
                role: "Sales Lead, FinTech SaaS",
                avatar: "PS",
              },
              {
                quote: "We replaced a custom Notion + Airtable workflow with Topykit. Saved us hours each week and the scoring is more consistent.",
                name: "Lukas Bauer",
                role: "Head of Growth",
                avatar: "LB",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-zinc-200 bg-white p-7">
                <div className="flex gap-1 text-[#ff5b2e]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.783.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-700">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff5b2e] to-amber-500 text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="relative">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ff5b2e]">Pricing</div>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Simple, fair, locked-in.
            </h2>
            <p className="mt-5 text-lg text-zinc-600">
              Lock in 50% off forever — first 100 waitlist members only.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="relative rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:shadow-xl hover:shadow-zinc-900/5">
              <div className="text-sm font-semibold text-zinc-500">Starter</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight">€19</span>
                <span className="text-zinc-400 line-through">€39</span>
                <span className="text-sm text-zinc-500">/month</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">Perfect for solo founders &amp; freelance reps</p>

              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Score up to 500 prospects/month",
                  "3 scoring templates",
                  "CSV export",
                  "Email support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="mt-8 block rounded-full border-2 border-zinc-900 py-3 text-center text-sm font-semibold transition-colors hover:bg-zinc-900 hover:text-white"
              >
                Join waitlist
              </a>
            </div>

            <div className="relative rounded-2xl border-2 border-[#ff5b2e] bg-gradient-to-br from-white to-[#fff5f0] p-8 shadow-xl shadow-[#ff5b2e]/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ff5b2e] px-4 py-1 text-xs font-bold text-white shadow-lg">
                ★ Most popular
              </div>
              <div className="text-sm font-semibold text-[#ff5b2e]">Pro</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight">€39</span>
                <span className="text-zinc-400 line-through">€79</span>
                <span className="text-sm text-zinc-500">/month</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">For growth teams &amp; sales agencies</p>

              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Score up to 5 000 prospects/month",
                  "Unlimited scoring templates",
                  "CSV + JSON + API export",
                  "Save & reuse criteria sets",
                  "Priority support",
                  "Early access to new features",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#ff5b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="mt-8 block rounded-full bg-[#ff5b2e] py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#ff5b2e]/30 transition-all hover:bg-[#e84d24]"
              >
                Join waitlist →
              </a>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-zinc-500">
            Need to score 50 000+ prospects? <a href="mailto:hello@topykit.com" className="font-semibold text-[#ff5b2e] underline">Talk to us</a>
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="relative bg-white/60">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ff5b2e]">FAQ</div>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Questions, answered
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {[
              {
                q: "Do you scrape LinkedIn?",
                a: "No. Topykit only works with CSVs you've already exported yourself (Sales Navigator, Apollo, etc.). We never touch LinkedIn directly — your account stays safe.",
              },
              {
                q: "Do I need a CRM?",
                a: "No. Topykit is fully standalone. Upload a CSV, get a ranked list, export it. Use it with any CRM, email tool, or just on its own.",
              },
              {
                q: "When will it launch?",
                a: "We're targeting a public launch in 6–8 weeks. Waitlist members get early access and locked-in 50% pricing for life.",
              },
              {
                q: "What if my export format is unusual?",
                a: "Topykit auto-detects common columns. If your file is custom, you can map fields manually in 30 seconds.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Monthly plans, no commitment, no questions asked. Your locked-in price comes back if you re-subscribe within 90 days.",
              },
            ].map((item) => (
              <details key={item.q} className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-[#ff5b2e]/40">
                <summary className="flex cursor-pointer items-center justify-between font-semibold">
                  {item.q}
                  <svg className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden bg-zinc-900 text-white">
        <div className="absolute inset-0 bg-dots opacity-20"></div>
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#ff5b2e]/30 blur-[120px]"></div>

        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Be the first to try Topykit.
          </h2>
          <p className="mt-5 text-lg text-zinc-300">
            Join 200+ founders and reps on the waitlist. Lock in 50% off forever.
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <WaitlistForm variant="dark" />
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            ⚡ Limited to first 100 users. €19/mo locked in for life.
          </p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-zinc-200/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <span className="text-sm text-zinc-500">© 2026 Topykit — All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-zinc-600">
            <a href="/legal/privacy" className="hover:text-[#ff5b2e]">Privacy</a>
            <a href="/legal/terms" className="hover:text-[#ff5b2e]">Terms</a>
            <a href="/legal/cookies" className="hover:text-[#ff5b2e]">Cookies</a>
            <a href="/legal/notice" className="hover:text-[#ff5b2e]">Legal notice</a>
            <a href="mailto:hello@topykit.com" className="hover:text-[#ff5b2e]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
