"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  IdCard,
  Microscope,
  Shield,
  Play,
  X,
} from "lucide-react"

export default function RadiologistPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategory = (cat) => {
    setExpandedCategory((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }))
  }

  // ----------------------------------------------
  // RADIOLIST CATEGORY FIELDS
  // ----------------------------------------------

  const radiologistFields = [
    {
      category: "Personal Information",
      description: "Primary identity & communication details for the radiologist",
      icon: <User className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      fields: [
        {
          name: "Mobile Number",
          key: "mobile",
          detail: "Used for login, OTP verification, and emergency communication.",
        },
        {
          name: "Email ID",
          key: "email",
          detail: "Required for login, report sharing, and hospital communication.",
        },
        {
          name: "First Name",
          key: "first_name",
          detail: "Displayed on official reports and communication dashboards.",
        },
        {
          name: "Last Name",
          key: "last_name",
          detail: "Required for verification and registration documents.",
        },
        {
          name: "Date of Birth",
          key: "dob",
          detail: "Used for eligibility and regulatory compliance checks.",
        },
        {
          name: "Gender",
          key: "gender",
          detail: "Required for identity verification and analytics.",
        },
        {
          name: "Alternate Mobile Number",
          key: "alt_mobile",
          detail: "Used as backup communication for emergencies.",
        },
      ],
    },
    {
      category: "Professional Documents",
      description: "Mandatory certificates required for radiology practice",
      icon: <IdCard className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      fields: [
        {
          name: "Degree Certificate",
          key: "degree",
          detail: "Verifies qualification for radiology reporting.",
        },
        {
          name: "Specialization Certificate",
          key: "specialization",
          detail: "Proof for MRI/CT/Sonography/X-Ray specialization.",
        },
        {
          name: "Medical Registration Number",
          key: "reg_no",
          detail: "Govt-issued registration required for legal reporting.",
        },
        {
          name: "Registration Certificate",
          key: "reg_cert",
          detail: "Validates the medical council registration.",
        },
        {
          name: "PAN Card",
          key: "pan",
          detail: "Required for payouts and tax-related verification.",
        },
        {
          name: "Aadhaar Card",
          key: "aadhaar",
          detail: "Used for secure identity verification.",
        },
      ],
    },
    {
      category: "Radiology Service Details",
      description: "Professional expertise & specialization options",
      icon: <Microscope className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
      fields: [
        {
          name: "Specialty Type",
          key: "specialty",
          detail: "MRI / CT / X-Ray / Sonography / Mammography",
        },
        {
          name: "Total Experience",
          key: "experience",
          detail: "Years of clinical experience displayed to hospitals.",
        },
        {
          name: "Online Reporting Availability",
          key: "online_reporting",
          detail: "Allows hospitals to assign digital reporting cases.",
        },
        {
          name: "Home Reporting Option",
          key: "home_reporting",
          detail: "Enables tele-radiology reporting from home.",
        },
      ],
    },
    {
      category: "Address & Banking Details",
      description: "Required for settlements and verification",
      icon: <Shield className="w-5 h-5" />,
      color: "from-orange-500 to-yellow-600",
      fields: [
        {
          name: "Full Address",
          key: "address",
          detail: "Used for verification and official correspondence.",
        },
        {
          name: "City / District / State",
          key: "location",
          detail: "Used for hospital mapping & service region validation.",
        },
        {
          name: "Bank Name",
          key: "bank_name",
          detail: "Required for payouts.",
        },
        {
          name: "Account Number",
          key: "account_no",
          detail: "Payments are directly deposited to this account.",
        },
        {
          name: "IFSC Code",
          key: "ifsc",
          detail: "Required for secure financial transfers.",
        },
        {
          name: "Cancelled Cheque",
          key: "cheque",
          detail: "Used for account authenticity confirmation.",
        },
      ],
    },
  ]

  // ----------------------------------------------
  // 8-STEP RADIOLIST WORKFLOW
  // ----------------------------------------------

  const registrationSteps = [
    { number: 1, title: "Select Radiologist Registration", description: "Choose Radiologist from the registration list." },
    { number: 2, title: "OTP Verification", description: "Verify mobile number + email with secure OTP." },
    { number: 3, title: "Basic Personal Information", description: "Add name, gender, DOB and contact details." },
    { number: 4, title: "Upload Professional Certificates", description: "Degree, specialization & registration proof." },
    { number: 5, title: "Add Radiology Expertise", description: "Select specialization & experience data." },
    { number: 6, title: "Address & Bank Details", description: "Required for settlements & payouts." },
    { number: 7, title: "Upload Profile Image", description: "Displayed on reports & dashboards." },
    { number: 8, title: "Submit & Start Reporting", description: "Starts receiving radiology reporting cases." },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">

      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10">
        <Link
          href="/main_documentation#roles"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:bg-accent/10 hover:border-primary/50 transition text-sm font-medium"
        >
          ← Back to Documentation
        </Link>
      </div>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsVideoOpen(false)}
          />

          <div className="relative w-full max-w-5xl bg-background border rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold">Radiologist Registration Tutorial</h3>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-lg hover:bg-accent/10 text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-black/30">
              <video
                controls
                className="w-full rounded-lg border border-border/60"
                src="/videos/radiologist_registration.mp4"
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN SECTION */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-20 md:pt-28 mb-28">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
          <div>
            <h1 className="text-4xl font-bold">Radiologist Registration Flow</h1>
            <p className="text-foreground/60 mt-2">
              Verified diagnostic specialists for Tele-Radiology & Hospital Reporting
            </p>
          </div>
        </div>

        {/* VIDEO CARD */}
        <div className="p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Watch Registration Tutorial</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Complete guide for Radiologist onboarding and document upload.
              </p>
            </div>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:scale-105 transition"
            >
              <Play className="w-4 h-4" />
              Watch Video
            </button>
          </div>
        </div>

        {/* STEP TIMELINE */}
        <div className="p-8 rounded-xl border bg-gradient-to-br from-accent/5 via-background to-primary/5 mb-14">
          <h3 className="text-2xl font-bold mb-8">8-Step Radiologist Registration Process</h3>

          <div className="space-y-6">
            {registrationSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                {/* Number Circle */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold shadow bg-gradient-to-br from-primary to-accent">
                    {step.number}
                  </div>

                  {index < registrationSteps.length - 1 && (
                    <div className="h-20 w-1 bg-gradient-to-b from-primary to-accent/30" />
                  )}
                </div>

                {/* Details */}
                <div className="pt-1 flex-1">
                  <h4 className="text-lg font-semibold">{step.title}</h4>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY ACCORDIONS */}
        <div className="space-y-8">
          {radiologistFields.map((category) => (
            <div key={category.category}>
              <button
                onClick={() => toggleCategory(category.category)}
                className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                  expandedCategory[category.category]
                    ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5"
                    : "border-border bg-card/30 hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className={`p-2 mb-3 rounded-lg w-fit text-white bg-gradient-to-br ${category.color}`}
                    >
                      {category.icon}
                    </div>

                    <h3 className="text-lg font-semibold">{category.category}</h3>
                    <p className="text-sm text-foreground/60">{category.description}</p>
                    <p className="text-xs text-primary mt-2">{category.fields.length} Fields</p>
                  </div>

                  <svg
                    className={`w-6 h-6 text-primary transition-transform ${
                      expandedCategory[category.category] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>

              {expandedCategory[category.category] && (
                <div className="border border-primary border-t-0 rounded-b-xl p-6 space-y-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                  {category.fields.map((field) => (
                    <div
                      key={field.key}
                      className="border border-border bg-card/50 rounded-xl hover:border-primary/60 transition"
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
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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
        <div className="mt-12 p-6 rounded-xl border bg-gradient-to-br from-primary/5 via-accent/10 to-transparent">
          <h3 className="text-lg font-semibold mb-4">Radiologist Platform Benefits</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "High Case Volume",
                desc: "Connect with hospitals & diagnostic centers across regions.",
              },
              {
                title: "Remote Tele-Radiology",
                desc: "Accept and report cases from anywhere.",
              },
              {
                title: "Verified Digital Reporting",
                desc: "Secure & timestamped reporting system.",
              },
              {
                title: "Quick Automated Payouts",
                desc: "Instant settlement for completed case reports.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-foreground/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}

