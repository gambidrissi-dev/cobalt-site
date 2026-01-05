import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, PenTool } from 'lucide-react';

export default function CobaltPlus() {
  return (
    <div className="animate-fade-in bg-[#0A0A0C] min-h-screen pt-32 pb-24 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* TITRE PRINCIPAL */}
        <div className="mb-16 text-center border-b border-white/10 pb-12">
            <h1 className="cobalt-heading text-7xl md:text-9xl mb-4">COBALT +</h1>
            <p className="text-xl text-gray-400">Architecture, Design d'Espace & Maîtrise d'Œuvre</p>
        </div>

        {/* LE SPLIT : DEUX GRANDS CHOIX */}
        <div className="grid md:grid-cols-2 gap-8 h-[60vh]">
            
            {/* BLOC 1 : PROJETS */}
            <Link to="/projets" className="group relative border border-white/15 bg-[#0F0F11] overflow-hidden flex flex-col justify-end p-12 hover:border-[#2433FF] transition-all duration-500">
                {/* Image de fond (Optionnel, ici un dégradé pour l'exemple) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
                {/* Tu pourras ajouter une image <img> ici avec absolute inset-0 */}
                
                <div className="relative z-20">
                    <div className="bg-[#2433FF] w-12 h-12 flex items-center justify-center mb-6 rounded-full group-hover:scale-110 transition-transform">
                        <Layers className="text-white w-6 h-6" />
                    </div>
                    <h2 className="cobalt-heading text-5xl mb-4 text-white">Projets</h2>
                    <p className="text-gray-300 mb-8 max-w-sm">Explorez notre portfolio : résidences, commerces, rénovations et créations architecturales.</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2433FF] group-hover:text-white transition-colors">
                        Voir les réalisations <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </Link>

            {/* BLOC 2 : PRESTATIONS */}
            <Link to="/prestations" className="group relative border border-white/15 bg-[#0F0F11] overflow-hidden flex flex-col justify-end p-12 hover:border-[#2433FF] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
                
                <div className="relative z-20">
                    <div className="bg-white w-12 h-12 flex items-center justify-center mb-6 rounded-full group-hover:bg-[#2433FF] group-hover:text-white transition-colors">
                        <PenTool className="text-black group-hover:text-white w-6 h-6 transition-colors" />
                    </div>
                    <h2 className="cobalt-heading text-5xl mb-4 text-white">Prestations</h2>
                    <p className="text-gray-300 mb-8 max-w-sm">Découvrez comment nous vous accompagnons : Études, plans, 3D et suivi de chantier.</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:text-[#2433FF] transition-colors">
                        Voir nos offres <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </Link>

        </div>
      </div>
    </div>
  );
}