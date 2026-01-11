import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function Asso({ onOpenContact, pageContent }) {

  // --- 1. DONNÉES STRAPI (Header) ---
  const title = pageContent?.pageTitle || "L'ÉCOLE DU FAIRE";
  const description = pageContent?.description || "Nous formons la prochaine génération d'architectes constructeurs. Immersion totale, chantiers réels et transmission de savoir-faire.";
  const ctaLabel = pageContent?.ctaLabel || "CANDIDATER POUR 2025";
  const ctaLink = pageContent?.ctaLink; // Lien optionnel depuis Strapi

  // Fonction intelligente pour le bouton
  const handleCtaClick = () => {
    if (ctaLink) {
      window.location.href = ctaLink; // Redirection si lien Strapi
    } else {
      onOpenContact(); // Sinon ouverture modale contact
    }
  };

  // --- 2. DONNÉES STATIQUES (Les Piliers) ---
  // On garde ça en dur car c'est structurel pour l'instant
  const pillars = [
    {
      id: "alternance",
      title: "ALTERNANCE",
      subtitle: "Cursus 3 ans",
      description: "Une immersion totale en agence. Apprendre en faisant, entouré de professionnels.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
    },
    {
      id: "workshops",
      title: "WORKSHOPS",
      subtitle: "Été 2025",
      description: "Semaines intensives de construction grandeur nature. Du dessin à la réalisation.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80"
    },
    {
      id: "mentorat",
      title: "MENTORAT",
      subtitle: "Jeunes diplômés",
      description: "Accompagnement personnalisé pour le lancement de votre activité d'architecte.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
    }
  ];

  return (
    // Note: Le fond bleu #2433FF est géré par App.js via le thème
    <div className="animate-fade-in min-h-screen pt-32 pb-24 px-6 relative text-white">
      
      {/* 1. HEADER DE L'ASSO (Connecté Strapi) */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          
          <div>
            <span className="font-mono text-sm uppercase tracking-widest opacity-70 mb-4 block">/// Association Loi 1901</span>
            {/* Titre dynamique */}
            <h1 className="cobalt-heading text-7xl md:text-9xl leading-[0.9] mb-6">
               {title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
               ))}
            </h1>
          </div>

          <div className="md:pb-4">
             {/* Description dynamique */}
             <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 opacity-90">
               {description}
             </p>
             
             {/* Bouton dynamique */}
             <button 
                onClick={handleCtaClick}
                className="bg-white text-[#2433FF] px-8 py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3"
             >
                {ctaLabel} <ArrowRight className="w-4 h-4" />
             </button>
          </div>

        </div>
      </div>

      {/* 2. LES PILIERS (GRID) */}
      <div className="max-w-7xl mx-auto">
         <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((item, i) => (
              <ScrollAnimation key={i} delay={i * 100} animation="slide-up">
                <Link to={`/asso/${item.id}`} className="group border border-white/30 hover:border-white bg-[#2433FF] transition-colors duration-300 flex flex-col h-full cursor-pointer">
                   
                   <div className="aspect-[4/3] overflow-hidden border-b border-white/30 relative">
                      <div className="absolute inset-0 bg-[#2433FF]/40 group-hover:bg-transparent transition-all duration-500 z-10 mix-blend-multiply"></div>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      />
                   </div>

                   <div className="p-8 flex flex-col flex-grow text-white">
                      <h3 className="cobalt-heading text-3xl mb-2">{item.title}</h3>
                      <span className="text-xs font-mono uppercase tracking-widest opacity-60 mb-6 block">{item.subtitle}</span>
                      
                      <p className="opacity-80 leading-relaxed mb-8 flex-grow text-sm">
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
      </div>
      
      {/* 3. FOND DÉCORATIF */}
      <div className="fixed bottom-0 right-0 p-12 pointer-events-none opacity-10">
         <h2 className="text-[10rem] font-bold leading-none text-white outline-text">2025</h2>
      </div>

    </div>
  );
}