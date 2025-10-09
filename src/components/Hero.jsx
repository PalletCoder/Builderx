import React, { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = ({ preloadedImages }) => {
  const heroRef = useRef()
  const imageRef = useRef()
  const containerRef = useRef()
  const textRef = useRef()
  const [currentText, setCurrentText] = useState('')
  const frameIndexRef = useRef(0)
  const currentTextRef = useRef('')
  const isAnimatingRef = useRef(false)

  // Text content for different scroll sections - very wide ranges for minimal changes
  const scrollTexts = [
    { start: 0, end: 0.33, text: "BUILDING THE FUTURE" },
    { start: 0.33, end: 0.66, text: "CRAFTING EXPERIENCES" },
    { start: 0.66, end: 1, text: "WELCOME TO BUILDER" }
  ]

  useGSAP(() => {
    if (!preloadedImages || preloadedImages.length === 0) return

    const heroElement = heroRef.current
    const imageElement = imageRef.current
    const containerElement = containerRef.current
    const textElement = textRef.current

    // Set initial frame and text
    if (preloadedImages[0]) {
      imageElement.src = preloadedImages[0].src
    }
    setCurrentText(scrollTexts[0].text)
    currentTextRef.current = scrollTexts[0].text

    // Create smooth frame animation object
    const frameAnimation = { frame: 0 }

    // Create scroll trigger for frame animation
    ScrollTrigger.create({
      trigger: containerElement,
      start: "top top",
      end: "bottom top", 
      scrub: 0.1,
      pin: heroElement,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const targetFrame = progress * (preloadedImages.length - 1)
        
        // Update text based on scroll progress with very gentle transitions
        const activeText = scrollTexts.find(item => 
          progress >= item.start && progress <= item.end
        )
        
        if (activeText && activeText.text !== currentTextRef.current && !isAnimatingRef.current) {
          isAnimatingRef.current = true
          currentTextRef.current = activeText.text
          
          // Very subtle text transition - barely noticeable
          gsap.timeline()
            .to(textElement, {
              opacity: 0.3,
              duration: 0.8,
              ease: "power1.inOut"
            })
            .call(() => {
              setCurrentText(activeText.text)
            })
            .to(textElement, {
              opacity: 1,
              duration: 1.2,
              ease: "power1.out",
              onComplete: () => {
                setTimeout(() => {
                  isAnimatingRef.current = false
                }, 500) // Longer delay between transitions
              }
            })
        }
        
        // Animate to the target frame smoothly
        gsap.to(frameAnimation, {
          frame: targetFrame,
          duration: 0.2,
          ease: "none",
          onUpdate: () => {
            const frameIndex = Math.floor(frameAnimation.frame)
            const clampedIndex = Math.max(0, Math.min(frameIndex, preloadedImages.length - 1))
            
            if (preloadedImages[clampedIndex] && clampedIndex !== frameIndexRef.current) {
              frameIndexRef.current = clampedIndex
              imageElement.src = preloadedImages[clampedIndex].src
            }
          }
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [preloadedImages])

  return (
    <div ref={containerRef} style={{ height: '800vh' }}>
      {/* Hero section that gets pinned */}
      <section 
        ref={heroRef} 
        className="w-screen h-screen overflow-hidden bg-black relative"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0">
          <img
            ref={imageRef}
            alt="Hero animation frame"
            className="w-full h-full object-cover transition-opacity duration-75 ease-out"
            style={{
              width: '100vw',
              height: '100vh',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
        </div>

        /* Animated Text Overlay - Ultra Gentle */
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 
              ref={textRef}
              className="text-6xl md:text-8xl font-bold text-white tracking-wider transition-all duration-1000 ease-in-out"
              style={{ 
                fontFamily: 'Arima',
                textShadow: '0 0 30px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.5)',
                willChange: 'opacity',
                filter: 'blur(0px)'
              }}
            >
              {currentText}
            </h1>
            <div className="mt-8 h-0.5 bg-white/20 mx-auto rounded-full overflow-hidden" style={{ width: '300px' }}>
              <div 
                className="h-full bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-500 ease-out rounded-full"
                style={{ 
                  width: `${(frameIndexRef.current / 719) * 100}%`,
                  boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2 tracking-wide" style={{ fontFamily: 'Arima' }}>
              SCROLL TO EXPLORE
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero