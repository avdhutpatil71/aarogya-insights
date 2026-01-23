'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from "next/link";

export default function SuperAdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // DEFAULT SUPER ADMIN CREDENTIALS
    const SUPER_ADMIN_EMAIL = "demo@aarogya.com"
    const SUPER_ADMIN_PASSWORD = "demo@123"

     setTimeout(() => {
      if (email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD) {
        router.push('/super_admin/dashboard')
      } else {
        setError("Invalid Super Admin credentials")
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar variant="admin" />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">

          <div>
            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="mt-6 text-center text-heading-2 text-gray-900">
              Super Admin Login
            </h2>

            <p className="mt-2 text-center text-body text-gray-600">
              Access the Aarogya Insights Super Admin Dashboard
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500
                  focus:border-blue-500 text-body"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500
                  focus:border-blue-500 text-body"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-body-small font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="text-btn group relative w-full flex justify-center py-2 px-4 border border-transparent
                rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Checking...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center space-y-2">
              <div>
                <Link href="/" className="text-body-small text-blue-600 hover:text-blue-500">
                  ← Back to Home
                </Link>
              </div>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}
