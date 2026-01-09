import React from 'react';
import { ArrowRight, Hammer, Euro, PenTool, CheckCircle2 } from 'lucide-react';

export default function AtelierSavoirFaire({ content }) {
  
  // Sécurités (Fallback)
  const pageTitle = content?.pageTitle || "SAVOIR-FAIRE";
  const subtitle = content?.subtitle || "Design & Fabrication";
  const list = content?.listePrestations || [];

  return (
    <div className="min-h-screen bg-[#0A0A0C] pt-32 pb-20 px-4 md:px-8">
      
      {/* EN-TÊTE */}
      <div className="max-w-5xl mx-auto mb-20 text-center md:text-left">
        <span className="text-white/60 font-mono text-sm tracking-widest uppercase mb-4 block">
          {subtitle}
        </span>
        <h1 className="cobalt-heading text-5xl md:text-7xl text-white mb-8">
          {pageTitle}
        </h1>
        {/* Ligne blanche pour l'Atelier (au lieu de bleue pour différencier) */}
        <div className="w-24 h-1 bg-white mx-auto md:mx-0"></div>
      </div>

      {/* GRILLE */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
        
        {list.length > 0 ? (
          list.map((item, index) => (
            <div 
              key={index} 
              className="group bg-[#111113] border border-white/10 rounded-xl p-6 md:p-8 hover:border-white transition-all duration-300 relative overflow-hidden"
            >
              {/* Effet de lueur Blanche pour l'Atelier */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/10 transition-all"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8">
                
                {/* BLOC GAUCHE */}
                <div className="md:w-1/3 flex flex-col">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white">
                        <Hammer size={16} />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                   </div>
                   
                   {item.quote && (
                     <blockquote className="text-gray-500 italic text-sm mb-6 border-l-2 border-white/30 pl-4">
                       "{item.quote}"
                     </blockquote>
                   )}

                   <div className="mt-auto flex flex-wrap gap-2">
                      {item.duration && (
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded text-xs text-gray-300 font-mono">
                           <PenTool size={12} /> {item.duration}
                        </div>
                      )}
                      {item.price && (
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded text-xs text-white font-mono font-bold">
                           <Euro size={12} /> {item.price}
                        </div>
                      )}
                   </div>
                </div>

                {/* BLOC DROIT */}
                <div className="md:w-2/3 md:border-l md:border-white/5 md:pl-8 flex flex-col justify-center">
                   <p className="text-gray-300 leading-relaxed mb-6">
                      {item.description}
                   </p>

                   {item.format && (
                     <div className="bg-[#0A0A0C] border border-white/5 rounded p-4 mb-6">
                        <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Technique / Matériaux</span>
                        <p className="text-sm text-white font-mono">{item.format}</p>
                     </div>
                   )}

                   <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest cursor-pointer group-hover:translate-x-2 transition-transform mt-auto">
                      Discuter du projet <ArrowRight size={14} />
                   </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500 font-mono">
            Les prestations de l'atelier sont en cours de création sur Strapi.
          </div>
        )}

      </div>
    </div>
  );
}