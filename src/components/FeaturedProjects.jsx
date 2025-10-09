import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

// ProjectCard Component
const ProjectCard = (props) => {
    return (
        <>
            <div className='w-full group transition-all duration-700 ease-out relative rounded-none hover:rounded-[70px] overflow-hidden h-full mb-2 hover:scale-105 hover:shadow-2xl'>
                <img className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110' src={props.image1} alt="" />
                <div className='opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 absolute top-0 flex items-center justify-center left-0 h-full w-full bg-black/15 backdrop-blur-sm'>
                    <h2 className='uppercase text-3xl border-4 pt-4 px-8 text-white border-white rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-black'>View Project</h2>
                </div>
            </div>
            <div className='w-full group transition-all duration-700 ease-out relative rounded-none hover:rounded-[70px] overflow-hidden h-full hover:scale-105 hover:shadow-2xl'>
                <img className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110' src={props.image2} alt="" />
                <div className='opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 absolute top-0 flex items-center justify-center left-0 h-full w-full bg-black/15 backdrop-blur-sm'>
                    <h2 className='uppercase text-3xl border-4 pt-4 px-8 text-white border-white rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-black'>View Project</h2>
                </div>
            </div>
        </>
    )
}

// Main FeaturedProjects Component
const FeaturedProjects = () => {

  const projects = [{
    image1: 'https://cdn.wallpapersafari.com/75/67/trGCUL.jpg',
    image2: 'https://img.freepik.com/premium-photo/modern-luxury-villa-with-pool-photography-8k-hd-ultra-detailed_897093-944.jpg'
  }, {
    image1: 'https://i.pinimg.com/originals/75/78/3a/75783af96bc1d9d3cb86d26a87513765.jpg',
    image2: 'https://tse2.mm.bing.net/th/id/OIP.ACH8wQ1LLb3VaKFql444TQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3'
  }, {
    image1: 'https://wallpapercave.com/wp/wp7111654.jpg',
    image2: 'https://tse3.mm.bing.net/th/id/OIP.6PB6I2I_7ZzpOjvX7Lk_EwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3'
  }]

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(function () {
    // Smoother animation with gentle scaling and opacity
    gsap.fromTo('.hero', {
      height: '150px',
      opacity: 0.4,
      scale: 0.95,
      y: 50
    }, {
      height: '700px',
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.lol',
        start: 'top 90%',
        end: 'top 10%',
        scrub: 1.5,
        toggleActions: 'play none none reverse'
      }
    })
  })

  return (
    <section 
      className='relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24'
      style={{ 
        background: 'linear-gradient(135deg, #D6CBBC 0%, #E8DFD0 25%, #F5F0E8 50%, #E8DFD0 75%, #D6CBBC 100%)',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '100px'
      }}
    >
      {/* Header matching services style - Fixed position */}
      <div className="text-center mb-16 relative z-10">
        <h1 
          className="text-5xl font-bold text-[#333] uppercase tracking-widest mb-4"
          style={{ 
            letterSpacing: '0.2em',
            fontSize: 'clamp(2.5rem, 5vw, 3rem)'
          }}
        >
          FEATURED PROJECTS
        </h1>
        <p className="text-lg text-[#666] max-w-[600px] mx-auto">
          Showcasing our finest architectural visualizations and design innovations that bring visions to life.
        </p>
      </div>

      {/* Projects Grid - 3 in a row */}
      <div className='lol w-full max-w-[1400px]'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(function (elem, idx) {
            return (
              <div 
                key={idx} 
                className='hero w-full h-[900px] rounded-2xl overflow-hidden flex flex-col'
                style={{
                  boxShadow: '0 10px 30px rgba(214, 203, 188, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <ProjectCard image1={elem.image1} image2={elem.image2} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
