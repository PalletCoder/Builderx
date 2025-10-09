import React, { useRef, useEffect, useState } from 'react'; // <-- FIX IS HERE
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Service = ({ serviceName, startFrame, endFrame }) => {
  const imageRef = useRef();
  const [preloadedImages, setPreloadedImages] = useState([]);
  const frameAnimation = useRef({ frame: 0 });

  // Preload images
  useEffect(() => {
    const images = [];
    let loadedCount = 0;
    const totalFrames = endFrame - startFrame + 1;
    
    for (let i = startFrame; i <= endFrame; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(4, '0');
      img.src = `/imgs/services/${serviceName}/${serviceName}_${frameNum}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        images[i - startFrame] = img;
        if (loadedCount === totalFrames) {
          setPreloadedImages([...images]);
        }
      };
      
      img.onerror = () => {
        console.warn(`Failed to load frame ${i} for ${serviceName}`);
        loadedCount++;
        if (loadedCount === totalFrames) {
          setPreloadedImages([...images]);
        }
      };
    }
  }, [serviceName, startFrame, endFrame]);

  // Hover animation
  const handleMouseEnter = () => {
    if (preloadedImages.length === 0) return;
    gsap.to(frameAnimation.current, {
      frame: preloadedImages.length - 1,
      snap: 'frame',
      ease: 'power2.inOut',
      duration: 2,
      onUpdate: () => {
        const frameIndex = Math.round(frameAnimation.current.frame);
        if (preloadedImages[frameIndex] && imageRef.current) {
          imageRef.current.src = preloadedImages[frameIndex].src;
        }
      },
    });
  };

  const handleMouseLeave = () => {
    if (preloadedImages.length === 0) return;
    gsap.to(frameAnimation.current, {
      frame: 0,
      snap: 'frame',
      ease: 'power2.inOut',
      duration: 2,
      onUpdate: () => {
        const frameIndex = Math.round(frameAnimation.current.frame);
        if (preloadedImages[frameIndex] && imageRef.current) {
          imageRef.current.src = preloadedImages[frameIndex].src;
        }
      },
    });
  };

  return (
    <div 
      className="service-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-service={serviceName}
    >
      <div className="service-image-container">
        <img 
          ref={imageRef}
          src={preloadedImages.length > 0 ? preloadedImages[0].src : `/imgs/services/${serviceName}/${serviceName}_${startFrame.toString().padStart(4, '0')}.jpg`}
          alt={serviceName}
        />
      </div>
      <div className="service-title">
        <h2>{serviceName === 'interior' ? 'Interior Rendering' : serviceName === 'architecture' ? 'Architectural Animation' : 'Exterior Rendering'}</h2>
      </div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef();
  
  const services = [
    { name: 'Interior Rendering', id: 'interior', startFrame: 1, endFrame: 107 },
    { name: 'Architectural Animation', id: 'architecture', startFrame: 305, endFrame: 450 },
    { name: 'Exterior Rendering', id: 'exterior', startFrame: 1, endFrame: 107 }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      gsap.set('.service-item', { 
        clipPath: 'inset(10% 30% 10% 30% round 25px)', 
        autoAlpha: 0,
        scale: 0.8
      });

      gsap.to('.service-item', {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        autoAlpha: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services-section">
      <div className="services-header">
        <h1>SERVICES</h1>
        <p>We craft bespoke solutions to meet the dynamic architectural design needs of today's businesses.</p>
      </div>
      <div className="services-wrapper">
        {services.map((service) => (
          <Service
            key={service.id}
            serviceName={service.id}
            startFrame={service.startFrame}
            endFrame={service.endFrame}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;