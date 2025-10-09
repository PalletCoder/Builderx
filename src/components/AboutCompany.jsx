import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutCompany = () => {
  const sectionRef = useRef();
  const contentRef = useRef();
  const buttonRef = useRef();

  useGSAP(() => {
    // Animate content on scroll
    gsap.fromTo(contentRef.current, 
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1
        }
      }
    );

    // Button hover animation
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  });

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      style={{
        backgroundImage: 'url(https://img.freepik.com/premium-photo/modern-luxury-villa-with-pool-photography-8k-hd-ultra-detailed_897093-944.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Curved Overlay */}
      <div className="absolute inset-0">
        <svg 
          className="absolute bottom-0 left-0 w-full h-full" 
          viewBox="0 0 1200 800" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,400 Q300,200 600,350 T1200,300 L1200,800 L0,800 Z" 
            fill="rgba(214, 203, 188, 0.9)"
          />
        </svg>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto px-8 py-20">
        <div 
          className="text-left p-8 rounded-3xl backdrop-blur-lg border border-white/20 shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          <h1 
            className="text-6xl md:text-7xl font-bold text-gray-900 uppercase tracking-wider mb-8 drop-shadow-lg"
            style={{ fontFamily: 'Arima, sans-serif' }}
          >
            EXPERT MINDS BEHIND OUR
            <br />
            <span className="text-[#5A4D42]">PROJECTS</span>
          </h1>
          
          <p className="text-xl text-gray-800 mb-12 leading-relaxed max-w-xl drop-shadow-md">
            Get to know the creative team behind our architectural success, a 
            dedicated team committed to innovation and excellence in 
            architectural rendering and digital solutions.
          </p>
          
          <button 
            ref={buttonRef}
            className="group relative inline-flex items-center gap-3 bg-white/20 backdrop-blur-md text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/30 hover:shadow-xl border border-white/30"
          >
            <span className="flex items-center gap-2">
              <span className="w-0 h-0 border-l-8 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></span>
              TAKE THE FIRST STEP
            </span>
          </button>
        </div>
      </div>

      {/* Additional curved element for depth */}
      <div className="absolute top-0 right-0">
        <svg 
          className="w-96 h-96 opacity-20" 
          viewBox="0 0 200 200"
        >
          <path 
            d="M20,20 Q80,10 150,40 Q180,70 170,130 Q160,180 100,170 Q40,160 20,100 Z" 
            fill="rgba(214, 203, 188, 0.3)"
          />
        </svg>
      </div>
    </section>
  );
};

export default AboutCompany;