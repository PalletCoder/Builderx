import React, { useState, useEffect } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuItemClick = (sectionId) => {
    setIsMenuOpen(false)
    // Smooth scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const menuItems = [
    { label: 'HOME', id: 'home', delay: '0ms' },
    { label: 'GALLERY', id: 'gallery', delay: '100ms' },
    { label: 'PROJECTS', id: 'projects', delay: '200ms' },
    { label: 'CONTACT', id: 'contact', delay: '300ms' }
  ]

  return (
    <>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled 
            ? 'shadow-lg shadow-black/5' 
            : 'shadow-none'
        }`}
        style={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'transparent'
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="relative z-60">
              <h1 className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: 'Arima' }}>
                BUILDER
              </h1>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="relative z-60 w-10 h-10 flex flex-col justify-center items-center group focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-4 flex flex-col justify-between">
                <span 
                  className={`block h-0.5 bg-white transition-all duration-300 ease-out origin-center ${
                    isMenuOpen 
                      ? 'rotate-45 translate-y-1.5' 
                      : 'rotate-0 translate-y-0'
                  }`}
                />
                <span 
                  className={`block h-0.5 bg-white transition-all duration-300 ease-out ${
                    isMenuOpen 
                      ? 'opacity-0 scale-0' 
                      : 'opacity-100 scale-100'
                  }`}
                />
                <span 
                  className={`block h-0.5 bg-white transition-all duration-300 ease-out origin-center ${
                    isMenuOpen 
                      ? '-rotate-45 -translate-y-1.5' 
                      : 'rotate-0 translate-y-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay Menu */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-700 ease-out ${
          isMenuOpen 
            ? 'visible opacity-100' 
            : 'invisible opacity-0'
        }`}
      >
        {/* Background */}
        <div 
          className={`absolute inset-0 bg-[#D6CBBC] transition-all duration-700 ease-out ${
            isMenuOpen 
              ? 'opacity-95' 
              : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative z-50 h-full flex items-center justify-center">
          <nav className="text-center">
            {/* Main Menu Items */}
            <ul className="space-y-8">
              {menuItems.map((item, index) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`block text-black text-6xl font-bold tracking-wider transition-all duration-500 ease-out transform hover:scale-110 hover:text-gray-800 focus:outline-none ${
                      isMenuOpen 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-10 opacity-0'
                    }`}
                    style={{ 
                      fontFamily: 'Arima',
                      transitionDelay: isMenuOpen ? item.delay : '0ms'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Decorative Line */}
            <div 
              className={`w-32 h-0.5 bg-black mx-auto mt-16 transition-all duration-700 ease-out transform ${
                isMenuOpen 
                  ? 'scale-x-100 opacity-100' 
                  : 'scale-x-0 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
            />

            {/* Social Links or Additional Info */}
            <div 
              className={`mt-16 transition-all duration-700 ease-out transform ${
                isMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '500ms' : '0ms' }}
            >
              <p className="text-gray-900 text-lg tracking-wide" style={{ fontFamily: 'Arima' }}>
                Crafting Digital Excellence
              </p>
            </div>
          </nav>
        </div>

        {/* Close hint */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out ${
            isMenuOpen 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: isMenuOpen ? '600ms' : '0ms' }}
        >
          <p className="text-gray-700 text-sm tracking-wider">
            Click anywhere to close
          </p>
        </div>
      </div>
    </>
  )
}

export default Header