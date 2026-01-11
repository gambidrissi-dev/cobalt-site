import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Calendar, Users } from 'lucide-react';

export default function AssoDetail({ programs, onOpenContact }) {
  const { id } = useParams();

  // 1. On cherche le programme (soit par ID, soit par Slug si tu en as mis un)
  const program = programs ? programs.find(p => p.id == id || p.slug === id) : null;

  if (!program) return (
    <div className="min-h-screen bg-[#2433FF] flex flex-col items-center justify-center text-white">
       <div className="mb-4 font-mono">Programme introuvable...</div>
       <Link to="/asso" className="border-b border-white hover:opacity-70">Retour à l'école</Link>
    </div>
  );

  return (
    <div className="animate-fade-in min-h-screen bg-[#2433FF] text-white pt-32 pb-20 px-6">
      
      {/* BOUTON RETOUR */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link to="/asso" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft size={14} /> Retour aux programmes
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* EN-TÊTE */}
        <div className="mb-12 border-b border-white/20 pb-12">
            <span className="font-mono text-sm uppercase tracking-widest opacity-70 mb-4 block">
                Programme {program.subtitle ? `/// ${program.subtitle}` : ''}
            </span>
            <h1 className="cobalt-heading text-6xl md:text-8xl mb-8 leading-none">
                {program.title}
            </h1>
            
            {/* Image Principale */}
            <div className="aspect-[21/9] w-full bg-black/20 overflow-hidden mb-12 border border-white/20 relative">
                <div className="absolute inset-0 bg-[#2433FF]/20 mix-blend-multiply z-10"></div>
                {program.image ? (
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover grayscale" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-50 font-mono">NO IMAGE</div>
                )}
            </div>
        </div>

        {/* CONTENU */}
        <div className="grid md:grid-cols-[1fr_300px] gap-12">
            
            {/* Colonne Gauche : Texte */}
            <div>
                <h2 className="text-2xl font-bold mb-6">À propos de ce cursus</h2>
                <div className="prose prose-lg prose-invert text-white opacity-90 leading-relaxed whitespace-pre-line font-light">
                    {/* Pour l'instant on affiche la description. 
                        Astuce : Tu pourras ajouter un champ "Rich Text" nommé "details" dans Strapi plus tard pour avoir un texte plus long ici */}
                    {program.description}
                </div>
            </div>

            {/* Colonne Droite : Infos clés & CTA */}
            <div className="space-y-8">
                <div className="p-6 border border-white/20 bg-[#0A0A0C]/10 backdrop-blur-sm">
                    <h3 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-70">Détails pratiques</h3>
                    
                    <ul className="space-y-4 text-sm font-mono">
                        <li className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 mt-0.5" />
                            <span>Rentrée : Septembre 2026</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Users className="w-4 h-4 mt-0.5" />
                            <span>Places : Limitées</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-4 h-4 mt-0.5" />
                            <span>Certifiant</span>
                        </li>
                    </ul>

                    <div className="w-full h-px bg-white/20 my-6"></div>

                    <button 
                        onClick={onOpenContact}
                        className="w-full bg-white text-[#2433FF] py-4 font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-colors"
                    >
                        Candidater
                    </button>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}