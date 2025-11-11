"use client";
import { useSession, signOut, update } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [user, setUser] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "/default-avatar.png",
    bio: session?.user?.bio || "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // ✅ Handle profile updates
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        await updateSession({ ...session, user: updatedUser }); // Refresh session
        setSuccess("✅ Profile updated successfully!");
      } else {
        setSuccess("❌ Something went wrong while updating profile.");
      }
    } catch (err) {
      console.error(err);
      setSuccess("⚠ Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    if (passwords.newPass !== passwords.confirm) {
      setSuccess("❌ New passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });

      if (res.ok) setSuccess("✅ Password changed successfully!");
      else setSuccess("❌ Incorrect current password or error updating.");
    } catch (err) {
      console.error(err);
      setSuccess("⚠ Server error while changing password.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle profile image upload (client-side)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setUser({ ...user, image: imageUrl });
  };

return (
  <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
    
    {/* 🌈 Floating Background Animation */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-20 left-10 w-24 h-24 rounded-full bg-blue-400/20 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 rounded-full bg-purple-500/20 animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/3 w-20 h-20 rounded-full bg-indigo-400/20 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute bottom-32 right-1/4 w-28 h-28 rounded-full bg-blue-500/20 animate-bounce"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-10 right-1/3 w-32 h-32 rounded-full bg-blue-300/10 animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>
    </div>

    {/* 🌐 Header */}
    <header className="relative bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 md:py-6 space-y-4 md:space-y-0">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Aarogya Insights</h1>
                <p className="text-sm text-slate-500">Profile Settings</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4">
            <div className="text-left md:text-right">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">User</p>
            </div>
            <div className="flex space-x-2">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200 text-center"
              >
                Visit Home
              </Link>
              <button
                onClick={() => signOut()}
                className="px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors border border-red-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Profile Settings */}
    <section className="relative max-w-4xl mx-auto mt-10 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200 z-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center space-x-6">
          <img src={user.image} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md" />
          <div>
            <label className="text-blue-600 font-semibold cursor-pointer">
              Change Photo
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            rows="3"
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {success && <p className="text-green-600 mt-4">{success}</p>}
    </section>

    {/* Reset Password */}
    <section className="relative max-w-4xl mx-auto mt-10 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200 z-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reset Password</h2>
      <form onSubmit={handlePasswordReset} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwords.newPass}
          onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwords.confirm}
          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </section>

    {/* Terms and Conditions */}
    <section className="relative max-w-4xl mx-auto mt-10 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200 mb-10 z-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h2>
      <p className="text-gray-600 leading-relaxed text-sm">
        By using Aarogya Insights, you agree to our terms of service, privacy policy, and community standards. 
        All content provided is for informational purposes only. We are not responsible for any health decisions made based on our content.
      </p>
    </section>
  </div>
);
}