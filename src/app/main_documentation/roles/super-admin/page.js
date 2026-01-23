"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ShieldCheck,
  Users,
  FileStack,
  PanelsTopLeft,
  BarChart3,
  Play,
  X,
} from "lucide-react"

export default function SuperAdminPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategory = (category) =>
    setExpandedCategory((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))

  // ---------------------------
  // SUPER ADMIN MODULES
  // ---------------------------

  const superAdminModules = [
    {
      category: "Global Platform Controls",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "from-red-500 to-rose-600",
      description:
        "Full control over entire ecosystem, user roles, system configurations & backend settings.",
      fields: [
        {
          name: "Master Dashboard Access",
          key: "master_dashboard",
          detail:
            "Allows Super Admin to view top-level analytics, platform load, activity insights & real-time metrics.",
        },
        {
          name: "Full Database Visibility",
          key: "db_full",
          detail:
            "Access all records including patients, hospitals, doctors, pharmacies, diagnostics & ambulances.",
        },
        {
          name: "Global Search Panel",
          key: "search",
          detail:
            "Search any user, service provider, hospital, product or document instantly across the entire ecosystem.",
        },
      ],
    },
    {
      category: "User & Role Management",
      icon: <Users className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
      description:
        "Super Admin manages onboarding, verification and lifecycle of all 17+ platform roles.",
      fields: [
        {
          name: "Manage All User Roles",
          key: "all_roles",
          detail:
            "Activate, deactivate, update or remove Patients, Doctors, Hospitals, Pharmacies, Mart Stores, Mitras and more.",
        },
        {
          name: "Document & KYC Approval",
          key: "kyc",
          detail:
            "Approve registration certificates, PAN, GST, Aadhaar, medical council proofs & verification papers.",
        },
        {
          name: "Password Reset Authority",
          key: "reset",
          detail:
            "Reset credentials or unlock frozen accounts across any user type.",
        },
      ],
    },
    {
      category: "Operations & Service Oversight",
      icon: <PanelsTopLeft className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
      description:
        "Monitor daily operations across hospitals, doctors, ambulance fleets, diagnostics & home healthcare services.",
      fields: [
        {
          name: "Hospital Operations Monitor",
          key: "ops_hospital",
          detail:
            "View hospital registrations, service availability, bed updates, ambulance mappings & emergency actions.",
        },
        {
          name: "Doctor Activity Overview",
          key: "ops_doctor",
          detail:
            "Monitor doctor status, fees, consultation activity, document updates & availability patterns.",
        },
        {
          name: "Ambulance Response Oversight",
          key: "ops_ambulance",
          detail:
            "Monitor ambulance dispatch, location tracking, response times & backend assignments.",
        },
      ],
    },
    {
      category: "Financial & Compliance Management",
      icon: <FileStack className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      description:
        "Handles settlements, transactions, payouts, tax validation & compliance approvals.",
      fields: [
        {
          name: "Settlement Dashboard",
          key: "settlement",
          detail:
            "Track payouts for pharmacies, hospitals, doctors, diagnostics, Mart stores & healthcare professionals.",
        },
        {
          name: "Tax Compliance Verification",
          key: "tax",
          detail:
            "Validate GST, PAN, invoices, claims & financial documents uploaded by service providers.",
        },
        {
          name: "Revenue Cycle Insights",
          key: "rev",
          detail:
            "Monitor ecosystem revenue, category-wise earnings, settlement cycles & transaction inflow.",
        },
      ],
    },
    {
      category: "Analytics & Reporting",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "from-orange-500 to-yellow-600",
      description:
        "High-level data intelligence for strategic decision-making & growth planning.",
      fields: [
        {
          name: "Live User Analytics",
          key: "analytics_live",
          detail:
            "Real-time user data, heatmaps, high-usage zones, user engagement and growth metrics.",
        },
        {
          name: "Service Utilization Reports",
          key: "analytics_service",
          detail:
            "Detailed insights on doctor bookings, hospital service usage, pharmacy orders & diagnostic reports.",
        },
        {
          name: "State & District Reports",
          key: "analytics_region",
          detail:
            "Generate deep region-wise performance reports for healthcare planning.",
        },
      ],
    },
  ]

  // ---------------------------
  // REGISTRATION STEPS
  // ---------------------------

  const registrationSteps = [
    {
      number: 1,
      title: "Super Admin Invitation",
      description: "Only Founder/Master Admin can assign this highest-level role.",
    },
    {
      number: 2,
      title: "Dual OTP Verification",
      description: "Mobile & email verification for maximum security.",
    },
    {
      number: 3,
      title: "Identity Verification",
      description: "Upload ID proofs & authorization documents.",
    },
    {
      number: 4,
      title: "Region Assignment",
      description: "Access can be global or limited to selected states and districts.",
    },
    {
      number: 5,
      title: "System Orientation",
      description: "Training & guided walkthrough of master dashboard modules.",
    },
    {
      number: 6,
      title: "Privilege Activation",
      description: "Founder grants full or partial Super Admin access.",
    },
    {
      number: 7,
      title: "Security & Compliance",
      description:
        "Training on data privacy, audit logs, access limits & system safety.",
    },
    {
      number: 8,
      title: "Begin Management",
      description:
        "Super Admin gains full operational command over the ecosystem.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">

      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10">
        <Link
          href="/main_documentation#roles"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:bg-accent/10 hover:border-primary/50 transition-all text-sm font-medium"
        >
          ← Back to Documentation
        </Link>
      </div>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsVideoOpen(false)}
          />

          <div className="relative w-full max-w-5xl bg-background border rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold">Super Admin Training Video</h3>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-lg hover:bg-accent/10 text-foreground/60 hover:text-foreground transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-black/30">
              <video
                controls
                className="w-full rounded-lg border border-border/60"
                src="/videos/super_admin_overview.mp4"
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN SECTION */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-20 md:pt-28 mb-28">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
          <div>
            <h1 className="text-4xl font-bold">Super Admin Role Overview</h1>
            <p className="text-foreground/60 mt-2">
              Highest level of access with complete control over the healthcare platform ecosystem.
            </p>
          </div>
        </div>

        {/* VIDEO CARD */}
        <div className="p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Watch Super Admin Overview</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Learn how Super Admin manages the full healthcare ecosystem.
              </p>
            </div>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:scale-105 transition-all"
            >
              <Play className="w-4 h-4" />
              Watch Video
            </button>
          </div>
        </div>

        {/* STEPS */}
        <div className="p-8 rounded-xl border bg-gradient-to-br from-accent/5 via-background to-primary/5 mb-14">
          <h3 className="text-2xl font-bold mb-8">8-Step Super Admin Onboarding</h3>

          <div className="space-y-6">
            {registrationSteps.map((step, idx) => (
              <div key={step.number} className="flex gap-4">
                {/* Number */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow bg-gradient-to-br from-primary to-accent">
                    {step.number}
                  </div>

                  {idx < registrationSteps.length - 1 && (
                    <div className="h-20 w-1 bg-gradient-to-b from-primary to-accent/30" />
                  )}
                </div>

                {/* Details */}
                <div className="pt-1 flex-1">
                  <h4 className="text-lg font-semibold">{step.title}</h4>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY ACCORDIONS */}
        <div className="space-y-8">
          {superAdminModules.map((cat) => (
            <div key={cat.category}>
              <button
                onClick={() => toggleCategory(cat.category)}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  expandedCategory[cat.category]
                    ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5"
                    : "border-border bg-card/30 hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      className={`p-2 mb-3 rounded-lg w-fit text-white bg-gradient-to-br ${cat.color}`}
                    >
                      {cat.icon}
                    </div>

                    <h3 className="text-lg font-semibold">{cat.category}</h3>
                    <p className="text-sm text-foreground/60">{cat.description}</p>
                    <p className="text-xs text-primary mt-2">{cat.fields.length} Permissions</p>
                  </div>

                  <svg
                    className={`w-6 h-6 text-primary transition-transform ${
                      expandedCategory[cat.category] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>

              {expandedCategory[cat.category] && (
                <div className="rounded-b-xl border-2 border-primary border-t-0 p-6 space-y-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                  {cat.fields.map((field) => (
                    <div
                      key={field.key}
                      className="border border-border bg-card/50 hover:border-primary/60 rounded-xl transition"
                    >
                      <button
                        onClick={() =>
                          setExpandedField(
                            expandedField === field.key ? null : field.key
                          )
                        }
                        className="w-full flex justify-between px-6 py-4 text-left"
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
        <div className="mt-12 p-6 rounded-xl border bg-gradient-to-br from-primary/5 via-accent/10 to-transparent">
          <h3 className="text-lg font-semibold mb-4">Super Admin Benefits</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Complete System Oversight",
                desc: "Full visibility of users, services, documents & financial data.",
              },
              {
                title: "Powerful Decision Tools",
                desc: "Access advanced analytics to support strategic decision-making.",
              },
              {
                title: "High-Level Permissions",
                desc: "Control user roles, operations, platform settings & approvals.",
              },
              {
                title: "Ecosystem Integrity",
                desc: "Responsible for platform trust, security architecture & compliance.",
              },
            ].map((b, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-medium">{b.title}</p>
                  <p className="text-sm text-foreground/60">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}

