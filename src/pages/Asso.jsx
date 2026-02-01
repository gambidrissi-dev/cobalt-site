import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

// ICI : On ajoute bien 'programs' dans les accolades
export default function Asso({ onOpenContact, pageContent, programs }) {

  useEffect(() => {
    console.log("📢 Programmes reçus dans la page Asso :", programs);
  }, [programs]);

  // 1. DONNÉES HEADER
  const title = pageContent?.pageTitle || "L'ÉCOLE DU FAIRE";
  const subtitle = pageContent?.highlightTitle || "/// ASSOCIATION LOI 1901"; 
  const description = pageContent?.description || "Nous formons la prochaine génération d'architectes constructeurs.";
  const ctaLabel = pageContent?.ctaLabel || "CANDIDATER POUR 2026";
  const ctaLink = pageContent?.ctaLink;

  const handleCtaClick = () => {
    if (ctaLink) {
      window.location.href = ctaLink;
    } else {
      onOpenContact();
    }
  };

  return (
    <div className="animate-fade-in min-h-screen pt-32 pb-24 px-6 relative text-white bg-[#2433FF]">
      
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

      {/* CARTES DYNAMIQUES */}
      <div className="max-w-7xl mx-auto">
         {/* C'est ici que ça plantait car 'programs' n'existait pas */}
         {programs && programs.length > 0 ? (
             <div className="grid md:grid-cols-3 gap-8">
                {programs.map((item, i) => (
                  <ScrollAnimation key={item.id} delay={i * 100} animation="slide-up">
                    
                    <div className="group border border-white/30 hover:border-white bg-[#2433FF] transition-colors duration-300 flex flex-col h-full">
                       
                       <div className="aspect-[4/3] overflow-hidden border-b border-white/30 relative">
                          <div className="absolute inset-0 bg-[#2433FF]/40 group-hover:bg-transparent transition-all duration-500 z-10 mix-blend-multiply"></div>
                          {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                              />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center bg-black/20 text-xs font-mono opacity-50">IMAGE MANQUANTE</div>
                          )}
                       </div>

                       <div className="p-8 flex flex-col flex-grow text-white">
                          <h3 className="cobalt-heading text-3xl mb-2">{item.title}</h3>
                          <span className="text-xs font-mono uppercase tracking-widest opacity-60 mb-6 block">{item.subtitle}</span>
                          
                          <p className="opacity-80 leading-relaxed flex-grow text-sm">
                            {item.description}
                          </p>
                       </div>

                    </div>
                  </ScrollAnimation>
                ))}
             </div>
         ) : (
             <div className="text-center py-20 border border-white/20 text-white/50 font-mono">
                 Aucun programme trouvé... <br/> 
                 (Vérifie Strapi : AssoProgram publié ? Permissions Public 'find' cochées ?)
             </div>
         )}
      </div>
      
      <div className="fixed bottom-0 right-0 p-12 pointer-events-none opacity-10 hidden md:block">
         <h2 className="text-[10rem] font-bold leading-none text-white outline-text">2026</h2>
      </div>

    </div>
  );
}