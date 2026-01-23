"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Play, X, User, FileCheck, HeartHandshake } from "lucide-react"

export default function DonorDocumentationPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategoryExpand = (category) =>
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }))

  const registrationSteps = [
    {
      number: 1,
      title: "Begin Donor Registration",
      description: "Visit AarogyaDhan → Select Donor Registration and provide your email & mobile number."
    },
    {
      number: 2,
      title: "Verify Identity",
      description: "Enter the OTP received on email and mobile to securely verify your identity."
    },
    {
      number: 3,
      title: "Upload Identity Documents",
      description: "Provide PAN, Aadhaar and upload required ID images for verification."
    },
    {
      number: 4,
      title: "Create Your Donor Profile",
      description: "Set your password, confirm all details and complete the donor registration."
    }
  ]

  const donorFields = [
    {
      category: "Contact & Account Information",
      description: "Primary communication details and secure account creation fields.",
      color: "from-blue-500 to-cyan-500",
      icon: <User className="w-5 h-5" />,
      fields: [
        { name: "Email Address", key: "email", detail: "Used for login, OTP verification and donation updates." },
        { name: "Email OTP Verification", key: "email_otp", detail: "Ensures donor authenticity and secure onboarding." },
        { name: "Mobile Number", key: "mobile", detail: "Important for emergency contact and donation reminders." },
        { name: "Pincode", key: "pincode", detail: "Helps identify nearest donation centers and outreach coverage." },
        { name: "Password", key: "password", detail: "Secure password to protect donor dashboard and profile." },
        { name: "Retype Password", key: "retype_password", detail: "Confirms password accuracy to avoid login issues." }
      ]
    },
    {
      category: "Identity & Verification Documents",
      description: "Important government IDs required for verified donor identity.",
      color: "from-purple-500 to-pink-600",
      icon: <FileCheck className="w-5 h-5" />,
      fields: [
        { name: "PAN Card Number", key: "pan_no", detail: "Used for identity validation and eligibility confirmation." },
        { name: "Aadhaar Number", key: "aadhaar_no", detail: "Primary proof of identity for verified donation accounts." },
        { name: "PAN Card Upload", key: "pan_upload", detail: "High-quality PAN card image for backend verification." },
        { name: "Aadhaar Upload", key: "aadhaar_upload", detail: "Necessary for identity confirmation and fraud prevention." }
      ]
    },
    {
      category: "Donor Profile Completion",
      description: "Final steps to submit and activate your donor account.",
      color: "from-green-500 to-emerald-600",
      icon: <HeartHandshake className="w-5 h-5" />,
      fields: [
        { name: "Register", key: "register", detail: "Completes donor onboarding and activates the donor dashboard." }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-10">
        <Link
          href="/main_documentation#roles"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/60 hover:bg-accent/10 transition-all text-sm font-medium text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Documentation
        </Link>
      </div>

      {/* Main Content */}
      <section className="mb-28 pt-16 md:pt-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-4xl font-bold">AarogyaDhan — Donor Registration Flow</h2>
              <p className="text-foreground/60 mt-2">
                Verified onboarding process for donors ensuring safety, transparency and secure identity validation.
              </p>
            </div>
          </div>

          {/* VIDEO CARD */}
          <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Watch Donor Registration Tutorial</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Quick walkthrough demonstrating how donors verify identity and complete registration.
                </p>
              </div>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                <Play className="w-4 h-4" />
                Watch Video
              </button>

            </div>
          </div>

          {/* VIDEO MODAL */}
          {isVideoOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
              <div className="relative z-50 w-full max-w-4xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">

                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h4 className="text-lg font-semibold text-foreground">Donor Registration Tutorial</h4>
                  <button
                    onClick={() => setIsVideoOpen(false)}
                    className="p-2 rounded-lg hover:bg-accent/20 text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 bg-black/30">
                  <video
                    className="w-full rounded-lg border border-border/50"
                    controls
                    src="/videos/donor_registration.mp4"
                  />
                </div>

              </div>
            </div>
          )}

          {/* STEPS + FIELDS SECTION */}
          <div className="mb-12 p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">

            {/* STEPS */}
            <h3 className="text-2xl font-bold mb-8 text-foreground">4-Step Registration Process</h3>
            <div className="space-y-4 mb-8">
              {registrationSteps.map((step, idx) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold flex items-center justify-center shadow">
                      {step.number}
                    </div>
                    {idx < registrationSteps.length - 1 && (
                      <div className="h-24 w-1 bg-gradient-to-b from-primary to-accent/30 mt-1" />
                    )}
                  </div>

                  <div className="pt-2 pb-4 flex-1">
                    <h4 className="font-semibold text-lg text-foreground">{step.title}</h4>
                    <p className="text-sm text-foreground/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FIELD CATEGORIES */}
            <div className="space-y-6">
              {donorFields.map((category) => (
                <div key={category.category}>

                  {/* CATEGORY BUTTON */}
                  <button
                    onClick={() => toggleCategoryExpand(category.category)}
                    className={`w-full p-6 rounded-t-xl border-2 text-left transition-all duration-300 ${
                      expandedCategories[category.category]
                        ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5"
                        : "border-border hover:border-primary/50 bg-card/30 hover:bg-card/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className={`p-2 rounded-lg w-fit mb-3 bg-gradient-to-br ${category.color} text-white`}>
                          {category.icon}
                        </div>
                        <h3 className="font-semibold text-lg text-foreground">{category.category}</h3>
                        <p className="text-sm text-foreground/60 mt-1">{category.description}</p>
                        <p className="text-xs font-bold text-primary mt-2">{category.fields.length} Fields</p>
                      </div>
                      <svg
                        className={`w-6 h-6 text-primary transition-transform ${
                          expandedCategories[category.category] ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </button>

                  {/* CATEGORY FIELDS */}
                  {expandedCategories[category.category] && (
                    <div className="rounded-b-xl border-2 border-t-0 border-primary bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                      {category.fields.map((field) => (
                        <div
                          key={field.key}
                          className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all shadow-sm"
                        >
                          <button
                            onClick={() => setExpandedField(expandedField === field.key ? null : field.key)}
                            className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{field.name}</h4>
                              {expandedField === field.key && (
                                <p className="text-sm text-foreground/70 mt-2">{field.detail}</p>
                              )}
                            </div>
                            <svg
                              className={`w-5 h-5 text-primary transition-transform ${
                                expandedField === field.key ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* BENEFITS */}
            <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Donor Verification Benefits</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium">Authentic Donor Profiles</p>
                    <p className="text-sm text-foreground/60">Validated identity ensures genuine donation ecosystem.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium">Secure Contributions</p>
                    <p className="text-sm text-foreground/60">Only verified donors can access donation-related tools.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium">Regulatory Compliance</p>
                    <p className="text-sm text-foreground/60">PAN/Aadhaar uploads support audit and transparency.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium">Faster Verification</p>
                    <p className="text-sm text-foreground/60">Identity documents reduce manual checks and delays.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}
