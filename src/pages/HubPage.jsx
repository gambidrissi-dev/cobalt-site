import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getStrapiMedia } from '../lib/strapi';

export default function HubPage({ content, defaultLinks = [], defaultTitle }) {
  
  // 1. Infos Globales de la Page
  const title = content?.pageTitle || defaultTitle;
  const subtitle = content?.subtitle || "Département";
  
  // 2. Les Cartes venant de Strapi (via le composant HubCard)
  const strapiCards = content?.cards || [];

  // 3. Construction des 2 cartes à afficher
  const cardsToDisplay = [0, 1].map(index => {
      const cardData = strapiCards[index]; // Données Strapi
      
      return {
          // Titre : Strapi OU "Section X"
          title: cardData?.title || `Section ${index + 1}`,
          
          // Image : Strapi OU null
          image: cardData?.image?.data?.attributes?.url 
             ? `url(${getStrapiMedia(cardData.image.data.attributes.url)})` 
             : null,
             
          // Lien : Champ 'url' de Strapi OU Lien par défaut (App.js)
          link: cardData?.url || defaultLinks[index] || '/' 
      };
  });

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col justify-center px-4 md:px-8 pt-24">
      
      {/* EN-TÊTE */}
      <div className="text-center mb-16">
        <span className="text-[#2433FF] font-mono text-sm tracking-widest uppercase mb-4 block">
            {subtitle}
        </span>
        <h1 className="cobalt-heading text-6xl md:text-9xl text-white">
            {title}
        </h1>
      </div>

      {/* GRILLE 2 COLONNES */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
        
        {cardsToDisplay.map((card, i) => (
            <Link key={i} to={card.link} className="group relative h-[60vh] overflow-hidden">
                {/* Image de fond */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: card.image || 'none', backgroundColor: '#111' }}
                />
                
                {/* Voile noir (s'éclaircit au survol) */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                
                {/* Texte & Bouton */}
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <h2 className="cobalt-heading text-4xl md:text-5xl text-white mb-6 group-hover:translate-x-2 transition-transform">
                        {card.title}
                    </h2>
                    <div className="flex items-center gap-4 text-white uppercase tracking-widest text-xs font-bold border-b border-white/30 pb-2 w-fit group-hover:border-[#2433FF] group-hover:text-[#2433FF] transition-all">
                        Explorer <ArrowRight size={16} />
                    </div>
                </div>
            </Link>
        ))}

      </div>
    </div>
  );
}