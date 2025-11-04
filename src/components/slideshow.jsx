"use client"
import React, { useState, useEffect } from 'react'
import AllReviewPage from '../allreview'

const CustomerReviewPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Healthcare innovation images for slideshow
  const healthcareImages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Telemedicine Revolution",
      subtitle: "Connecting patients with doctors remotely"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "AI in Healthcare",
      subtitle: "Artificial intelligence transforming medical diagnosis"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Digital Health Records",
      subtitle: "Secure and accessible patient data management"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Robotic Surgery",
      subtitle: "Precision medicine with advanced robotics"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Wearable Health Tech",
      subtitle: "Monitor your health with smart devices"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Mental Health Innovation",
      subtitle: "Digital solutions for better mental wellness"
    }
  ]

  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      rating: 5,
      review: "This store has completely transformed how I shop for electronics. The interface is intuitive and the product quality is exceptional. I've purchased 5 items from them in the last month!",
      avatar: "SJ",
      verified: true,
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      company: "StartupXYZ",
      rating: 5,
      review: "The selection of electronics and accessories is outstanding. Everything arrived quickly and was exactly as described. Will definitely be shopping here again.",
      avatar: "MC",
      verified: true,
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      company: "Self-employed",
      rating: 5,
      review: "As a tech enthusiast, I'm always looking for quality accessories. This store has the best collection I've found online. Highly recommended!",
      avatar: "ER",
      verified: true,
      date: "3 days ago"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Marketing Director",
      company: "GrowthCo",
      rating: 4,
      review: "Great products at reasonable prices. The only minor issue was the shipping took a bit longer than expected, but the products were worth the wait.",
      avatar: "DT",
      verified: true,
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Student",
      company: "University",
      rating: 5,
      review: "Perfect for all my tech needs as a student. The prices are affordable and the quality is much better than I expected for the price.",
      avatar: "LW",
      verified: true,
      date: "1 week ago"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Consultant",
      company: "Wilson & Associates",
      rating: 5,
      review: "I've tried many online electronics stores, but this one stands out for its product quality and customer service. The delivery was fast and everything was well packaged.",
      avatar: "JW",
      verified: true,
      date: "4 days ago"
    }
  ]

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % healthcareImages.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, healthcareImages.length])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignIn = () => {
    window.location.href = '/auth/signin'
  }

  const handleGetStarted = () => {
    window.location.href = '/auth/signin'
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % healthcareImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + healthcareImages.length) % healthcareImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-heading-4 text-gray-900">Aarogya</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#insights" className="text-body text-gray-600 hover:text-gray-900 transition-colors">Insights</a>
              <a href="#innovation" className="text-body text-gray-600 hover:text-gray-900 transition-colors">Innovation</a>
              <a href="#about" className="text-body text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <button 
                onClick={handleSignIn}
                className="text-btn text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={handleGetStarted}
                className="text-btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#insights" className="text-body text-gray-600 hover:text-gray-900 transition-colors">Insights</a>
                <a href="#innovation" className="text-body text-gray-600 hover:text-gray-900 transition-colors">Innovation</a>
                <a href="#about" className="text-body text-gray-600 hover:text-gray-900 transition-colors">About</a>
                <button 
                  onClick={handleSignIn}
                  className="text-btn text-blue-600 hover:text-blue-700 transition-colors text-left"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleGetStarted}
                  className="text-btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-left"
                >
                  Learn More
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Healthcare Innovation Slideshow Section */}
      <section id="insights" className="relative py-8 md:py-12 bg-gradient-to-r from-gray-900 to-blue-900 text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Slideshow Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Slides - Carousel Style */}
            <div className="flex items-center justify-center space-x-4 md:space-x-6">
              {/* Previous Image */}
              <div className="hidden md:block opacity-50 scale-75 transition-all duration-500">
                <div className="w-64 h-48 rounded-xl overflow-hidden bg-gray-800/30 backdrop-blur-md border border-gray-700/30">
                  <img
                    src={healthcareImages[(currentSlide - 1 + healthcareImages.length) % healthcareImages.length]?.image}
                    alt="Previous"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Current Image - Highlighted */}
              <div className="relative scale-100 transition-all duration-500 z-10">
                <div className="w-80 md:w-96 h-60 md:h-72 rounded-xl overflow-hidden bg-gray-800/30 backdrop-blur-md border-2 border-yellow-400/50 shadow-2xl shadow-yellow-400/20">
                  <img
                    src={healthcareImages[currentSlide]?.image}
                    alt={`Healthcare Innovation ${healthcareImages[currentSlide]?.id}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with title if you have one */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
                    <div className="text-center">
                      <h3 className="text-heading-3 text-white mb-2">
                        {healthcareImages[currentSlide]?.title || "Healthcare Innovation"}
                      </h3>
                      <p className="text-body-small text-gray-300">
                        {healthcareImages[currentSlide]?.subtitle || "Advancing healthcare through technology"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Image */}
              <div className="hidden md:block opacity-50 scale-75 transition-all duration-500">
                <div className="w-64 h-48 rounded-xl overflow-hidden bg-gray-800/30 backdrop-blur-md border border-gray-700/30">
                  <img
                    src={healthcareImages[(currentSlide + 1) % healthcareImages.length]?.image}
                    alt="Next"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full p-4 transition-all duration-300 ease-in-out z-20 hover:scale-110 shadow-lg"
              aria-label="Previous innovation"
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full p-4 transition-all duration-300 ease-in-out z-20 hover:scale-110 shadow-lg"
              aria-label="Next innovation"
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {healthcareImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-500 ease-in-out ${
                    index === currentSlide 
                      ? 'w-8 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 scale-110' 
                      : 'w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-300 hover:scale-125'
                  }`}
                  aria-label={`View innovation ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {['all', 'telemedicine', 'ai', 'digital-health'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`text-label px-5 py-1.5 rounded-full transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All Topics' : filter === 'ai' ? 'AI' : filter === 'digital-health' ? 'Digital Health' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <AllReviewPage />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-heading-2 text-white mb-6">
            Ready to explore healthcare innovation?
          </h2>
          <p className="text-body-large text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover the latest healthcare insights, innovations, and stories that are shaping the future of medicine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="text-btn-large bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Explore Insights
            </button>
            <button 
              onClick={handleSignIn}
              className="text-btn-large border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-heading-4 text-white">Aarogya</span>
              </div>
              <p className="text-body-small text-gray-400">
                Your trusted source for healthcare insights and innovation stories.
              </p>
            </div>
            
            <div>
              <h3 className="text-heading-4 text-white mb-4">Topics</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-body hover:text-white transition-colors">Telemedicine</a></li>
                <li><a href="#" className="text-body hover:text-white transition-colors">AI in Healthcare</a></li>
                <li><a href="#" className="text-body hover:text-white transition-colors">Digital Health</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-heading-4 text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-body hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-body hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-body hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-heading-4 text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-body hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-body hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-body hover:text-white transition-colors">Admin Access</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-body-small text-gray-400">
              © 2024 Aarogya Insights. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CustomerReviewPage