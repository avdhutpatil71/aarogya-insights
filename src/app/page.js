'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

// Utility function to create URL-friendly slugs
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim() // Remove leading/trailing spaces
}

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  // Enhanced function to calculate blog ranking score
  const calculateBlogScore = (blog) => {
    let score = 0
    
    // Base score for featured blogs (highest priority)
    if (blog.featured) score += 200
    
    // Score based on views (engagement indicator)
    score += (blog.views || 0) * 0.2
    
    // Score based on content length (longer content = more valuable)
    score += Math.min(blog.content.length / 50, 100)
    
    // Score based on recency (newer posts get higher score)
    const daysSinceCreated = (new Date() - new Date(blog.createdAt)) / (1000 * 60 * 60 * 24)
    score += Math.max(0, 50 - daysSinceCreated)
    
    // Score based on category relevance
    if (blog.category) score += 30
    
    // Score based on tags (more tags = more comprehensive)
    if (blog.tags && blog.tags.length > 0) score += blog.tags.length * 8
    
    // Score based on author reputation (if author has more blogs)
    if (blog.author && blog.author.blogCount) {
      score += Math.min(blog.author.blogCount * 2, 40)
    }
    
    // Bonus for complete metadata
    if (blog.excerpt) score += 15
    if (blog.featuredImage) score += 20
    
    // Small random factor for variety (reduced)
    score += Math.random() * 5
    
    return Math.round(score)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearchResults && !event.target.closest('form')) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSearchResults])


  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      const data = await response.json()
      console.log('Fetched blogs:', data)
      console.log('Number of blogs:', data.length)
      
      setBlogs(data)
      const featured = data.filter(blog => blog.featured).slice(0, 1)
      console.log('Featured blogs:', featured)
      console.log('Number of featured blogs:', featured.length)
      setFeaturedBlogs(featured)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query)
    
    if (query.trim() === '') {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    const searchTerm = query.toLowerCase().trim()
    const results = blogs.filter(blog => {
      const title = (blog.title || '').toLowerCase()
      const content = (blog.content || '').toLowerCase()
      const category = (blog.category || '').toLowerCase()
      const excerpt = (blog.excerpt || '').toLowerCase()
      
      return title.includes(searchTerm) || 
             content.includes(searchTerm) || 
             category.includes(searchTerm) ||
             excerpt.includes(searchTerm)
    })
    
    setSearchResults(results)
    setShowSearchResults(results.length > 0)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      handleSearch(searchQuery)
    }
  }

  const handleSearchInputChange = (e) => {
    const query = e.target.value
    handleSearch(query)
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Search */}
      <section className="py-16 md:py-24 bg-white/50 backdrop-blur-sm relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{background: 'linear-gradient(to bottom right, var(--primary-color), var(--primary-dark))'}}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 rounded-full animate-pulse" style={{backgroundColor: 'rgba(82, 113, 255, 0.08)'}}></div>
          <div className="absolute top-40 right-20 w-16 h-16 rounded-full animate-bounce" style={{backgroundColor: 'rgba(82, 113, 255, 0.12)', animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full animate-pulse" style={{backgroundColor: 'rgba(82, 113, 255, 0.15)', animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 rounded-full animate-bounce" style={{backgroundColor: 'rgba(82, 113, 255, 0.08)', animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up" style={{color: 'var(--primary-dark)'}}>
              Discover Healthcare
              <span className="block animate-gradient" style={{background: 'linear-gradient(to right, var(--primary-color), var(--primary-dark))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                Insights & Stories
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Stay informed with expert analysis, latest research, and practical healthcare guidance from trusted professionals.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-fade-in-up relative z-50" style={{animationDelay: '0.4s'}}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--primary-color)'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search articles, topics, or keywords..."
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white rounded-2xl shadow-lg border-0 focus:outline-none transition-all duration-300 hover:shadow-xl"
                    style={{'--tw-ring-color': 'rgba(82, 113, 255, 0.2)'}}
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-6 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 group/btn"
                    style={{background: 'linear-gradient(to right, var(--primary-color), var(--primary-dark))'}}
                  >
                    <span className="group-hover/btn:animate-pulse">Search</span>
                  </button>
                </div>
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-[#4584E9]/20 max-h-96 overflow-y-auto z-[60]">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-semibold" style={{color: 'var(--primary-accent)'}}>
                          Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                        </div>
                        <button
                          onClick={() => {
                            setShowSearchResults(false)
                            setSearchQuery('')
                          }}
                          className="text-gray-400 hover:text-[#144EED] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-3">
                        {searchResults.slice(0, 5).map((blog) => (
                          <Link 
                            key={blog.id} 
                            href={`/blogs/${createSlug(blog.title)}-${blog.id}`}
                            className="block p-4 rounded-xl hover:bg-[#4584E9]/5 border-2 border-transparent hover:border-[#4584E9]/30 transition-all duration-300 group"
                            onClick={() => {
                              setShowSearchResults(false)
                              setSearchQuery('')
                            }}
                          >
                            <div className="flex items-start space-x-4">
                              {blog.featuredImage && (
                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                  <Image
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-bold text-lg text-gray-900 group-hover:text-[#144EED] transition-colors duration-300 line-clamp-2 pr-2">
                                    {blog.title}
                                  </h4>
                                  {blog.category && (
                                    <span className="text-xs px-3 py-1 bg-[#4584E9]/10 text-[#144EED] rounded-full font-semibold whitespace-nowrap flex-shrink-0">
                                      {blog.category}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                                  {blog.excerpt || blog.content.substring(0, 150) + '...'}
                                </p>
                                {blog.author && (
                                  <div className="flex items-center mt-3 space-x-2">
                                    <div className="w-6 h-6 bg-[#144EED] rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs font-bold">
                                        {(blog.author?.name || 'A').charAt(0).toUpperCase()}
                                      </span>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">
                                      {blog.author?.name || 'Admin'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {searchResults.length > 5 && (
                        <div className="mt-4 pt-4 border-t-2 border-[#4584E9]/10 text-center">
                          <button
                            onClick={() => {
                              setShowSearchResults(false)
                            }}
                            className="px-6 py-2 bg-[#144EED] text-white rounded-xl font-semibold hover:bg-[#4584E9] transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                          >
                            View all {searchResults.length} results
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* No Results Message */}
                {showSearchResults && searchResults.length === 0 && searchQuery.trim() !== '' && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-[#4584E9]/20 z-[60]">
                    <div className="p-12 text-center">
                      <div className="w-20 h-20 bg-[#4584E9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-[#144EED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#144EED] mb-3">No results found</h3>
                      <p className="text-gray-600 text-lg mb-6">Try searching with different keywords or browse our articles below.</p>
                      <button
                        onClick={() => {
                          setShowSearchResults(false)
                          setSearchQuery('')
                        }}
                        className="px-6 py-2 bg-[#144EED] text-white rounded-xl font-semibold hover:bg-[#4584E9] transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                      >
                        Clear Search
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto relative z-10">
            {[
              { icon: '📄', count: blogs.length, label: 'Articles', delay: '0.6s' },
              { icon: '👨‍⚕️', count: '50+', label: 'Experts', delay: '0.8s' },
              { icon: '👥', count: '100K+', label: 'Readers', delay: '1s' },
              { icon: '🕒', count: '24/7', label: 'Support', delay: '1.2s' }
            ].map((stat, index) => (
              <div key={index} className="text-center group animate-fade-in-up" style={{animationDelay: stat.delay}}>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-3 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 hover:rotate-3">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{stat.count}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story Section */}
      {loading ? (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Skeleton Loading */}
            <div className="animate-pulse">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gray-200 h-12 w-48 rounded-full"></div>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
                        <div className="bg-gray-200 h-4 w-16 rounded-full"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-gray-200 h-8 w-full rounded"></div>
                        <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-200 h-4 w-full rounded"></div>
                        <div className="bg-gray-200 h-4 w-full rounded"></div>
                        <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="bg-gray-200 h-4 w-20 rounded"></div>
                          <div className="bg-gray-200 h-3 w-16 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="bg-gray-200 h-12 w-40 rounded-xl"></div>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="h-80 lg:h-full bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : featuredBlogs.length > 0 ? (
        <section className="py-12 bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-blue-800"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-0">
              {featuredBlogs.map((blog) => (
                <Link key={blog.id} href={`/blogs/${createSlug(blog.title)}-${blog.id}`}>
                <div className="group">
                  {/* Featured Badge */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center transform hover:scale-105 transition-all duration-300">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      <span className="font-semibold">Featured Story</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform group-hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                      <div className="flex flex-col lg:flex-row">
                      {/* Content Section */}
                      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <div className="space-y-6">
                          {/* Category & Reading Time */}
                          <div className="flex items-center space-x-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {blog.category || 'Healthcare'}
                            </span>
                            <div className="flex items-center text-gray-500">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm">{Math.ceil(blog.content.length / 500)} min read</span>
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                            {blog.title}
                          </h2>
                          
                          {/* Description */}
                          <p className="text-lg text-gray-600 leading-relaxed">
                            {blog.excerpt || blog.content.substring(0, 200) + '...'}
                          </p>
                          
                          {/* Author Info */}
                          <div className="flex items-center space-x-3">
                                                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to right, var(--primary-color), var(--primary-dark))'}}>
                            <span className="text-white font-semibold text-sm">
                              {(blog.author?.name || 'A').charAt(0).toUpperCase()}
                            </span>
                          </div>
                            <div>
                              <p className="font-medium text-gray-900">{blog.author?.name || 'Admin'}</p>
                              <p className="text-sm text-gray-500">{blog.author?.role || 'Healthcare Writer'}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* CTA Button */}
                        <div className="mt-8">
                          <button className="group/btn text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center" style={{background: 'linear-gradient(to right, var(--primary-color), var(--primary-dark))'}}>
                            <span>Read Full Story</span>
                            <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Image Section */}
                      <div className="lg:w-1/2 relative">
                          {blog.featuredImage ? (
                          <div className="h-80 lg:h-full">
                            <Image
                              src={blog.featuredImage}
                              alt={blog.title}
                              width={600}
                              height={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        ) : (
                          <div className="h-80 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <p className="text-gray-500 font-medium">Featured Image</p>
                            </div>
                          </div>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ) : (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-blue-800 mb-3">No Featured Story Yet</h3>
              <p className="text-base text-blue-700 mb-4">Check back soon for featured blog posts!</p>
            </div>
          </div>
        </section>
      )}


      {/* Our Recent Articles Section */}
      <section id="recent-articles" className="py-4 md:py-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="justify-center text-center pt-4 mb-6">
              <h2 className="text-[42px] font-extrabold text-[#5271FF] mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>Our Recent Articles</h2>
              <p className="body-large text-[#5271FF] mt-2">Stay informed with our latest healthcare insights and expert analysis</p>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Skeleton Cards */}
              {[1, 2, 3].map((index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
                          <div className="space-y-1">
                            <div className="bg-gray-200 h-4 w-16 rounded"></div>
                            <div className="bg-gray-200 h-3 w-12 rounded"></div>
                          </div>
                        </div>
                        <div className="bg-gray-200 h-4 w-12 rounded"></div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="bg-gray-200 h-5 w-full rounded"></div>
                        <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
                      </div>
                      <div className="space-y-2 mb-6">
                        <div className="bg-gray-200 h-3 w-full rounded"></div>
                        <div className="bg-gray-200 h-3 w-full rounded"></div>
                        <div className="bg-gray-200 h-3 w-2/3 rounded"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-200 h-3 w-12 rounded"></div>
                          <div className="bg-gray-200 h-3 w-8 rounded"></div>
                        </div>
                        <div className="bg-gray-200 h-4 w-20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Posts Grid */}
              {blogs
                .map((blog, index) => ({
                  ...blog,
                  rank: index + 1,
                  score: calculateBlogScore(blog)
                }))
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map((blog, displayIndex) => (
                <Link key={blog.id} href={`/blogs/${createSlug(blog.title)}-${blog.id}`}>
                  <article className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:-translate-y-3 hover:scale-[1.02] cursor-pointer border border-gray-200 hover:border-[#4584E9] relative">
                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 pointer-events-none bg-gradient-to-br from-[#4584E9]/5 via-[#4584E9]/10 to-[#4584E9]/5"></div>
                    
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      {blog.featuredImage ? (
                        <>
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            width={400}
                            height={256}
                            className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-1000"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-[#4584E9]/10 flex items-center justify-center group-hover:bg-[#4584E9]/20 transition-all duration-700">
                          <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-500 group-hover:rotate-6">
                              <svg className="w-10 h-10 text-[#144EED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-gray-600 font-semibold">Featured Article</p>
                          </div>
                        </div>
                      )}
                      
                                                {/* Category Tag with Enhanced Design */}
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-2xl px-4 py-2 border group-hover:bg-white group-hover:scale-110 transition-all duration-500" style={{borderColor: 'var(--primary-accent-light) / 0.3'}}>
                          <span className="text-xs font-bold uppercase tracking-wider" style={{color: 'var(--primary-accent)'}}>
                            {blog.category || 'Healthcare'}
                          </span>
                        </div>
                      </div>

                      {/* Hover Read Indicator */}
                                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 z-20">
                        <div className="rounded-full p-2 shadow-2xl animate-pulse-glow" style={{backgroundColor: 'var(--primary-accent)'}}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Bottom Gradient for Text Readability */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 relative z-20 bg-white">
                      {/* Author and Date with Enhanced Design */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center space-x-3 group-hover:space-x-4 transition-all duration-500">
                          <div className="w-10 h-10 bg-[#144EED] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                            <span className="text-white font-bold text-sm relative z-10">
                              {(blog.author?.name || 'A').charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 group-hover:text-[#144EED] transition-colors duration-300">{blog.author?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-500">{blog.author?.role || 'Expert Writer'}</p>
                          </div>
                        </div>
                        <div className="text-right bg-[#4584E9]/5 px-4 py-2 rounded-xl border border-[#4584E9]/20 group-hover:bg-[#4584E9]/10 group-hover:border-[#4584E9]/30 transition-all duration-500">
                          <p className="text-sm font-bold text-gray-900">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(blog.createdAt).getFullYear()}
                          </p>
                        </div>
                      </div>

                      {/* Title with Enhanced Typography */}
                      <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-[#144EED] transition-colors duration-500">
                        {blog.title}
                      </h3>

                      {/* Description with Better Readability */}
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm md:text-base group-hover:text-gray-700 transition-colors duration-300">
                        {blog.excerpt || blog.content.substring(0, 140) + '...'}
                      </p>

                      {/* Enhanced Footer with Stats */}
                      <div className="flex items-center justify-between pt-5 border-t border-gray-200 group-hover:border-[#4584E9]/30 transition-colors duration-500 bg-[#4584E9]/0 group-hover:bg-[#4584E9]/5 rounded-xl px-4 py-2 -mx-4 -mb-4">
                        <div className="flex items-center space-x-5">
                          {/* Reading Time */}
                          <div className="flex items-center text-gray-600 group-hover:text-[#144EED] transition-colors duration-300">
                            <div className="w-8 h-8 bg-[#4584E9]/10 rounded-lg flex items-center justify-center group-hover:bg-[#4584E9]/20 group-hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="ml-2 text-xs font-bold">{Math.ceil(blog.content.length / 500)} min</span>
                          </div>
                          {/* Views */}
                          <div className="flex items-center text-gray-600 group-hover:text-[#4584E9] transition-colors duration-300">
                            <div className="w-8 h-8 bg-[#4584E9]/10 rounded-lg flex items-center justify-center group-hover:bg-[#4584E9]/20 group-hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                            <span className="ml-2 text-xs font-bold">{blog.views || Math.floor(Math.random() * 100) + 10}</span>
                          </div>
                        </div>
                        {/* Read More Button */}
                        <div className="flex items-center text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500" style={{backgroundColor: 'var(--primary-accent)'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-accent-light)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-accent)'}>
                          <span className="mr-2">Read</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            
            {/* Enhanced Pagination Dots */}
            <div className="flex justify-center items-center mt-16 space-x-3">
              <div className="flex space-x-3">
                <div className="w-4 h-4 rounded-full shadow-xl animate-pulse" style={{backgroundColor: 'var(--primary-accent)'}}></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full hover:w-4 hover:h-4 transition-all duration-300 cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-accent-light)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full hover:w-4 hover:h-4 transition-all duration-300 cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-accent-light)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}></div>
              </div>
            </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl" style={{backgroundColor: 'var(--primary-accent-light) / 0.1'}}>
                <svg className="w-12 h-12" style={{color: 'var(--primary-accent)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3" style={{color: 'var(--primary-accent)'}}>No articles yet</h3>
              <p className="text-gray-600 max-w-md mx-auto text-lg">Check back soon for the latest healthcare insights and expert analysis.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Topics Section */}
      <section className="py-4 md:py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="justify-center text-center pt-4 mb-6">
              <h2 className="text-[42px] font-extrabold text-[#5271FF] mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>Trending Topics</h2>
              <p className="body-large text-[#5271FF] mt-2">Explore the most discussed healthcare topics and emerging trends</p>
            </div>
          </div>
          
          {/* Trending Topics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'COVID-19', icon: '🦠', count: '2.5K', color: 'from-red-50 to-red-100', hoverColor: 'hover:from-red-100 hover:to-red-200' },
              { name: 'Mental Health', icon: '🧠', count: '1.8K', color: 'from-purple-50 to-purple-100', hoverColor: 'hover:from-purple-100 hover:to-purple-200' },
              { name: 'Nutrition', icon: '🥗', count: '1.2K', color: 'from-green-50 to-green-100', hoverColor: 'hover:from-green-100 hover:to-green-200' },
              { name: 'Exercise', icon: '💪', count: '980', color: 'from-orange-50 to-orange-100', hoverColor: 'hover:from-orange-100 hover:to-orange-200' },
              { name: 'Prevention', icon: '🛡️', count: '750', color: 'from-blue-50 to-blue-100', hoverColor: 'hover:from-blue-100 hover:to-blue-200' },
              { name: 'Technology', icon: '📱', count: '650', color: 'from-indigo-50 to-indigo-100', hoverColor: 'hover:from-indigo-100 hover:to-indigo-200' }
            ].map((topic, index) => (
              <div key={index} className="group cursor-pointer animate-fade-in-up h-full" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`bg-gradient-to-br ${topic.color} ${topic.hoverColor} rounded-2xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-500 border border-gray-200 hover:-rotate-1 h-full flex flex-col justify-between`} style={{'--hover-border-color': 'var(--primary-color)'}} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}>
                  <div>
                    <div className="text-4xl mb-3 group-hover:animate-bounce transition-transform duration-300">{topic.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2 transition-colors duration-300 min-h-[40px] flex items-center justify-center" style={{'--hover-color': 'var(--primary-accent)'}} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}>{topic.name}</h3>
                    <p className="text-sm text-gray-600 font-medium transition-colors duration-300 mb-3" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}>{topic.count} articles</p>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{background: 'linear-gradient(to right, var(--primary-color), var(--primary-dark))'}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Banner */}
      <div className="text-white py-2" style={{backgroundColor: 'var(--primary-dark)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between text-body-small">
            <div className="flex items-center space-x-4">
              <span>Government of India | Aarogya Insights</span>
              <span>Certified by ISO:27001</span>
              <span>Online Healthcare Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Your Health, Your Choice</span>
              <span>Connect with us +91 79-7272-7498</span>
              <span>Mail ID: info@aarogya.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content Area */}
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Know Us */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{color: 'var(--primary-dark)'}}>Know Us</h3>
              <ul className="space-y-3">
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>About Us</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Contact Us</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Press Coverage</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Careers</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Business Partnership</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Become a Health Partner</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Corporate Governance</a></li>
              </ul>
            </div>

            {/* Our Policies */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{color: 'var(--primary-dark)'}}>Our Policies</h3>
              <ul className="space-y-3">
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Privacy Policy</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Terms and Conditions</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Editorial Policy</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>User Manual</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Important Document</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Required Documents</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Patient Form</a></li>
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{color: 'var(--primary-dark)'}}>Our Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Features for Doctor</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Features for Hospital</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Features for Lab</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Features for HSP</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Features for Patient</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Features for Chemist</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Features for Health Worker</a></li>
                <li><a href="#" className="block text-lg font-medium leading-relaxed transition-all duration-200 hover:translate-x-1" style={{color: 'var(--primary-color)'}}>Features Pharma Manufacturers</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{color: 'var(--primary-dark)'}}>Connect</h3>
              <p className="mb-6 text-lg leading-relaxed" style={{color: 'var(--primary-color)'}}>Follow Aarogya Insights for latest updates</p>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300" style={{backgroundColor: 'var(--primary-color)'}}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300" style={{backgroundColor: 'var(--primary-color)'}}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300" style={{backgroundColor: 'var(--primary-color)'}}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300" style={{backgroundColor: 'var(--primary-color)'}}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 c0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300" style={{backgroundColor: 'var(--primary-color)'}}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Value Proposition Section */}
          <div className="grid md:grid-cols-3 gap-12 mb-12 px-4">
            {/* Reliable */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{backgroundColor: 'var(--primary-color)'}}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4" style={{color: 'var(--primary-dark)'}}>Reliable</h4>
              <p className="text-base leading-relaxed" style={{color: 'var(--primary-color)', lineHeight: '1.7'}}>
                All information displayed on Aarogya Insights is procured from verified sources and approved by healthcare professionals. All content listed on the platform is accredited.
              </p>
            </div>

            {/* Secure */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{backgroundColor: 'var(--primary-color)'}}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4" style={{color: 'var(--primary-dark)'}}>Secure</h4>
              <p className="text-base leading-relaxed" style={{color: 'var(--primary-color)', lineHeight: '1.7'}}>
                Your data security is our priority. We implement industry-standard encryption and security protocols to protect your personal health information and browsing data.
              </p>
            </div>

            {/* Affordable */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{backgroundColor: 'var(--primary-color)'}}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4" style={{color: 'var(--primary-dark)'}}>Affordable</h4>
              <p className="text-base leading-relaxed" style={{color: 'var(--primary-color)', lineHeight: '1.7'}}>
                Access to quality healthcare information should be accessible to everyone. Our platform provides free, comprehensive healthcare insights and resources for all users.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="py-5" style={{backgroundColor: 'var(--primary-color)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="font-bold text-base" style={{color: 'var(--primary-color)'}}>AI</span>
              </div>
              <div className="text-white font-medium">
                <span className="text-base font-semibold">Aarogya Insights</span>
              </div>
            </div>
            <div className="flex-1 text-center text-base px-4 text-white leading-relaxed">
              <p className="text-base">© 2024 Aarogya Insights Pvt.Ltd. All rights reserved. All information are dispensed in compliance with the Information Technology Act, 2000.</p>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300 bg-white"
              style={{backgroundColor: 'white'}}
            >
              <svg className="w-5 h-5" style={{color: 'var(--primary-color)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}