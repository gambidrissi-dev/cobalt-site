// src/components/ui/CobaltComponents.jsx
import React, { useState, useEffect, useRef } from 'react';

// Carte standard avec effet de bordure
export const CobaltCard = ({ children, className, onClick }) => (
  <div 
    onClick={onClick} 
    className={`cobalt-card clickable relative overflow-hidden group transition-all duration-300 ease-out ${className || ''}`}
  >
    {children}
  </div>
);

// Animation d'apparition au scroll
export const ScrollAnimation = ({ children, animation = "fade", delay = 0, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { 
        if (entry.isIntersecting) { 
            setIsVisible(true); 
            observer.unobserve(entry.target); 
        } 
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getAnimationClass = () => isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  
  return (
    <div 
        ref={ref} 
        className={`transition-all duration-500 ease-out ${getAnimationClass()} ${className || ''}`} 
        style={{ transitionDelay: `${delay}ms` }}
    >
        {children}
    </div>
  );
};

// Fond à points (Grid)
export const DotGridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]">
    <svg className="w-full h-full" width="100%" height="100%">
      <defs>
        <pattern id="dot-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  </div>
);