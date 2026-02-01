import React from 'react';
import { ArrowRight, Clock, Euro, FileText, CheckCircle2 } from 'lucide-react';
import { getStrapiMedia } from '../lib/strapi';

export default function Services({ servicesContent }) {
  
  // Sécurités si Strapi est vide
  const pageTitle = servicesContent?.pageTitle || "PRESTATIONS";
  const subtitle = servicesContent?.subtitle || "Architecture & Design";
  const list = servicesContent?.listePrestations || [];

  return (
    <div className="min-h-screen bg-[#0A0A0C] pt-32 pb-20 px-4 md:px-8">
      
      {/* EN-TÊTE DE PAGE */}
      <div className="max-w-5xl mx-auto mb-20 text-center md:text-left">
        <span className="text-[#2433FF] font-mono text-sm tracking-widest uppercase mb-4 block">
          {subtitle}
        </span>
        <h1 className="cobalt-heading text-5xl md:text-7xl text-white mb-8">
          {pageTitle}
        </h1>
        <div className="w-24 h-1 bg-[#2433FF] mx-auto md:mx-0"></div>
      </div>

      {/* GRILLE STYLE NOTION */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
        
        {list.length > 0 ? (
          list.map((item, index) => {
            // Récupération de l'image (compatible Strapi v4/v5)
            const imageUrl = item.image?.data?.attributes?.url 
              ? getStrapiMedia(item.image.data.attributes.url) 
              : (item.image?.url ? getStrapiMedia(item.image.url) : null);

            return (
            <div 
              key={index} 
              className="group bg-[#111113] border border-white/10 rounded-xl p-6 md:p-8 hover:border-[#2433FF] transition-all duration-300 relative overflow-hidden"
            >
              {/* Effet de lueur au survol */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2433FF]/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[#2433FF]/20 transition-all"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8">
                
                {/* BLOC GAUCHE : IDENTITÉ */}
                <div className="md:w-1/3 flex flex-col">
                   {/* Image de la prestation */}
                   {imageUrl && (
                      <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-gray-900">
                         <img 
                           src={imageUrl} 
                           alt={item.title} 
                           className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                         />
                      </div>
                   )}

                   <div className="flex items-center gap-3 mb-4">
                      {/* Pastille Icône (Tu peux la rendre dynamique via Strapi si tu veux) */}
                      <div className="w-8 h-8 rounded bg-[#2433FF]/20 flex items-center justify-center text-[#2433FF]">
                        <FileText size={16} />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                   </div>
                   
                   {item.quote && (
                     <blockquote className="text-gray-500 italic text-sm mb-6 border-l-2 border-[#2433FF] pl-4">
                       "{item.quote}"
                     </blockquote>
                   )}

                   {/* Tags Prix / Durée */}
                   <div className="mt-auto flex flex-wrap gap-2">
                      {item.duration && (
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded text-xs text-gray-300 font-mono">
                           <Clock size={12} /> {item.duration}
                        </div>
                      )}
                      {item.price && (
                        <div className="flex items-center gap-2 bg-[#2433FF]/10 px-3 py-1.5 rounded text-xs text-[#2433FF] font-mono font-bold">
                           <Euro size={12} /> {item.price}
                        </div>
                      )}
                   </div>
                </div>

                {/* BLOC DROIT : DÉTAILS */}
                <div className="md:w-2/3 md:border-l md:border-white/5 md:pl-8 flex flex-col justify-center">
                   <p className="text-gray-300 leading-relaxed mb-6">
                      {item.description}
                   </p>

                   {/* Zone Détails (Format / Info) */}
                   {item.format && (
                     <div className="bg-[#0A0A0C] border border-white/5 rounded p-4 mb-6">
                        <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Format</span>
                        <p className="text-sm text-white font-mono">{item.format}</p>
                     </div>
                   )}

                   {/* Bouton ou lien */}
                   <div className="flex items-center gap-2 text-[#2433FF] text-xs font-bold uppercase tracking-widest cursor-pointer group-hover:translate-x-2 transition-transform mt-auto">
                      En savoir plus <ArrowRight size={14} />
                   </div>
                </div>

              </div>
            </div>
          )})
        ) : (
          <div className="text-center py-20 text-gray-500 font-mono">
            Aucune prestation chargée depuis Strapi pour le moment.
          </div>
        )}

      </div>
    </div>
  );
}