"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  X,
  FlaskConical,
  FileCheck,
  User,
  Banknote,
  MapPin,
} from "lucide-react"

export default function PathologyDocumentationPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategoryExpand = (name) =>
    setExpandedCategories((prev) => ({ ...prev, [name]: !prev[name] }))

  const registrationSteps = [
    { number: 1, title: "Start Registration", description: "Select Pathology Lab registration in the onboarding screen." },
    { number: 2, title: "Verify Contact", description: "Verify mobile and email via OTP before proceeding." },
    { number: 3, title: "Core Lab Details", description: "Enter lab name, registration number, specialization and services." },
    { number: 4, title: "Upload Certifications", description: "Upload NABL, registration & machine calibration certificates." },
    { number: 5, title: "Owner KYC & Admin", description: "Provide owner/admin Aadhaar, PAN and contact details." },
    { number: 6, title: "Address & Coverage", description: "Add full address and service coverage for sample collection." },
    { number: 7, title: "Banking & Billing", description: "Enter bank account info for payouts and settlements." },
    { number: 8, title: "Preview & Submit", description: "Review details and submit for verification and approval." },
  ]

  const pathologyFields = [
    {
      category: "Laboratory Identity & Services",
      description: "Basic lab information and offered pathology tests",
      color: "from-purple-500 to-pink-600",
      icon: <FlaskConical className="w-5 h-5" />,
      fields: [
        { name: "Laboratory Name", key: "lab_name", detail: "Official name used in reports, invoices and listings." },
        { name: "Lab Registration Number", key: "reg_no", detail: "Government-issued registration/licence number for the lab." },
        { name: "NABL Accreditation", key: "nabl", detail: "Accreditation indicates lab quality — displayed prominently to users." },
        { name: "List of Available Tests", key: "tests_list", detail: "Dropdown/list showing available tests (CBC, LFT, KFT, Culture, etc.)." },
        { name: "Specialized Panels", key: "special_panels", detail: "Indicate cardiology, oncology, microbiology panels or molecular tests." },
        { name: "Turnaround Time (TAT)", key: "tat", detail: "Typical time to deliver reports; used for patient expectations." },
        { name: "Home Sample Collection", key: "home_collection", detail: "Flag if lab offers sample pickup & home collection services." },
      ],
    },
    {
      category: "Compliance & Technical Documents",
      description: "Certificates and technical documentation required for compliance",
      color: "from-blue-500 to-cyan-500",
      icon: <FileCheck className="w-5 h-5" />,
      fields: [
        { name: "Registration Certificate", key: "reg_certificate", detail: "Primary legal certificate for operating as a diagnostic lab." },
        { name: "NABL Certificate Upload", key: "nabl_cert", detail: "Proof of NABL accreditation (if applicable)." },
        { name: "Machine Calibration Records", key: "calib_records", detail: "Calibration & maintenance records for instruments." },
        { name: "Pathologist License", key: "pathologist_license", detail: "License of in-charge pathologist for report sign-off." },
        { name: "Quality Control Logs", key: "qc_logs", detail: "Quality assurance and control documentation." },
      ],
    },
    {
      category: "Owner & Admin KYC",
      description: "Owner and administrative person identity and contact information",
      color: "from-amber-500 to-orange-500",
      icon: <User className="w-5 h-5" />,
      fields: [
        { name: "Owner Name", key: "owner_name", detail: "Full legal name for KYC and compliance." },
        { name: "Owner Mobile", key: "owner_mobile", detail: "Primary contact for account verification & urgent communication." },
        { name: "Owner Email", key: "owner_email", detail: "Used for login, OTP and official notices." },
        { name: "Aadhaar Number & Upload", key: "aadhaar", detail: "Identity verification for the owner." },
        { name: "PAN Number & Upload", key: "pan", detail: "Tax compliance and payments." },
        { name: "Admin / Manager Contact", key: "admin_contact", detail: "Operations contact for daily coordination." },
      ],
    },
    {
      category: "Address, Coverage & Logistics",
      description: "Location, sample pickup zones and delivery information",
      color: "from-green-500 to-emerald-600",
      icon: <MapPin className="w-5 h-5" />,
      fields: [
        { name: "Full Address", key: "address", detail: "Address used for maps, pickups, and courier operations." },
        { name: "City / State / District", key: "city_state", detail: "Essential for location-based searches and coverage." },
        { name: "Pin Code", key: "pincode", detail: "Used for exact mapping and routing of sample collection." },
        { name: "Coverage Radius", key: "coverage_radius", detail: "Defines the geographic area for home collection." },
        { name: "Transport / Courier Partners", key: "courier", detail: "If lab uses third-party logistics for sample/report transport." },
      ],
    },
    {
      category: "Banking & Financial Details",
      description: "Details for payouts, refunds and corporate settlements",
      color: "from-teal-500 to-cyan-500",
      icon: <Banknote className="w-5 h-5" />,
      fields: [
        { name: "Bank Name", key: "bank_name", detail: "Bank account used for payouts & settlements." },
        { name: "Account Number", key: "acc_no", detail: "Bank account to receive payments and refunds." },
        { name: "IFSC Code", key: "ifsc", detail: "Identifies bank branch for NEFT/RTGS transfers." },
        { name: "Cancelled Cheque", key: "cheque", detail: "Bank verification document for payouts." },
        { name: "MICR Code", key: "micr", detail: "Bank clearing code for certain settlement flows." },
      ],
    },
    {
      category: "Media & Facilities",
      description: "Visual verification and proof of equipment & facility readiness",
      color: "from-pink-500 to-rose-500",
      icon: <FlaskConical className="w-5 h-5" />,
      fields: [
        { name: "Lab Logo", key: "logo", detail: "Branding image displayed on the profile and reports." },
        { name: "Interior Photos", key: "interior", detail: "Photos to demonstrate lab cleanliness and layout." },
        { name: "Instrument Photos", key: "instruments", detail: "Images of analyzers, PCR machines, microscopes etc." },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-10">
        <Link
          href="/main_documentation#roles"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border 
            hover:border-primary/60 hover:bg-accent/10 transition-all text-sm font-medium text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Documentation
        </Link>
      </div>

      {/* REGISTRATION SECTION (MATCHED EXACTLY) */}
      <section id="registration" className="mb-28 pt-16 md:pt-24 lg:pt-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* Title */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-4xl font-bold">Pathology Lab Registration Flow</h2>
              <p className="text-foreground/60 mt-2">
                Onboarding with structured fields across compliance, services, KYC and logistics
              </p>
            </div>
          </div>

          {/* VIDEO CARD (MATCHED) */}
          <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 
            bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Watch Pathology Registration Tutorial
                  </h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Visual walkthrough of complete pathology onboarding, certificates and compliance upload.
                </p>
              </div>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                font-medium bg-gradient-to-r from-primary to-accent text-white 
                hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                <Play className="w-4 h-4" />
                Watch Video
              </button>
            </div>
          </div>

          {/* VIDEO MODAL (MATCHED EXACT) */}
          {isVideoOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
              <div className="relative z-50 w-full max-w-4xl bg-background rounded-xl shadow-2xl 
                border border-border overflow-hidden">

                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h4 className="text-lg font-semibold text-foreground">
                    Pathology Registration Tutorial
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
                    src="/videos/pathology_registration.mp4"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEPS CONTAINER (MATCHED EXACT) */}
          <div className="mb-12 p-8 rounded-xl border border-border/50 
            bg-gradient-to-br from-accent/5 via-background to-primary/5">
            <h3 className="text-2xl font-bold mb-8 text-foreground">
              8-Step Registration Process
            </h3>

            {/* Timeline */}
            <div className="w-full space-y-4 mb-8">
              {registrationSteps.map((step, idx) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br 
                      from-primary to-accent flex items-center justify-center 
                      text-white font-bold shadow-lg">
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

            {/* FIELDS (MATCHED EXACT UI) */}
            <div className="space-y-6">
              {pathologyFields.map((category) => (
                <div key={category.category} className="space-y-0">
                  
                  {/* Category Card */}
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
                        <div className={`p-2 rounded-lg w-fit mb-3 bg-gradient-to-br ${category.color} 
                          text-white group-hover:scale-110 transition-transform`}>
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

                      <div className={`text-primary transition-transform duration-300 ${
                        expandedCategories[category.category] ? "rotate-180" : ""
                      }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Category Expand Fields */}
                  {expandedCategories[category.category] && (
                    <div className="rounded-b-xl border-2 border-t-0 border-primary 
                      bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                      {category.fields.map((field) => (
                        <div
                          key={field.key}
                          className="group rounded-xl border border-border bg-card/50 
                          hover:border-primary/50 hover:bg-card transition-all duration-300 
                          overflow-hidden shadow-sm hover:shadow-md backdrop-blur-sm"
                        >
                          <button
                            onClick={() =>
                              setExpandedField(expandedField === field.key ? null : field.key)
                            }
                            className="w-full px-6 py-4 flex items-start justify-between gap-4 
                              hover:bg-accent/5 transition-colors text-left"
                          >
                            <div className="flex-1">
                              <h4
                                className="font-semibold text-foreground 
                                group-hover:text-primary transition-colors"
                              >
                                {field.name}
                              </h4>

                              {expandedField === field.key && (
                                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                                  {field.detail}
                                </p>
                              )}
                            </div>

                            <svg
                              className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
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

            {/* BENEFITS (MATCHED EXACT) */}
            <div className="mt-12 p-6 rounded-xl border border-border/50 
              bg-gradient-to-br from-primary/5 via-accent/10 to-transparent">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Registration Flow Benefits
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Quality & Compliance</p>
                    <p className="text-sm text-foreground/60">
                      Ensures NABL, calibration logs and legal documents are always verified.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Faster Patient Decision</p>
                    <p className="text-sm text-foreground/60">
                      Clear test listings and TAT timings help patients select the right lab.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Reliable Reporting</p>
                    <p className="text-sm text-foreground/60">
                      Standard QC logs and compliance documentation ensure accurate reports.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Seamless Payouts</p>
                    <p className="text-sm text-foreground/60">
                      Verified bank details speed up settlements & refunds.
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
