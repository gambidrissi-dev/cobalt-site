import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

// Ajout de la prop 'programs'
export default function Asso({ onOpenContact, pageContent, programs }) {

  // --- 1. DONNÉES HEADER (STRAPI) ---
  const title = pageContent?.pageTitle || "L'ÉCOLE DU FAIRE";
  const subtitle = pageContent?.highlightTitle || "/// ASSOCIATION LOI 1901"; 
  const description = pageContent?.description || "Nous formons la prochaine génération d'architectes...";
  const ctaLabel = pageContent?.ctaLabel || "CANDIDATER";
  const ctaLink = pageContent?.ctaLink;

  const handleCtaClick = () => {
    if (ctaLink) {
      window.location.href = ctaLink;
    } else {
      onOpenContact();
    }
  };

  return (
    <div className="animate-fade-in min-h-screen pt-32 pb-24 px-6 relative text-white">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          
          <div>
            <span className="font-mono text-sm uppercase tracking-widest opacity-70 mb-4 block">
                {subtitle}
            </span>
            <h1 className="cobalt-heading text-7xl md:text-9xl leading-[0.9] mb-6">
               {title}
            </h1>
          </div>

          <div className="md:pb-4">
             <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 opacity-90">
               {description}
             </p>
             <button 
                onClick={handleCtaClick}
                className="bg-white text-[#2433FF] px-8 py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3"
             >
                {ctaLabel} <ArrowRight className="w-4 h-4" />
             </button>
          </div>

        </div>
      </div>

      {/* CARTES DYNAMIQUES (STRAPI) */}
      <div className="max-w-7xl mx-auto">
         {programs && programs.length > 0 ? (
             <div className="grid md:grid-cols-3 gap-8">
                {programs.map((item, i) => (
                  <ScrollAnimation key={item.id} delay={i * 100} animation="slide-up">
                    {/* On utilise le slug s'il existe, sinon l'id pour le lien */}
                    <Link to={`/asso/${item.slug || item.id}`} className="group border border-white/30 hover:border-white bg-[#2433FF] transition-colors duration-300 flex flex-col h-full cursor-pointer">
                       
                       <div className="aspect-[4/3] overflow-hidden border-b border-white/30 relative">
                          <div className="absolute inset-0 bg-[#2433FF]/40 group-hover:bg-transparent transition-all duration-500 z-10 mix-blend-multiply"></div>
                          {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                              />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center bg-black/20 text-xs">NO IMAGE</div>
                          )}
                       </div>

                       <div className="p-8 flex flex-col flex-grow text-white">
                          <h3 className="cobalt-heading text-3xl mb-2">{item.title}</h3>
                          <span className="text-xs font-mono uppercase tracking-widest opacity-60 mb-6 block">{item.subtitle}</span>
                          
                          <p className="opacity-80 leading-relaxed mb-8 flex-grow text-sm line-clamp-4">
                            {item.description}
                          </p>

                          <div className="mt-auto flex justify-between items-center pt-6 border-t border-white/20">
                             <span className="text-xs font-bold uppercase tracking-widest group-hover:underline underline-offset-4">En savoir plus</span>
                             <Plus className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-300" />
                          </div>
                       </div>

                    </Link>
                  </ScrollAnimation>
                ))}
             </div>
         ) : (
             <div className="text-center py-20 border border-white/20 text-white/50">
                 Chargement des programmes...
             </div>
         )}
      </div>
      
      <div className="fixed bottom-0 right-0 p-12 pointer-events-none opacity-10">
         <h2 className="text-[10rem] font-bold leading-none text-white outline-text">2026</h2>
      </div>

    </div>
  );
}