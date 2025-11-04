'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import ProfileDropdown from './ProfileDropdown'

export default function Navbar({ variant = 'default' }) {
  const { data: session } = useSession()
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6 md:py-6">
          {/* Left Side - Dual Logos */}
          <div className="flex items-center space-x-6 md:space-x-10">
            {/* LIVO AAROGYA AADHAR™ Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image 
                  src="/images/logo1.png" 
                  alt="LIVO AAROGYA AADHAR™ Logo" 
                  width={140} 
                  height={140}
                  className="relative w-28 h-auto md:w-32 md:h-auto group-hover:scale-110 group-hover:brightness-110 transition-all duration-500 group-hover:drop-shadow-xl"
                />
              </div>
            </Link>

            {/* Vertical Separator - Hidden on mobile */}
            <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

            {/* Aarogya Dhan™ Logo - Hidden on mobile */}
            <Link href="/" className="hidden md:flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image 
                  src="/images/logo2.png" 
                  alt="Aarogya Dhan™ Logo" 
                  width={160} 
                  height={160}
                  className="relative h-20 md:h-24 group-hover:scale-110 group-hover:brightness-110 transition-all duration-500 group-hover:drop-shadow-xl"
                />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Articles Button */}
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/#recent-articles';
                }
              }}
              className="relative text-lg font-bold transition-all duration-300 hover:scale-105 group bg-transparent border-0 cursor-pointer"
              style={{color: 'var(--primary-accent)'}}
            >
              <span className="relative z-10">Articles</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
            </button>
            
            {!session ? (
              <>
                {/* Login Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                    className="flex items-center space-x-2 text-lg font-bold transition-all duration-300 hover:scale-105 group"
                    style={{color: 'var(--primary-accent)'}}
                  >
                    <span>Login</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showLoginDropdown && (
                    <div className="absolute top-full right-0 mt-3 w-52 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 py-3 z-50 transform transition-all duration-300 scale-100 opacity-100">
                      <Link href="/admin/login" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mx-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Admin Login
                        </div>
                      </Link>
                      <Link href="/blogger/login" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mx-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Blogger Login
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Register Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowRegisterDropdown(!showRegisterDropdown)}
                    className="flex items-center space-x-2 text-lg font-bold transition-all duration-300 hover:scale-105 group"
                    style={{color: 'var(--primary-accent)'}}
                  >
                    <span>Register</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showRegisterDropdown && (
                    <div className="absolute top-full right-0 mt-3 w-52 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 py-3 z-50 transform transition-all duration-300 scale-100 opacity-100">
                      <Link href="/admin/signup" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mx-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Admin Signup
                        </div>
                      </Link>
                      <Link href="/blogger/signup" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mx-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Blogger Signup
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Profile Dropdown for logged-in users */
              <ProfileDropdown />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 py-6 bg-white/80 backdrop-blur-md">
            <div className="space-y-4">
              {/* Articles Button for Mobile */}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (typeof window !== 'undefined') {
                    window.location.href = '/#recent-articles';
                  }
                }}
                className="block px-6 py-3 text-lg font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl mx-4 w-full text-left bg-transparent border-0 cursor-pointer"
                style={{color: 'var(--primary-accent)'}}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Articles
                </div>
              </button>
              
              {!session ? (
                <>
                  <div className="space-y-2 pt-2">
                    <h3 className="text-base font-bold text-gray-900 px-6">Login</h3>
                    <Link 
                      href="/admin/login" 
                      className="block px-6 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-lg mx-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Login
                    </Link>
                    <Link 
                      href="/blogger/login" 
                      className="block px-6 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-lg mx-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blogger Login
                    </Link>
                  </div>
                  <div className="space-y-2 pt-2">
                    <h3 className="text-base font-bold text-gray-900 px-6">Register</h3>
                    <Link 
                      href="/admin/signup" 
                      className="block px-6 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-lg mx-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Signup
                    </Link>
                    <Link 
                      href="/blogger/signup" 
                      className="block px-6 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-lg mx-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blogger Signup
                    </Link>
                  </div>
                </>
              ) : (
                <div className="px-6">
                  <ProfileDropdown />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
