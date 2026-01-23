"use client"

import { useState } from "react"
import {
  ChevronDown,
  User,
  Stethoscope,
  Hospital,
  Pill,
  FlaskConical,
  HeartPulse,
  Building2,
  HandCoins,
  ShoppingCart,
  Users,
  Shield,
  Ambulance,
  BriefcaseMedical,
  PhoneCall,
  FileText,
  FileCheck,
  DollarSign,
  Play,
  X,
  Cpu,
} from "lucide-react"
import Link from "next/link"
import AiDocsAssistant from "../ai/AiDocsAssistant";

export default function DocumentationPage() {
  const [expandedRole, setExpandedRole] = useState(null)
  const [expandedFeature, setExpandedFeature] = useState(null)
  const [expandedModule, setExpandedModule] = useState(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false) 
  const [expandedCategories, setExpandedCategories] = useState({}) 

  // ================================ //
  //         ROLES DATA              //
  // ================================ //
  const roles = [
    {
      title: "Patient",
      description: "Main healthcare service user accessing bookings & reports",
      icon: <User className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      items: [
        "Account Registration & Login",
        "Health Dashboard Access",
        "Hospital / Doctor / Ambulance / Beds / Diagnostic / Online Consult Booking",
        "Pathology & Home Healthcare Booking",
        "Pharmacy Orders & Delivery Tracking",
        "Medical Documents & Reports Storage",
        "Family Member Health Linking",
        "Payment & Order History",
      ],
    },
    {
      title: "Doctor",
      description: "Consultation provider managing appointments & patient history",
      icon: <Stethoscope className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      items: [
        "Doctor Profile Setup",
        "Appointment Schedule Management",
        "Patient History & Medical Report Access",
        "Upload Prescription & Digital Notes",
        "Hospital / Clinic Visit Schedules",
        "Professional Document Upload",
      ],
    },
    {
      title: "Hospital",
      description: "Healthcare institution managing health services & bookings",
      icon: <Hospital className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-600",
      items: [
        "Hospital Onboarding & Dashboard Access",
        "Departments & Facilities Management",
        "Bed Availability & Surgery Package Management",
        "Appointment & Admission Tracking",
        "Compliance Document Upload",
      ],
    },
    {
      title: "Diagnostic Center",
      description: "Lab providing diagnostic test bookings & report uploads",
      icon: <FlaskConical className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-600",
      items: [
        "Diagnostic Test Listings",
        "Test Booking Confirmation",
        "Upload Test Reports for Patients",
        "Payment & Test History",
      ],
    },
    {
      title: "Pathology",
      description: "Advanced pathology reports & category management",
      icon: <HeartPulse className="w-5 h-5" />,
      color: "from-rose-500 to-red-600",
      items: ["Pathology Test Listing", "Upload Lab Reports for Patients", "Appointment & Test Management"],
    },
    {
      title: "Pharmacy",
      description: "Medicine store offering orders & branch network management",
      icon: <Pill className="w-5 h-5" />,
      color: "from-teal-500 to-cyan-600",
      items: [
        "Pharmacy Profile & Verification",
        "Inventory / Medicine Management",
        "Order Processing & Delivery Status",
        "Pharmacy Branch Network",
        "Pharmacist Staff Management",
      ],
    },
    {
      title: "Home Healthcare",
      description: "Nursing / Physiotherapy / Home Care services",
      icon: <Users className="w-5 h-5" />,
      color: "from-fuchsia-500 to-violet-600",
      items: ["Home Care Service Listings", "Manage Appointments & Home Visits", "Service Completion Reports"],
    },
    {
      title: "Ambulance",
      description: "Emergency / Non-emergency ambulance booking system",
      icon: <Ambulance className="w-5 h-5" />,
      color: "from-red-500 to-orange-600",
      items: ["Ambulance Service Registration", "Driver & Vehicle Management", "Emergency Booking & Dispatch"],
    },
    {
      title: "Corporate Health",
      description: "Corporate wellness & employee health management",
      icon: <Building2 className="w-5 h-5" />,
      color: "from-gray-600 to-slate-700",
      items: [
        "Corporate Company Registration",
        "Employee Health Package Allocation",
        "Health Checkup Reports & Dashboard",
      ],
    },
    {
      title: "Aarogya Dhan (Donation)",
      description: "Crowdfunding for medical emergency treatments",
      icon: <HandCoins className="w-5 h-5" />,
      color: "from-amber-500 to-yellow-600",
      items: ["Donation Campaign Listings", "Donor Registration", "Fund Tracking & Beneficiary Visibility"],
    },
    {
      title: "Aarogya Mart",
      description: "Healthcare product e-commerce & logistics",
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
      items: ["Product Catalog Management", "Add To Cart & Order Tracking", "Seller Dashboard & Analytics"],
    },
    {
  title: "Aarogya Dhan (Patient Fundraising)",
  description: "Create and manage medical emergency fundraising campaigns",
  icon: <HandCoins className="w-5 h-5" />,
  color: "from-red-500 to-rose-600",
  items: [
    "Create Medical Emergency Campaign",
    "Upload Medical Documents & Bills",
    "Track Donations & Fund Progress",
    "Withdraw Funds with Verification",
    "Share Campaign on Social Media",
    "Beneficiary Dashboard & Updates"
  ],
},

    {
      title: "Aarogya Mitra",
      description: "Trained volunteers supporting patients through services",
      icon: <Users className="w-5 h-5" />,
      color: "from-sky-500 to-indigo-600",
      items: ["Volunteer Registration & Dashboard", "Assigned Patient Support", "Activity / Visit Logging"],
    },
    {
      title: "Asha Worker",
      description: "Rural field agent under state health programs",
      icon: <BriefcaseMedical className="w-5 h-5" />,
      color: "from-orange-500 to-red-600",
      items: ["Case Survey & Patient Follow-ups", "Medical Visit Reporting", "Community Health Data Updates"],
    },
    {
      title: "e-Seva",
      description: "Government-supported health facilitation partners",
      icon: <PhoneCall className="w-5 h-5" />,
      color: "from-violet-500 to-purple-600",
      items: ["e-Sevak Registration", "Field Case Allocation", "Support Assistance Logging"],
    },
    {
      title: "Radiologist",
      description: "Tele-radiology reporting system",
      icon: <FileText className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-600",
      items: ["Upload Radiology Reports", "View Patient MRI / CT / X-Ray", "Doctor–Radiologist Case Collaboration"],
    },
   
    {
      title: "Super Admin",
      description: "Full platform control, approvals & analytics",
      icon: <Shield className="w-5 h-5" />,
      color: "from-teal-500 to-emerald-600",
      items: [
        "Master Dashboard & Role Permissions",
        "Approve / Reject All Registrations",
        "Analytics & Reporting Access",
        "Portal Service Management",
      ],
    },
    {
      title: "AI Module",
      description: "Intelligent assistant powering suggestions, automation & smart guidance",
      icon: <Cpu className="w-5 h-5" />, 
      color: "from-indigo-500 to-purple-600",
      items: [
        "AI Health Assistant for Users",
        "Smart Suggestion Engine for Doctors & Services",
        "AI Chat Guidance for Navigation",
        "Auto-Response to Common Queries",
        "Report Summary & Insight Generation",
        "AI-Powered Search Optimization"
      ],
    },

  ]

  // ================================ //
  //        CORE FEATURES             //
  // ================================ //
  const coreFeatures = [
    {
      title: "Booking & Appointments",
      description: "Central booking engine for patients across multiple healthcare services",
      color: "from-blue-500 to-indigo-500",
      items: [
        "Doctor Appointment Booking",
        "Hospital Consultation Booking",
        "Diagnostic Test Booking",
        "Home Healthcare Service Booking",
        "Surgery Package Interest Booking",
        "Appointment Calendar & Rescheduling",
        "Payment History & Invoices",
      ],
    },
    {
      title: "Medical Records & Documents",
      description: "Digital medical storage for seamless healthcare continuity",
      color: "from-emerald-500 to-green-600",
      items: [
        "Upload Prescriptions & Reports",
        "View Hospital / Doctor Uploaded Records",
        "Pathology Report Access",
        "Digital Prescription Viewer",
        "Document Timeline View",
      ],
    },
    {
      title: "Pharmacy & Medicine Orders",
      description: "E-commerce pharmacy services with branch network support",
      color: "from-teal-500 to-cyan-600",
      items: [
        "Search Medicines & Health Supplies",
        "Add to Cart & Checkout Flow",
        "Track Delivery Status",
        "Pharmacy Branch Selection",
        "Invoice & Order History",
      ],
    },
    {
      title: "Emergency & Bed Services",
      description: "Critical care access for time-sensitive healthcare needs",
      color: "from-red-500 to-orange-600",
      items: [
        "Ambulance Booking",
        "Live Dispatch Status",
        "Hospital Bed Availability",
        "ICU / General Ward / Private Room Options",
        "Admission Status Tracking",
      ],
    },
    {
      title: "Corporate Health",
      description: "Organizational health management & employee wellness",
      color: "from-gray-600 to-slate-700",
      items: [
        "Corporate Health Dashboard",
        "Employee Health Packages",
        "Company Wellness Analytics",
        "Customized Screening Packages",
      ],
    },
    {
      title: "Aarogya Dhan (Donation)",
      description: "Medical crowdfunding & donor–beneficiary system",
      color: "from-yellow-500 to-amber-600",
      items: [
        "Create & Manage Medical Campaigns",
        "Make Donations to Patients",
        "Track Fund Impact & Utilization",
        "Photographer Verification Workflow",
      ],
    },
    {
      title: "Aarogya Mart (E-commerce)",
      description: "Healthcare product marketplace for hospitals and users",
      color: "from-green-500 to-emerald-600",
      items: [
        "Product Catalog Management",
        "Featured Products & Offers",
        "Order Checkout & Delivery Tracking",
        "Seller Dashboard & Analytics",
      ],
    },
    {
      title: "Job Aadhar",
      description: "Healthcare recruitment & HR pipeline",
      color: "from-purple-500 to-pink-600",
      items: [
        "Post Job Listings",
        "Apply for Healthcare Jobs",
        "Employer Dashboard Approvals",
        "Candidate Profile Management",
      ],
    },
  ]


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
  <>  
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
     

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

      {/* HEADER WITH LOGO */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img src="/images/logo1.png" alt="Aarogya Aadhar" className="h-10 w-auto" />
          </Link>
          <nav className="flex items-center gap-6 text-sm overflow-x-auto">
            {" "}
            {/* Added overflow-x-auto and whitespace-nowrap */}
            <a href="#roles" className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
              Roles
            </a>
            <a
              href="#features"
              className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap"
            >
              Features
            </a>
            <a
              href="#analytics"
              className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap"
            >
              Analytics
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-16">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold bg-primary/10 border border-primary/20 rounded-full text-primary tracking-widest">
              COMPREHENSIVE DOCUMENTATION
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Aarogya Aadhar
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                Healthcare Ecosystem
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/75 leading-relaxed max-w-2xl">
              Complete documentation of the integrated healthcare platform supporting patient services, healthcare
              provider onboarding, donation systems, e-commerce, job portal, and super admin analytics.
            </p>
          </div>
        </div>
      </section>

          {/* MAIN CONTENT */}
          <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">
            {/* ROLES SECTION */}
      <section id="roles" className="mb-28">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
        <div>
          <h2 className="text-4xl font-bold">User Roles & Access</h2>
          <p className="text-foreground/60 mt-2">17 distinct user types with specialized capabilities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role, idx) => {
          const isExpanded = expandedRole === idx
          return (
            <div
              key={idx}
              className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md backdrop-blur-sm"
            >
          <button
            onClick={() => setExpandedRole(isExpanded ? null : idx)}
            className="w-full px-6 py-5 flex items-start justify-between gap-4 hover:bg-accent/5 transition-colors text-left"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className={`p-2.5 rounded-lg bg-gradient-to-br ${role.color} text-white flex-shrink-0 mt-0.5`}>
                {role.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {role.title}
                </h3>
                <p className="text-sm text-foreground/60 mt-1">{role.description}</p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-foreground/40 flex-shrink-0 mt-1 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded && (
            <div className="px-6 py-4 bg-gradient-to-r from-accent/5 to-transparent border-t border-border">
              <ul className="space-y-3">
                {role.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-foreground/75 group/item hover:text-foreground transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* READ MORE BUTTON */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <Link
                  href={`/main_documentation/roles/${role.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read More →
                </Link>
              </div>
            </div>
           )}
           </div>
              )
            })}
          </div>
        </section>

        {/* CORE FEATURES SECTION */}
        <section id="features" className="mb-28">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-4xl font-bold">Core Healthcare Features</h2>
              <p className="text-foreground/60 mt-2">Centralized patient booking and medical services</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreFeatures.map((feature, idx) => {
              const isExpanded = expandedFeature === idx
              return (
                <div
                  key={idx}
                  className="group rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md backdrop-blur-sm"
                >
                  <button
                    onClick={() => setExpandedFeature(isExpanded ? null : idx)}
                    className="w-full px-6 py-5 flex items-start justify-between gap-4 hover:bg-accent/5 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <div className={`h-1 w-full bg-gradient-to-r ${feature.color} rounded-full mb-4`} />
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-foreground/60 mt-2">{feature.description}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-foreground/40 flex-shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-6 py-4 bg-gradient-to-r from-accent/5 to-transparent border-t border-border">
                      <ul className="space-y-3">
                        {feature.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-foreground/75 group/item hover:text-foreground transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>


        {/* SUPERADMIN ANALYTICS SECTION */}
        <section id="analytics" className="mb-20">
          <div className="rounded-xl border border-border bg-gradient-to-br from-card/80 to-accent/5 p-8 md:p-12 overflow-hidden shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
              <div>
                <h2 className="text-3xl font-bold">Super Admin – Analytics & Permissions</h2>
                <p className="text-foreground/60 mt-2">Centralized monitoring system for platform-wide insights</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "Daily / Monthly / Yearly Healthcare Activity Analytics",
                "User Growth & Engagement Metrics",
                "Hospital / Pharmacy / Doctor Performance Graphs",
                "Trending Services & High-Demand Regions",
                "Approval / Rejection & Verification System",
                "Portal Services Activation / Deactivation Controls",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-foreground/75">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-semibold">⚠ Note: </span>
                Analytics backend integration is in progress — UI and architecture ready for DB connection.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL NOTES */}
        <section className="rounded-xl border border-border bg-gradient-to-br from-accent/5 via-background to-primary/5 p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-3">Platform Architecture Overview</h3>
          <p className="text-foreground/75 leading-relaxed">
            This documentation provides a complete overview of the Aarogya Aadhar Healthcare Ecosystem, including
            patient services, healthcare partner onboarding, donation & e-commerce modules, job portal, and super admin
            analytics. The platform architecture supports large-scale digital healthcare delivery with interoperability
            and multi-role access across 17 distinct user types, ensuring seamless coordination between patients,
            healthcare providers, administrative staff, and support personnel.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border/40 bg-foreground/2 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
            <div>
              <img src="/images/logo1.png" alt="Aarogya Aadhar" className="h-8 w-auto mb-4" />
              <p className="text-sm text-foreground/60">
                Digital healthcare platform connecting patients with providers across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                    Patient Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                    Provider Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                    Admin Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-foreground/60">
            <p>&copy; 2025 Aarogya Aadhar. All rights reserved.</p>
            <p>Healthcare for Everyone, Everywhere</p>
          </div>
        </div>
      </footer>
    </div>
              
     <AiDocsAssistant />
  </>
  )
}
