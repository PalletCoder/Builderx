import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import FeaturedProjects from '../components/FeaturedProjects'
import AboutCompany from '../components/AboutCompany'
import Footer from '../components/Footer'

const Home = ({ preloadedImages }) => {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <main id="home">
        <Hero preloadedImages={preloadedImages} />
      </main>
      
      {/* Services Section */}
      <Services />
      
      {/* Featured Projects Section */}
      <FeaturedProjects />
      
      {/* About Company Section */}
      <AboutCompany />
      
      {/* Footer */}
      <Footer />
    </>
  )
}

export default Home