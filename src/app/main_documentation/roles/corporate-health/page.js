"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  X,
  Building2,
  MapPin,
  Banknote,
} from "lucide-react"

export default function CorporateHealthDocumentationPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategoryExpand = (category) =>
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }))

  // -------------------------------------------
  // REGISTRATION STEPS
  // -------------------------------------------
  const registrationSteps = [
    {
      number: 1,
      title: "Select Corporate Registration",
      description:
        "Corporate Health service provider selects the Corporate registration option from the platform.",
    },
    {
      number: 2,
      title: "Verify Contact Details",
      description:
        "Enter mobile number and email → receive OTP → verify identity for secure onboarding.",
    },
    {
      number: 3,
      title: "Corporate Basic Information",
      description:
        "Fill company name, CIN, PAN, GST, incorporation date, service type and company type.",
    },
    {
      number: 4,
      title: "Address & Location Details",
      description:
        "Add company address, pin code, city, state, district and taluka.",
    },
    {
      number: 5,
      title: "Banking Information",
      description:
        "Add bank name, account number, IFSC, account type and upload cancelled cheque.",
    },
    {
      number: 6,
      title: "Corporate Documents Upload",
      description:
        "Upload company logo, employee ID card, Aadhaar, PAN and compliance documents.",
    },
    {
      number: 7,
      title: "Additional & Admin Details",
      description:
        "Provide employee count, corporate health insurance info, factory inspector info and contact person details.",
    },
    {
      number: 8,
      title: "Preview & Submit",
      description:
        "Review all corporate information and submit for admin verification.",
    },
  ]

  // -------------------------------------------
  // FIELD CATEGORIES
  // -------------------------------------------
  const corporateFields = [
    {
      category: "Corporate Profile & Basic Information",
      icon: <Building2 className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      description:
        "Core corporate identity, registration and company classification details.",
      fields: [
        { name: "Mobile Number", key: "mobile", detail: "Primary contact used for OTP login & communication." },
        { name: "Email Address", key: "email", detail: "Used for verification, corporate communication & notifications." },
        { name: "Additional Email", key: "alt_email", detail: "Secondary contact email for escalations or backup usage." },
        { name: "Emergency Contact Number", key: "emergency", detail: "Emergency phone number for safety alerts." },
        { name: "Company Name", key: "company_name", detail: "Official registered name of the corporate entity." },
        { name: "Date of Incorporation", key: "doi", detail: "Company establishment date as per ROC records." },
        { name: "CIN Number", key: "cin", detail: "Corporate Identification Number issued by MCA." },
        { name: "Company Type", key: "company_type", detail: "Private LTD / Public LTD / LLP / Proprietorship etc." },
        { name: "Company Service Type", key: "service_type", detail: "Corporate services offered: Manufacturing, IT, Logistics etc." },
        { name: "Company PAN Number", key: "pan", detail: "Used for taxation & statutory audits." },
        { name: "GST Number", key: "gst", detail: "GSTIN for billing & tax compliance." },
      ],
    },

    {
      category: "Address & Corporate Location",
      icon: <MapPin className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      description:
        "Corporate office address details for mapping & compliance.",
      fields: [
        { name: "Pin Code", key: "pincode", detail: "Used for mapping and region classification." },
        { name: "Present Address", key: "address", detail: "Corporate office address used for verification & service allocation." },
        { name: "City", key: "city", detail: "Required for city-level mapping." },
        { name: "State", key: "state", detail: "Important for state-level compliance." },
        { name: "District", key: "district", detail: "Used for regional identification." },
        { name: "Taluka", key: "taluka", detail: "Micro-location mapping for industrial zones." },
      ],
    },

    {
      category: "Banking, Documents & Admin Details",
      icon: <Banknote className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      description:
        "Financial details, compliance documents and administrative responsibility.",
      fields: [
        { name: "Upload Logo", key: "logo", detail: "Corporate branding logo used for dashboard & reporting." },
        { name: "Bank Name", key: "bank_name", detail: "Required for corporate settlements & reimbursements." },
        { name: "Bank Account Number", key: "acc_no", detail: "Account number for payouts." },
        { name: "IFSC Code", key: "ifsc", detail: "Bank branch verification code." },
        { name: "Account Type", key: "acc_type", detail: "Savings / Current." },
        { name: "Cancelled Cheque Upload", key: "cheque", detail: "Used to verify bank account ownership." },

        { name: "Employee Count", key: "employee_count", detail: "Total number of employees." },
        { name: "Corporate Health Insurance?", key: "insurance", detail: "Shows if company offers employee insurance." },
        { name: "Factory Inspector?", key: "factory", detail: "Indicates compliance requirement." },

        { name: "Contact Person Name", key: "contact_name", detail: "Main responsible person for corporate health coordination." },
        { name: "Contact Person Relation", key: "contact_relation", detail: "Designation or relation to corporate management." },

        { name: "Employee ID Card Upload", key: "employee_id", detail: "Used for identity verification." },
        { name: "Aadhaar Card Number", key: "aadhaar", detail: "Aadhaar number for verification." },
        { name: "Aadhaar Front", key: "aadhaar_front", detail: "Front side of Aadhaar." },
        { name: "Aadhaar Back", key: "aadhaar_back", detail: "Back side of Aadhaar." },
        { name: "PAN Card Upload", key: "pan_card_upload", detail: "PAN for identity verification." },
      ],
    },
  ]

  // -------------------------------------------
  // UI
  // -------------------------------------------
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

      {/* Main Section */}
      <section className="mb-28 pt-16 md:pt-24 lg:pt-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-4xl font-bold">Corporate Health Registration Flow</h2>
              <p className="text-foreground/60 mt-2">
                Corporate onboarding with structured fields, compliance & workforce verification.
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
                    Watch Corporate Registration Tutorial
                  </h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Learn how companies create their corporate health profiles step by step.
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
                  <h4 className="text-lg font-semibold text-foreground">Corporate Registration Tutorial</h4>
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
                    src="/videos/corporate_registration.mp4"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEPS + FIELDS CARD */}
          <div className="mb-12 p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">

            <h3 className="text-2xl font-bold mb-8 text-foreground">8-Step Registration Process</h3>

            {/* STEPS */}
            <div className="space-y-4 mb-8">
              {registrationSteps.map((step, idx) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold shadow">
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
              {corporateFields.map((category) => (
                <div key={category.category}>

                  {/* CATEGORY BUTTON */}
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
                        <div className={`p-2 rounded-lg w-fit mb-3 bg-gradient-to-br ${category.color} text-white transition-transform group-hover:scale-110`}>
                          {category.icon}
                        </div>

                        <h3 className="font-semibold text-lg text-foreground">{category.category}</h3>
                        <p className="text-sm text-foreground/60 mt-1">{category.description}</p>
                        <p className="text-xs font-bold text-primary mt-2">{category.fields.length} Fields</p>
                      </div>

                      <svg
                        className={`w-5 h-5 text-primary transition-transform duration-300 ${
                          expandedCategories[category.category] ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </button>

                  {/* CATEGORY FIELDS */}
                  {expandedCategories[category.category] && (
                    <div className="rounded-b-xl border-2 border-t-0 border-primary bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                      {category.fields.map((field) => (
                        <div
                          key={field.key}
                          className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card/70 shadow-sm transition-all overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedField(expandedField === field.key ? null : field.key)}
                            className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-accent/5 transition-colors"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground group-hover:text-primary">
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

            {/* BENEFITS */}
            <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Registration Flow Benefits</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <p className="font-medium">Corporate Compliance Ready</p>
                    <p className="text-sm text-foreground/60">
                      All required KYC, CIN, GST, PAN details stored securely.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <p className="font-medium">Workforce Health Insights</p>
                    <p className="text-sm text-foreground/60">
                      Employee count, insurance and admin details support better planning.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <p className="font-medium">Secure Financial Settlements</p>
                    <p className="text-sm text-foreground/60">
                      Verified bank details ensure smooth reimbursements & payouts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <p className="font-medium">Transparent Documentation</p>
                    <p className="text-sm text-foreground/60">
                      Aadhaar, PAN, ID cards and compliance uploads prevent delays.
                    </p>
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
