"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  X,
  Store,
  User,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react"

export default function AarogyaMartPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedField, setExpandedField] = useState(null)

  const toggleCategoryExpand = (category) =>
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))

  // ---------------------------------------
  // REGISTRATION STEPS
  // ---------------------------------------
  const registrationSteps = [
    {
      number: 1,
      title: "Select Aarogya Mart Registration",
      description: "Choose Mart role from the registration menu.",
    },
    {
      number: 2,
      title: "OTP Verification",
      description: "Mobile number & email verification for secure access.",
    },
    {
      number: 3,
      title: "Store Information",
      description:
        "Provide store name, type, certificate details & service timings.",
    },
    {
      number: 4,
      title: "Owner & Contact Details",
      description:
        "Add primary owner details, address & store location mapping.",
    },
    {
      number: 5,
      title: "Upload Documents",
      description:
        "Upload required certificates, ID proof, PAN/GST (optional), and logo.",
    },
    {
      number: 6,
      title: "Product Categories",
      description:
        "Select product types, upload catalog & enable service features.",
    },
    {
      number: 7,
      title: "Bank Information",
      description:
        "Provide bank name, IFSC, account number, and cheque document.",
    },
    {
      number: 8,
      title: "Preview & Submit",
      description:
        "Review your complete profile and submit for approval.",
    },
  ]

  // ---------------------------------------
  // FIELD GROUPS
  // ---------------------------------------
  const martFields = [
    {
      category: "Store Information",
      description: "Basic business details for Mart onboarding",
      icon: <Store className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      fields: [
        { name: "Store Name", key: "store_name", detail: "Official store name used across the platform." },
        { name: "Store Registration Number", key: "store_reg_no", detail: "Government-issued registration number." },
        { name: "Registration Certificate", key: "store_reg_cert", detail: "Mandatory for store verification." },
        { name: "Store Type", key: "store_type", detail: "Medical / Surgical / Pharmacy Accessories / General Mart." },
        { name: "Service Timings", key: "timings", detail: "Operational hours for customer service & delivery." },
        { name: "Service Days in Week", key: "service_days", detail: "Days your store remains operational." },
      ],
    },
    {
      category: "Owner & Contact Details",
      description: "Primary identity & communication details",
      icon: <User className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      fields: [
        { name: "Owner Full Name", key: "owner_name", detail: "Displayed in admin panel for verification." },
        { name: "Mobile Number", key: "mobile", detail: "Primary number for OTP and notifications." },
        { name: "Email ID", key: "email", detail: "Used for order updates and official communication." },
        { name: "Alternate Number", key: "alt_mobile", detail: "Backup communication number." },
        { name: "Store Address", key: "address", detail: "Complete address for mapping & deliveries." },
        { name: "Location (City / State / District / Taluka)", key: "location", detail: "For service mapping & logistics." },
        { name: "Pincode", key: "pincode", detail: "Defines delivery coverage region." },
      ],
    },
    {
      category: "Product & Service Capabilities",
      description: "Items & services offered by the store",
      icon: <ShoppingBag className="w-5 h-5" />,
      color: "from-orange-500 to-yellow-500",
      fields: [
        { name: "Product Categories", key: "product_category", detail: "Medical equipment, surgical items, accessories, etc." },
        { name: "Upload Product Catalog", key: "catalog", detail: "Bulk upload options for store products." },
        { name: "Home Delivery Availability", key: "delivery", detail: "Enable if your store supports home delivery." },
        { name: "Online Store Integration", key: "online_service", detail: "Display your products on Aarogya Mart app." },
      ],
    },
    {
      category: "Bank & Verification Documents",
      description: "Account verification for payouts",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600",
      fields: [
        { name: "Bank Name", key: "bank_name", detail: "Used for settlement payouts." },
        { name: "Account Number", key: "account_number", detail: "Must match provided proof document." },
        { name: "IFSC Code", key: "ifsc", detail: "Identifies your bank branch." },
        { name: "Account Type", key: "account_type", detail: "Savings / Current" },
        { name: "Cancelled Cheque", key: "cancelled_cheque", detail: "Used to verify bank details." },
        { name: "PAN Card / GST", key: "pan_gst", detail: "Optional, used for tax and compliance." },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      
      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-10">
        <Link
          href="/main_documentation#roles"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/60 hover:bg-accent/10 transition-all text-sm font-medium text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Documentation
        </Link>
      </div>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsVideoOpen(false)} />
          <div className="relative max-w-4xl w-full bg-background rounded-xl shadow-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h4 className="text-lg font-semibold">Aarogya Mart Registration Tutorial</h4>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-lg hover:bg-accent/20 text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-black/30">
              <video className="w-full rounded-lg border border-border/50" controls src="/videos/aarogya_mart_registration.mp4" />
            </div>
          </div>
        </div>
      )}

      {/* MAIN SECTION */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-24 mb-28">
        
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
          <div>
            <h2 className="text-4xl font-bold">Aarogya Mart Registration Flow</h2>
            <p className="text-foreground/60 mt-2">
              Complete onboarding to become an official Aarogya Mart seller.
            </p>
          </div>
        </div>

        {/* VIDEO CARD */}
        <div className="mb-8 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Watch Registration Tutorial</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Learn how to register, verify your store & start selling.
              </p>
            </div>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-white hover:scale-105 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4" /> Watch Video
            </button>
          </div>
        </div>

        {/* STEPS TIMELINE */}
        <div className="mb-12 p-8 rounded-xl border border-border/50 bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <h3 className="font-bold text-2xl mb-8">8-Step Registration Process</h3>

          <div className="space-y-4">
            {registrationSteps.map((step, idx) => (
              <div key={step.number} className="flex gap-4">
                
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold shadow">
                    {step.number}
                  </div>
                  {idx < registrationSteps.length - 1 && (
                    <div className="h-20 w-1 bg-gradient-to-b from-primary to-accent/30" />
                  )}
                </div>

                <div className="pt-2 pb-4 flex-1">
                  <h4 className="font-semibold text-lg">{step.title}</h4>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="space-y-6">
          {martFields.map((category) => (
            <div key={category.category}>
              <button
                onClick={() => toggleCategoryExpand(category.category)}
                className={`w-full p-6 rounded-t-xl border-2 transition-all duration-300 text-left group ${
                  expandedCategories[category.category]
                    ? "border-primary bg-gradient-to-br from-primary/10 to-accent/5"
                    : "border-border hover:border-primary/50 bg-card/30 hover:bg-card/50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className={`p-2 rounded-lg mb-3 w-fit bg-gradient-to-br ${category.color} text-white`}>
                      {category.icon}
                    </div>

                    <h3 className="font-semibold text-lg">{category.category}</h3>
                    <p className="text-sm text-foreground/60">{category.description}</p>
                    <p className="text-xs font-bold text-primary mt-2">{category.fields.length} Fields</p>
                  </div>

                  <svg
                    className={`w-6 h-6 text-primary transition-transform ${
                      expandedCategories[category.category] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>

              {/* FIELD LIST */}
              {expandedCategories[category.category] && (
                <div className="border-2 border-primary border-t-0 rounded-b-xl p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5 space-y-4">
                  {category.fields.map((field) => (
                    <div
                      key={field.key}
                      className="border border-border bg-card/50 rounded-xl hover:bg-card hover:border-primary/60 transition-all"
                    >
                      <button
                        onClick={() =>
                          setExpandedField(expandedField === field.key ? null : field.key)
                        }
                        className="w-full px-6 py-4 flex justify-between text-left"
                      >
                        <span className="font-medium">{field.name}</span>
                        <svg
                          className={`w-5 h-5 text-primary transition-transform ${
                            expandedField === field.key ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
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
        <div className="mt-12 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 via-accent/10">
          <h3 className="font-semibold text-lg mb-4">Registration Flow Benefits</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Instant Marketplace Access",
                desc: "Reach thousands of users looking for medical supplies.",
              },
              {
                title: "Verified Seller Badge",
                desc: "Provides trust & credibility to your Mart store.",
              },
              {
                title: "Fast & Secure Payments",
                desc: "Automated payout system with verified bank details.",
              },
              {
                title: "Higher Order Visibility",
                desc: "Optimize product reach through platform-level promotion.",
              },
            ].map((b, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
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
