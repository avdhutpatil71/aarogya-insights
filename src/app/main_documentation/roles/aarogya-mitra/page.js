"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  X,
  Users,
  ClipboardCheck,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react"

export default function AarogyaMitraPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategoryExpand = (category) =>
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }))

  // -----------------------------
  // Registration Steps
  // -----------------------------
  const registrationSteps = [
    {
      number: 1,
      title: "Select Aarogya Mitra Registration",
      description: "User selects Aarogya Mitra role from the onboarding flow.",
    },
    {
      number: 2,
      title: "OTP Verification",
      description:
        "Mobile number & email verification ensures secure onboarding.",
    },
    {
      number: 3,
      title: "Personal Information",
      description: "Add name, DOB, gender, and primary contact details.",
    },
    {
      number: 4,
      title: "Address Information",
      description:
        "Present & permanent address with region mapping for deployment.",
    },
    {
      number: 5,
      title: "Document Upload",
      description: "Upload Aadhaar, PAN (optional), and profile photo.",
    },
    {
      number: 6,
      title: "Volunteer Role Details",
      description:
        "Select work type, experience level, languages known, and preference.",
    },
    {
      number: 7,
      title: "Preview & Submit",
      description:
        "Verify entered details and submit the registration for approval.",
    },
    {
      number: 8,
      title: "Approval & Dashboard Access",
      description:
        "Once approved, volunteer can access assignments and dashboard.",
    },
  ]

  // -----------------------------
  // Field Categories
  // -----------------------------
  const mitraFields = [
    {
      category: "Personal Information",
      description: "Basic identity details for Aarogya Mitra verification",
      icon: <Users className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      fields: [
        {
          name: "Full Name",
          key: "name",
          detail:
            "Required for official volunteer identification across all modules.",
        },
        {
          name: "Mobile Number",
          key: "mobile",
          detail:
            "Primary contact for login, OTP, assignments, and communication.",
        },
        {
          name: "Email ID",
          key: "email",
          detail:
            "Used for login, notifications, and training-related communication.",
        },
        {
          name: "Gender",
          key: "gender",
          detail:
            "Helps ensure comfortable interaction for gender-sensitive tasks.",
        },
        {
          name: "Date of Birth",
          key: "dob",
          detail:
            "Used for eligibility, demographic profiling, and role assignment.",
        },
      ],
    },
    {
      category: "Address Information",
      description: "Region mapping for optimized task allocation",
      icon: <ClipboardCheck className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      fields: [
        {
          name: "Present Address",
          key: "present",
          detail:
            "Used for mapping nearest hospitals, assignments, and field tasks.",
        },
        {
          name: "Permanent Address",
          key: "permanent",
          detail:
            "Required for long-term ID verification and official communication.",
        },
        {
          name: "State",
          key: "state",
          detail:
            "Used to align volunteer availability with state-level health programs.",
        },
        {
          name: "District",
          key: "district",
          detail:
            "Helps in micro-level volunteer deployment based on demand patterns.",
        },
        {
          name: "Taluka",
          key: "taluka",
          detail: "Important for rural field assignments and health camps.",
        },
        {
          name: "Pincode",
          key: "pincode",
          detail:
            "Supports accurate mapping of patient requests and nearby tasks.",
        },
      ],
    },
    {
      category: "Documents & Verification",
      description: "Identity verification and compliance documentation",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      fields: [
        {
          name: "Profile Photo",
          key: "photo",
          detail:
            "Displayed across dashboards, ID cards, and assignments modules.",
        },
        {
          name: "Aadhaar Card Number",
          key: "aadhaar",
          detail:
            "Used for identity verification and to ensure unique volunteer profiles.",
        },
        {
          name: "Aadhaar Front Side",
          key: "aadhar_front",
          detail:
            "Helps verify identity information submitted during registration.",
        },
        {
          name: "Aadhaar Back Side",
          key: "aadhar_back",
          detail:
            "Completes full eKYC verification during profile approval.",
        },
        {
          name: "PAN Card (Optional)",
          key: "pan",
          detail:
            "Required if the volunteer receives incentives, wages, or rewards.",
        },
      ],
    },
    {
      category: "Volunteer Role Details",
      description: "Work preferences, languages & service capabilities",
      icon: <HeartHandshake className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      fields: [
        {
          name: "Experience",
          key: "experience",
          detail:
            "Helps allocate suitable assignments based on volunteer skill level.",
        },
        {
          name: "Preferred Work Type",
          key: "work_type",
          detail:
            "Options include hospital desk support, patient follow-up, home visit support, etc.",
        },
        {
          name: "Languages Known",
          key: "languages",
          detail:
            "Ensures smooth patient communication based on language preference.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      
      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-10">
        <Link
          href="/main_documentation#roles"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/60 hover:bg-accent/10 transition-all text-sm font-medium text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Documentation
        </Link>
      </div>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsVideoOpen(false)}
          />
          <div className="relative z-50 w-full max-w-4xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h4 className="text-lg font-semibold text-foreground">
                Aarogya Mitra Registration Tutorial
              </h4>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-lg hover:bg-accent/20 text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-black/30">
              <video
                className="w-full rounded-lg border border-border/50 bg-black"
                controls
                src="/videos/aarogya_mitra_registration.mp4"
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN SECTION */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-28 pt-16 md:pt-24 lg:pt-24">
        
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
          <div>
            <h2 className="text-4xl font-bold">Aarogya Mitra Registration Flow</h2>
            <p className="text-foreground/60 mt-2">
              Volunteer onboarding with structured fields & category-based workflow
            </p>
          </div>
        </div>

        {/* VIDEO CARD */}
        <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Watch Registration Tutorial
                </h3>
              </div>
              <p className="text-sm text-foreground/70">
                Complete walkthrough of Aarogya Mitra onboarding and field mapping.
              </p>
            </div>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Play className="w-4 h-4" /> Watch Video
            </button>
          </div>
        </div>

        {/* STEP FLOW */}
        <div className="mb-12 p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <h3 className="text-2xl font-bold mb-8 text-foreground">
            8-Step Registration Process
          </h3>

          <div className="w-full space-y-4 mb-8">
            {registrationSteps.map((step, idx) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg">
                    {step.number}
                  </div>
                  {idx < registrationSteps.length - 1 && (
                    <div className="h-24 w-1 bg-gradient-to-b from-primary to-accent/30 mt-1" />
                  )}
                </div>

                <div className="pt-2 pb-4 flex-1">
                  <h4 className="font-semibold text-foreground text-lg mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-foreground/70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FIELD CATEGORIES */}
          <div className="space-y-6">
            {mitraFields.map((category) => (
              <div key={category.category}>
                <button
                  onClick={() => toggleCategoryExpand(category.category)}
                  className={`w-full p-6 rounded-t-xl border-2 transition-all duration-300 text-left group ${
                    expandedCategories[category.category]
                      ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5"
                      : "border-border hover:border-primary/50 bg-card/30 hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div
                        className={`p-2 rounded-lg w-fit mb-3 bg-gradient-to-br ${category.color} text-white group-hover:scale-110 transition-transform`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {category.category}
                      </h3>
                      <p className="text-sm text-foreground/60 mt-1">
                        {category.description}
                      </p>
                      <p className="text-xs font-bold text-primary mt-2">
                        {category.fields.length} Fields
                      </p>
                    </div>

                    <svg
                      className={`w-5 h-5 text-primary transition-transform duration-300 ${
                        expandedCategories[category.category] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </button>

                {expandedCategories[category.category] && (
                  <div className="rounded-b-xl border-2 border-t-0 border-primary bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                    {category.fields.map((field) => (
                      <div
                        key={field.key}
                        className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                      >
                        <button
                          onClick={() =>
                            setExpandedField(
                              expandedField === field.key ? null : field.key
                            )
                          }
                          className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {field.name}
                            </h4>
                            {expandedField === field.key && (
                              <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                                {field.detail}
                              </p>
                            )}
                          </div>

                          <svg
                            className={`w-5 h-5 text-primary transition-transform duration-300 ${
                              expandedField === field.key ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
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
          <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10 to-transparent">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Registration Flow Benefits
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    Efficient Volunteer Deployment
                  </p>
                  <p className="text-sm text-foreground/60">
                    Smart assignment to hospitals, patients & health programs.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    Verified Volunteer Profiles
                  </p>
                  <p className="text-sm text-foreground/60">
                    Ensures trust & transparency during patient interactions.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    Faster Patient Assistance
                  </p>
                  <p className="text-sm text-foreground/60">
                    Trained volunteers ensure timely and reliable patient support.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    Strong Healthcare Network
                  </p>
                  <p className="text-sm text-foreground/60">
                    Integrates Aarogya Mitras with hospitals & community health programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
