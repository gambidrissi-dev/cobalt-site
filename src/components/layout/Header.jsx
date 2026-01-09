import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// On reçoit 'navigation' (tableau qui vient de Strapi)
export default function Header({ onOpenContact, navigation }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // --- LOGIQUE DE MENU ---
  // 1. Liste de secours (Fallback) : SI Strapi ne répond pas, on utilise ça.
  // J'ai bien ENLEVÉ 'Prestations' ici.
  const fallbackLinks = [
    { label: 'Cobalt +', url: '/cobalt-plus' },
    { label: "L'Atelier", url: '/atelier' },
    { label: 'Média', url: '/media' },
    { label: 'Association', url: '/asso' },
    { label: 'Agence', url: '/about' },
  ];

  // 2. Priorité à Strapi : Si 'navigation' contient des choses, on l'utilise.
  // On adapte les noms de champs (souvent 'label'/'url' ou 'title'/'path' dans Strapi, à vérifier dans ton log)
  let activeLinks = fallbackLinks;

  if (navigation && navigation.length > 0) {
      activeLinks = navigation.map(item => ({
          label: item.label || item.title || item.name, // On essaie plusieurs clés classiques
          url: item.url || item.path || item.link || '/'
      }));
  }

  // Fonction pour gérer le clic (spécial pour Contact)
  const handleLinkClick = (e, link) => {
      // Si le label contient "Contact" (insensible à la casse), on ouvre la modale
      if (link.label.toLowerCase().includes('contact')) {
          e.preventDefault();
          onOpenContact();
          setIsMobileMenuOpen(false);
      }
  };

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 py-6 max-w-[1920px] mx-auto h-20">
        
        {/* LOGO */}
        <Link to="/" className="relative z-[60] group">
          <span className="font-black text-xl md:text-2xl tracking-tighter uppercase">
            Collectif<span className="text-[#2433FF] group-hover:text-white transition-colors duration-300">.</span>Cobalt
          </span>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {activeLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.url} 
              onClick={(e) => handleLinkClick(e, link)}
              className={`text-xs font-bold uppercase tracking-widest hover:text-[#2433FF] transition-colors relative
                ${location.pathname === link.url ? 'text-[#2433FF]' : 'text-white'}
              `}
            >
              {link.label}
              {location.pathname === link.url && (
                <span className="absolute -bottom-2 left-0 w-full h-px bg-[#2433FF]" />
              )}
            </Link>
          ))}
          
          {/* Le bouton Contact "Fixe" reste là en plus, sauf si tu veux l'enlever */}
          <button 
            onClick={onOpenContact}
            className="border border-white/30 px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Contact
          </button>
        </nav>

        {/* BOUTON HAMBURGER */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-[60] p-2 -mr-2 text-white hover:text-[#2433FF] transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

      </header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-[#0A0A0C] flex flex-col justify-center px-6 md:hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <h2 className="text-9xl font-black outline-text text-white">MENU</h2>
            </div>

            <nav className="flex flex-col gap-8 relative z-10">
              {activeLinks.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                >
                  <Link 
                    to={link.url}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="cobalt-heading text-5xl text-white hover:text-[#2433FF] hover:pl-4 transition-all duration-300 block"
                  >
                    {link.label}
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