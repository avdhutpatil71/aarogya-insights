'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { extractIdFromSlug } from '@/lib/slug'
import Navbar from '@/components/Navbar'
import CommentBox from "@/components/CommentBox";

export default function BlogDetail() {
  const params = useParams()
  const id = params.id; 
  const router = useRouter()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  const fetchBlog = async () => {
    try {
      // Extract the actual ID from the slug/param
      const blogId = extractIdFromSlug(params.id)
      const response = await fetch(`/api/blogs/${blogId}`)
      const data = await response.json()

      if (response.ok) {
        setBlog(data)
      } else {
        setError(data.error || 'Blog not found')
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
      setError('Failed to load blog')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      short: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }
  }

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-body text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-heading-2 text-gray-900 mb-4">Blog Not Found</h2>
          <p className="text-body text-gray-600 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link 
            href="/"
            className="text-btn bg-[#5678FF] text-white px-6 py-3 rounded-lg hover:bg-[#4567EE] transition-all font-semibold shadow-lg hover:shadow-xl"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const dateInfo = formatDate(blog.createdAt)
  const readTime = calculateReadTime(blog.content)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar variant="blog" />
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/30 backdrop-blur-lg border-b border-white/20 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
       {/* Back Button */}
      <Link href="/"
             className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold 
             text-white bg-[#5678FF]
             border border-white/20 shadow-md backdrop-blur-md
             transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#4567EE]"
>
       {/* Left Arrow Icon */}
       <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 border border-white/10 group-hover:bg-white/30 transition-all duration-300">
           <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
            >
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
       </span>

     <span className="relative z-10 tracking-wide">
         Back to Home
      </span>

        {/* Shine Effect */}
         <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl blur-sm"></span>
      </Link>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-4">
        {/* Featured Image Hero */}
        {blog.featuredImage && (
          <div className="relative h-[500px] rounded-2xl overflow-hidden mb-6 shadow-xl group border border-gray-200">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              quality={95}
            />
            
            {/* Featured Badge */}
            {blog.featured && (
              <div className="absolute top-6 right-6">
                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                  ⭐ Featured Post
                </span>
              </div>
            )}
          </div>
        )}

        {/* Blog Title and Meta Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {blog.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {(blog.author?.name || 'Admin').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Author</p>
                <p className="text-base font-bold text-gray-900">{blog.author?.name || 'Admin'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-500">Published</p>
                <p className="text-base font-bold text-gray-900">{dateInfo.short}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-500">Read Time</p>
                <p className="text-base font-bold text-gray-900">{readTime} min read</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-500">Views</p>
                <p className="text-base font-bold text-gray-900">{blog.views || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Excerpt Section */}
        {blog.excerpt && (
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-l-4 border-blue-600">
            <p className="text-base text-gray-800 leading-relaxed italic">
              {blog.excerpt}
            </p>
          </div>
        )}

        {/* Tags Section */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-800 text-white px-3 py-1.5 rounded-full font-medium hover:bg-gray-700 transition-all cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Blog Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="prose prose-lg max-w-none">
            <div className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap space-y-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {blog.content}
            </div>
          </div>
        </div>

      {/* Comment Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 border border-gray-200 mb-12">
              < CommentBox postId={id} />
      </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Post Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Publication Status */}
            <div className="text-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">
                {blog.published ? 'Published' : 'Draft'}
              </p>
              <p className="text-xs text-gray-600 font-medium">Publication Status</p>
            </div>

            {/* Last Updated */}
            <div className="text-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">
                {formatDate(blog.updatedAt || blog.createdAt).short}
              </p>
              <p className="text-xs text-gray-600 font-medium">Last Updated</p>
            </div>

            {/* Word Count */}
            <div className="text-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">
                {blog.content.split(' ').length}
              </p>
              <p className="text-xs text-gray-600 font-medium">Word Count</p>
            </div>

            {/* Category */}
            <div className="text-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">
                {blog.category || 'General'}
              </p>
              <p className="text-xs text-gray-600 font-medium">Category</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-body text-gray-400 mb-4">Healthcare Insights & Innovation Stories</p>
          <p className="text-caption text-gray-500">© 2024 AAROGYA INSIGHTS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
