import React from 'react';
import { motion } from 'framer-motion';

// Définition de l'animation (Fade Up élégant)
const variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    filter: "blur(10px)" // Petit flou artistique au début
  },
  enter: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] // Courbe de bézier "Apple-like" (très fluide)
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}