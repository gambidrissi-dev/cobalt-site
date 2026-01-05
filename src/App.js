import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useCobaltData } from './hooks/useCobaltData';
import { architectureExpertises, shopCollections } from './data/staticData';

// Layout & UI
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ContactModal from './components/ui/ContactModal';
import { DotGridBackground } from './components/ui/CobaltComponents';
import PageTransition from './components/ui/PageTransition';

// Pages
import CobaltPlus from './pages/CobaltPlus';
import Atelier from './pages/Atelier';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import AtelierSavoirFaire from './pages/AtelierSavoirFaire';
import Eshop from './pages/Eshop';
import CollectionDetail from './pages/CollectionDetail';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import MemberDetail from './pages/MemberDetail';
import Media from './pages/Media';
import ArticleDetail from './pages/ArticleDetail';
import Asso from './pages/Asso';
import AssoDetail from './pages/AssoDetail';
import Home from './pages/Home';

function AnimatedRoutes({ projects, activeExpertises, products, articles, shopCollections, team, home, onOpenContact }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={
          <PageTransition>
            <Home homeContent={home} projects={projects} products={products} articles={articles} onOpenContact={onOpenContact} />
          </PageTransition>
        } />
        
        {/* COBALT + */}
        <Route path="/cobalt-plus" element={<PageTransition><CobaltPlus /></PageTransition>} />
        <Route path="/projets" element={<PageTransition><Projects projects={projects} expertises={activeExpertises} /></PageTransition>} />
        <Route path="/projet/:id" element={<PageTransition><ProjectDetail projects={projects} /></PageTransition>} />
        <Route path="/prestations" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/prestation/:id" element={<PageTransition><ServiceDetail /></PageTransition>} />

        {/* ATELIER */}
        <Route path="/atelier" element={<PageTransition><Atelier /></PageTransition>} />
        <Route path="/atelier-savoir-faire" element={<PageTransition><AtelierSavoirFaire /></PageTransition>} />
        
        {/* ESHOP */}
        <Route path="/eshop" element={<PageTransition><Eshop products={products} collections={shopCollections} /></PageTransition>} />
        <Route path="/collection/:id" element={<PageTransition><CollectionDetail collections={shopCollections} products={products} /></PageTransition>} />
        <Route path="/produit/:id" element={<PageTransition><ProductDetail products={products} /></PageTransition>} />
        
        {/* MEDIA & ASSO & AGENCE */}
        <Route path="/media" element={<PageTransition><Media articles={articles} /></PageTransition>} />
        <Route path="/article/:id" element={<PageTransition><ArticleDetail articles={articles} /></PageTransition>} />
        
        <Route path="/asso" element={<PageTransition><Asso onOpenContact={onOpenContact} /></PageTransition>} />
        <Route path="/asso/:id" element={<PageTransition><AssoDetail onOpenContact={onOpenContact} /></PageTransition>} />
        
        <Route path="/about" element={<PageTransition><About team={team} /></PageTransition>} />
        <Route path="/equipe/:id" element={<PageTransition><MemberDetail team={team} /></PageTransition>} />

      </Routes>
    </AnimatePresence>
  );
}

function CobaltApp() {
  const location = useLocation();
  const { projects, products, articles, team, home } = useCobaltData();
  const [showContactModal, setShowContactModal] = useState(false);

  // --- LOGIQUE DE THÈME ---
  const getPageTheme = () => {
    const path = location.pathname;
    
    // CAS BLEU (Page Asso) -> Navbar NOIRE
    if (path.startsWith('/asso')) return { 
        bg: 'bg-[#2433FF]', 
        text: 'text-white', 
        navBg: 'bg-[#0A0A0C]/90 border-white/20', // Navbar forcée NOIRE
        navText: 'text-white',
        showDots: false, 
        selection: 'selection:bg-white selection:text-[#2433FF]' 
    };

    // CAS MEDIA (Page Blanche) -> Navbar NOIRE
    if (path.startsWith('/media') || path.startsWith('/article')) return { 
        bg: 'bg-white', 
        text: 'text-black', // Contenu noir
        navBg: 'bg-[#0A0A0C]/90 border-white/10', // Navbar forcée NOIRE
        navText: 'text-white', // Menu blanc
        showDots: false, 
        selection: 'selection:bg-[#2433FF] selection:text-white' 
    };

    // CAS PAR DÉFAUT (Tout le reste) -> Noir
    return { 
        bg: 'bg-[#0A0A0C]', 
        text: 'text-white', 
        navBg: 'bg-[#0A0A0C]/90 border-white/10', 
        navText: 'text-white',
        showDots: true, 
        selection: 'selection:bg-[#2433FF] selection:text-white' 
    };
  };

  const theme = getPageTheme();

  // --- CALCUL EXPERTISES ---
  const uniqueCategories = projects ? [...new Set(Object.values(projects).map(p => p.category))].filter(Boolean) : [];
  const dynamicExpertises = uniqueCategories.map(cat => {
    const firstProject = Object.values(projects).find(p => p.category === cat);
    const count = Object.values(projects).filter(p => p.category === cat).length;
    return {
      id: cat,
      title: cat,
      subtitle: "DOMAINE D'EXPERTISE",
      image: firstProject?.images?.hero || "",
      description: `Découvrez nos ${count} projets réalisés dans le secteur ${cat}.`,
      count: `${count} Projet${count > 1 ? 's' : ''}`
    };
  });
  const activeExpertises = dynamicExpertises.length > 0 ? dynamicExpertises : architectureExpertises;

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} ${theme.selection} transition-colors duration-700 ease-in-out relative overflow-hidden`}>
      <CustomCursor />
      
      {theme.showDots && <DotGridBackground />}
      
      {/* NAVBAR */}
      {/* 1. Fond Noir Constant (via navBg) */}
      <div className={`fixed top-0 left-0 w-full h-20 backdrop-blur-sm z-40 border-b transition-all duration-700 ${theme.navBg}`} />
      
      {/* 2. Texte Blanc Constant (via navText) */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-colors duration-700 ${theme.navText}`}>
          <Header onOpenContact={() => setShowContactModal(true)} />
      </div>
      
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
      
      <main className="pt-24 min-h-screen relative z-10">
        <AnimatedRoutes 
          home={home}
          projects={projects}
          activeExpertises={activeExpertises}
          products={products}
          articles={articles}
          shopCollections={shopCollections}
          team={team}
          onOpenContact={() => setShowContactModal(true)}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Nothing+You+Could+Do&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #0A0A0C; color: white; overflow-x: hidden; cursor: none; }
        a, button, input, textarea, .clickable { cursor: none; }
        .cobalt-heading { font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
        .cobalt-handwritten { font-family: 'Nothing You Could Do', cursive; font-weight: 400; }
        .cobalt-btn-primary { padding: 0.75rem 2rem; background: #2433FF; border: 1px solid #2433FF; color: white; font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.75rem; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; }
        .cobalt-btn-primary:hover { background: transparent; color: #2433FF; }
        .cobalt-btn { padding: 0.75rem 2rem; border: 1px solid rgba(255,255,255,0.3); color: white; font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.75rem; transition: all 0.2s ease; background: transparent; display: flex; align-items: center; justify-content: center; }
        .cobalt-btn:hover { background: white; color: #0A0A0C; border-color: white; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; background-color: transparent !important; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .glass { backdrop-filter: blur(12px); background: rgba(10, 10, 12, 0.8); border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
      `}</style>
      <CobaltApp />
    </Router>
  );
}