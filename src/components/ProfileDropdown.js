'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ProfileDropdown() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
    setIsOpen(false)
  }

  const handleSignIn = () => {
    setIsOpen(false)
    // You can customize this to show a modal or redirect to a specific login page
  }

  const handleCreateAccount = () => {
    setIsOpen(false)
    // You can customize this to show a modal or redirect to a specific signup page
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white/20 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-white/20 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 group hover:bg-gray-50 rounded-lg px-3 py-2 transition-all duration-300"
      >
        {/* Profile Avatar */}
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300 shadow-sm">
          {session ? (
            <span className="text-blue-600 font-bold text-lg">
              {(session.user?.name || session.user?.email || 'U').charAt(0).toUpperCase()}
            </span>
          ) : (
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>

        {/* Profile Info */}
        <div className="text-left">
          {session ? (
            <>
              <p className="text-sm font-bold leading-none" style={{color: '#1E4ED8'}}>
                {session.user?.name || 'User'}
              </p>
              <p className="text-xs capitalize leading-none mt-1" style={{color: '#1E4ED8', opacity: 0.7}}>
                {session.user?.role || 'Member'}
              </p>
            </>
          ) : (
            <p className="text-sm font-bold leading-none" style={{color: '#1E4ED8'}}>
              Profile
            </p>
          )}
        </div>

        {/* Dropdown Arrow */}
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{color: '#1E4ED8'}}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
          {/* Header Section */}
          <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {(session.user?.name || session.user?.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {session.user?.name || 'Welcome!'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {session.user?.email}
                  </p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                    {session.user?.role || 'Member'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Welcome to Aarogya Insights</h3>
                <p className="text-sm text-gray-600">Sign in to access your profile</p>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {session ? (
              <>
                {/* Dashboard Links */}
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Dashboard</p>
                </div>
                
                {session.user?.role === 'admin' && (
                  <Link 
                    href="/admin/dashboard"
                    className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium">Admin Dashboard</span>
                  </Link>
                )}

                {session.user?.role === 'blogger' && (
                  <Link 
                    href="/blogger/dashboard"
                    className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="font-medium">Blogger Dashboard</span>
                  </Link>
                )}

                {/* Profile Settings */}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account</p>
                  </div>
                  <Link href="/profile">
                    <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <svg   className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor"  viewBox="0 0 24 24">
                         <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2}  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"  />
                      </svg>
                      <span className="font-medium">Profile Settings</span>
                    </button>
                  </Link>
                  <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">Settings</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-6 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Sign In Options */}
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Get Started</p>
                </div>

                <Link 
                  href="/admin/login"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">Admin Sign In</span>
                </Link>

                <Link 
                  href="/blogger/login"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="font-medium">Blogger Sign In</span>
                </Link>

                 <Link 
                  href="/blogger/login"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="font-medium">Blogger Sign In</span>
                </Link>

                {/* Create Account Options */}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Create Account</p>
                  </div>

                  <Link 
                    href="/admin/signup"
                    className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="font-medium">Create Admin Account</span>
                  </Link>

                  <Link 
                    href="/blogger/signup"
                    className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="font-medium">Create Blogger Account</span>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              © 2024 Aarogya Insights. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
