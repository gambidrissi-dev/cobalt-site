import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Layers, Hammer } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';
import { getStrapiMedia } from '../lib/strapi'; 

export default function Home({ projects, articles, homeContent, onOpenContact }) {
  
  const choiceRef = useRef(null);

  // --- 1. RÉCUPÉRATION SÉCURISÉE DES DONNÉES ---
  
  // A. Hero
  const hero = homeContent?.hero;

  // B. Blocks (Zone Dynamique)
  const blocks = homeContent?.blocks || [];

  // DEBUG : Décommente cette ligne si tu veux voir les noms exacts des composants dans ta console
  // console.log("Blocs disponibles :", blocks.map(b => b.__component));

  // C. Recherche des blocs (Insensible à la casse ou au préfixe 'sections.')
  const approcheData = blocks.find(b => b.__component?.toLowerCase().includes('approche'));
  const featuredData = blocks.find(b => b.__component?.toLowerCase().includes('featured') || b.__component?.toLowerCase().includes('une'));

  // D. Extraction des cartes
  const cardCobalt = approcheData?.cards?.[0];
  const cardAtelier = approcheData?.cards?.[1];

  // --- 3. NAVIGATION ---
  const scrollToChoice = () => {
    choiceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const latestProject = projects ? Object.values(projects)[0] : null;
  const latestArticle = articles ? articles[0] : null;

  // --- 4. RENDERERS (Titres par défaut) ---
  const heroTitle = hero?.titrePrincipal ? hero.titrePrincipal : (
    <>CONSTRUIRE<br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">L'INVISIBLE.</span></>
  );

  return (
    <div className="animate-fade-in bg-[#0A0A0C] min-h-screen text-white selection:bg-[#2433FF] selection:text-white overflow-x-hidden">
      
      {/* HERO SECTION */}
      <div className="h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 relative border-b border-white/10">
         <span className="cobalt-handwritten text-[#2433FF] text-xl md:text-3xl mb-4 rotate-[-4deg] block">
            {hero?.surTitre || "\"Manifeste du réel\""}
         </span>

         <h1 className="cobalt-heading text-5xl md:text-9xl leading-[0.9] tracking-tighter mb-8 md:mb-12">
           {heroTitle}
         </h1>

         <button onClick={scrollToChoice} className="group bg-[#2433FF] text-white px-6 py-3 md:px-8 md:py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 text-xs md:text-sm">
            {hero?.texteBouton || "Choisir son univers"} <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
         </button>

         <div className="absolute bottom-8 animate-bounce opacity-50 flex flex-col items-center gap-2">
            <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em]">Scroll</span>
         </div>
      </div>

      {/* SECTION APPROCHE */}
      <div ref={choiceRef} className="bg-[#0A0A0C] py-16 md:py-32 border-b border-white/10">
         <div className="max-w-7xl mx-auto px-4 md:px-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-white/10 pb-8">
               <div className="mb-6 md:mb-0">
                  <span className="text-[#2433FF] font-bold uppercase tracking-widest text-xs mb-2 block">
                      {approcheData?.topTag || "Notre Approche"}
                  </span>
                  <h2 className="cobalt-heading text-4xl md:text-5xl leading-tight whitespace-pre-line">
                      {approcheData?.mainTitle || "Deux Pôles,\nUne Vision."}
                  </h2>
               </div>
               <p className="text-gray-400 max-w-md text-sm leading-relaxed md:text-right">
                  {approcheData?.introText || "Nous avons scindé notre activité pour mieux vous servir. L'architecture d'un côté, la création d'objets de l'autre."}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-px bg-transparent md:bg-white/10 md:border md:border-white/10">
               
               {/* COBALT + */}
               <Link to="/cobalt-plus" className="group relative bg-[#0F0F11] min-h-[50vh] md:h-[60vh] p-8 md:p-12 flex flex-col justify-between overflow-hidden hover:bg-[#151518] transition-colors border border-white/10 md:border-none">
                  <div className="absolute top-8 right-8 md:top-12 md:right-12 text-[#2433FF] opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                     {cardCobalt?.icon?.data || cardCobalt?.icon?.url ? (
                         <img src={getStrapiMedia(cardCobalt.icon.url || cardCobalt.icon.data.attributes.url)} alt="" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
                     ) : (
                         <Layers strokeWidth={1} className="w-24 h-24 md:w-32 md:h-32" />
                     )}
                  </div>
                  
                  <span className="font-mono text-gray-600 text-xs md:text-sm mb-4 block">
                      {cardCobalt?.subtitle || "01 / ARCHITECTURE"}
                  </span>

                  <div className="relative z-10 mt-auto">
                     <h3 className="cobalt-heading text-4xl md:text-6xl mb-4 md:mb-6 group-hover:text-[#2433FF] transition-colors">
                         {cardCobalt?.title || "COBALT +"}
                     </h3>
                     <p className="text-gray-400 max-w-sm text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                         {cardCobalt?.description || "Bureau d'étude..."}
                     </p>
                     <span className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white border-b border-white/30 pb-2 group-hover:border-[#2433FF] group-hover:text-[#2433FF] transition-all">
                        {cardCobalt?.linkText || "Explorer les projets"} <ArrowRight className="w-4 h-4" />
                     </span>
                  </div>
               </Link>

               {/* L'ATELIER */}
               <Link to="/atelier" className="group relative bg-[#0F0F11] min-h-[50vh] md:h-[60vh] p-8 md:p-12 flex flex-col justify-between overflow-hidden hover:bg-[#151518] transition-colors border border-white/10 md:border-none">
                  <div className="absolute top-8 right-8 md:top-12 md:right-12 text-white opacity-10 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500">
                     {cardAtelier?.icon?.data || cardAtelier?.icon?.url ? (
                         <img src={getStrapiMedia(cardAtelier.icon.url || cardAtelier.icon.data.attributes.url)} alt="" className="w-24 h-24 md:w-32 md:h-32 object-contain invert" />
                     ) : (
                         <Hammer strokeWidth={1} className="w-24 h-24 md:w-32 md:h-32" />
                     )}
                  </div>

                  <span className="font-mono text-gray-600 text-xs md:text-sm mb-4 block">
                      {cardAtelier?.subtitle || "02 / DESIGN & OBJET"}
                  </span>

                  <div className="relative z-10 mt-auto">
                     <h3 className="cobalt-heading text-4xl md:text-6xl mb-4 md:mb-6 group-hover:text-white transition-colors">
                         {cardAtelier?.title || "L'ATELIER"}
                     </h3>
                     <p className="text-gray-400 max-w-sm text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                         {cardAtelier?.description || "Laboratoire de fabrication..."}
                     </p>
                     <span className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white border-b border-white/30 pb-2 group-hover:border-white transition-all">
                        {cardAtelier?.linkText || "Entrer dans l'atelier"} <ArrowRight className="w-4 h-4" />
                     </span>
                  </div>
               </Link>

            </div>
         </div>
      </div>

      {/* SECTION FEATURED (A LA UNE) */}
      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
         <div className="flex justify-between items-end mb-8 md:mb-12">
            <h3 className="text-white text-lg md:text-xl font-bold uppercase tracking-widest">
                {featuredData?.sectionTitle || "À la une"}
            </h3>
            <Link to="/media" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#2433FF] transition-colors">
                {featuredData?.linkAllLabel || "Voir tout le média"}
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {latestProject && (
               <ScrollAnimation animation="slide-up">
                  <Link to={`/projet/${latestProject.id}`} className="group block bg-[#0F0F11] border border-white/10 p-4 md:p-6 hover:border-[#2433FF] transition-all">
                     <div className="aspect-[16/9] overflow-hidden mb-4 md:mb-6 bg-gray-900 relative">
                        <img 
                            src={featuredData?.leftImage?.data ? getStrapiMedia(featuredData.leftImage.data.attributes.url) : (featuredData?.leftImage?.url ? getStrapiMedia(featuredData.leftImage.url) : latestProject.images.hero)} 
                            alt="" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                        <div className="absolute top-4 left-4 bg-[#2433FF] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                           {featuredData?.leftTag || "Nouveau Projet"}
                        </div>
                     </div>
                     <h4 className="cobalt-heading text-2xl md:text-3xl mb-2">
                         {featuredData?.leftTitle || latestProject.title}
                     </h4>
                     <p className="text-gray-400 text-xs md:text-sm font-mono">
                         {featuredData?.leftSubtitle || `${latestProject.category} — ${latestProject.location}`}
                     </p>
                  </Link>
               </ScrollAnimation>
            )}

            <ScrollAnimation animation="slide-up" delay={100}>
               {latestArticle ? (
                  <Link to={`/article/${latestArticle.id}`} className="group h-full flex flex-col justify-between bg-[#0F0F11] border border-white/10 p-6 md:p-8 hover:bg-white hover:text-black transition-all duration-500">
                     <div className="mb-8">
                        <span className="text-[#2433FF] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 block">
                            {featuredData?.rightTag || "Dernière Actualité"}
                        </span>
                        <h4 className="cobalt-heading text-3xl md:text-4xl mb-4 md:mb-6 leading-tight group-hover:translate-x-2 transition-transform">
                            {featuredData?.rightTitle || latestArticle.title}
                        </h4>
                        <p className="text-gray-500 group-hover:text-black/70 line-clamp-3 text-sm">
                            {latestArticle.intro}
                        </p>
                     </div>
                     <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        {featuredData?.rightLinkText || "Lire l'article"} <ArrowRight className="w-4 h-4" />
                     </div>
                  </Link>
               ) : (
                  <div className="h-full flex flex-col justify-center items-center text-center bg-[#0F0F11] border border-white/10 p-8">
                     <h4 className="cobalt-heading text-2xl md:text-3xl mb-4">Un projet en tête ?</h4>
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