import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import useFramePreloader from '../hooks/useFramePreloader'

const Loader = ({ onLoadComplete }) => {
  const containerRef = useRef()
  const { loadProgress, isLoading } = useFramePreloader()

  useGSAP(() => {
    const letters = containerRef.current.querySelectorAll('.letter')
    const percentage = containerRef.current.querySelector('.percentage')
    
    gsap.set([letters, percentage], { opacity: 0 })
    gsap.set(letters, { y: 100 })

    // Initial animation
    const tl = gsap.timeline()
    tl.to(percentage, { opacity: 1, duration: 0.5 }, 0)
      .to(letters, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.4)", stagger: 0.15 }, 0.3)
      .to(letters, { color: "#2C2C2C", duration: 0.3, stagger: 0.1 }, 1.5)
      .to(letters, { color: "#1A1A1A", duration: 0.3, stagger: 0.1 }, 2)
      .to(letters, { textShadow: "0 0 15px rgba(26, 26, 26, 0.6)", duration: 0.6, yoyo: true, repeat: -1 }, 1.5)

  }, { scope: containerRef })

  // Update percentage based on actual loading progress
  useEffect(() => {
    const percentage = containerRef.current?.querySelector('.percentage')
    if (percentage) {
      gsap.to(percentage, {
        innerHTML: Math.round(loadProgress) + "%",
        duration: 0.3,
        snap: { innerHTML: 1 }
      })
    }
  }, [loadProgress])

  // Handle completion and split animation
  useEffect(() => {
    if (!isLoading && loadProgress === 100) {
      setTimeout(() => {
        const letters = containerRef.current.querySelectorAll('.letter')
        const percentage = containerRef.current.querySelector('.percentage')
        
        // Split animation - letters move away from center
        const splitTl = gsap.timeline({
          onComplete: () => {
            if (onLoadComplete) onLoadComplete()
          }
        })
        
        // Split from middle: B,U,I go left, L,D,E,R go right
        splitTl.to([letters[0], letters[1], letters[2]], { 
          x: -300, 
          opacity: 0.3,
          duration: 1.2, 
          ease: "power2.inOut" 
        }, 0)
        .to([letters[3], letters[4], letters[5], letters[6]], { 
          x: 300, 
          opacity: 0.3,
          duration: 1.2, 
          ease: "power2.inOut" 
        }, 0)
        .to(percentage, { 
          opacity: 0, 
          y: 20, 
          duration: 0.8 
        }, 0.2)
      }, 1000)
    }
  }, [isLoading, loadProgress, onLoadComplete])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#D6CBBC] z-50">
      <div ref={containerRef} className="flex text-8xl font-light tracking-widest text-black" style={{ fontFamily: 'Arima' }}>
        {['B', 'U', 'I', 'L', 'D', 'E', 'R'].map((letter, i) => (
          <span key={i} className="letter">{letter}</span>
        ))}
        <div className="percentage absolute bottom-8 right-8 text-4xl font-bold text-black/80">0%</div>
      </div>
    </div>
  )
}

export default Loader
