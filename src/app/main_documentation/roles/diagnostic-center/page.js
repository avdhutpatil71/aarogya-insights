"use client"

import { useState } from "react"
import {
  Play,
  X,
  User,
  FlaskConical,
  FileCheck,
  MapPin,
  Building2,
  Banknote,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// -------------------------------------------------------------
// Diagnostic Center – Generated Profile Fields
// -------------------------------------------------------------

const diagnosticRegistrationFields = [
  {
    category: "Center Information",
    description: "Primary identity and diagnostic licensing details",
    color: "from-purple-500 to-pink-600",
    icon: <Building2 className="w-5 h-5" />,
    fields: [
      {
        name: "Diagnostic Center Name",
        key: "center_name",
        detail:
          "Official registered name used in reports, billing, certifications, and national medical databases.",
      },
      {
        name: "Diagnostic Registration Number",
        key: "reg_no",
        detail:
          "Government / municipal registration ID required for compliance & verification by hospitals and patients.",
      },
      {
        name: "Registration Certificate",
        key: "reg_certificate",
        detail:
          "Mandatory license that validates diagnostic operations such as X-Ray, MRI, CT, ECG, and pathology labs.",
      },
      {
        name: "NABL Accreditation Status",
        key: "nabl_status",
        detail:
          "Ensures diagnostic accuracy & quality. NABL-approved labs get higher trust and visibility.",
      },
      {
        name: "NABL Certificate Upload",
        key: "nabl_certificate",
        detail:
          "Used for quality standard validation, mandatory for advanced pathology & radiology centers.",
      },
      {
        name: "Specialization Type",
        key: "specialization",
        detail:
          "Identifies whether the center provides radiology, pathology, sonography, ECG, TMT, or multi-service diagnostics.",
      },
      {
        name: "Number of Technicians",
        key: "technicians_count",
        detail:
          "Used for capacity analysis and load handling for test bookings.",
      },
    ],
  },

  {
    category: "Owner / Administrator Details",
    description: "KYC and responsible authority information",
    color: "from-blue-500 to-cyan-500",
    icon: <User className="w-5 h-5" />,
    fields: [
      {
        name: "Owner Full Name",
        key: "owner_name",
        detail: "Name of the responsible authority legally owning the center.",
      },
      {
        name: "Owner Mobile Number",
        key: "owner_mobile",
        detail:
          "Primary communication channel for account verification, emergencies, and platform notifications.",
      },
      {
        name: "Email ID",
        key: "email",
        detail:
          "Required for login, OTP verification, report uploads, and user communication.",
      },
      {
        name: "Aadhaar Number",
        key: "aadhaar",
        detail:
          "Used for identity verification and linking the owner to legal documentation.",
      },
      {
        name: "Aadhaar Front Upload",
        key: "aadhaar_front",
        detail: "Verifies identity, address, and authenticity.",
      },
      {
        name: "Aadhaar Back Upload",
        key: "aadhaar_back",
        detail: "Supports full identity validation.",
      },
      {
        name: "PAN Number",
        key: "pan",
        detail:
          "Required for financial verification, payouts, and compliance with government norms.",
      },
      {
        name: "PAN Card Upload",
        key: "pan_upload",
        detail: "Used for GST, tax filing, and payment settlements.",
      },
    ],
  },

  {
    category: "Diagnostic Documents",
    description: "Technical compliance & service verification",
    color: "from-amber-500 to-orange-500",
    icon: <FileCheck className="w-5 h-5" />,
    fields: [
      {
        name: "Radiology Machine Certificate",
        key: "machine_certificate",
        detail:
          "Mandatory for MRI, CT, Digital X-Ray machines for compliance & safety validation.",
      },
      {
        name: "Radiologist License",
        key: "radiologist_license",
        detail:
          "Government license of radiologist required for report signing.",
      },
      {
        name: "Pathology Lab Certificate",
        key: "lab_certificate",
        detail:
          "Required for blood / urine / culture test authorization.",
      },
      {
        name: "Fire & Safety Certificate",
        key: "fire_safety",
        detail:
          "Safety compliance certificate required for all diagnostic centers.",
      },
    ],
  },

  {
    category: "Address & Location",
    description: "Location used for patient navigation & service availability",
    color: "from-green-500 to-emerald-600",
    icon: <MapPin className="w-5 h-5" />,
    fields: [
      { name: "Full Address", key: "address", detail: "Used for GPS mapping & home sample collection." },
      { name: "City", key: "city", detail: "Required to map nearby hospitals & patients." },
      { name: "State", key: "state", detail: "Used for region-based medical regulations." },
      { name: "District", key: "district", detail: "Important for mapping rural & urban coverage." },
      { name: "Taluka", key: "taluka", detail: "Used for micro-level service area filtering." },
      { name: "Pin Code", key: "pincode", detail: "Ensures accurate location for test pickup & delivery." },
      {
        name: "Center Geo Coordinates",
        key: "geo",
        detail:
          "Supports map pin accuracy for urgent radiology test referrals.",
      },
    ],
  },

  {
    category: "Bank & Financial Information",
    description: "Financial account details for settlements & payouts",
    color: "from-teal-500 to-cyan-500",
    icon: <Banknote className="w-5 h-5" />,
    fields: [
      { name: "Bank Name", key: "bank_name", detail: "Required for settlements & payouts." },
      { name: "Account Number", key: "account_number", detail: "Used for transactions, refunds & payouts." },
      { name: "IFSC Code", key: "ifsc", detail: "Required to validate exact branch of bank." },
      { name: "Account Type", key: "account_type", detail: "Savings / Current account selection." },
      { name: "Cancelled Cheque", key: "cancelled_cheque", detail: "Used to verify bank account ownership." },
      { name: "MICR Code", key: "micr", detail: "Supports additional financial validation." },
    ],
  },

  {
    category: "Center Media",
    description: "Brand identity & visual verification",
    color: "from-pink-500 to-rose-600",
    icon: <ImageIcon className="w-5 h-5" />,
    fields: [
      {
        name: "Center Logo",
        key: "center_logo",
        detail: "Used on reports, receipts, portal listing & branding.",
      },
      {
        name: "Interior Photos",
        key: "interior_photos",
        detail: "Used for verification of setup, cleanliness & patient trust.",
      },
      {
        name: "Machine Images",
        key: "machine_images",
        detail: "Helps patients verify available diagnostic technologies.",
      },
    ],
  },
]

// -------------------------------------------------------------
// Steps
// -------------------------------------------------------------

const registrationSteps = [
  { number: 1, title: "Start Registration", description: "Choose Diagnostic Center registration on Aarogya Aadhar." },
  { number: 2, title: "Verify Mobile & Email", description: "Enter mobile, email & complete OTP verification." },
  { number: 3, title: "Fill Center Information", description: "Add diagnostic center licensing & service details." },
  { number: 4, title: "Upload Required Certificates", description: "Upload NABL, machine & registration documents." },
  { number: 5, title: "Owner KYC Details", description: "Provide Aadhaar, PAN & identity documentation." },
  { number: 6, title: "Address Information", description: "Provide complete location for patients & hospitals." },
  { number: 7, title: "Bank & Billing Details", description: "Enter account details for payouts & settlements." },
  { number: 8, title: "Preview & Submit", description: "Review the details & complete registration." },
]

// -------------------------------------------------------------
// Component
// -------------------------------------------------------------

export default function DiagnosticDocumentationPage() {
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

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
                <Link href="/main_documentation#roles" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/60 hover:bg-accent/10 transition-all text-sm font-medium text-foreground">
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
              <h4 className="text-lg font-semibold text-foreground">Diagnostic Center Registration Tutorial</h4>
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
                src="/videos/diagnostic_registration.mp4"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 pt-20 mb-28">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
          <div>
            <h2 className="text-4xl font-bold">Diagnostic Center Registration Flow</h2>
            <p className="text-foreground/60 mt-2">
              Complete onboarding with structured steps & compliance-based fields
            </p>
          </div>
        </div>

        {/* Video Card */}
        <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Watch Registration Tutorial</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Visual walkthrough of the complete diagnostic registration process, certificate upload steps & approval flow.
              </p>
            </div>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              <Play className="w-4 h-4" />
              Watch Video
            </button>
          </div>
        </div>

        {/* Registration Steps */}
        <div className="mb-12 p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">
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
                  <h4 className="font-semibold text-foreground text-lg mb-2">{step.title}</h4>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fields */}
          <div className="space-y-6">
            {diagnosticRegistrationFields.map((category) => (
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
                        className={`p-2 rounded-lg w-fit mb-3 bg-gradient-to-br ${category.color} text-white`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">{category.category}</h3>
                      <p className="text-sm text-foreground/60 mt-1">{category.description}</p>
                      <p className="text-xs font-bold text-primary mt-2">
                        {category.fields.length} Fields
                      </p>
                    </div>

                    <div
                      className={`text-primary transition-transform duration-300 ${
                        expandedCategories[category.category] ? "rotate-180" : ""
                      }`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {expandedCategories[category.category] && (
                  <div className="rounded-b-xl border-2 border-t-0 border-primary bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                    {category.fields.map((field) => (
                      <div
                        key={field.key}
                        className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all shadow-sm"
                      >
                        <button
                          onClick={() =>
                            setExpandedField(expandedField === field.key ? null : field.key)
                          }
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

          {/* Benefits */}
          <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10 to-transparent">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Registration Flow Benefits</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Quality Assurance & Trust</p>
                  <p className="text-sm text-foreground/60">
                    Verified diagnostic centers gain higher visibility and trust from hospitals & patients.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Faster Reporting Workflow</p>
                  <p className="text-sm text-foreground/60">
                    Upload & share diagnostic reports directly with doctors through one connected platform.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Compliance-Based Setup</p>
                  <p className="text-sm text-foreground/60">
                    Ensures all licenses, certificates & approvals are properly collected.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Better Patient Experience</p>
                  <p className="text-sm text-foreground/60">
                    Accurate address & machine data improves booking accuracy & patient convenience.
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
