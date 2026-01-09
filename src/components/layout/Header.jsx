import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header({ onOpenContact }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu automatiquement quand on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // --- MODIFICATION ICI : AJOUT DU LIEN PRESTATIONS ---
  const navLinks = [
    { name: 'Cobalt +', path: '/cobalt-plus' },
    { name: "L'Atelier", path: '/atelier' },
    { name: 'Prestations', path: '/prestations' }, // <--- NOUVEAU LIEN
    { name: 'Média', path: '/media' },
    { name: 'Association', path: '/asso' },
    { name: 'Agence', path: '/about' },
  ];

  return (
    <>
      {/* --- BARRE DE NAVIGATION (Visible tout le temps) --- */}
      <header className="w-full flex items-center justify-between px-6 py-6 max-w-[1920px] mx-auto h-20">
        
        {/* LOGO */}
        <Link to="/" className="relative z-[60] group">
          <span className="font-black text-xl md:text-2xl tracking-tighter uppercase">
            Collectif<span className="text-[#2433FF] group-hover:text-white transition-colors duration-300">.</span>Cobalt
          </span>
        </Link>

        {/* NAVIGATION DESKTOP (Cachée sur Mobile) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-xs font-bold uppercase tracking-widest hover:text-[#2433FF] transition-colors relative
                ${location.pathname === link.path ? 'text-[#2433FF]' : 'text-white'}
              `}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute -bottom-2 left-0 w-full h-px bg-[#2433FF]" />
              )}
            </Link>
          ))}
          
          <button 
            onClick={onOpenContact}
            className="border border-white/30 px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Contact
          </button>
        </nav>

        {/* BOUTON HAMBURGER (Visible uniquement sur Mobile) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-[60] p-2 -mr-2 text-white hover:text-[#2433FF] transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

      </header>

      {/* --- MENU MOBILE PLEIN ÉCRAN (Overlay) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-[#0A0A0C] flex flex-col justify-center px-6 md:hidden"
          >
            {/* Décoration de fond */}
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <h2 className="text-9xl font-black outline-text text-white">MENU</h2>
            </div>

            <nav className="flex flex-col gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                >
                  <Link 
                    to={link.path} 
                    className="cobalt-heading text-5xl text-white hover:text-[#2433FF] hover:pl-4 transition-all duration-300 block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-8 border-t border-white/10 mt-4"
              >
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onOpenContact(); }}
                  className="flex items-center gap-4 text-xl font-light text-gray-400 hover:text-white transition-colors"
                >
                  Nous contacter <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </nav>
            
            {/* Infos Footer Mobile */}
            <div className="absolute bottom-12 left-6 text-xs text-gray-500 font-mono">
              <p>Biarritz & Bordeaux</p>
              <p>Copyright {new Date().getFullYear()}</p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}