"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  X,
  Building2,
  FileCheck,
  DollarSign,
  ChevronDown,
} from "lucide-react"

export default function HospitalDocumentationPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  // ---------------------------
  // Hospital field definitions
  // ---------------------------
  const hospitalRegistrationFields = [
    {
      category: "Basic Information & Services",
      description: "Core HSP identity, offered services and quick-contact fields",
      icon: <Building2 className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      fields: [
        {
          name: "Mobile Number",
          key: "mobile",
          detail:
            "Primary contact for HSP account verification, OTP, and urgent communication with platform / patients.",
        },
        {
          name: "Email ID",
          key: "email",
          detail:
            "Used for admin login, notifications, invoices, and official communication with Aarogya Aadhar.",
        },
        {
          name: "HSP Registration Name",
          key: "hsp_reg_name",
          detail:
            "Legal name used for registration, contracts, and compliance filings.",
        },
        {
          name: "HSP Category",
          key: "hsp_category",
          detail:
            "Categorizes facility (Hospital, Clinic, Nursing Home) to surface correct services to patients.",
        },
        {
          name: "HSP Registration Number",
          key: "hsp_reg_no",
          detail:
            "Official registration number used for verification with local health authorities.",
        },
        {
          name: "Online Consultation",
          key: "online_consultation",
          detail:
            "Indicates whether the hospital offers tele-consultation services to patients.",
        },
        {
          name: "Home Healthcare",
          key: "home_healthcare",
          detail:
            "Specifies whether the HSP provides in-home nursing or physiotherapy services.",
        },
        {
          name: "Total Ambulance",
          key: "total_ambulance",
          detail:
            "Number of ambulances available — used for emergency allocation and operational dashboards.",
        },
        {
          name: "Pharmacy / Pathology / Diagnostic Services",
          key: "other_services",
          detail:
            "Flag fields indicating if the HSP has in-house pharmacy, pathology labs, or diagnostic services.",
        },
        {
          name: "Cashless Services / Government Schemes",
          key: "cashless_schemes",
          detail:
            "Shows whether hospital supports cashless billing and government-funded healthcare schemes.",
        },
        {
          name: "In-House Canteen",
          key: "canteen",
          detail: "Indicates facility amenities useful for patient & visitor experience.",
        },
      ],
    },
    {
      category: "Certificates, Approvals & Legal",
      description: "Documents used for compliance, accreditation and trust-building",
      icon: <FileCheck className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      fields: [
        {
          name: "HSP Logo",
          key: "logo",
          detail:
            "Branding image shown on listings and hospital profile — increases discoverability.",
        },
        {
          name: "HSP Registration Certificate",
          key: "reg_certificate",
          detail:
            "Primary legal proof of establishment which platform uses to verify authenticity.",
        },
        {
          name: "HSP Registration Date",
          key: "reg_date",
          detail: "Date when the HSP was legally registered — used for credibility metrics.",
        },
        {
          name: "NABH / NABL Approval & Certificate",
          key: "nabh_nabl",
          detail:
            "Accreditation details that indicate quality standards; shown prominently to patients.",
        },
        {
          name: "PAN Card & PAN Upload",
          key: "pan",
          detail:
            "Used for taxation, payments, and high-value transaction compliance for the institution.",
        },
        {
          name: "ISO Approval",
          key: "iso",
          detail:
            "Optional quality certification used to highlight international standards compliance.",
        },
      ],
    },
    {
      category: "Banking & Finance",
      description: "Payment, payout and financial contact details for settlements",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      fields: [
        {
          name: "Bank Name",
          key: "bank_name",
          detail: "Bank where payouts and reimbursements will be processed.",
        },
        {
          name: "Bank Account Number",
          key: "account_no",
          detail:
            "Used to transfer refunds, insurance settlements, and vendor payments directly to the HSP.",
        },
        {
          name: "IFSC Code",
          key: "ifsc",
          detail: "Identifies bank branch to ensure correct NEFT/RTGS transfers.",
        },
        {
          name: "Account Type",
          key: "account_type",
          detail: "Specifies whether account is Current or Savings for banking workflows.",
        },
        {
          name: "Cancelled Cheque",
          key: "cancelled_cheque",
          detail:
            "Verification document used to confirm account ownership and bank details.",
        },
        {
          name: "MICR Code",
          key: "micr",
          detail:
            "Optional code used for traditional cheque clearing and some verification flows.",
        },
      ],
    },
    {
      category: "Address & Management Contacts",
      description: "Location, reception & managerial contacts for operational needs",
      icon: <Building2 className="w-5 h-5" />,
      color: "from-indigo-500 to-violet-600",
      fields: [
        {
          name: "HSP Full Address",
          key: "address",
          detail:
            "Complete address used for mapping, ambulance routing and home healthcare coverage.",
        },
        {
          name: "City / State / District / Taluka / Pin Code",
          key: "location",
          detail:
            "Granular location fields that help determine patient accessibility and regional statistics.",
        },
        {
          name: "Reception Contact No. 1 / 2 & Email",
          key: "reception_contacts",
          detail:
            "Primary contact points for patient coordination, appointment scheduling and emergencies.",
        },
        {
          name: "Manager Full Name / Contact / Email",
          key: "manager",
          detail:
            "Escalation contact for operations, vendor coordination and compliance queries.",
        },
        {
          name: "Admin Full Name / Contact / Email",
          key: "admin",
          detail:
            "Administrative contact for billing, partnership and higher-level account actions.",
        },
        {
          name: "Escalation Matrix (Download / Upload)",
          key: "escalation_matrix",
          detail:
            "Structured escalation sheet used by platform & HSP to resolve operational issues quickly.",
        },
        {
          name: "Alternate Number",
          key: "alternate_number",
          detail: "Fallback contact number for urgent communication.",
        },
      ],
    },
  ]

  const registrationSteps = [
    {
      number: 1,
      title: "Select HSP Registration",
      description: "Choose 'Hospital / HSP Registration' on Aarogya Aadhar onboarding screen.",
    },
    {
      number: 2,
      title: "OTP & Email Verification",
      description: "Verify mobile and email to secure the account and enable notifications.",
    },
    {
      number: 3,
      title: "Basic Info & Services",
      description: "Provide HSP name, category, service flags (ambulance, pathology, pharmacy).",
    },
    {
      number: 4,
      title: "Upload Approvals & Certificates",
      description: "Attach registration certificate, NABH/NABL, PAN and other legal docs.",
    },
    {
      number: 5,
      title: "Add Banking & Financial Details",
      description: "Add bank account, IFSC, cancelled cheque for payouts and settlements.",
    },
    {
      number: 6,
      title: "Address & Contact Setup",
      description: "Provide full address, manager & reception contact details, escalation sheet.",
    },
    {
      number: 7,
      title: "Preview & Compliance Check",
      description: "Review submitted data, platform triggers compliance verification steps.",
    },
    {
      number: 8,
      title: "Submit & Onboard",
      description: "Submit registration and await verification; approved HSP gets dashboard access.",
    },
  ]

  const toggleCategoryExpand = (cat) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }))
  }

  // ---------------------------
  // UI return
  // ---------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <Link
          href="/main_documentation"
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
              <h4 className="text-lg font-semibold text-foreground">Hospital Registration Tutorial</h4>
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
                src="/videos/hospital_registration.mp4"
              />
              <p className="text-xs text-foreground/60 mt-3">
                💡 <strong>Tip:</strong> Replace <code className="bg-foreground/10 px-2 py-1 rounded">/videos/hospital_registration.mp4</code> with your
                actual tutorial file if needed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER + CONTENT CONTAINER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 lg:pt-32 mb-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
          <div>
            <h2 className="text-4xl font-bold">Hospital (HSP) Registration Flow</h2>
            <p className="text-foreground/60 mt-2">
              Onboarding flow and required fields for hospitals, diagnostic centers and multi-service HSPs.
            </p>
          </div>
        </div>

        {/* VIDEO CARD */}
        <div className="mb-10 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Watch Hospital Registration Tutorial</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Visual guide to registering hospitals, uploading certificates and setting up services.
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
            {hospitalRegistrationFields.map((category) => (
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
                      <ChevronDown className={`w-6 h-6`} />
                    </div>
                  </div>
                </button>

                {expandedCategories[category.category] && (
                  <div className="rounded-b-xl border-2 border-t-0 border-primary bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                    {category.fields.map((field, idx) => (
                      <div
                        key={idx}
                        className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all p-0 overflow-hidden"
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

                          <ChevronDown
                            className={`w-5 h-5 text-primary transition-transform ${
                              expandedField === field.key ? "rotate-180" : ""
                            }`}
                          />
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
                  <p className="font-medium text-foreground">Regulatory Compliance</p>
                  <p className="text-sm text-foreground/60">
                    Complete document capture ensures the HSP complies with legal and healthcare standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Faster Onboarding</p>
                  <p className="text-sm text-foreground/60">
                    Proper documentation reduces verification cycles and accelerates dashboard access.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Operational Readiness</p>
                  <p className="text-sm text-foreground/60">
                    Configuring services like ambulance, pharmacy and diagnostics enables immediate patient servicing.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium text-foreground">Secure Financial Settlement</p>
                  <p className="text-sm text-foreground/60">
                    Bank and PAN verification prepare the HSP for fast and compliant payouts.
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
