// src/components/MaskRevealFooter.jsx

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const maskRef = useRef(null);

  useGSAP(() => {
    gsap.to(maskRef.current, {
      attr: { r: 500 }, // Animate the radius of the circle
      ease: 'none',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.8,
      },
    });
  }, { scope: footerRef });

  return (
    <div ref={footerRef} className="relative h-[150vh] bg-[#D6CBBC]">
      {/* This SVG is fixed to the viewport and contains the mask definition */}
      <svg className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <defs>
          <clipPath id="footerMask">
            {/* The circle starts with a radius of 0 and expands on scroll */}
            <circle ref={maskRef} cx="50%" cy="50%" r="0" fill="white" />
          </clipPath>
        </defs>
      </svg>
      
      {/* This is the footer content that will be masked. It's sticky so it stays in place during the reveal */}
      <div 
        className="sticky top-0 w-full h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center"
        style={{ clipPath: 'url(#footerMask)' }}
      >
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">Let's Build the Future.</h2>
          <p className="text-xl text-gray-400 mb-8">Ready to start a project? We are too.</p>
          <button className="bg-gradient-to-r from-[#D6CBBC] to-[#8B7355] text-black px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
            Get a Quote
          </button>
          <p className="mt-16 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Fayaz Khan Studio
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;