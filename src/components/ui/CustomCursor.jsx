// src/components/ui/CustomCursor.jsx
import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);
   
  // Désactiver sur mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)").matches;

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      
      // Détection des éléments cliquables
      const target = e.target;
      const isClickable = target?.closest ? target.closest('a, button, [role="button"], .cursor-pointer, img, .clickable, input, .lucide, textarea') : false;
      setIsHoveringLink(!!isClickable);
    };

    const animate = () => {
      const ease = 0.4; 
      circle.current.x += (mouse.current.x - circle.current.x) * ease;
      circle.current.y += (mouse.current.y - circle.current.y) * ease;
      
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circle.current.x}px, ${circle.current.y}px) translate(-50%, -50%)`;
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isVisible, isMobile]);

  if (!isVisible || isMobile) return null;

  return (
    <>
      <div ref={dotRef} className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference`} />
      <div ref={circleRef} className={`fixed top-0 left-0 border rounded-full pointer-events-none z-[99999] transition-all duration-200 ease-out ${isHoveringLink ? 'w-14 h-14 border-[#2433FF] bg-[#2433FF]/20 scale-100 mix-blend-normal backdrop-blur-[1px]' : 'w-8 h-8 border-white/40 mix-blend-difference'}`} />
    </>
  );
};

export default CustomCursor;