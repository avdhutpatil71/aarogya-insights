"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function BloggerLoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") || "/blogger/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push(callbackUrl);
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar variant="blogger" />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#5B7CFD] tracking-tight mb-2">
              Aarogya Aadhar
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#5B7CFD]">
              Blogger Login
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-lg font-bold text-[#1E2A5A]">
                  User ID / Email ID*
                </label>
                <div className="relative flex items-center bg-[#EFF6FF] rounded-full px-5 py-3">
                  <input
                    type="email"
                    required
                    className="flex-1 bg-transparent border-none p-0 text-gray-900 focus:outline-none"
                    placeholder="User ID / Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-lg font-bold text-[#1E2A5A]">
                  Password*
                </label>
                <div className="relative flex items-center bg-[#EFF6FF] rounded-full px-5 py-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="flex-1 bg-transparent border-none p-0 text-gray-900 focus:outline-none tracking-widest"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-3 text-[#94A3B8]"
                  >
                    {showPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="font-medium text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-8 pt-2">
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-12 py-3 bg-[#5B7CFD] text-white text-lg font-bold rounded-full shadow-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>

              <div className="border-t border-gray-200"></div>

              <div className="text-center space-y-4">
                <p className="text-gray-900 font-medium text-base">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/blogger/signup"
                    className="text-orange-500 hover:text-orange-600 font-bold"
                  >
                    Register
                  </Link>
                </p>

                <Link
                  href="/"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
