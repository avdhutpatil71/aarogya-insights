"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  X,
  Building,
  User,
  ClipboardCheck,
  Banknote,
  FileCheck,
} from "lucide-react"

export default function ESevaDocumentationPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategoryExpand = (category) =>
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))

  // -----------------------------
  // 4-STEP REGISTRATION
  // -----------------------------
  const registrationSteps = [
    {
      number: 1,
      title: "Start E-Seva Registration",
      description:
        "Select the E-Seva role and begin the digital onboarding process.",
    },
    {
      number: 2,
      title: "Personal & Center Details",
      description:
        "Fill E-Seva center information, incharge details, and location.",
    },
    {
      number: 3,
      title: "Upload Documents",
      description:
        "Upload mandatory documents including Aadhaar, PAN, shop act, address proof & registration certificates.",
    },
    {
      number: 4,
      title: "Bank Information & Submit",
      description:
        "Enter bank details, upload cheque, verify all details, and submit.",
    },
  ]

  // -----------------------------
  // FIELD CATEGORIES
  // -----------------------------
  const esevaFields = [
    {
      category: "Personal & Center Information",
      description:
        "Basic details required for E-Seva center verification and onboarding.",
      icon: <Building className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      fields: [
        {
          name: "E-Seva Center Name",
          key: "center_name",
          detail:
            "Registered name of your E-Seva center used for verification and identification.",
        },
        {
          name: "Address",
          key: "address",
          detail:
            "Complete center address required for service mapping and verification.",
        },
        {
          name: "State",
          key: "state",
          detail:
            "State where the E-Seva center operates as per registration records.",
        },
        {
          name: "District",
          key: "district",
          detail:
            "Used to categorize center location for public access & mapping.",
        },
        {
          name: "Taluka",
          key: "taluka",
          detail:
            "Helps identify local administrative area for service allocation.",
        },
        {
          name: "Pincode",
          key: "pincode",
          detail: "Used for accurate location mapping and service coverage.",
        },
        {
          name: "Mobile Number",
          key: "mobile",
          detail: "Primary communication number for OTP alerts and support.",
        },
        {
          name: "Email ID",
          key: "email",
          detail: "Used for login, alerts, notifications, and communication.",
        },
      ],
    },

    {
      category: "Incharge Information & Documents",
      description: "Identity details of the E-Seva incharge and verification documents.",
      icon: <User className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      fields: [
        {
          name: "Incharge Name",
          key: "incharge_name",
          detail:
            "Full name of the E-Seva center incharge, required for verification.",
        },
        {
          name: "Incharge Aadhaar Number",
          key: "aadhaar",
          detail:
            "Mandatory for identity verification and approval of the center profile.",
        },
        {
          name: "Aadhaar Document",
          key: "aadhaar_doc",
          detail: "Used for validating the incharge’s Aadhaar details.",
        },
        {
          name: "Incharge Profile Picture",
          key: "profile_pic",
          detail: "Displayed in dashboards, digital ID, and staff listings.",
        },
        {
          name: "Incharge PAN Number",
          key: "pan",
          detail: "Required for financial verification and compliance.",
        },
        {
          name: "PAN Document",
          key: "pan_doc",
          detail: "Used to verify PAN accuracy and compliance.",
        },
        {
          name: "Address Proof Type",
          key: "address_proof_type",
          detail:
            "Document type such as light bill, rental agreement, etc., used for location verification.",
        },
        {
          name: "Address Proof Document",
          key: "address_proof_doc",
          detail: "Required to confirm the center’s operational address.",
        },
        {
          name: "Registration Certificate",
          key: "registration_certificate",
          detail:
            "Center registration proof such as Udyog Aadhaar or Shop Act certificate.",
        },
      ],
    },

    {
      category: "Bank Information",
      description: "Bank verification details required for settlements.",
      icon: <Banknote className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      fields: [
        {
          name: "Bank Name",
          key: "bank_name",
          detail: "Bank where the center maintains its business account.",
        },
        {
          name: "Account Number",
          key: "account_number",
          detail:
            "Used for settlements, payouts and business-related transactions.",
        },
        {
          name: "IFSC Code",
          key: "ifsc",
          detail: "Required to identify the bank branch during transactions.",
        },
        {
          name: "Account Type",
          key: "account_type",
          detail: "Choose between Savings or Current account type.",
        },
        {
          name: "Cancelled Cheque",
          key: "cancelled_cheque",
          detail:
            "Used for verifying bank account details and ownership.",
        },
        {
          name: "MICR Code",
          key: "micr",
          detail:
            "Used for cheque-related transactions and financial verification.",
        },
        {
          name: "Center Logo",
          key: "logo",
          detail:
            "Displayed on digital profile, certificates, and customer invoices.",
        },
        {
          name: "Shop Act Document",
          key: "shop_act",
          detail:
            "Mandatory document verifying the legal operation of the center.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">

      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10">
        <Link
          href="/main_documentation#roles"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/60 hover:bg-accent/10 transition-all text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Documentation
        </Link>
      </div>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
          <div className="relative w-full max-w-4xl bg-background rounded-xl border border-border shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h4 className="text-lg font-semibold">E-Seva Registration Tutorial</h4>
              <button onClick={() => setIsVideoOpen(false)} className="p-2 hover:bg-accent/20 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-black/30">
              <video className="w-full rounded-lg border border-border/50 bg-black" controls src="/videos/e_seva_registration.mp4" />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-28 pt-16 md:pt-24">
        
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 rounded-full bg-gradient-to-b from-primary to-accent" />
          <div>
            <h2 className="text-4xl font-bold">E-Seva Registration Flow</h2>
            <p className="text-foreground/60 mt-2">Complete your E-Seva profile with structured fields & stepwise onboarding</p>
          </div>
        </div>

        {/* VIDEO CARD */}
        <div className="mb-10 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Watch Registration Tutorial</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Learn how to fill E-Seva profile details, upload documents & complete verification.
              </p>
            </div>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-white hover:scale-105 hover:shadow-lg transition"
            >
              <Play className="w-4 h-4" /> Watch Video
            </button>
          </div>
        </div>

        {/* STEP FLOW */}
        <div className="mb-12 p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <h3 className="text-2xl font-bold mb-8">4-Step Registration Process</h3>

          <div className="space-y-4">
            {registrationSteps.map((step, index) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center font-bold shadow">
                    {step.number}
                  </div>
                  {index < registrationSteps.length - 1 && (
                    <div className="h-20 w-1 bg-gradient-to-b from-primary to-accent/30" />
                  )}
                </div>
                <div className="pt-2 flex-1">
                  <h4 className="font-semibold text-lg">{step.title}</h4>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY FIELDS */}
        <div className="space-y-8">
          {esevaFields.map((category) => (
            <div key={category.category}>
              <button
                onClick={() => toggleCategoryExpand(category.category)}
                className={`w-full p-6 rounded-t-xl border-2 text-left group transition-all duration-300 ${
                  expandedCategories[category.category]
                    ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5"
                    : "border-border hover:border-primary/50 bg-card/30"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white w-fit mb-3 group-hover:scale-110 transition`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{category.category}</h3>
                    <p className="text-sm text-foreground/60">{category.description}</p>
                    <p className="text-xs text-primary font-bold mt-2">
                      {category.fields.length} Fields
                    </p>
                  </div>

                  <svg
                    className={`w-6 h-6 text-primary transition-transform ${
                      expandedCategories[category.category] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>

              {expandedCategories[category.category] && (
                <div className="border-2 border-primary border-t-0 rounded-b-xl p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5 space-y-4">
                  {category.fields.map((field) => (
                    <div
                      key={field.key}
                      className="border border-border rounded-xl bg-card/50 hover:border-primary/50 transition-all"
                    >
                      <button
                        onClick={() =>
                          setExpandedField(
                            expandedField === field.key ? null : field.key
                          )
                        }
                        className="w-full flex justify-between px-6 py-4 text-left"
                      >
                        <span className="font-medium">{field.name}</span>

                        <svg
                          className={`w-5 h-5 text-primary transition-transform ${
                            expandedField === field.key ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </button>

                      {expandedField === field.key && (
                        <p className="px-6 pb-4 text-sm text-foreground/70">{field.detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BENEFITS SECTION */}
        <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10">
          <h3 className="text-lg font-semibold mb-4">Registration Flow Benefits</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Verified E-Seva Profiles",
                desc: "Builds trust between customers and service providers.",
              },
              {
                title: "Professional Center Documentation",
                desc: "Ensures compliance with operational norms and guidelines.",
              },
              {
                title: "Faster Payment Settlements",
                desc: "Verified bank details ensure smooth payouts.",
              },
              {
                title: "Transparent Service System",
                desc: "Improves clarity in operations and customer satisfaction.",
              },
            ].map((benefit, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium">{benefit.title}</p>
                  <p className="text-sm text-foreground/60">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
