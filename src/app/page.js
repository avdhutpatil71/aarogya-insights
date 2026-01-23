'use client'
import { User, Calendar, ArrowRight,  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Mail, ArrowUp } from "lucide-react";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { useMemo } from "react";


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
  const [showAll, setShowAll] = useState(false);
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [email, setEmail] = useState('')       
  const [subLoading, setSubLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All');
  

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

      // Auto change between first 3 blogs cards
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); 
      }, 3000); // 
      return () => clearInterval(interval);
    }, []);

    const handleSubscribeSubmit = async (e) => {
      e.preventDefault();
      setSubLoading(true);
      setSuccess(false);

      // Basic email validation
      if (!email || !email.includes("@")) {
        alert("⚠️ Please enter a valid email address.");
        setSubLoading(false);
        return;
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        
        setEmail("");
        setSuccess(true);
      } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong. Please try again.");
      } finally {
        setSubLoading(false);
      }
    };

    const filteredBlogs = activeCategory === 'All'
  ? blogs
  : blogs.filter(blog => blog.category?.toLowerCase() === activeCategory.toLowerCase());

const [bubbles, setBubbles] = useState([]);

useEffect(() => {
  const generated = Array.from({ length: 7 }).map((_, i) => ({
    width: Math.random() * 240 + 120 + "px",
    height: Math.random() * 240 + 120 + "px",
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    background: `hsl(${165 + i * 20}, 70%, 70%)`,
    animationDuration: Math.random() * 8 + 10 + "s",
    animationDelay: `${i * 0.6}s`,
  }));

  setBubbles(generated);
}, []);

  return (
    <div className="bg-background min-h-screen ">
      {/* Navbar */}
      <Navbar />

          <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-white py-14 md:py-20">

            {/* Soft Gradient Orbs */}
            <div className="absolute inset-0 opacity-50">
              <div
                className="absolute top-10 left-1/4 w-[28rem] h-[28rem] rounded-full blur-[120px]"
                style={{ background: 'linear-gradient(145deg, var(--primary) 0%, var(--secondary) 100%)' }}
              />
              <div
                className="absolute bottom-10 right-1/3 w-[22rem] h-[22rem] rounded-full blur-[120px]"
                style={{ background: 'linear-gradient(145deg, var(--secondary) 0%, var(--accent) 100%)' }}
              />
            </div>

                      {/* Floating Bubbles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {bubbles.map((bubble, i) => (
                <div
                  key={i}
                  className="absolute rounded-full opacity-20 animate-float"
                  style={bubble}
                />
              ))}
            </div>


            <div className="relative z-10 mx-auto max-w-7xl px-4">

              {/* Badge */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/70 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-sm font-semibold text-gray-700 tracking-wide">
                    Trusted by healthcare professionals worldwide
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
                  <span className="block text-gray-900">Discover Healthcare</span>
                  <span className="block 
              bg-gradient-to-r 
              from-emerald-600 
              via-blue-600 
              to-cyan-600 
              bg-clip-text 
              text-transparent 
              animate-gradient-smooth">
                    Insights & Stories
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
                  Expert analysis, latest medical research, and practical healthcare guidance—all in one place.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handleSearchSubmit} className="relative group">

                    <div className="relative flex items-center bg-white/80 backdrop-blur-xl border border-white/70 shadow-xl rounded-2xl transition-all duration-300 focus-within:shadow-2xl focus-within:border-emerald-200">

                      {/* Search Icon */}
                      <div className="absolute left-0 inset-y-0 flex items-center pl-6 pointer-events-none">
                        <svg className="w-6 h-6 text-emerald-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>

                      {/* Input Field */}
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        placeholder="Search articles, topics, or experts..."
                        className="w-full pl-16 pr-36 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                      />

                      {/* Button */}
                      <button
                        type="submit"
                        className="absolute right-2 px-8 py-2.5 text-white font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                      >
                        Search
                      </button>
                    </div>

                    {/* SEARCH DROPDOWN */}
                    {showSearchResults && searchResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl border border-gray-200 shadow-2xl max-h-96 overflow-y-auto z-50 pb-4 custom-scroll">
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
                            <span className="text-sm font-semibold text-emerald-700">Found {searchResults.length} results</span>
                            <button
                              onClick={() => { setShowSearchResults(false); setSearchQuery(""); }}
                              className="text-gray-500 hover:text-emerald-700"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="space-y-3">
                            {searchResults.map((blog) => (
                              <Link
                                key={blog.id}
                                href={`/blogs/${createSlug(blog.title)}-${blog.id}`}
                                onClick={() => { setShowSearchResults(false); setSearchQuery(""); }}
                                className="block p-3 rounded-xl transition-all hover:bg-emerald-50 border border-transparent hover:border-emerald-200"
                              >
                                <div className="flex gap-3">
                                  {blog.featuredImage && (
                                    <Image
                                      src={blog.featuredImage}
                                      alt={blog.title}
                                      width={64}
                                      height={64}
                                      className="rounded-lg w-16 h-16 object-cover shadow-sm"
                                    />
                                  )}
                                  <div>
                                    <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">{blog.title}</h4>
                                    {blog.category && (
                                      <p className="text-xs text-emerald-700 mt-1">{blog.category}</p>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* NO RESULTS */}
                    {showSearchResults && searchResults.length === 0 && searchQuery.trim() !== "" && (
                      <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl border border-gray-200 shadow-2xl p-10 text-center z-50">
                        <h3 className="font-semibold text-gray-900 text-xl mb-2">No results found</h3>
                        <p className="text-gray-600 text-sm mb-6">Try different keywords or browse featured insights.</p>
                        <button
                          onClick={() => { setShowSearchResults(false); setSearchQuery(""); }}
                          className="px-5 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-all"
                        >
                          Clear Search
                        </button>
                      </div>
                    )}

                  </form>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20">
                {[
                  { icon: "📚", count: blogs.length, label: "Articles", color: "from-blue-500 " },
                  { icon: "👨‍⚕️", count: "500+", label: "Experts", color: "from-blue-500 " },
                  { icon: "👥", count: "250K+", label: "Monthly Readers", color: "from-blue-500 " },
                  { icon: "⭐", count: "4.9", label: "Rating", color: "from-blue-500 " },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/80 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 text-2xl shadow-md`} >
                      {item.icon}
                    </div>
                    <p className="text-4xl font-bold text-gray-900">{item.count}</p>
                    <p className="text-sm text-gray-600 font-medium mt-1">{item.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>

      {/* Featured Story Section */}
      {loading ? (
        /* -------------------- LOADING SKELETON -------------------- */
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
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
        /* -------------------- FEATURED STORY (NEW DESIGN) -------------------- */
        <section className="py-6 md:py-10 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">

            {/* Featured Badge */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-primary">Featured Story</span>
              </div>
            </div>

            {featuredBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${createSlug(blog.title)}-${blog.id}`}
                className="block mb-16 group"
              >
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* CONTENT SIDE */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            {blog.category || "Wellness"}
                          </span>

                          <span className="text-xs text-muted-foreground">
                            {blog.createdAt
                              ? new Date(blog.createdAt).toLocaleDateString()
                              : "Latest"}
                          </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h2>

                        <p className="text-base text-muted-foreground leading-relaxed mb-8">
                          {blog.excerpt || blog.content.substring(0, 200) + "..."}
                        </p>

                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                              {(blog.author?.name || "A").charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {blog.author?.name || "Admin"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {blog.author?.role || "Healthcare Writer"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* READ ARTICLE BUTTON */}
                      <button className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 group w-fit">
                        Read Article
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>

                    {/* IMAGE SIDE */}
                    <div className="relative h-80 lg:h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>

                      <img
                        src={blog.featuredImage || "/default-blog.jpg"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                        </svg>
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            ))}

          </div>
        </section>
      ) : (
        /* -------------------- NO FEATURED STORY -------------------- */
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-blue-800 mb-3">No Featured Story Yet</h3>
              <p className="text-base text-blue-700">Check back soon for featured blog posts!</p>
            </div>
          </div>
        </section>
      )}


        {/* Recent Articles Section */}
        <section id="recent-articles" className="py-6 md:py-10 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">

            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="justify-center text-center pt-4 mb-6">
                <h2 className="text-[42px] font-extrabold text-foreground mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>
                  Our Recent Articles
                </h2>
                <p className="body-large text-[#5271FF] mt-2">Stay informed with our latest healthcare insights and expert analysis</p>
              </div>
            </div>

            {/* Calculate sorted blogs (stable, no shuffle) */}
            {(() => {
              const sortedBlogs = useMemo(() => {
                return blogs
                  .map((blog, index) => ({
                    ...blog,
                    rank: index + 1,
                    score: calculateBlogScore(blog),
                  }))
                  .sort((a, b) => b.score - a.score);
              }, [blogs]);

              return (
                <>
                  {/* Loading Skeleton */}
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="bg-card rounded-xl shadow-md border border-border p-4 animate-pulse"
                        >
                          <div className="h-48 bg-muted rounded-lg mb-4"></div>
                          <div className="h-4 bg-muted w-3/4 rounded mb-3"></div>
                          <div className="h-4 bg-muted w-1/2 rounded mb-3"></div>
                          <div className="h-3 bg-muted w-full rounded mb-2"></div>
                          <div className="h-3 bg-muted w-4/5 rounded mb-6"></div>
                          <div className="flex justify-between">
                            <div className="h-3 w-1/4 bg-muted rounded"></div>
                            <div className="h-3 w-1/4 bg-muted rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : sortedBlogs.length > 0 ? (
                    <>
                      {/* Blog Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sortedBlogs
                          .slice(0, showAll ? sortedBlogs.length : 4)
                          .map((post) => (
                            <Link
                              key={post.id}
                              href={`/blogs/${createSlug(post.title)}-${post.id}`}
                              className="group"
                            >
                              <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-border hover:border-primary/20">

                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                                  <img
                                    src={post.featuredImage || "/placeholder.svg"}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                                      {post.category || "Healthcare"}
                                    </span>
                                  </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col h-full">
                                  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                  </h3>

                                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                                    {post.excerpt || post.content?.substring(0, 120) + "..."}
                                  </p>

                                  {/* Meta Info */}
                                  <div className="space-y-3 pt-4 border-t border-border">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <User className="w-4 h-4" />
                                      <span>{post.author?.name || "Admin"}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          })}
                                        </span>
                                      </div>
                                      <span className="text-xs font-medium text-primary">
                                        {Math.ceil(post.content.length / 500)} min read
                                      </span>
                                    </div>
                                  </div>

                                  {/* Read More */}
                                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary group/link">
                                    Read More
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                  </button>
                                </div>
                              </article>
                            </Link>
                          ))}
                      </div>

                      {/* View All / Show Less Button */}
                      <div className="flex justify-center mt-16">
                        <button
                          onClick={() => {
                            if (showAll) {
                              const section = document.getElementById("recent-articles");
                              section?.scrollIntoView({ behavior: "smooth" });
                            }
                            setShowAll(!showAll);
                          }}
                          className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                          {showAll ? "Show Less" : "View All Articles"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-16">
                      <h3 className="text-xl font-bold mb-3 text-primary">No articles yet</h3>
                      <p className="text-muted-foreground">
                        Check back soon for the latest healthcare insights and expert analysis.
                      </p>
                    </div>
                  )}
                </>
              );
            })()}

          </div>
        </section>

