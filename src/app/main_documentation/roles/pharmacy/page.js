"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  X,
  Pill,
  FileCheck,
  User,
  MapPin,
  Banknote,
} from "lucide-react"

export default function PharmacyDocumentationPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategoryExpand = (category) =>
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))

  // -------------------------------
  // Steps
  // -------------------------------
  const registrationSteps = [
    {
      number: 1,
      title: "Start Pharmacy Registration",
      description:
        "Select Pharmacy from registration options on the Aarogya Aadhar platform.",
    },
    {
      number: 2,
      title: "Contact Verification",
      description:
        "Enter mobile number & email and verify with OTP for secure onboarding.",
    },
    {
      number: 3,
      title: "Pharmacy Basic Details",
      description:
        "Fill pharmacy registration name, number, PAN, certificate upload, and service timings.",
    },
    {
      number: 4,
      title: "Upload Mandatory Documents",
      description: "Upload PAN card, registration certificate, and logo.",
    },
    {
      number: 5,
      title: "Address & Contact Details",
      description:
        "Enter full address, city, state, district, contact number and email.",
    },
    {
      number: 6,
      title: "Banking Information",
      description:
        "Fill bank details including account number, IFSC, account type and cancelled cheque.",
    },
    {
      number: 7,
      title: "Additional Pharmacy Info",
      description:
        "Add service days, delivery availability, pharmacists count, and pharmacy type.",
    },
    {
      number: 8,
      title: "Preview & Submit",
      description:
        "Review all details and submit for verification by the platform.",
    },
  ]

  // -------------------------------
  // Field Categories
  // -------------------------------
  const pharmacyFields = [
    {
      category: "Registration & Basic Information",
      description:
        "Essential pharmacy business and regulatory details required for verification.",
      color: "from-teal-500 to-cyan-500",
      icon: <Pill className="w-5 h-5" />,
      fields: [
        { name: "Mobile Number", key: "mobile", detail: "Primary login and OTP verification number for pharmacy account." },
        { name: "Email Address", key: "email", detail: "Used for communication, order updates, invoices, and verification." },
        { name: "Pharmacy Registration Name", key: "reg_name", detail: "Legal name of the pharmacy as per drug license and registration documents." },
        { name: "Pharmacy Registration Number", key: "reg_no", detail: "Official licence number allowing the pharmacy to sell medicines." },
        { name: "Pharmacy Registration Date", key: "reg_date", detail: "Date on which the pharmacy obtained its operating licence." },
        { name: "Registration Certificate Upload", key: "reg_cert", detail: "Proof of registration issued by the local drug authority." },
        { name: "Pharmacy PAN Card Number", key: "pan_no", detail: "Used for taxation, billing, and verification for payouts." },
        { name: "Pharmacy PAN Card Upload", key: "pan_card", detail: "Required for financial verification & payouts." },
        { name: "Service Time (Opening & Closing)", key: "service_time", detail: "Operational hours used for order acceptance and delivery timing." },
        { name: "Service Days in Week", key: "service_days", detail: "Defines days the pharmacy is available." },
        { name: "Online Platform Service", key: "online_service", detail: "Indicates whether the pharmacy accepts online orders." },
        { name: "Home Delivery", key: "home_delivery", detail: "If enabled, patients can request home delivery." },
        { name: "Pharmacy Type", key: "type", detail: "Retail / Wholesale / Chain pharmacy category." },
        { name: "Total Registered Pharmacists", key: "total_pharmacists", detail: "Total licensed pharmacists available." },
        { name: "Pincode", key: "pincode", detail: "Determines location coverage and serviceability." },
      ],
    },

    {
      category: "Address & Service Details",
      description:
        "Location, contact details, and branding information for pharmacy visibility.",
      color: "from-blue-500 to-indigo-500",
      icon: <MapPin className="w-5 h-5" />,
      fields: [
        { name: "Upload Logo", key: "logo", detail: "Displayed on pharmacy profile and invoices." },
        { name: "Full Address", key: "full_address", detail: "Primary address used for mapping, delivery and verification." },
        { name: "City", key: "city", detail: "Used for regional pharmacy listing." },
        { name: "State", key: "state", detail: "Required for compliance & state-specific regulation." },
        { name: "District", key: "district", detail: "Used for nearby pharmacy search." },
        { name: "Taluka", key: "taluka", detail: "Micro-location mapping for rural reach." },
        { name: "Primary Contact Number", key: "primary_contact", detail: "Displayed to customers for communication." },
        { name: "Alternate Mobile Number", key: "alternate_mobile", detail: "Backup contact number." },
        { name: "Secondary Email", key: "secondary_email", detail: "Used for secondary updates and order handling." },
      ],
    },

    {
      category: "Bank & Additional Information",
      description:
        "Financial details used for payouts, settlements, refunds and verification.",
      color: "from-emerald-500 to-green-600",
      icon: <Banknote className="w-5 h-5" />,
      fields: [
        { name: "Bank Name", key: "bank_name", detail: "Used for receiving payouts and settlements." },
        { name: "Account Number", key: "acc_no", detail: "Registered account for transactions." },
        { name: "IFSC Code", key: "ifsc", detail: "Used for validating bank branch." },
        { name: "Account Type", key: "acc_type", detail: "Savings / Current." },
        { name: "Cancelled Cheque Upload", key: "cheque", detail: "Confirms account ownership for payouts." },
        { name: "MICR Code", key: "micr", detail: "Used for cheque processing in settlements." },
        { name: "About Pharmacy", key: "about", detail: "Describes pharmacy experience and services." },
      ],
    },
  ]

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

      {/* MAIN SECTION */}
      <section id="registration" className="mb-28 pt-16 md:pt-24 lg:pt-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* Header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-4xl font-bold">Pharmacy Registration Flow</h2>
              <p className="text-foreground/60 mt-2">
                Complete onboarding with structured fields and compliance-based documentation.
              </p>
            </div>
          </div>

          {/* Video Tutorial Card */}
          <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Watch Pharmacy Registration Tutorial</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Step-by-step video explaining how pharmacies register and manage their profiles.
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

          {/* Video Modal */}
          {isVideoOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
              <div className="relative z-50 w-full max-w-4xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h4 className="text-lg font-semibold text-foreground">Pharmacy Registration Tutorial</h4>
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
                    src="/videos/pharmacy_registration.mp4"
                  />
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

            {/* CATEGORY FIELDS */}
            <div className="space-y-6">
              {pharmacyFields.map((category) => (
                <div key={category.category} className="space-y-0">
                  {/* Category */}
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

                        <p className="text-sm text-foreground/60 mt-1">{category.description}</p>

                        <p className="text-xs font-bold text-primary mt-2">{category.fields.length} Fields</p>
                      </div>

                      <div
                        className={`text-primary transition-transform duration-300 ${
                          expandedCategories[category.category] ? "rotate-180" : ""
                        }`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expand Fields */}
                  {expandedCategories[category.category] && (
                    <div className="rounded-b-xl border-2 border-t-0 border-primary bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                      {category.fields.map((field) => (
                        <div
                          key={field.key}
                          className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md backdrop-blur-sm"
                        >
                          <button
                            onClick={() => setExpandedField(expandedField === field.key ? null : field.key)}
                            className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-accent/5 transition-colors text-left"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {field.name}
                              </h4>

                              {expandedField === field.key && (
                                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{field.detail}</p>
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

            {/* BENEFITS */}
            <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10 to-transparent">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Registration Flow Benefits</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <p className="font-medium text-foreground">Verified & Trusted Pharmacies</p>
                    <p className="text-sm text-foreground/60">Ensures only licensed pharmacies operate on the platform.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <p className="font-medium text-foreground">Accurate Service Availability</p>
                    <p className="text-sm text-foreground/60">Patients can view live pharmacy timings and delivery availability.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <p className="font-medium text-foreground">Faster Settlements</p>
                    <p className="text-sm text-foreground/60">Verified bank details enable smooth payments and payouts.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <p className="font-medium text-foreground">Operational Transparency</p>
                    <p className="text-sm text-foreground/60">Patients can see pharmacists, service days, and pharmacy type.</p>
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
