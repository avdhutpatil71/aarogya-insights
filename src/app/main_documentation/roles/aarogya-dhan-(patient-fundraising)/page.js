"use client"
import { useState } from "react"
import { User, FileCheck, DollarSign, Play, X, ArrowLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function AarogyaDhanPatientPage() {
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  // ---------------------------------------------------
  // 🟦 Patient Registration Categories & Field Details
  // ---------------------------------------------------

  const patientRegistrationFields = [
    {
      category: "Login & Verification",
      description: "Secure registration through Email OTP & Mobile authentication",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-500",
      fields: [
        {
          name: "Are you already registered?",
          key: "registered",
          detail: "Ensures whether the user already has an Aarogya Aadhar account and prevents duplicate creation."
        },
        {
          name: "Email Address",
          key: "email",
          detail: "Used for sending OTP, verification, donor updates, fundraising approvals, and account recovery."
        },
        {
          name: "Email OTP",
          key: "email_otp",
          detail: "Required to authenticate email ownership and secure the account."
        },
        {
          name: "Mobile Number",
          key: "mobile",
          detail: "Used to send fundraising alerts, donor communications, and transaction updates."
        },
        {
          name: "Pincode",
          key: "pincode",
          detail: "Helps map location for local donors, volunteers, NGOs, and hospital support proximity."
        },
        {
          name: "Password",
          key: "password",
          detail: "Secures the user's account; must meet platform password policy."
        },
        {
          name: "Retype Password",
          key: "confirm_password",
          detail: "Ensures the user confirms correct password to avoid login issues."
        },
      ],
    },

    {
      category: "Basic Patient Profile",
      description: "Patient identity information for fundraising verification",
      icon: <User className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      fields: [
        {
          name: "Full Name",
          key: "full_name",
          detail: "Name of the patient in need of financial support; required for verification."
        },
        {
          name: "Gender",
          key: "gender",
          detail: "Required for demographic reporting and medical documentation."
        },
        {
          name: "Date of Birth",
          key: "dob",
          detail: "Used for age validation and scheme eligibility."
        },
      ],
    },

    {
      category: "Medical & Fundraising Details",
      description: "Information needed to create the patient's fundraising campaign",
      icon: <FileCheck className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      fields: [
        {
          name: "Medical Condition Summary",
          key: "condition",
          detail:
            "Short description of the patient's medical issue so donors can understand the severity and urgency."
        },
        {
          name: "Hospital Name",
          key: "hospital",
          detail: "Helps validate authenticity of treatment, bills, and required medical documents."
        },
        {
          name: "Required Amount",
          key: "amount",
          detail: "Total estimated cost needed for surgery, treatment, or emergency support."
        },
        {
          name: "Supporting Medical Documents",
          key: "documents",
          detail:
            "Upload prescriptions, diagnosis reports, hospital estimates — required to activate fundraising."
        },
      ],
    },

    {
      category: "Bank Details for Fund Transfer",
      description: "Verified payment information to release funds securely",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      fields: [
        {
          name: "Bank Name",
          key: "bank_name",
          detail: "Used for secure beneficiary transfers once donations are approved."
        },
        {
          name: "Account Number",
          key: "account_number",
          detail: "Fund settlement will be done only to this verified bank account."
        },
        {
          name: "IFSC Code",
          key: "ifsc",
          detail: "Required for identifying correct bank branch."
        },
        {
          name: "Account Type",
          key: "account_type",
          detail: "Usually Savings; required for banking compliance."
        },
        {
          name: "Cancelled Cheque",
          key: "cancelled_cheque",
          detail: "Used to verify bank ownership before transferring donor funds."
        },
      ],
    },
  ]

  // ---------------------------------------------------
  // 🟩 Registration Steps
  // ---------------------------------------------------

  const registrationSteps = [
    { number: 1, title: "Open AarogyaDhan Registration", description: "User begins registration under Patient Fundraising." },
    { number: 2, title: "Email OTP Verification", description: "User verifies email using OTP to activate account." },
    { number: 3, title: "Mobile Verification", description: "User enters mobile number for communication & donor updates." },
    { number: 4, title: "Enter Profile Information", description: "User provides identity and medical details." },
    { number: 5, title: "Upload Medical Documents", description: "User uploads diagnosis reports and cost estimates." },
    { number: 6, title: "Add Bank Details", description: "Required for donation settlement and verification." },
    { number: 7, title: "Preview & Submit", description: "User reviews details before submitting for approval." },
    { number: 8, title: "Start Fundraising", description: "Upon approval, the patient campaign goes live for donors." },
  ]

  const toggleCategoryExpand = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

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

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
          <div className="relative z-50 w-full max-w-4xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h4 className="text-lg font-semibold text-foreground">AarogyaDhan Patient Registration Tutorial</h4>
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
                src="/videos/aarogyadhan_patient_registration.mp4"
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <section id="registration" className="mb-28 pt-16 md:pt-24 lg:pt-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* Title */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-4xl font-bold">AarogyaDhan — Patient Registration Flow</h2>
              <p className="text-foreground/60 mt-2">
                Securely onboard patients for medical fundraising with structured verification
              </p>
            </div>
          </div>

          {/* Video Tutorial Card */}
          <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Watch Registration Tutorial</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Step-by-step walkthrough of patient fundraising registration and verification.
                </p>
              </div>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap"
              >
                <Play className="w-4 h-4" />
                Watch Video
              </button>
            </div>
          </div>

          {/* 8-Step Section */}
          <div className="mb-12 p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">
            <h3 className="text-2xl font-bold mb-8 text-foreground">8-Step Registration Process</h3>

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
                    <h4 className="font-semibold text-foreground text-lg mb-2">{step.title}</h4>
                    <p className="text-sm text-foreground/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable Field Categories */}
            <div className="space-y-6">
              {patientRegistrationFields.map((category) => (
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
                      <div>
                        <div className={`p-2 rounded-lg w-fit mb-3 bg-gradient-to-br ${category.color} text-white`}>
                          {category.icon}
                        </div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {category.category}
                        </h3>
                        <p className="text-sm text-foreground/60">{category.description}</p>
                        <p className="text-xs font-bold text-primary mt-2">{category.fields.length} Fields</p>
                      </div>

                      <div
                        className={`transition-transform text-primary ${
                          expandedCategories[category.category] ? "rotate-180" : ""
                        }`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {expandedCategories[category.category] && (
                    <div className="rounded-b-xl border-2 border-t-0 border-primary p-6 space-y-3 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                      {category.fields.map((field, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all shadow-sm"
                        >
                          <button
                            onClick={() =>
                              setExpandedField(expandedField === field.key ? null : field.key)
                            }
                            className="w-full text-left px-6 py-4 flex justify-between hover:bg-accent/5"
                          >
                            <div>
                              <h4 className="font-semibold group-hover:text-primary">{field.name}</h4>
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

            {/* Registration Benefits */}
            <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
              <h3 className="text-lg font-semibold mb-4">Registration Flow Benefits</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Benefit text="Secure verification ensures donor trust" />
                <Benefit text="Faster approval using verified documents" />
                <Benefit text="Easy tracking of fundraising progress" />
                <Benefit text="Guaranteed safety of transferred funds" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Benefit({ text }) {
  return (
    <div className="flex gap-3">
      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
      <p className="text-sm text-foreground/70">{text}</p>
    </div>
  )
}
