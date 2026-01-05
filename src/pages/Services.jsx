import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PenTool } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function Services({ services }) {
  
  // FILTRE : On ne garde que les services "Architecture" pour cette page
  const safeServices = services ? services.filter(s => s.department === 'Architecture') : [];

  return (
    <div className="animate-fade-in min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-6 bg-[#0A0A0C] text-white selection:bg-[#2433FF] selection:text-white">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 border-b border-white/10 pb-8">
         <span className="text-[#2433FF] font-bold text-xs uppercase tracking-widest mb-4 block">Cobalt +</span>
         <h1 className="cobalt-heading text-6xl md:text-9xl leading-[0.9] tracking-tighter">
           PRESTATIONS
         </h1>
      </div>

      {/* LISTE DES SERVICES */}
      <div className="max-w-7xl mx-auto">
         <div className="grid gap-8">
            
            {safeServices.length > 0 ? (
               safeServices.map((service, i) => (
                  <ScrollAnimation key={service.id} delay={i * 100} animation="slide-up">
                     <Link to={`/prestation/${service.id}`} className="group relative block bg-[#0F0F11] border border-white/10 hover:border-[#2433FF] transition-all duration-500 overflow-hidden">
                        
                        <div className="grid md:grid-cols-2 h-full min-h-[400px]">
                           
                           {/* INFO (GAUCHE) */}
                           <div className="p-8 md:p-12 flex flex-col justify-between relative z-10">
                              <div>
                                 <div className="w-12 h-12 rounded-full bg-[#2433FF]/10 flex items-center justify-center text-[#2433FF] mb-8 group-hover:bg-[#2433FF] group-hover:text-white transition-all duration-500">
                                    <PenTool className="w-6 h-6" /> 
                                 </div>
                                 
                                 <h2 className="cobalt-heading text-4xl md:text-5xl mb-4 group-hover:text-[#2433FF] transition-colors">
                                    {service.title}
                                 </h2>
                                 
                                 {service.subtitle && (
                                    <p className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-6">
                                       {service.subtitle}
                                    </p>
                                 )}

                                 <p className="text-gray-400 leading-relaxed max-w-md group-hover:text-gray-300 transition-colors">
                                    {service.shortDescription}
                                 </p>
                              </div>

                              <div className="mt-12 flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                                 <span className="w-8 h-[1px] bg-white/20 group-hover:bg-[#2433FF] transition-colors"></span>
                                 <span className="group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                                    En savoir plus <ArrowRight className="w-4 h-4 text-[#2433FF]" />
                                 </span>
                              </div>
                           </div>

                           {/* IMAGE (DROITE) */}
                           <div className="relative h-64 md:h-full overflow-hidden border-t md:border-t-0 md:border-l border-white/10">
                              <div className="absolute inset-0 bg-[#2433FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                              
                              {service.image ? (
                                 <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                                 />
                              ) : (
                                 <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-600 font-mono text-xs">Image manquante</div>
                              )}
                           </div>

                        </div>
                     </Link>
                  </ScrollAnimation>
               ))
            ) : (
               <div className="py-24 text-center border border-dashed border-white/10 text-gray-500">
                  Chargement des prestations...
               </div>
            )}

         </div>
      </div>

    </div>
  );
}