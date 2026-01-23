"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Play,
  X,
  User,
  Building2,
  FileCheck,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function AmbulanceDocumentation() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  // ============================================================
  // 1. REGISTRATION STEPS
  // ============================================================
  const registrationSteps = [
    {
      number: 1,
      title: "Start Registration",
      description: "Ambulance provider selects the Ambulance role and begins the registration process.",
    },
    {
      number: 2,
      title: "HSP / Organization Details",
      description: "Enter organization details including HSP name, certificates, documents and ambulance count.",
    },
    {
      number: 3,
      title: "Address & Banking Details",
      description: "Fill address, banking details, and upload related documents.",
    },
    {
      number: 4,
      title: "Owner Information",
      description:
        "Enter personal details of the owner including Aadhaar, PAN, and alternate contact information.",
    },
    {
      number: 5,
      title: "Admin / Manager Details",
      description:
        "Provide admin or manager’s contact number and email required for communication.",
    },
    {
      number: 6,
      title: "Upload Required Documents",
      description:
        "Upload certificates, ID proofs, and optional business documents as required.",
    },
    {
      number: 7,
      title: "Review Entered Information",
      description:
        "Preview all entered data, confirm accuracy, and revise if needed.",
    },
    {
      number: 8,
      title: "Submit Registration",
      description:
        "Finalize the registration and wait for verification approval by Aarogya Aadhar team.",
    },
  ]

  // ============================================================
  // 2. CATEGORY-WISE FIELD DATA
  // ============================================================
  const ambulanceRegistrationFields = [
    {
      category: "Organization & HSP Details",
      description: "Required details about ambulance organization and HSP profile",
      icon: <Building2 className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      fields: [
        {
          name: "HSP Profile Image",
          key: "profile_image",
          detail: "Used for branding, internal dashboard identification, and service verification.",
        },
        {
          name: "HSP Reg. Name",
          key: "reg_name",
          detail: "Legal registered name of the organization providing ambulance services.",
        },
        {
          name: "HSP Registration Certificate",
          key: "reg_certificate",
          detail: "Proof of valid registration required for compliance and verification.",
        },
        {
          name: "HSP PAN Card",
          key: "pan_card",
          detail: "Required for financial verification and payment processing compliance.",
        },
        {
          name: "Present Address",
          key: "address",
          detail:
            "Full operational address used for ambulance mapping, service area verification, and navigation.",
        },
        {
          name: "City / State / District / Taluka",
          key: "location",
          detail: "Used for regional matching, service availability, and dispatch accuracy.",
        },
        {
          name: "Pin Code",
          key: "pincode",
          detail: "Supports precise mapping and helps patients locate the nearest ambulance.",
        },
        {
          name: "Total Ambulance",
          key: "total_ambulance",
          detail: "Defines total number of ambulances available under this organization.",
        },
        {
          name: "In-House Doctor",
          key: "inhouse_doctor",
          detail: "Indicates availability of medical supervision for critical care trips.",
        },
        {
          name: "HSP Description",
          key: "hsp_desc",
          detail:
            "A brief overview of the organization to help users understand capabilities and specializations.",
        },
      ],
    },

    {
      category: "Banking & Financial Details",
      description: "Banking details used for payouts, refunds and financial compliance",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-teal-500 to-emerald-500",
      fields: [
        {
          name: "Bank Name",
          key: "bank_name",
          detail: "Bank selected for financial settlements and payouts.",
        },
        {
          name: "Bank Account Number",
          key: "acc_num",
          detail: "Account used for ambulance service payments, payouts and verification.",
        },
        {
          name: "IFSC Code",
          key: "ifsc",
          detail: "Confirms the correct branch for secure payment transfers.",
        },
        {
          name: "Account Type",
          key: "acc_type",
          detail: "Indicates Savings or Current account for verification accuracy.",
        },
        {
          name: "Cancelled Cheque",
          key: "cancelled_cheque",
          detail:
            "Used to verify ownership of the bank account and ensure secure banking validation.",
        },
        {
          name: "MICR Code",
          key: "micr",
          detail: "Used for banking verification and cheque processing.",
        },
      ],
    },

    {
      category: "Owner & Admin Details",
      description: "Personal identification information for verification",
      icon: <User className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      fields: [
        {
          name: "Owner Mobile Number",
          key: "owner_mobile",
          detail: "Primary communication number used for alerts and verification.",
        },
        {
          name: "Owner Email ID",
          key: "owner_email",
          detail: "Used for login, verification, and receiving official updates.",
        },
        {
          name: "Owner Name (First, Middle, Last)",
          key: "owner_name",
          detail:
            "Full legal name used for identity verification and compliance.",
        },
        {
          name: "Date Of Birth",
          key: "dob",
          detail:
            "Required to verify legal age and identity of the owner for compliance.",
        },
        {
          name: "Gender",
          key: "gender",
          detail: "Used for demographic mapping and identity verification.",
        },
        {
          name: "Alternate Number",
          key: "alt_num",
          detail: "Backup contact number used when primary number is unreachable.",
        },
        {
          name: "Aadhaar Details (Front/Back)",
          key: "aadhaar",
          detail: "Mandatory for identity verification.",
        },
        {
          name: "PAN Card Details",
          key: "pan",
          detail: "Required for financial compliance and legal validation.",
        },
        {
          name: "HSP Category",
          key: "hsp_category",
          detail: "Defines the organization category for ambulance service classification.",
        },
        {
          name: "Admin / Manager Details",
          key: "admin_details",
          detail:
            "Contact details for responsible administrative person managing services.",
        },
      ],
    },
  ]

  const toggleCategoryExpand = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  // ============================================================
  // FINAL PAGE UI
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">

        {/* Back Button */}
                <div className="max-w-6xl mx-auto px-6 md:px-10 mt-10">
                <Link href="/main_documentation#roles" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/60 hover:bg-accent/10 transition-all text-sm font-medium text-foreground">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Documentation
                </Link>
                </div>

      {/* PAGE HEADING */}
      <section className="mb-28 pt-16 md:pt-24 lg:pt-28 max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-4xl font-bold">Ambulance Profile Registration Flow</h2>
              <p className="text-foreground/60 mt-2">
               Detailed onboarding process with structured verification fields
              </p>
            </div>
          </div>
      </section>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
          <div className="relative z-50 w-full max-w-4xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h4 className="text-lg font-semibold text-foreground">
                Ambulance Registration Tutorial
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
                src="/videos/ambulanace_registration.mp4"
              />
            </div>
          </div>
        </div>
      )}

      {/* VIDEO CARD */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Watch Registration Tutorial</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Step-by-step walkthrough explaining how to complete the ambulance provider registration.
              </p>
            </div>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              Watch Video
            </button>
          </div>
        </div>
      </div>

      {/* REGISTRATION STEPS */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <h3 className="text-2xl font-bold mb-8 text-foreground">8-Step Registration Process</h3>

          <div className="space-y-4 mb-8">
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
                  <h4 className="font-semibold text-foreground text-lg mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CATEGORY & FIELDS */}
          <div className="space-y-6">
            {ambulanceRegistrationFields.map((category) => (
              <div key={category.category}>
                <button
                  onClick={() => toggleCategoryExpand(category.category)}
                  className={`w-full p-6 rounded-t-xl border-2 transition-all duration-300 text-left group ${
                    expandedCategories[category.category]
                      ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5"
                      : "border-border hover:border-primary/50 bg-card/30 hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div
                        className={`p-2 rounded-lg w-fit mb-3 bg-gradient-to-br ${category.color} text-white group-hover:scale-110 transition-transform`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{category.category}</h3>
                      <p className="text-sm text-foreground/60">{category.description}</p>
                      <p className="text-xs font-bold text-primary mt-2">
                        {category.fields.length} Fields
                      </p>
                    </div>

                    <div
                      className={`text-primary transition-transform duration-300 ${
                        expandedCategories[category.category] ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                </button>

                {expandedCategories[category.category] && (
                  <div className="rounded-b-xl border-2 border-t-0 border-primary bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                    {category.fields.map((field) => (
                      <div
                        key={field.key}
                        className="rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all duration-300"
                      >
                        <button
                          onClick={() =>
                            setExpandedField(expandedField === field.key ? null : field.key)
                          }
                          className="w-full p-4 text-left flex items-start justify-between"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold">{field.name}</h4>
                            {expandedField === field.key && (
                              <p className="text-sm text-foreground/70 mt-2">{field.detail}</p>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* BENEFITS SECTION */}
          <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Registration Flow Benefits</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Verified Ambulance Listings",
                  desc: "Ensures only validated ambulance providers are shown to users.",
                },
                {
                  title: "Faster Dispatch",
                  desc: "Accurate details help reduce delays in emergency dispatch.",
                },
                {
                  title: "Transparent Service Quality",
                  desc: "Profiles include certifications, documents and service capabilities.",
                },
                {
                  title: "Secure Financial Processing",
                  desc: "Verified banking details support faster and safer payouts.",
                },
              ].map((b, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="font-medium">{b.title}</p>
                    <p className="text-sm text-foreground/60">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
