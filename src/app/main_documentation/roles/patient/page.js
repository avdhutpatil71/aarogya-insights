"use client"
import { useState } from "react"
import { User, FileCheck, DollarSign, Play ,X,ArrowLeft} from "lucide-react"
import Link from "next/link"

export default function PatientDocumentationPage() {
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

    const patientRegistrationFields = [
    {
      category: "Personal Information",
      description: "Core identity and demographic details",
      icon: <User className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      fields: [
        {
          name: "Mobile Number",
          key: "mobile",
          detail:
            "Used for login, OTP verification, booking updates, and emergency communication. Ensures the platform can reach the patient quickly.",
        },
        {
          name: "Email ID",
          key: "email",
          detail:
            "Required for secure login, password recovery, receiving reports, invoices, and important notifications from hospitals and doctors.",
        },
        {
          name: "PIN Code",
          key: "pincode",
          detail:
            "Helps the system detect the patient's serviceable area for hospital search, ambulance availability, home healthcare, and pharmacy delivery.",
        },
        {
          name: "First Name",
          key: "first_name",
          detail:
            "Primary identifier used in all medical records, prescriptions, and communication. Must match identity documents wherever possible.",
        },
        {
          name: "Middle Name",
          key: "middle_name",
          detail:
            "Optional field that helps maintain full legal name consistency with government IDs and medical documents.",
        },
        {
          name: "Last Name",
          key: "last_name",
          detail:
            "Important for legal identity, billing, and medical record accuracy, especially when multiple patients share similar first names.",
        },
        {
          name: "Date of Birth",
          key: "dob",
          detail:
            "Used for age-based treatment decisions, eligibility for health schemes, pediatrics / senior care, and clinical risk calculations.",
        },
        {
          name: "Gender",
          key: "gender",
          detail:
            "Helps suggest appropriate doctors, specialties, and enables gender-specific medical protocols and analytics.",
        },
        {
          name: "Blood Group",
          key: "blood_group",
          detail:
            "Critical in emergencies, surgeries, and transfusion planning. Allows faster decision-making during life-saving procedures.",
        },
        {
          name: "Religion",
          key: "religion",
          detail:
            "Helps respect cultural and religious preferences in treatment, diet, end-of-life care, and counseling where applicable.",
        },
        {
          name: "Present Address",
          key: "present_address",
          detail:
            "Used for ambulance pickup, home healthcare visits, and accurate mapping of nearest hospitals and services.",
        },
        {
          name: "Permanent Address",
          key: "permanent_address",
          detail:
            "Used for long-term records, insurance documentation, official correspondence, and background verification if needed.",
        },
        {
          name: "Alternate Mobile Number",
          key: "alt_mobile",
          detail:
            "Allows the platform or hospital to reach a family member / caretaker in case the primary number is unavailable.",
        },
        {
          name: "City",
          key: "city",
          detail:
            "Supports location-based hospital search, appointment availability, and on-ground health program mapping.",
        },
        {
          name: "State",
          key: "state",
          detail: "Important for regional healthcare regulations, state schemes like Ayushman, and location analytics.",
        },
        {
          name: "District",
          key: "district",
          detail: "Used to route services, map blood banks, ambulance coverage, and diagnostic center availability.",
        },
        {
          name: "Taluka",
          key: "taluka",
          detail: "Supports micro-level mapping of rural / semi-urban healthcare access and field worker coordination.",
        },
        {
          name: "Marital Status",
          key: "marital_status",
          detail: "Helps in counseling, maternity-related planning, and family health risk assessment in some cases.",
        },
        {
          name: "Education Level",
          key: "education",
          detail: "Useful for communication style, health literacy programs, and targeted health awareness campaigns.",
        },
        {
          name: "Occupation",
          key: "occupation",
          detail:
            "Helps identify occupational risk factors (e.g., industrial exposure, sedentary lifestyle) and corporate health program eligibility.",
        },
      ],
    },
    {
      category: "Documents & Health Cards",
      description: "Identity verification and health scheme documentation",
      icon: <FileCheck className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      fields: [
        {
          name: "Aadhaar Card Number",
          key: "aadhaar",
          detail:
            "Primary government identity used for eKYC, insurance, Ayushman verification, and avoiding duplicate patient records.",
        },
        {
          name: "Aadhaar Card Front",
          key: "aadhaar_front",
          detail:
            "Required for visual verification of identity, address, and government-issued details during hospital or scheme onboarding.",
        },
        {
          name: "Aadhaar Card Back",
          key: "aadhaar_back",
          detail:
            "Contains additional Aadhaar details and is used to complete identity verification and compliance requirements.",
        },        {
          name: "PAN Card",
          key: "pan",
          detail:
            "Required for payments above government regulatory limits and tax documentation.",
        },
        {
          name: "ABHA Card",
          key: "abha",
          detail:
            "ABHA (Ayushman Bharat Health Account) enables interoperability of medical records across hospitals and healthcare providers.",
        },
        {
          name: "Health Insurance",
          key: "insurance",
          detail:
            "Confirms if patient is covered by private or corporate insurance and supports faster cashless or reimbursement workflows.",
        },
        {
          name: "Ayushman Bharat Card",
          key: "ayushman",
          detail: "Used for government-funded treatment eligibility checks under Ayushman Bharat and related schemes.",
        },
        {
          name: "Ration Card",
          key: "ration_card",
          detail:
            "Supports socio-economic profiling, government benefit eligibility, and subsidized health scheme mapping.",
        },
        {
          name: "Organ Donation Interest",
          key: "organ_donation",
          detail:
            "Captures consent interest for organ donation and helps hospitals and NGOs with ethical and legal follow-up where applicable.",
        },
        {
          name: "eKYC Document",
          key: "ekyc",
          detail:
            "Additional digital KYC document supporting identity validation for banking, insurance, and corporate health programs.",
        },
      ],
    },
    {
      category: "Bank & Additional Details",
      description: "Financial and emergency contact information",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      fields: [
        {
          name: "Profile Photo",
          key: "photo",
          detail:
            "Used across dashboards, appointments, and records to visually identify the patient and avoid profile mixups.",
        },
        {
          name: "Bank Name",
          key: "bank_name",
          detail:
            "Required for financial transactions, refunds, donation transfers, and scheme disbursements where applicable.",
        },
        {
          name: "Bank Account Number",
          key: "account_number",
          detail:
            "Used for direct benefit transfer (DBT), refunds, claim settlements, and financial aid under Aarogya Dhan or schemes.",
        },
        {
          name: "IFSC Code",
          key: "ifsc",
          detail: "Identifies the exact bank branch to ensure accurate and secure fund transfers and settlements.",
        },
        {
          name: "Account Type",
          key: "account_type",
          detail:
            "Specifies whether the account is Savings / Current, which is often required for banking validations and payouts.",
        },
        {
          name: "Cancelled Cheque",
          key: "cancelled_cheque",
          detail:
            "Used by finance teams to confirm account ownership and verify that the account details match patient's identity.",
        },
        {
          name: "MICR Code",
          key: "micr",
          detail:
            "Bank-specific code to support traditional clearing processes and some verification workflows where required.",
        },
        {
          name: "Income Certificate",
          key: "income_certificate",
          detail: "Supports eligibility checks for government subsidies, concessions, and low-income health schemes.",
        },
        {
          name: "Contact Person Name",
          key: "contact_name",
          detail:
            "Name of guardian / family member / caretaker who can be reached in case of emergency or medical decisions.",
        },
        {
          name: "Contact Person Relation",
          key: "contact_relation",
          detail:
            "Helps doctors and hospitals understand relation (parent, spouse, sibling, guardian) for consent and discussions.",
        },
        {
          name: "Contact Person Mobile",
          key: "contact_mobile",
          detail:
            "Emergency contact number used when patient is unreachable or critical decisions need to be communicated.",
        },
        {
          name: "PAN Card Status",
          key: "pan_status",
          detail:
            "Helps with high-value transactions, donations, corporate billing, and regulatory compliance in some cases.",
        },
        {
          name: "Company Registered",
          key: "company_registered",
          detail:
            "Identifies if the patient is associated with any registered business to support corporate health tie-ups and benefits.",
        },
      ],
    },
  ]

  const registrationSteps = [
    {
      number: 1,
      title: "Select Registration Option",
      description: "User opens Aarogya Aadhar and selects the Patient registration option.",
    },
    {
      number: 2,
      title: "OTP Verification",
      description: "Enters mobile number, email ID, and receives OTP for verification.",
    },
    {
      number: 3,
      title: "Personal Information",
      description: "Fills Personal Information including name, DOB, gender, blood group and address.",
    },
    {
      number: 4,
      title: "Documents & Health Cards",
      description: "Moves to Documents & Health Cards step to add Aadhaar, ABHA, insurance and related details.",
    },
    {
      number: 5,
      title: "Bank & Additional Details",
      description: "Completes Bank & Additional Details such as bank account, IFSC, contact person and PAN status.",
    },
    {
      number: 6,
      title: "Upload Documents",
      description: 'Uploads any required documents and reviews all information on the "Preview & Submit" screen.',
    },
    {
      number: 7,
      title: "Submit & Login",
      description: "Submits the registration and logs in using the verified credentials.",
    },
    {
      number: 8,
      title: "Start Using Platform",
      description:
        "Once logged in, the patient can update profile further and start using booking and service modules.",
    },
  ]


  const toggleCategoryExpand = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
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

                  {/* VIDEO MODAL OVERLAY */}
                  {isVideoOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
                      <div className="relative z-50 w-full max-w-4xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                          <h4 className="text-lg font-semibold text-foreground">Patient Registration Tutorial</h4>
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
                            src="/videos/patient_registration.mp4"
                          />
                          <p className="text-xs text-foreground/60 mt-3">
                            💡 <strong>Tip:</strong> Replace{" "}
                            <code className="bg-foreground/10 px-2 py-1 rounded">/videos/patient_registration.mp4</code> with your
                            actual screen recording or tutorial video.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
            
        <section id="registration" className="mb-28 pt-16 md:pt-24 lg:pt-24">
            <div className="max-w-6xl mx-auto px-6 md:px-10">

          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-4xl font-bold">Patient Profile Registration Flow</h2>
              <p className="text-foreground/60 mt-2">
                Complete onboarding with 43 structured fields across 3 categories
              </p>
            </div>
          </div>

          {/* VIDEO TUTORIAL CARD */}
          <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Watch Registration Tutorial</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Visual walkthrough of the complete patient registration process, field explanations, and profile setup
                  on the live platform.
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

          {/* Step-by-step Registration Flow */}
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

            {/* Fields Display */}
            {/* Patient Registration Cards with Expandable Fields */}
            <div className="space-y-6">
              {patientRegistrationFields.map((category) => (
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

                  {/* Expandable Fields */}
                  {expandedCategories[category.category] && (
                    <div className="rounded-b-xl border-2 border-t-0 border-primary bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 space-y-3">
                      {category.fields.map((field, idx) => (
                        <div
                          key={idx}
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

            {/* Registration Flow Info */}
            <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Registration Flow Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Comprehensive Health Profiling</p>
                    <p className="text-sm text-foreground/60">
                      All patient data in one secure place for better healthcare decisions
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Government Scheme Eligibility</p>
                    <p className="text-sm text-foreground/60">
                      Ayushman Bharat, state programs, and subsidized healthcare access
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Emergency Preparedness</p>
                    <p className="text-sm text-foreground/60">
                      Critical information like blood group and emergency contacts always available
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Seamless Financial Integration</p>
                    <p className="text-sm text-foreground/60">
                      Direct benefit transfers, refunds, and insurance claim processing
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