{/* Trending Topics Section */}
<section className="py-6 md:py-10 bg-gradient-to-br from-background to-background/95">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
        Trending Topics
      </h2>
      <p className="text-lg text-muted-foreground">
        Explore the most discussed healthcare topics and emerging trends
      </p>
    </div>

    {/* Modern Topic Cards */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[
        { name: 'COVID-19', icon: '🦠', count: '2.5K' },
        { name: 'Mental Health', icon: '🧠', count: '1.8K' },
        { name: 'Nutrition', icon: '🥗', count: '1.2K' },
        { name: 'Exercise', icon: '💪', count: '980' },
        { name: 'Prevention', icon: '🛡️', count: '750' },
        { name: 'Technology', icon: '📱', count: '650' },
      ].map((topic, index) => (
        <div key={index} className="group cursor-pointer">
          <div className="bg-card hover:bg-primary/5 border border-border hover:border-primary/30 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 h-full flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {topic.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">
                {topic.name}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">
                {topic.count} articles
              </p>
            </div>
            <div className="h-1 bg-border rounded-full overflow-hidden mt-4">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



{/* Category Filter Section */}
<section className="relative py-10 md:py-16 bg-background overflow-hidden">

  {/* Animated Bokeh Lights */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/5 blur-3xl animate-bounce" style={{ animationDelay: '0.5s' }}></div>
  </div>

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10">
    <div className="bg-card border border-border backdrop-blur-sm rounded-3xl px-8 py-10 shadow-lg">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-8">
        Explore by Category
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-3">
        {["All", "Wellness", "Nutrition", "Mental Health", "Technology", "Research"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg scale-105"
                : "bg-muted text-foreground hover:bg-muted/80 border border-border hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  </div>
</section>



{/* Featured + Subscribe Section */}
<section id="subscribe-section" className="py-10 md:py-16 bg-gradient-to-br from-background via-background to-secondary/5">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    <div className="grid lg:grid-cols-3 gap-8 items-stretch">
      
      {/* Featured Card (2 columns) */}
      <div className="lg:col-span-2">
        {blogs.length > 0 && (
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl h-full min-h-[480px]">

            <Image
              src={blogs[currentIndex]?.featuredImage || "/default.jpg"}
              alt={blogs[currentIndex]?.title || "Featured Blog"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
              <span className="inline-block bg-primary/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 text-xs font-semibold tracking-wide">
                {blogs[currentIndex]?.category || "Health"}
              </span>

              <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight line-clamp-2">
                {blogs[currentIndex]?.title || "Featured Insight"}
              </h3>

              <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-6">
                {blogs[currentIndex]?.excerpt ||
                  blogs[currentIndex]?.content?.substring(0, 120) + "..."}
              </p>

              <Link
                href={`/blogs/${createSlug(blogs[currentIndex]?.title)}-${blogs[currentIndex]?.id}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Read More →
              </Link>
            </div>

            {/* Indicators */}
            <div className="absolute top-6 right-6 flex gap-2 z-20">
              {blogs.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-white w-8 h-2"
                      : "bg-white/40 w-2 h-2 hover:bg-white/60"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subscribe Box */}
      <div className="lg:col-span-1">
        <div className="h-full min-h-[480px] bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-3xl p-8 shadow-2xl flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/80 mb-8 text-sm leading-relaxed">
            Subscribe to get the latest healthcare insights and wellness updates.
          </p>

          <form onSubmit={handleSubscribeSubmit} className="flex flex-col gap-4 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {success && (
            <div className="bg-green-500/20 border border-green-400/40 text-green-100 px-4 py-3 rounded-xl text-sm animate-fade-in">
              ✓ Successfully subscribed! Thank you for joining us.
            </div>
          )}
        </div>
      </div>

    </div>
  </div>
</section>


 <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Know Us */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Know Us</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {[
                "About Us",
                "Contact Us",
                "Press Coverage",
                "Careers",
                "Business Partnership",
                "Become a Health Partner",
                "Corporate Governance",
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-background transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Our Policies</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Editorial Policy",
                "User Manual",
                "Important Documents",
                "Required Documents",
                "Patient Form",
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-background transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {[
                "Features for Doctor",
                "Features for Hospital",
                "Features for Lab",
                "Features for HSP",
                "Features for Patient",
                "Features for Chemist",
                "Features for Health Worker",
                "Features for Pharma Manufacturers",
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-background transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect  */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
              <p className="text-sm text-background/70 mb-4">Follow Aarogya Insights for latest updates</p>

              {/* Social Icons */}
              <div className="flex gap-3 mb-8">
                {[Instagram, Facebook, Twitter, Linkedin, Youtube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="p-2 bg-background/10 hover:bg-background/20 rounded-lg transition-colors"
                  >
                    <Icon className="w-5 h-5 text-background" />
                  </a>
                ))}
              </div>

              {/* Subscribe Section  */}
              <div>
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Aarogya Insights</h4>
                <p className="text-background/70 text-sm mb-4">
                  Subscribe for weekly health insights.
                </p>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-background/10 text-background placeholder:text-background/50 text-sm border border-background/20 focus:border-background/50 focus:outline-none transition-colors"
                  />
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            </div>

            {/* Divider */}
            <div className="border-t border-background/20 py-8"></div>

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Compact Info Row */}
          <div className="w-full text-background/70 text-xs md:text-sm flex flex-col items-center md:items-start gap-1">

            {/* Row 1 */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1">
              <span>Government of India | Aarogya Insights</span>
              <span className="hidden md:inline">•</span>
              <span>ISO:27001 Certified</span>
              <span className="hidden md:inline">•</span>
              <span>Online Healthcare Platform</span>
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1">
              <span>Your Health, Your Choice</span>
              <span className="hidden md:inline">•</span>
              <span>+91 79-7272-7498</span>
              <span className="hidden md:inline">•</span>
              <span>info@aarogya.com</span>
            </div>

          </div>

          {/* Original Footer Text */}
          <p className="text-background/60 text-xs md:text-sm text-center md:text-left">
            © 2024 Aarogya Insights Pvt. Ltd. All rights reserved. IT Act, 2000 compliant.
          </p>

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 bg-background/10 hover:bg-background/20 rounded-lg transition-colors"
          >
            <ArrowUp className="w-5 h-5 text-background" />
          </button>
        </div>

        </div>
       </footer>
      </div>
     )
    }