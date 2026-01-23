"use client"

import { useState } from "react"
import { ChevronDown, Users, Layers, BarChart3, Settings, FileText, Zap, Shield } from "lucide-react"

/**
 * @typedef {Object} SectionItem
 * @property {string} title
 * @property {string} description
 * @property {string[]} items
 * @property {React.ReactNode} icon
 * @property {string} color
 */

export default function DocumentationPage() {
  const [expandedSection, setExpandedSection] = useState(null)

  const roles = [
    {
      title: "Blogger",
      description: "Content creators managing personal blogs and engagement",
      icon: <FileText className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      items: [
        "Signup & Login (MongoDB Connected)",
        "Personal Blogger Dashboard",
        "Create, Edit & Delete Blogs",
        "Publish / Unpublish Blogs",
        "Feature Blog for highlighting",
        "Comment Management (Replies / Moderation)",
        "Profile Settings (photo, bio, social links)",
      ],
    },
    {
      title: "Admin",
      description: "Platform moderators handling content and categories",
      icon: <Settings className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      items: [
        "Admin Login & Signup",
        "Approve or Reject Submitted Blogs",
        "Manage Categories & Tags",
        "View / Edit Published Blogs",
        "Monitor Bloggers Activity",
        "Profile Settings & Account Controls",
      ],
    },
    {
      title: "Super Admin",
      description: "Full platform oversight with analytics and management",
      icon: <Shield className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-500",
      items: [
        "Super Admin Login (Dropdown Navigation)",
        "Full Access to Platform Admin Controls",
        "Manage Admins & Bloggers",
        "Access Analytics Dashboard",
        "Daily / Monthly / Yearly Engagement Stats",
        "Performance Tracking for All Categories",
        "⚠️ Analytics UI created but not DB-connected yet",
      ],
    },
  ]

  const features = [
    {
      title: "Dashboard",
      description: "Personalized analytics and performance tracking",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      items: [
        "Personal dashboard layout",
        "Blog performance tracking",
        "Category-based analytics",
        "Blogs moderation status",
      ],
    },
    {
      title: "Blog Management",
      description: "Comprehensive content creation and publishing tools",
      icon: <FileText className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-500",
      items: [
        "Create blog via Rich Text Editor",
        "Add featured images",
        "Select categories & tags",
        "Edit / Update existing blogs",
        "Publish / Unpublish toggle",
        "Feature blog option",
      ],
    },
    {
      title: "Comments & Replies",
      description: "Interactive community engagement system",
      icon: <Zap className="w-5 h-5" />,
      color: "from-pink-500 to-rose-500",
      items: [
        "Post comment (DB connected)",
        "Reply to comments (DB connected)",
        "Nested threaded replies",
        "Live update from MongoDB",
        "UI optimized for readability",
      ],
    },
    {
      title: "Profile Settings",
      description: "User account and privacy management",
      icon: <Users className="w-5 h-5" />,
      color: "from-violet-500 to-purple-500",
      items: ["Update profile picture", "Edit name, bio & social links", "Change password", "Manage privacy settings"],
    },
  ]

  const uiModules = [
    {
      title: "Navbar",
      description: "Main navigation with role-based dropdown menus",
      icon: <Layers className="w-5 h-5" />,
      color: "bg-gradient-to-r from-slate-600 to-slate-700",
      items: [
        "Glassmorphism UI with blur effect",
        "Login dropdown → Admin / Blogger / Super Admin",
        "Register dropdown → Admin / Blogger",
        "Integrated search bar",
        "Responsive mobile navigation",
      ],
    },
    {
      title: "Hero Section",
      description: "Eye-catching landing section with CTAs",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      items: [
        "Smooth gradient background",
        "Floating bubbles animation",
        "CTA buttons",
        "Professionally balanced spacing",
      ],
    },
    {
      title: "Search & Filters",
      description: "Content discovery and filtering system",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      items: [
        "Search blogs (MongoDB connected)",
        "Category-based filter system",
        "Trending Topics UI",
        "Real-time updated suggestions",
      ],
    },
    {
      title: "Subscribe & Footer",
      description: "Email subscription and footer navigation",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      items: [
        "Fully functional subscribe form UI",
        "Success message animation",
        "Footer with all company info",
        "Social media icons (lucide-react)",
      ],
    },
  ]

  const ExpandableSection = ({ section, items, index }) => {
    const isExpanded = expandedSection === `${section.title}-${index}`
    const sectionId = `${section.title}-${index}`

    return (
      <div
        key={sectionId}
        className="group rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
      >
        <button
          onClick={() => setExpandedSection(isExpanded ? null : sectionId)}
          className="w-full px-6 py-5 flex items-start justify-between gap-4 hover:bg-accent/5 transition-colors"
        >
          <div className="flex items-start gap-4 flex-1 text-left">
            <div className={`p-2.5 rounded-lg bg-gradient-to-br ${section.color} text-white flex-shrink-0 mt-0.5`}>
              {section.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {section.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {isExpanded && (
          <div className="px-6 py-4 bg-accent/3 border-t border-border">
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-foreground/80 group/item hover:text-foreground transition-colors"
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
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Documentation</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              Aarogya Insights
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                Project Documentation
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Complete technical documentation covering roles, features, UI modules, database connectivity, and
              analytics for the healthcare blog platform.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        {/* User Roles Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-3xl font-bold">User Roles Overview</h2>
              <p className="text-muted-foreground mt-2">
                Three-tier role-based access control system with specialized features for each role
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {roles.map((role, idx) => (
              <ExpandableSection key={idx} section={role} items={roles} index={idx} />
            ))}
          </div>
        </section>

        {/* Core Features Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-accent to-primary rounded-full" />
            <div>
              <h2 className="text-3xl font-bold">Core Features</h2>
              <p className="text-muted-foreground mt-2">
                Essential functionality available across dashboards and user types
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <ExpandableSection key={idx} section={feature} items={features} index={idx} />
            ))}
          </div>
        </section>

        {/* Frontend UI Modules Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-3xl font-bold">Frontend UI Modules</h2>
              <p className="text-muted-foreground mt-2">
                Interactive UI components designed for optimal user experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uiModules.map((module, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                <div className="h-2 w-full" style={{ background: module.color }} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className={`p-2.5 rounded-lg ${module.color} text-white`}>{module.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                  <ul className="space-y-2">
                    {module.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground/75">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Analytics Dashboard Section */}
        <section className="mb-20">
          <div className="rounded-xl border border-border bg-card p-8 overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Super Admin Analytics Dashboard</h3>
                  <p className="text-muted-foreground mt-2">
                    High-level analytics system designed for platform monitoring and insights
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
              {[
                "Daily Views & Engagement Chart",
                "Monthly Category Engagement",
                "Year-wise Engagement Analytics",
                "Trending Articles Overview",
                "Top Performing Blogs Module",
                "Complete Blog Stats Table",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-semibold">⚠️ Note:</span> Analytics UI created but not database-connected yet.
                Integration planned for upcoming release.
              </p>
            </div>
          </div>
        </section>

        {/* Final Notes */}
        <section className="rounded-xl border border-border bg-gradient-to-br from-accent/5 via-background to-primary/5 p-8">
          <h3 className="text-2xl font-bold mb-3">Development Status</h3>
          <p className="text-foreground/80 leading-relaxed">
            This comprehensive documentation covers all implemented features across UI, workflows, user dashboards, blog
            system, and admin modules. Database-connected and UI-only features are clearly marked. Regular updates and
            backend integrations will follow in upcoming development phases.
          </p>
        </section>
      </main>
    </div>
  )
}
