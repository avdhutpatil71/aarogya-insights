"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Play,
  X,
  User,
  FileCheck,
  Stethoscope,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function DoctorRegistrationPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  // ---------------------------------------------------------------------
  // CATEGORY DATA
  // ---------------------------------------------------------------------

  const doctorRegistrationFields = [
    {
      category: "Personal & Professional Information",
      description: "Basic identity, academic and medical profession details",
      icon: <User className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      fields: [
        {
          name: "Mobile Number",
          key: "mobile",
          detail:
            "Used for login, OTP verification, appointment alerts, and hospital communication.",
        },
        {
          name: "Email ID",
          key: "email",
          detail:
            "Required for login, verification, sharing patient reports, and receiving system notifications.",
        },
        {
          name: "First Name",
          key: "first_name",
          detail:
            "Primary professional identity used on prescriptions, digital profiles, and patient-facing documents.",
        },
        {
          name: "Middle Name",
          key: "middle_name",
          detail:
            "Optional field used to maintain full legal identity, especially for medical council verification.",
        },
        {
          name: "Last Name",
          key: "last_name",
          detail:
            "Important for medical council records, prescriptions, and hospital documentation.",
        },
        {
          name: "Date of Birth",
          key: "dob",
          detail:
            "Used for age validation required by medical councils and certificate verification.",
        },
        {
          name: "Gender",
          key: "gender",
          detail: "Used for profile representation and hospital HR documentation.",
        },
        {
          name: "Alternate Mobile Number",
          key: "alt_mobile",
          detail:
            "Used for emergency communication, hospital coordination, or schedule changes.",
        },
        {
          name: "Education Level",
          key: "education",
          detail:
            "Represents highest achieved qualification and is displayed on profile for patients.",
        },
        {
          name: "Specialty Type",
          key: "specialty",
          detail:
            "Defines medical specialty (e.g., Cardiologist, Orthopedic) shown in search results.",
        },
        {
          name: "Total Experience",
          key: "experience",
          detail:
            "Indicates professional experience that builds trust with patients and hospitals.",
        },
      ],
    },

    {
      category: "Certificates & Verification Documents",
      description: "Medical council registration and qualification verification",
      icon: <FileCheck className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      fields: [
        {
          name: "Degree Certificate",
          key: "degree_certificate",
          detail:
            "Primary qualification proof required for professional verification and hospital onboarding.",
        },
        {
          name: "Registration Certificate",
          key: "registration_certificate",
          detail:
            "Mandatory certificate for medical practice as per the medical council regulations.",
        },
        {
          name: "Specialty Degree Certificate",
          key: "specialty_certificate",
          detail:
            "Validates specialty expertise; used by hospitals to approve specialist roles.",
        },
        {
          name: "Registration Number",
          key: "registration_no",
          detail:
            "Medical council number used to validate identity and enable prescription generation.",
        },
        {
          name: "Registration Date",
          key: "registration_date",
          detail:
            "Indicates when the doctor was certified to practice medical profession.",
        },
        {
          name: "Registration Renewal Date",
          key: "renewal_date",
          detail:
            "Ensures legality of medical practice; displayed for compliance tracking.",
        },
      ],
    },

    {
      category: "Consultation & Appointment Preferences",
      description: "Doctor service pricing and appointment settings",
      icon: <Stethoscope className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      fields: [
        {
          name: "Profile Description",
          key: "description",
          detail:
            "Professional summary displayed to patients; can include achievements, experience and expertise.",
        },
        {
          name: "Consultation Fee",
          key: "consultation_fee",
          detail:
            "Base consultation fee that patients pay for in-person or online appointments.",
        },
        {
          name: "Discount",
          key: "discount",
          detail:
            "Optional discount offered to patients; automatically adjusts final price.",
        },
        {
          name: "Final Price",
          key: "final_price",
          detail:
            "The amount patients pay after discount; visible on booking screens.",
        },
        {
          name: "Online Appointment Availability",
          key: "online_appointment",
          detail:
            "Enables video consultation services for patients using the platform.",
        },
        {
          name: "Home Healthcare Visit",
          key: "home_healthcare",
          detail:
            "Indicates whether doctor is available for home visits such as follow-up or checkups.",
        },
      ],
    },

    {
      category: "Address & Banking Details",
      description: "Residential address and payout-related banking details",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-indigo-500 to-violet-600",
      fields: [
        {
          name: "PAN Card",
          key: "pan",
          detail:
            "Required for payments above government regulatory limits and tax documentation.",
        },
        {
          name: "PAN Card Front Side",
          key: "pan_front",
          detail:
            "Used for identity verification during financial approvals and settlements.",
        },
        {
          name: "Aadhar Card Number",
          key: "aadhaar",
          detail:
            "Primary identity proof for hospital onboarding and compliance verification.",
        },
        {
          name: "Aadhar Card Front",
          key: "aadhaar_front",
          detail:
            "Used for KYC and address verification per regulatory requirements.",
        },
        {
          name: "Aadhar Card Back",
          key: "aadhaar_back",
          detail:
            "Contains additional identity details required for full verification.",
        },
        {
          name: "Present Address",
          key: "present_address",
          detail:
            "Displayed to hospitals for verification and home healthcare service requirements.",
        },
        {
          name: "City",
          key: "city",
          detail:
            "Used for hospital mapping and appointment availability based on location.",
        },
        {
          name: "State",
          key: "state",
          detail: "Required for region-based regulations and state medical councils.",
        },
        {
          name: "District",
          key: "district",
          detail:
            "Supports service allocation and on-ground healthcare mapping.",
        },
        {
          name: "Taluka",
          key: "taluka",
          detail:
            "Used for micro-level service accuracy, especially for rural healthcare.",
        },
        {
          name: "Pin Code",
          key: "pincode",
          detail:
            "Required for service area detection for hospitals, labs, and home visits.",
        },
        {
          name: "Bank Name",
          key: "bank_name",
          detail:
            "Required for processing payouts, refunds, and settlements.",
        },
        {
          name: "Bank Account Number",
          key: "account_no",
          detail: "Used for secure and direct payouts for consultations.",
        },
        {
          name: "IFSC Code",
          key: "ifsc",
          detail: "Identifies exact bank branch for accurate money transfers.",
        },
        {
          name: "Account Type",
          key: "account_type",
          detail: "Indicates whether account is savings or current.",
        },
        {
          name: "Cancelled Cheque",
          key: "cancelled_cheque",
          detail:
            "Used to verify bank details and ensure financial compliance.",
        },
        {
          name: "MICR Code",
          key: "micr",
          detail:
            "Used for traditional cheque processing and banking verification.",
        },
      ],
    },
  ]

  const registrationSteps = [
    { number: 1, title: "Start Registration", description: "Doctor selects the 'Doctor Registration' option from login screen." },
    { number: 2, title: "Verify OTP", description: "Enters mobile number and email to complete OTP verification." },
    { number: 3, title: "Enter Personal Details", description: "Fills name, DOB, gender, education and specialty information." },
    { number: 4, title: "Upload Certificates", description: "Adds degree, specialty and registration certificates for verification." },
    { number: 5, title: "Add Professional Settings", description: "Sets consultation fee, discount, online/offline service preferences." },
    { number: 6, title: "Add Address & Banking Details", description: "Adds Aadhar, address, PAN, bank details for payouts." },
    { number: 7, title: "Preview All Details", description: "Reviews all entered information before final submission." },
    { number: 8, title: "Submit & Login", description: "Saves profile and logs into doctor dashboard." },
  ]

  const toggleCategoryExpand = (cat) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }))
  }

  // ---------------------------------------------------------------------
  // UI RETURN
  // ---------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <Link
          href="/main_documentation#roles"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm rounded-lg border border-border hover:bg-accent/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Documentation
        </Link>
      </div>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
          <div className="relative z-50 w-full max-w-4xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h4 className="text-lg font-semibold text-foreground">Doctor Registration Tutorial</h4>
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
                src="/videos/doctor_registration.mp4"
              />
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20 mb-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
          <div>
            <h2 className="text-4xl font-bold">Doctor Profile Registration Flow</h2>
            <p className="text-foreground/60 mt-2">
              Complete onboarding with structured verification & professional details
            </p>
          </div>
        </div>

        {/* Tutorial Button */}
        <div className="mb-10 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Watch Registration Tutorial</h3>
              </div>
              <p className="text-sm text-foreground/70">
                A visual guide explaining doctor profile creation, certificate uploads, and service setup.
              </p>
            </div>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all"
            >
              <Play className="w-4 h-4" />
              Watch Video
            </button>
          </div>
        </div>

        {/* REGISTRATION STEPS */}
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

          {/* CATEGORY CARDS */}
          <div className="space-y-6">
            {doctorRegistrationFields.map((category) => (
              <div key={category.category} className="space-y-0">
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

                      <h3 className="font-semibold text-lg text-foreground">
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
                    {category.fields.map((field, idx) => (
                      <div
                        key={idx}
                        className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all"
                      >
                        <button
                          onClick={() => setExpandedField(expandedField === field.key ? null : field.key)}
                          className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">
                              {field.name}
                            </h4>
                            {expandedField === field.key && (
                              <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                                {field.detail}
                              </p>
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

          {/* REGISTRATION BENEFITS */}
          <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Registration Flow Benefits</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Verified Professional Identity</p>
                  <p className="text-sm text-foreground/60">
                    Builds patient trust and ensures compliance with hospital & platform regulations.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Faster Hospital Approvals</p>
                  <p className="text-sm text-foreground/60">
                    Complete documentation helps hospitals approve doctor profiles quickly.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Enhanced Patient Visibility</p>
                  <p className="text-sm text-foreground/60">
                    Better profiles rank higher in search & increase patient consultations.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Seamless Financial Setup</p>
                  <p className="text-sm text-foreground/60">
                    Enables quick payouts for online & offline consultations.
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
