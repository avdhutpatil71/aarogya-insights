"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Play,
  X,
  Cpu,
  Users,
  Stethoscope,
  ShieldCheck,
  ShoppingCart,
  MonitorSmartphone,
} from "lucide-react"

export default function AIPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)

  const cards = [
    {
      id: "overview",
      title: "AI Overview — What it can do",
      icon: <Cpu className="w-5 h-5" />,
      bullets: [
        "Offer friendly chat guidance to patients (symptom triage, booking help).",
        "Suggest relevant doctors, tests and nearby hospitals based on simple inputs.",
        "Summarize documents and reports into one-line insights for users.",
        "Provide smart reminders (medicines, appointments) and quick FAQs.",
      ],
    },
    {
      id: "patients",
      title: "AI for Patients",
      icon: <Users className="w-5 h-5" />,
      bullets: [
        "Symptom helper (non-diagnostic): ask simple questions and suggest next steps.",
        "Appointment suggestions: recommend nearby doctors, clinics and slots.",
        "Document summarizer: short summary of uploaded reports (one-paragraph).",
      ],
    },
    {
      id: "doctors",
      title: "AI for Doctors & Hospitals",
      icon: <Stethoscope className="w-5 h-5" />,
      bullets: [
        "Auto-summarize patient history for faster review before consultation.",
        "Generate templated clinical notes or follow-up reminders.",
        "Surface related cases or guidelines (non-prescriptive) for clinician reference.",
      ],
    },
    {
      id: "radiology",
      title: "AI for Diagnostics (High-level)",
      icon: <MonitorSmartphone className="w-5 h-5" />,
      bullets: [
        "AI can auto-label findings or produce suggested plain-language summaries.",
        "Clinical validation required — AI should support, not replace radiologists.",
      ],
    },
    {
      id: "mart",
      title: "AI for Aarogya Mart & Pharmacy",
      icon: <ShoppingCart className="w-5 h-5" />,
      bullets: [
        "Product suggestions based on patient history or previous orders.",
        "AI-powered search recommendations for medicines & essentials.",
      ],
    },
    {
      id: "admin",
      title: "AI for Platform Admin",
      icon: <ShieldCheck className="w-5 h-5" />,
      bullets: [
        "Auto-categorize support tickets and suggest responses.",
        "Detect spam or fraud patterns and alert supervisors.",
      ],
    },
  ]

  const howTo = [
    "Pick the AI function (chat helper, summarizer, reminders, recommendations).",
    "Use a trusted AI provider — minimal setup required.",
    "Add a simple button or chat widget on relevant screens.",
    "Send only non-sensitive text data to AI APIs.",
    "Show a disclaimer: “AI suggestions are assistive only”.",
    "Keep logs for quality and system improvement.",
  ]

  const faqs = [
    {
      q: "Is AI giving medical advice?",
      a: "No — AI should only provide suggestions. All decisions must be made by qualified clinicians.",
    },
    {
      q: "Does AI see private medical files?",
      a: "Only if the user uploads them. Keep all AI inputs minimal and anonymized.",
    },
    {
      q: "How do we measure AI performance?",
      a: "Track conversions, suggestions clicked, and simple user feedback ratings.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">

      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10">
        <Link
          href="/main_documentation"
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition"
        >
          ← Back to Documentation
        </Link>
      </div>

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-20 md:pt-28 mb-16">
        <div className="flex items-start justify-between gap-10">

          <div className="flex-1">
            <h1 className="text-4xl font-bold">AI Module — Integration Guide</h1>
            <p className="text-foreground/60 mt-3 max-w-3xl leading-relaxed">
              A simple, high-level overview of how AI enhances workflows across Aarogya Aadhar.
              Built for product managers, health administrators, and decision-makers.
            </p>
          </div>

          {/* VIDEO SIDECARD */}
          <div className="w-48 shrink-0">
            <div className="rounded-xl border border-border bg-card/40 backdrop-blur p-5 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-center text-foreground/70">Video Tutorial</p>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="mt-4 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-sm text-white hover:scale-105 transition"
              >
                Watch AI Basics
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
          <div className="relative w-full max-w-3xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h4 className="text-lg font-semibold">AI Module — Getting Started</h4>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-lg hover:bg-accent/20 text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-black/30">
              <video className="w-full rounded-lg border border-border bg-black" controls src="/videos/ai_integration.mp4" />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 md:px-10 pb-28">

        {/* HOW-TO SECTION */}
        <section className="mb-14">
          <div className="rounded-xl p-8 border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5 shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Quick Integration Steps</h3>

            <ol className="list-decimal pl-6 space-y-2 text-foreground/80">
              {howTo.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <p className="text-sm text-foreground/60 mt-4">
              These steps describe the functional workflow. Technical implementation can be created separately.
            </p>
          </div>
        </section>

        {/* FEATURE CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {cards.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-border bg-card/40 backdrop-blur p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow">
                  {c.icon}
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{c.title}</h4>

                  <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1">
                    {c.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end mt-5">
                <button
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  className="px-3 py-2 rounded-md bg-foreground/5 hover:bg-foreground/10 transition text-sm"
                >
                  {expanded === c.id ? "Hide" : "Read More"}
                </button>
              </div>

              {expanded === c.id && (
                <div className="mt-4 border-t border-border/50 pt-4 text-sm text-foreground/70 leading-relaxed">
                  <p className="mb-2">
                    <strong>How this helps:</strong> makes the workflow smoother and more intuitive for users.
                  </p>
                  <p>
                    <strong>Safe usage:</strong> Always show a clear disclaimer:
                    <em> “AI suggestions are assistive only — verify with a clinician.”</em>
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* FAQs & BEST PRACTICES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

          {/* FAQ CARD */}
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur p-6 shadow-sm">
            <h4 className="text-lg font-semibold mb-3">Top FAQs</h4>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i}>
                  <div className="font-medium">{f.q}</div>
                  <p className="text-sm text-foreground/60 mt-1">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BEST PRACTICES */}
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur p-6 shadow-sm">
            <h4 className="text-lg font-semibold mb-3">Best Practices</h4>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Show AI output as suggestions only.</li>
              <li>Keep data inputs minimal and non-sensitive.</li>
              <li>Track usage for quality improvement.</li>
              <li>Give users easy feedback options.</li>
            </ul>
          </div>

          {/* REQUEST MORE */}
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur p-6 shadow-sm">
            <h4 className="text-lg font-semibold mb-3">Want More Detail?</h4>
            <p className="text-foreground/70 text-sm mb-4">
              Get deeper integration guides, architecture diagrams & AI safety protocols.
            </p>

            <div className="flex gap-2">
              <Link href="#" className="px-3 py-2 rounded-md bg-primary text-white text-sm">
                Request Advanced
              </Link>
              <Link href="#" className="px-3 py-2 rounded-md border border-border text-sm">
                Request Handbook
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL NOTES */}
        <section>
          <div className="rounded-xl p-6 border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10 to-background shadow-sm">
            <h4 className="text-lg font-semibold">Final Notes</h4>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              Start AI with simple features (chat suggestions, summaries). Test, monitor and expand carefully.
              Always prioritize user safety, transparency and privacy.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
