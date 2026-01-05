import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Layers, Hammer } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

// MODIFICATION 1 : On ajoute homeContent dans les props reçues
export default function Home({ projects, articles, homeContent, onOpenContact }) {
  
  const choiceRef = useRef(null);

  const scrollToChoice = () => {
    choiceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const latestProject = projects ? Object.values(projects)[0] : null;
  const latestArticle = articles ? articles[0] : null;

  // --- MODIFICATION 2 : DÉFINITION DES TEXTES (Strapi VS Défaut) ---
  
  // Pour le titre, on garde ton super design (Gradient) par défaut.
  // Mais si tu mets un titre dans Strapi, il remplacera tout le bloc.
  const heroTitle = homeContent?.heroTitle ? (
    homeContent.heroTitle
  ) : (
    <>
      CONSTRUIRE<br/>
      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
        L'INVISIBLE.
      </span>
    </>
  );

  const subtitle = homeContent?.heroSubtitle || "\"Manifeste du réel\"";
  
  const agencyText = homeContent?.agencyText || "Bureau d'étude, conception architecturale et maîtrise d'œuvre pour vos projets d'habitat et commerciaux.";
  
  const atelierText = homeContent?.atelierText || "Laboratoire de fabrication, prototypage sur-mesure et édition d'objets disponibles sur notre E-Shop.";


  return (
    <div className="animate-fade-in bg-[#0A0A0C] min-h-screen text-white selection:bg-[#2433FF] selection:text-white overflow-x-hidden">
      
      {/* =========================================
          1. HERO SECTION
          ========================================= */}
      <div className="h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 relative border-b border-white/10">
         
         {/* SOUS-TITRE DYNAMIQUE */}
         <span className="cobalt-handwritten text-[#2433FF] text-xl md:text-3xl mb-4 rotate-[-4deg] block">
            {subtitle}
         </span>

         {/* TITRE PRINCIPAL DYNAMIQUE */}
         <h1 className="cobalt-heading text-5xl md:text-9xl leading-[0.9] tracking-tighter mb-8 md:mb-12">
           {heroTitle}
         </h1>

         {/* BOUTON D'ACTION */}
         <button 
            onClick={scrollToChoice}
            className="group bg-[#2433FF] text-white px-6 py-3 md:px-8 md:py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 text-xs md:text-sm"
         >
            Choisir son univers <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
         </button>

         {/* Petit indicateur de scroll en bas */}
         <div className="absolute bottom-8 animate-bounce opacity-50 flex flex-col items-center gap-2">
            <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em]">Scroll</span>
         </div>
      </div>


      {/* =========================================
          2. SECTION AIGUILLAGE
          ========================================= */}
      <div ref={choiceRef} className="bg-[#0A0A0C] py-16 md:py-32 border-b border-white/10">
         <div className="max-w-7xl mx-auto px-4 md:px-6">
            
            {/* Intro de section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-white/10 pb-8">
               <div className="mb-6 md:mb-0">
                  <span className="text-[#2433FF] font-bold uppercase tracking-widest text-xs mb-2 block">Notre Approche</span>
                  <h2 className="cobalt-heading text-4xl md:text-5xl leading-tight">Deux Pôles,<br/>Une Vision.</h2>
               </div>
               <p className="text-gray-400 max-w-md text-sm leading-relaxed md:text-right">
                  Nous avons scindé notre activité pour mieux vous servir. 
                  L'architecture d'un côté, la création d'objets de l'autre.
               </p>
            </div>

            {/* LES DEUX PORTES - RESPONSIVE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-px bg-transparent md:bg-white/10 md:border md:border-white/10">
               
               {/* --- PORTE GAUCHE : COBALT + --- */}
               <Link to="/cobalt-plus" className="group relative bg-[#0F0F11] min-h-[50vh] md:h-[60vh] p-8 md:p-12 flex flex-col justify-between overflow-hidden hover:bg-[#151518] transition-colors border border-white/10 md:border-none">
                  
                  <div className="absolute top-8 right-8 md:top-12 md:right-12 text-[#2433FF] opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                     <Layers strokeWidth={1} className="w-24 h-24 md:w-32 md:h-32" />
                  </div>
                  
                  <span className="font-mono text-gray-600 text-xs md:text-sm mb-4 block">01 / ARCHITECTURE</span>

                  <div className="relative z-10 mt-auto">
                     <h3 className="cobalt-heading text-4xl md:text-6xl mb-4 md:mb-6 group-hover:text-[#2433FF] transition-colors">COBALT +</h3>
                     
                     {/* TEXTE DYNAMIQUE AGENCE */}
                     <p className="text-gray-400 max-w-sm text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                        {agencyText}
                     </p>
                     
                     <span className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white border-b border-white/30 pb-2 group-hover:border-[#2433FF] group-hover:text-[#2433FF] transition-all">
                        Explorer les projets <ArrowRight className="w-4 h-4" />
                     </span>
                  </div>
               </Link>


               {/* --- PORTE DROITE : ATELIER --- */}
               <Link to="/atelier" className="group relative bg-[#0F0F11] min-h-[50vh] md:h-[60vh] p-8 md:p-12 flex flex-col justify-between overflow-hidden hover:bg-[#151518] transition-colors border border-white/10 md:border-none">
                  
                  <div className="absolute top-8 right-8 md:top-12 md:right-12 text-white opacity-10 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500">
                     <Hammer strokeWidth={1} className="w-24 h-24 md:w-32 md:h-32" />
                  </div>

                  <span className="font-mono text-gray-600 text-xs md:text-sm mb-4 block">02 / DESIGN & OBJET</span>

                  <div className="relative z-10 mt-auto">
                     <h3 className="cobalt-heading text-4xl md:text-6xl mb-4 md:mb-6 group-hover:text-white transition-colors">L'ATELIER</h3>
                     
                     {/* TEXTE DYNAMIQUE ATELIER */}
                     <p className="text-gray-400 max-w-sm text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                        {atelierText}
                     </p>
                     
                     <span className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white border-b border-white/30 pb-2 group-hover:border-white transition-all">
                        Entrer dans l'atelier <ArrowRight className="w-4 h-4" />
                     </span>
                  </div>
               </Link>

            </div>
         </div>
      </div>


      {/* =========================================
          3. ACTUALITÉS
          ========================================= */}
      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
         <div className="flex justify-between items-end mb-8 md:mb-12">
            <h3 className="text-white text-lg md:text-xl font-bold uppercase tracking-widest">À la une</h3>
            <Link to="/media" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#2433FF] transition-colors">
               Voir tout le média
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ... Reste inchangé car déjà connecté via 'projects' et 'articles' ... */}
            
            {latestProject && (
               <ScrollAnimation animation="slide-up">
                  <Link to={`/projet/${latestProject.id}`} className="group block bg-[#0F0F11] border border-white/10 p-4 md:p-6 hover:border-[#2433FF] transition-all">
                     <div className="aspect-[16/9] overflow-hidden mb-4 md:mb-6 bg-gray-900 relative">
                        <img src={latestProject.images.hero} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute top-4 left-4 bg-[#2433FF] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                           Nouveau Projet
                        </div>
                     </div>
                     <h4 className="cobalt-heading text-2xl md:text-3xl mb-2">{latestProject.title}</h4>
                     <p className="text-gray-400 text-xs md:text-sm font-mono">{latestProject.category} — {latestProject.location}</p>
                  </Link>
               </ScrollAnimation>
            )}

            <ScrollAnimation animation="slide-up" delay={100}>
               {latestArticle ? (
                  <Link to={`/article/${latestArticle.id}`} className="group h-full flex flex-col justify-between bg-[#0F0F11] border border-white/10 p-6 md:p-8 hover:bg-white hover:text-black transition-all duration-500">
                     <div className="mb-8">
                        <span className="text-[#2433FF] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 block">Dernière Actualité</span>
                        <h4 className="cobalt-heading text-3xl md:text-4xl mb-4 md:mb-6 leading-tight group-hover:translate-x-2 transition-transform">{latestArticle.title}</h4>
                        <p className="text-gray-500 group-hover:text-black/70 line-clamp-3 text-sm">{latestArticle.intro}</p>
                     </div>
                     <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Lire l'article <ArrowRight className="w-4 h-4" />
                     </div>
                  </Link>
               ) : (
                  <div className="h-full flex flex-col justify-center items-center text-center bg-[#0F0F11] border border-white/10 p-8">
                     <h4 className="cobalt-heading text-2xl md:text-3xl mb-4">Un projet en tête ?</h4>
                     <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm">Discutons de vos ambitions architecturales.</p>
                     <button onClick={onOpenContact} className="cobalt-btn-primary text-xs">
                        Prendre rendez-vous
                     </button>
                  </div>
               )}
            </ScrollAnimation>

         </div>
      </div>
    </div>
  );
}