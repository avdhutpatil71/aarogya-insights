'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import ProfileDropdown from "./ProfileDropdown"

export default function Navbar({ variant = 'default' }) {
  const { data: session } = useSession()
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Simplified navbar for blog posts
  if (variant === 'blog') {
    return (
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Left Side - Logo Only */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image 
                    src="/images/logo1.png" 
                    alt="LIVO AAROGYA AADHAR™ Logo" 
                    width={120} 
                    height={120}
                    className="relative w-24 h-auto md:w-28 md:h-auto group-hover:scale-110 group-hover:brightness-110 transition-all duration-500 group-hover:drop-shadow-xl"
                  />
                </div>
              </Link>
            </div>

            {/* Right Side - User Profile Only */}
            <div className="flex items-center">
              {session ? (
                <ProfileDropdown />
              ) : (
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="font-medium text-gray-900">Guest</p>
                    <p className="text-gray-500">Not logged in</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
<nav
  className={`sticky top-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "backdrop-blur-2xl bg-white/10 border-b border-white/20 shadow-lg"
      : "backdrop-blur-xl bg-white/5"
  }`}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">

      {/* LEFT: LOGO */}
      <Link href="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <Image
            src="/images/logo1.png"
            alt="Aarogya Logo"
            width={110}
            height={50}
            className="w-28 h-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-xl"
          />
        </div>
      </Link>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:flex items-center gap-8">

        {/* Articles */}
        <button
          onClick={() => (window.location.href = "/#recent-articles")}
          className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          Articles
        </button>

        {/* Subscribe */}
        <button
          onClick={() => (window.location.href = "/#subscribe-section")}
          className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          Subscribe
        </button>

        {/* AUTH BLOCK */}
        {!session ? (
<>
  {/* LOGIN (click dropdown) */}
  <div className="relative cursor-pointer">
    <button
      onClick={() => setShowLoginDropdown(!showLoginDropdown)}
      className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
    >
      Login
      <svg
        className={`w-4 h-4 transition-transform duration-300 ${
          showLoginDropdown ? "rotate-180" : "rotate-0"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {showLoginDropdown && (
      <div className="absolute top-full right-0 mt-3 w-48 bg-white/70 backdrop-blur-xl shadow-xl rounded-xl border border-white/20 py-2 z-50 transition-all duration-300">
        <Link
          href="/admin/login"
          className="block px-4 py-2 text-sm hover:bg-secondary/40 rounded-lg cursor-pointer"
        >
          Admin Login
        </Link>
        <Link
          href="/blogger/login"
          className="block px-4 py-2 text-sm hover:bg-secondary/40 rounded-lg cursor-pointer"
        >
          Blogger Login
        </Link>

         <Link
        href="/super_admin/login"
        className="block px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 rounded-lg cursor-pointer"
      >
        Super Admin Login
      </Link>

      </div>
    )}
  </div>

  {/* REGISTER (click dropdown) */}
  <div className="relative cursor-pointer">
    <button
      onClick={() => setShowRegisterDropdown(!showRegisterDropdown)}
      className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
    >
      Register
      <svg
        className={`w-4 h-4 transition-transform duration-300 ${
          showRegisterDropdown ? "rotate-180" : "rotate-0"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {showRegisterDropdown && (
      <div className="absolute top-full right-0 mt-3 w-48 bg-white/70 backdrop-blur-xl shadow-xl rounded-xl border border-white/20 py-2 z-50 transition-all duration-300">
        <Link
          href="/admin/signup"
          className="block px-4 py-2 text-sm hover:bg-secondary/40 rounded-lg cursor-pointer"
        >
          Admin Signup
        </Link>
        <Link
          href="/blogger/signup"
          className="block px-4 py-2 text-sm hover:bg-secondary/40 rounded-lg cursor-pointer"
        >
          Blogger Signup
        </Link>
      </div>
    )}
  </div>
</>
        ) : (
          <ProfileDropdown />
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 hover:bg-white/20 backdrop-blur-md rounded-lg transition-colors cursor-pointer"
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>

    {/* MOBILE MENU */}
    {isMobileMenuOpen && (
      <nav className="md:hidden flex flex-col gap-3 border-t border-white/20 pt-4 pb-4 bg-white/40 backdrop-blur-2xl">

        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            window.location.href = "/#recent-articles";
          }}
          className="text-sm font-medium text-foreground hover:text-primary py-2 text-left px-2 cursor-pointer"
        >
          Articles
        </button>

        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            window.location.href = "/#subscribe-section";
          }}
          className="text-sm font-medium text-primary hover:text-primary/80 py-2 text-left px-2 cursor-pointer"
        >
          Subscribe
        </button>

        {!session ? (
          <>
            <p className="px-2 pt-2 text-xs font-semibold text-muted-foreground">Login</p>

            <Link
              href="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm py-2 px-2 hover:bg-secondary/40 rounded-lg cursor-pointer"
            >
              Admin Login
            </Link>

            <Link
              href="/blogger/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm py-2 px-2 hover:bg-secondary/40 rounded-lg cursor-pointer"
            >
              Blogger Login
            </Link>
            
             <Link
              href="/blogger/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm py-2 px-2 hover:bg-secondary/40 rounded-lg cursor-pointer"
            >
              Super_Admin Login
            </Link>

            <p className="px-2 pt-4 text-xs font-semibold text-muted-foreground">Register</p>

            <Link
              href="/admin/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm py-2 px-2 hover:bg-secondary/40 rounded-lg cursor-pointer"
            >
              Admin Signup
            </Link>

            <Link
              href="/blogger/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm py-2 px-2 hover:bg-secondary/40 rounded-lg cursor-pointer"
            >
              Blogger Signup
            </Link>
          </>
        ) : (
          <ProfileDropdown />
        )}
      </nav>
    )}
  </div>
</nav>
  )
}
