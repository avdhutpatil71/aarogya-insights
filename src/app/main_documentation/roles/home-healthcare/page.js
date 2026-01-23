"use client"

import { useState } from "react"
import { ArrowLeft, Play, X, User, Home, FileCheck, Stethoscope, Shield } from "lucide-react"
import Link from "next/link"

export default function HomeHealthcarePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  // ============================
  // Registration Steps
  // ============================
  const registrationSteps = [
    { number: 1, title: "Select Registration", description: "Home Healthcare provider selects registration option." },
    { number: 2, title: "OTP Verification", description: "Enter mobile & email → receive OTP → verify identity." },
    { number: 3, title: "Agency Information", description: "Add agency profile, registration number, licensing & experience." },
    { number: 4, title: "Address & Contacts", description: "Add location, city, contact numbers & coordinator details." },
    { number: 5, title: "Staff & Service Capability", description: "Add nursing, caretaker, physiotherapy & service availability." },
    { number: 6, title: "Bank Details", description: "Add bank details, cancelled cheque & MICR information." },
    { number: 7, title: "Upload Documents", description: "Upload all necessary documents for verification." },
    { number: 8, title: "Preview & Submit", description: "Review all details and submit for approval." },
  ]

  // ============================
  // Category Fields
  // ============================
  const homeHealthcareFields = [
    {
      category: "Agency & Basic Information",
      icon: <Home className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      description: "Basic identity & licensing details of the home healthcare provider",
      fields: [
        { name: "Mobile Number", detail: "Used for OTP login & communication." },
        { name: "Email ID", detail: "Used for verification, notifications & reports." },
        { name: "Agency Name", detail: "Official name registered for Home Healthcare services." },
        { name: "Registration Number", detail: "Government/Medical license number for healthcare services." },
        { name: "Registration Certificate", detail: "License/permit to provide home care services." },
        { name: "PAN Number", detail: "Used for tax, compliance & payouts." },
        { name: "PAN Card Upload", detail: "Document verification for financial operations." },
        { name: "License Type", detail: "Select Nursing / Physiotherapy / Elder Care / General Home Care services." },
        { name: "Years of Experience", detail: "Professional experience of healthcare service delivery." },
        { name: "Service Availability", detail: "Choose 24×7 or specific time slots." },
        { name: "Service Days per Week", detail: "Operational days for home visits." },
        { name: "Emergency Response", detail: "Whether urgent care services are available." },
      ],
    },

    {
      category: "Address & Contact Details",
      icon: <User className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      description: "Agency location and primary contact details",
      fields: [
        { name: "Agency Logo", detail: "Uploaded logo appears on dashboard & patient booking." },
        { name: "Full Address", detail: "Used for service area mapping & patient visit allocation." },
        { name: "City", detail: "Important for location-based service availability." },
        { name: "State", detail: "Used for healthcare compliance & regional analytics." },
        { name: "District", detail: "Helps route service requests to nearest staff." },
        { name: "Taluka", detail: "Micro-locality mapping for fast response." },
        { name: "Pincode", detail: "Determines service coverage & locality." },
        { name: "Primary Contact Number", detail: "Main contact for patient inquiries." },
        { name: "Alternate Contact Number", detail: "Backup number for urgent communication." },
        { name: "Support Email", detail: "Used for patient queries & documentation." },
        { name: "Coordinator Name", detail: "Main person responsible for daily operations." },
        { name: "Coordinator Mobile", detail: "Contact for field staff & patient visits." },
        { name: "Coordinator Email", detail: "Used for reports and assignment updates." },
      ],
    },

    {
      category: "Staff & Service Capabilities",
      icon: <Stethoscope className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      description: "Details of service types & staff availability",
      fields: [
        { name: "Total Registered Nurses", detail: "Count of qualified nursing staff." },
        { name: "Total Caretakers", detail: "Caretakers available for home support services." },
        { name: "Physiotherapists Available", detail: "Physio experts for rehabilitation at home." },
        { name: "Nursing Services", detail: "Whether nursing support is offered." },
        { name: "Elder Care Services", detail: "Whether elderly support services are available." },
        { name: "Physiotherapy Services", detail: "If physiotherapist-based treatment is offered." },
        { name: "ICU Setup at Home", detail: "Critical care setup availability." },
        { name: "Medical Equipment Rental", detail: "Wheelchairs, oxygen, beds & more." },
        { name: "Ambulance Tie-up", detail: "Partner ambulance service availability." },
        { name: "Staff Document Upload", detail: "Verification of nursing & caretaker certificates." },
      ],
    },

    {
      category: "Bank & Additional Information",
      icon: <Shield className="w-5 h-5" />,
      color: "from-orange-500 to-red-600",
      description: "Financial details required for payouts and verification",
      fields: [
        { name: "Bank Name", detail: "Used for financial settlements." },
        { name: "Account Number", detail: "For fund transfers, refunds & payouts." },
        { name: "IFSC Code", detail: "Identifies the bank branch for transfers." },
        { name: "Account Type", detail: "Savings / Current as per provider." },
        { name: "Cancelled Cheque", detail: "Used for bank verification." },
        { name: "MICR Code", detail: "For cheque & financial processing." },
        { name: "Agency Description", detail: "Overview of services & experience." },
      ],
    },
  ]

  // Toggle expand section
  const toggleCategoryExpand = (category) =>
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-10">
        <Link href="/main_documentation#roles" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/60 hover:bg-accent/10 transition-all text-sm font-medium text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back to Documentation
        </Link>
      </div>

      {/* REGISTRATION SECTION (SPACING MATCHED) */}
      <section id="registration" className="mb-28 pt-16 md:pt-24 lg:pt-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* Title */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-4xl font-bold">Home Healthcare Registration Flow</h2>
              <p className="text-foreground/60 mt-2">Complete onboarding with structured fields across 4 categories</p>
            </div>
          </div>

          {/* VIDEO CARD */}
          <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Watch Registration Tutorial</h3>
                </div>
                <p className="text-sm text-foreground/70">Complete walkthrough of Home Healthcare registration, service setup & verification.</p>
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

          {/* VIDEO MODAL */}
          {isVideoOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
              <div className="relative z-50 w-full max-w-4xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h4 className="text-lg font-semibold text-foreground">Home Healthcare Registration Tutorial</h4>
                  <button onClick={() => setIsVideoOpen(false)} className="p-2 rounded-lg hover:bg-accent/20 text-foreground/60 hover:text-foreground transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 bg-black/30">
                  <video className="w-full rounded-lg border border-border/50 bg-black" controls src="/videos/home_healthcare_registration.mp4" />
                  <p className="text-xs text-foreground/60 mt-3">💡 Upload your actual registration tutorial video in this path.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEPS + FIELDS */}
          <div className="mb-12 p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">
            <h3 className="text-2xl font-bold mb-8 text-foreground">8-Step Registration Process</h3>

            <div className="w-full space-y-4 mb-8">
              {registrationSteps.map((step, idx) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg">
                      {step.number}
                    </div>
                    {idx < registrationSteps.length - 1 && <div className="h-24 w-1 bg-gradient-to-b from-primary to-accent/30 mt-1" />}
                  </div>
                  <div className="pt-2 pb-4 flex-1">
                    <h4 className="font-semibold text-foreground text-lg mb-2">{step.title}</h4>
                    <p className="text-sm text-foreground/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FIELDS (MATCHED EXACT UI) */}
            <div className="space-y-6">
              {homeHealthcareFields.map((category) => (
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
                        <div className={`p-2 rounded-lg w-fit mb-3 bg-gradient-to-br ${category.color} text-white group-hover:scale-110 transition-transform`}>{category.icon}</div>
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{category.category}</h3>
                        <p className="text-sm text-foreground/60 mt-1">{category.description}</p>
                        <p className="text-xs font-bold text-primary mt-2">{category.fields.length} Fields</p>
                      </div>

                      <div className={`text-primary transition-transform duration-300 ${expandedCategories[category.category] ? "rotate-180" : ""}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expandable Fields */}
                  {expandedCategories[category.category] && (
                    <div className="rounded-b-xl border-2 border-t-0 border-primary bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                      {category.fields.map((field, idx) => (
                        <div key={idx} className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md backdrop-blur-sm">
                          <button
                            onClick={() => setExpandedField(expandedField === field.name ? null : field.name)}
                            className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-accent/5 transition-colors text-left"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{field.name}</h4>
                              {expandedField === field.name && <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{field.detail}</p>}
                            </div>

                            <svg className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${expandedField === field.name ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* BENEFITS (MATCHED) */}
            <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10 to-transparent">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Registration Flow Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Verified Skilled Professionals</p>
                    <p className="text-sm text-foreground/60">Ensures only qualified nursing & caretaker staff are assigned to patients.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Improved Patient Trust</p>
                    <p className="text-sm text-foreground/60">Patients receive complete visibility of service capabilities & documentation.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Better Operational Efficiency</p>
                    <p className="text-sm text-foreground/60">Coordinators can assign staff based on location, expertise & service type.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Financial Transparency</p>
                    <p className="text-sm text-foreground/60">Verified bank details ensure smooth payments & payouts.</p>
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
