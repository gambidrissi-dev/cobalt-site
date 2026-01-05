import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function Projects({ projects }) { // On reçoit 'projects' depuis App.jsx
  
  const [filter, setFilter] = useState('Tous');

  // 1. CONVERSION : Strapi renvoie un objet (id => data), on le transforme en tableau pour l'afficher
  const safeProjects = useMemo(() => {
    return projects ? Object.values(projects) : [];
  }, [projects]);

  // 2. CATÉGORIES DYNAMIQUES : On regarde les catégories qui existent vraiment dans tes projets
  const categories = useMemo(() => {
    const cats = safeProjects.map(p => p.category).filter(Boolean);
    // On dédoublonne avec Set
    return ['Tous', ...new Set(cats)];
  }, [safeProjects]);

  // 3. FILTRAGE
  const filteredProjects = useMemo(() => {
    if (filter === 'Tous') return safeProjects;
    return safeProjects.filter(p => p.category === filter);
  }, [filter, safeProjects]);

  return (
    <div className="animate-fade-in min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-6 bg-[#0A0A0C] text-white selection:bg-[#2433FF] selection:text-white">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-24 border-b border-white/10 pb-8 md:pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <span className="text-[#2433FF] font-bold text-xs uppercase tracking-widest mb-2 md:mb-4 block">Portfolio</span>
              <h1 className="cobalt-heading text-5xl md:text-9xl leading-[0.9]">
                PROJETS
              </h1>
           </div>
           
           <div className="md:text-right max-w-md">
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Une approche contextuelle et matiériste. 
                Nous concevons des lieux qui traversent le temps.
              </p>
           </div>
        </div>
      </div>

      {/* BARRE DE FILTRES */}
      <div className="sticky top-20 z-30 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/10 py-4 mb-12 md:mb-16 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar">
           <div className="flex items-center gap-6 md:gap-8 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-xs md:text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap
                    ${filter === cat ? 'text-[#2433FF]' : 'text-gray-500 hover:text-white'}
                  `}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* GRILLE DES PROJETS */}
      <div className="max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-24">
            
            {filteredProjects.map((project, i) => (
               <ScrollAnimation key={project.id} delay={i * 50} animation="slide-up">
                  <Link to={`/projet/${project.id}`} className="group block cursor-pointer">
                     
                     {/* Image Container */}
                     <div className="aspect-[4/3] overflow-hidden bg-gray-900 mb-4 md:mb-6 relative">
                        <div className="absolute inset-0 bg-[#2433FF] opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay hidden md:block"></div>
                        
                        <img 
                          src={project.images?.hero} 
                          alt={project.title} 
                          className="w-full h-full object-cover grayscale md:grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                        />

                        {/* Tag Mobile */}
                        <div className="absolute top-4 left-4 bg-[#2433FF] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest md:hidden">
                           {project.year}
                        </div>
                     </div>

                     {/* Infos Projet */}
                     <div className="flex justify-between items-start border-t border-white/10 pt-4 md:pt-6">
                        <div>
                           <div className="flex items-center gap-3 mb-2">
                              <span className="text-[#2433FF] text-[10px] md:text-xs font-bold uppercase tracking-widest">{project.category}</span>
                              <span className="text-gray-600 text-[10px] md:text-xs font-mono hidden md:inline-block">— {project.year}</span>
                           </div>
                           <h3 className="cobalt-heading text-2xl md:text-4xl group-hover:text-[#2433FF] transition-colors duration-300">
                             {project.title}
                           </h3>
                           <p className="text-gray-500 text-xs md:text-sm mt-2 font-mono">{project.location}</p>
                        </div>

                        <div className="hidden md:flex w-10 h-10 border border-white/20 rounded-full items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                           <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                     </div>

                  </Link>
               </ScrollAnimation>
            ))}

         </div>

         {/* Message si vide */}
         {filteredProjects.length === 0 && (
            <div className="py-24 text-center text-gray-500 font-mono">
               Chargement des projets... (Ou vérifie ton Strapi)
            </div>
         )}
      </div>

    </div>
  );
}