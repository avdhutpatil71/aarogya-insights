"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  X,
  User,
  MapPin,
  FileCheck,
  Landmark,
} from "lucide-react"

export default function AshaWorkerPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategoryExpand = (category) =>
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))

  // -----------------------------------
  // STEPS
  // -----------------------------------

  const registrationSteps = [
    {
      number: 1,
      title: "Select ASHA Worker Registration",
      description: "Choose ASHA role from the registration list.",
    },
    {
      number: 2,
      title: "OTP Verification",
      description: "Mobile & email OTP verification for account security.",
    },
    {
      number: 3,
      title: "Personal Information",
      description:
        "Enter your name, address, region details and communication info.",
    },
    {
      number: 4,
      title: "Upload Optional Documents",
      description:
        "Add Aadhaar, PAN, and ASHA Worker ID for verification (optional).",
    },
    {
      number: 5,
      title: "Bank Details",
      description:
        "Provide bank name, account number, IFSC, account type & cheque.",
    },
    {
      number: 6,
      title: "Preview & Submit",
      description: "Review all details before submitting for approval.",
    },
  ]

  // -----------------------------------
  // FIELD CATEGORIES
  // -----------------------------------

  const ashaFields = [
    {
      category: "Personal Information",
      description: "Basic details required for ASHA worker onboarding",
      icon: <User className="w-5 h-5" />,
      color: "from-pink-500 to-rose-500",
      fields: [
        {
          name: "ASHA Worker Name",
          key: "asha_name",
          detail: "Full legal name used for identification and ID generation.",
        },
        {
          name: "Present Address",
          key: "address",
          detail:
            "Used for location mapping and assigning community health activities.",
        },
        {
          name: "State",
          key: "state",
          detail: "Helps align you with district-level health programs.",
        },
        {
          name: "District",
          key: "district",
          detail: "Required for local reporting & regional allocations.",
        },
        {
          name: "Taluka",
          key: "taluka",
          detail: "Useful for hyper-local support and field assignments.",
        },
        {
          name: "Pincode",
          key: "pincode",
          detail:
            "Required for mapping ASHA workers to nearest health facilities.",
        },
        {
          name: "Mobile Number",
          key: "mobile",
          detail:
            "Used for OTP login, patient coordination, and system alerts.",
        },
        {
          name: "Email ID",
          key: "email",
          detail:
            "Used for official notifications, updates, and training communication.",
        },
      ],
    },

    {
      category: "Documents (Optional)",
      description: "Upload ID proofs for better verification",
      icon: <FileCheck className="w-5 h-5" />,
      color: "from-violet-500 to-purple-600",
      fields: [
        {
          name: "Aadhar Number",
          key: "aadhaar",
          detail: "Used for identity verification and profile authentication.",
        },
        {
          name: "Aadhar Document",
          key: "aadhaar_doc",
          detail: "Front or full Aadhaar copy for verification.",
        },
        {
          name: "PAN Number",
          key: "pan",
          detail:
            "Optional – required if you receive honorarium or incentives.",
        },
        {
          name: "PAN Document",
          key: "pan_doc",
          detail: "Upload scanned copy or photo of PAN card.",
        },
        {
          name: "ASHA Worker ID",
          key: "asha_id",
          detail:
            "Government ASHA ID for official validation (optional but recommended).",
        },
      ],
    },

    {
      category: "Bank Details",
      description: "Required for receiving honorarium & reimbursements",
      icon: <Landmark className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      fields: [
        {
          name: "Bank Name",
          key: "bank_name",
          detail: "Bank where your honorarium will be transferred.",
        },
        {
          name: "Account Number",
          key: "acc_no",
          detail:
            "Must match details on the cancelled cheque for verification.",
        },
        {
          name: "IFSC Code",
          key: "ifsc",
          detail: "Used to identify your bank branch during transactions.",
        },
        {
          name: "Account Type",
          key: "acc_type",
          detail:
            "Select Savings / Current account depending on your bank account.",
        },
        {
          name: "Cancelled Cheque",
          key: "cheque",
          detail:
            "Used for verifying account ownership before payments are issued.",
        },
        {
          name: "MICR Code",
          key: "micr",
          detail: "Used for cheque clearance & payment transfers.",
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/60 hover:bg-accent/10 transition-all text-sm font-medium"
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
          <div className="relative max-w-4xl w-full bg-background rounded-xl shadow-xl border border-border overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h4 className="text-lg font-semibold">ASHA Worker Tutorial</h4>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-lg hover:bg-accent/20 text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-black/30">
              <video
                className="w-full rounded-lg border border-border/50"
                controls
                src="/videos/asha_worker_registration.mp4"
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN SECTION */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-24 mb-28">
        
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
          <div>
            <h2 className="text-4xl font-bold">ASHA Worker Registration Flow</h2>
            <p className="text-foreground/60 mt-2">
              Structured onboarding with professional & clear field categories.
            </p>
          </div>
        </div>

        {/* VIDEO CARD */}
        <div className="mb-10 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Watch Registration Tutorial</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Step-by-step ASHA worker onboarding walkthrough.
              </p>
            </div>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Play className="w-4 h-4" /> Watch Video
            </button>
          </div>
        </div>

        {/* REGISTRATION STEPS */}
        <div className="mb-12 p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <h3 className="text-2xl font-bold mb-8">6-Step Registration Process</h3>

          <div className="space-y-4">
            {registrationSteps.map((step, idx) => (
              <div key={step.number} className="flex gap-4">
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold flex items-center justify-center shadow">
                    {step.number}
                  </div>

                  {idx < registrationSteps.length - 1 && (
                    <div className="h-20 w-1 bg-gradient-to-b from-primary to-accent/30" />
                  )}
                </div>

                <div className="pt-2">
                  <h4 className="font-semibold text-lg">{step.title}</h4>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* FIELD CATEGORIES */}
        <div className="space-y-8">
          {ashaFields.map((category) => (
            <div key={category.category}>
              <button
                onClick={() => toggleCategoryExpand(category.category)}
                className={`w-full p-6 rounded-t-xl border-2 transition-all duration-300 text-left ${
                  expandedCategories[category.category]
                    ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5"
                    : "border-border bg-card/30 hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div
                      className={`p-2 rounded-lg mb-3 w-fit bg-gradient-to-br ${category.color} text-white`}
                    >
                      {category.icon}
                    </div>

                    <h3 className="font-semibold text-lg">{category.category}</h3>
                    <p className="text-sm text-foreground/60">{category.description}</p>
                    <p className="text-xs font-bold text-primary mt-2">
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
                      className="border border-border bg-card/50 rounded-xl hover:border-primary/60 hover:bg-card transition-all"
                    >
                      <button
                        onClick={() =>
                          setExpandedField(expandedField === field.key ? null : field.key)
                        }
                        className="w-full px-6 py-4 flex justify-between text-left"
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
                        <p className="px-6 pb-4 text-sm text-foreground/70">
                          {field.detail}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BENEFITS */}
        <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10">
          <h3 className="font-semibold text-lg mb-4">Registration Benefits</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Verified ASHA Profile",
                desc: "Ensures your identity & details are fully authenticated.",
              },
              {
                title: "Supports Field Assignments",
                desc: "Helps allocate health visits & community tasks properly.",
              },
              {
                title: "Direct Incentive Processing",
                desc: "Bank details allow smooth honorarium processing.",
              },
              {
                title: "Better Health Network Connectivity",
                desc: "You become a part of structured community healthcare workflow.",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-3">
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
