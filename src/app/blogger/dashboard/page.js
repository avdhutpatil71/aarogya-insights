'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/components/ImageUpload'

export default function BloggerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    published: false,
    featured: false,
    tags: ''
  })
  const [editBlog, setEditBlog] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    published: false,
    featured: false,
    tags: ''
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/blogger/login')
      return
    }

    fetchBlogs()
  }, [session, status, router])

  const fetchBlogs = async () => {
    try {
      // Fetch only the blogger's own blogs (including drafts)
      const response = await fetch('/api/blogger/blogs')
      const data = await response.json()

      if (response.ok) {
        setBlogs(Array.isArray(data) ? data : [])
      } else {
        setBlogs([])
        setError(data.error || 'Failed to load blogs. Please check your connection.')
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setBlogs([])
      setError('Failed to load blogs. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newBlog,
          tags: newBlog.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setNewBlog({
          title: '',
          content: '',
          excerpt: '',
          featuredImage: '',
          published: false,
          featured: false,
          tags: ''
        })
        setShowCreateForm(false)
        setMessage('Blog created successfully!')
        fetchBlogs()
      } else {
        setError(data.error || 'Failed to create blog')
      }
    } catch (error) {
      console.error('Error creating blog:', error)
      setError('An error occurred while creating the blog')
    }
  }

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchBlogs()
        setMessage('Blog deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      setError('Failed to delete blog')
    }
  }

  const togglePublish = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !currentStatus }),
      })

      if (response.ok) {
        fetchBlogs()
        setMessage(`Blog ${!currentStatus ? 'published' : 'unpublished'} successfully!`)
      }
    } catch (error) {
      console.error('Error updating blog:', error)
      setError('Failed to update blog')
    }
  }

  const handleStartEdit = (blog) => {
    setEditingBlog(blog.id)
    setEditBlog({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      featuredImage: blog.featuredImage || '',
      published: blog.published,
      featured: blog.featured || false,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : ''
    })
    setShowCreateForm(false)
    setMessage('')
    setError('')
  }

  const handleUpdateBlog = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/blogs/${editingBlog}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editBlog,
          tags: editBlog.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setEditingBlog(null)
        setEditBlog({
          title: '',
          content: '',
          excerpt: '',
          featuredImage: '',
          published: false,
          featured: false,
          tags: ''
        })
        setMessage('Blog updated successfully!')
        fetchBlogs()
      } else {
        setError(data.error || 'Failed to update blog')
      }
    } catch (error) {
      console.error('Error updating blog:', error)
      setError('An error occurred while updating the blog')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900 mx-auto"></div>
          <p className="text-sm mt-4 text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 md:py-6 space-y-4 md:space-y-0">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900">Aarogya Insights</h1>
                  <p className="text-xs md:text-sm text-slate-500">Blogger Dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <div className="text-left md:text-right">
                <p className="text-sm font-medium text-slate-900">{session?.user?.name || session?.user?.email}</p>
                <p className="text-xs text-slate-500">Blogger</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                <Link
                  href="/"
                  className="px-3 py-2 text-xs md:text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200 text-center"
                >
                  Visit Home
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 text-xs md:text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors border border-red-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* My Blogs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {Array.isArray(blogs) ? blogs.length : 0}
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide">My Blogs</p>
            </div>
          </div>

          {/* Published */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                {Array.isArray(blogs) ? blogs.filter(blog => blog.published).length : 0}
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide">Published</p>
            </div>
          </div>

          {/* Drafts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-yellow-600 mb-1">
                {Array.isArray(blogs) ? blogs.filter(blog => !blog.published).length : 0}
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide">Drafts</p>
            </div>
          </div>

          {/* Featured */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
                {Array.isArray(blogs) ? blogs.filter(blog => blog.featured).length : 0}
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide">Featured</p>
            </div>
          </div>
        </div>

        {/* Blog Management Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Articles</h2>
            <p className="text-sm text-gray-600 mt-1">Create and manage your blog posts</p>
          </div>
          <div className="flex items-center justify-between md:justify-end space-x-4 w-full md:w-auto">
            <div className="text-left md:text-right">
              <div className="text-3xl md:text-2xl font-bold text-blue-600 mb-1 md:mb-0 leading-none md:leading-8">
                {Array.isArray(blogs) ? blogs.length : 0}
              </div>
              <div className="text-xs md:text-sm text-gray-500 md:text-gray-600 font-medium md:font-normal uppercase md:normal-case tracking-wide md:tracking-normal">Total Posts</div>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>{showCreateForm ? 'Cancel' : 'Create New Blog'}</span>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-emerald-800">{message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Edit Blog Form */}
        {editingBlog && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Blog Post
            </h3>
            <form onSubmit={handleUpdateBlog} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Blog Title *
                </label>
                <input
                  type="text"
                  value={editBlog.title}
                  onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-lg font-semibold bg-white text-slate-900"
                  placeholder="Enter an engaging title for your blog post..."
                  required
                />
                <p className="text-sm text-slate-500">This will be the main headline of your blog post</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Blog Excerpt
                </label>
                <textarea
                  value={editBlog.excerpt}
                  onChange={(e) => setEditBlog({ ...editBlog, excerpt: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-slate-900"
                  rows="4"
                  placeholder="Write a brief summary or description of your blog post..."
                />
                <p className="text-sm text-slate-500">A short description that will appear on the blog listing page</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Blog Content *
                </label>
                <textarea
                  value={editBlog.content}
                  onChange={(e) => setEditBlog({ ...editBlog, content: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-slate-900 font-bold"
                  rows="15"
                  placeholder="Write your blog post content here. You can include multiple paragraphs, details, and information..."
                  required
                />
                <p className="text-sm text-slate-500">The main content of your blog post. Be detailed and informative!</p>
              </div>

              <ImageUpload
                imageType="banner"
                onImageUpload={(url) => setEditBlog({ ...editBlog, featuredImage: url })}
                currentImage={editBlog.featuredImage}
                label="Featured Image (Optional)"
                description="Upload a banner image for your blog post - this is completely optional"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editBlog.tags}
                  onChange={(e) => setEditBlog({ ...editBlog, tags: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-slate-900"
                  placeholder="healthcare, innovation, technology, telemedicine"
                />
                <p className="text-sm text-slate-500">Separate multiple tags with commas (e.g., healthcare, innovation, technology)</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-800 mb-4">Blog Settings</h4>
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editBlog.published}
                      onChange={(e) => setEditBlog({ ...editBlog, published: e.target.checked })}
                      className="mr-3 w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Published</span>
                    <span className="text-xs text-slate-500 ml-1">(Visible to public)</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editBlog.featured}
                      onChange={(e) => setEditBlog({ ...editBlog, featured: e.target.checked })}
                      className="mr-3 w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Featured</span>
                    <span className="text-xs text-slate-500 ml-1">(Highlighted on homepage)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium border border-green-200"
                >
                  Update Blog Post
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Create Blog Form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Blog Post
            </h3>
            <form onSubmit={handleCreateBlog} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Blog Title *
                </label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-lg font-semibold bg-white text-slate-900"
                  placeholder="Enter an engaging title for your blog post..."
                  required
                />
                <p className="text-sm text-slate-500">This will be the main headline of your blog post</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Blog Excerpt
                </label>
                <textarea
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-slate-900"
                  rows="4"
                  placeholder="Write a brief summary or description of your blog post..."
                />
                <p className="text-sm text-slate-500">A short description that will appear on the blog listing page</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Blog Content *
                </label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-slate-900 font-bold"
                  rows="15"
                  placeholder="Write your blog post content here. You can include multiple paragraphs, details, and information..."
                  required
                />
                <p className="text-sm text-slate-500">The main content of your blog post. Be detailed and informative!</p>
              </div>

              <ImageUpload
                imageType="banner"
                onImageUpload={(url) => setNewBlog({ ...newBlog, featuredImage: url })}
                currentImage={newBlog.featuredImage}
                label="Featured Image (Optional)"
                description="Upload a banner image for your blog post - this is completely optional"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newBlog.tags}
                  onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-slate-900"
                  placeholder="healthcare, innovation, technology, telemedicine"
                />
                <p className="text-sm text-slate-500">Separate multiple tags with commas (e.g., healthcare, innovation, technology)</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-800 mb-4">Blog Settings</h4>
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newBlog.published}
                      onChange={(e) => setNewBlog({ ...newBlog, published: e.target.checked })}
                      className="mr-3 w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Published</span>
                    <span className="text-xs text-slate-500 ml-1">(Visible to public)</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newBlog.featured}
                      onChange={(e) => setNewBlog({ ...newBlog, featured: e.target.checked })}
                      className="mr-3 w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Featured</span>
                    <span className="text-xs text-slate-500 ml-1">(Highlighted on homepage)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium border border-purple-200"
                >
                  Create Blog Post
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blog Management Section - Matching Admin Design */}
        <div className="space-y-6">
          {/* Blog Posts Cards - Exact Admin Match */}
          <div className="space-y-4">
            {Array.isArray(blogs) && blogs.map((blog, index) => (
              <div key={blog.id} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6">
                  {/* Top Row: Author + Status Badges */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Author Section */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {blog.author?.name ? blog.author.name.charAt(0).toUpperCase() : session?.user?.name?.charAt(0).toUpperCase() || 'B'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {blog.author?.name || session?.user?.name || 'Blogger'}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          Blogger
                        </p>
                      </div>
                    </div>

                    {/* Status Badges - Top Right */}
                    <div className="flex items-center space-x-2">
                      {blog.featured && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Featured
                        </span>
                      )}
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${blog.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>

                  {/* Blog Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {blog.title}
                  </h3>

                  {/* Blog Excerpt */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {blog.excerpt || blog.content.substring(0, 200) + '...'}
                  </p>

                  {/* Metadata Section */}
                  <div className="flex items-center space-x-6 mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Created</span>
                      <span className="font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Views</span>
                      <span className="font-medium">{blog.views || 0}</span>
                    </div>
                  </div>

                  {/* Category Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 6).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 6 && (
                        <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          +{blog.tags.length - 6} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons - Bottom */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleStartEdit(blog)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => togglePublish(blog.id, blog.published)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 ${blog.published
                        ? 'text-orange-700 bg-orange-100 hover:bg-orange-200'
                        : 'text-green-700 bg-green-100 hover:bg-green-200'
                        }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>{blog.published ? 'Unpublish' : 'Publish'}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!Array.isArray(blogs) || blogs.length === 0) && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No blogs yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first blog post.</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Blog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}