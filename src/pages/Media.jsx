import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function Media({ articles }) {
  
// --- 1. GESTION DES DONNÉES ET DU FILTRE ---
  const [activeCategory, setActiveCategory] = useState('Tout');

  // CORRECTION : On utilise useMemo pour stabiliser les données et supprimer le warning
  const safeArticles = useMemo(() => {
    if (articles && articles.length > 0) return articles;
    
    return [
      {
        id: "architecture-radicale",
        title: "Vers une architecture radicale",
        category: "Réflexion",
        date: "30 DEC 2024",
        image: "https://images.unsplash.com/photo-1517544845501-bb78ccdad008?w=1200&q=80",
        intro: "Comment repenser l'habitat collectif à l'heure de la densification urbaine ? Une approche sans concession."
      },
      {
        id: "beton-chanvre",
        title: "Le retour du béton de chanvre",
        category: "Matériaux",
        date: "28 DEC 2024",
        image: "https://images.unsplash.com/photo-1591955506264-3f51322ab2af?w=800&q=80",
        intro: "Analyse technique d'un matériau biosourcé qui bouscule les normes de la construction traditionnelle."
      },
      {
        id: "visite-chantier-bordeaux",
        title: "Visite : Le chantier des Chartrons",
        category: "Journal de bord",
        date: "15 DEC 2024",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        intro: "Immersion au cœur de la rénovation d'un chai historique en lofts d'habitation."
      },
      {
        id: "design-mobilier",
        title: "L'acier plié : Note de conception",
        category: "Design",
        date: "10 DEC 2024",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80",
        intro: "Retour sur la fabrication de la chaise 'Pli-01', notre dernière création de l'Atelier."
      }
    ];
  }, [articles]);

  // Calculer les catégories uniques
  const categories = useMemo(() => {
    const allCats = safeArticles.map(a => a.category).filter(Boolean);
    return ['Tout', ...new Set(allCats)];
  }, [safeArticles]);

  // Filtrer les articles
  const filteredList = useMemo(() => {
    if (activeCategory === 'Tout') return safeArticles;
    return safeArticles.filter(a => a.category === activeCategory);
  }, [activeCategory, safeArticles]);

  // Définir la "Une" et les "Autres" en fonction du filtre
  // Si le filtre ne renvoie rien, featured sera undefined
  const featured = filteredList.length > 0 ? filteredList[0] : null;
  const others = filteredList.length > 1 ? filteredList.slice(1) : [];

  return (
    <div className="animate-fade-in min-h-screen pt-32 pb-24 px-6 relative bg-white text-black selection:bg-[#2433FF] selection:text-white">
      
      {/* HEADER TYPE "JOURNAL" */}
      <div className="max-w-7xl mx-auto mb-8 border-b-2 border-black pb-8">
         <div className="flex justify-between items-end">
            <h1 className="cobalt-heading text-7xl md:text-9xl leading-[0.8] tracking-tighter text-black">
              LE MÉDIA
            </h1>
            <div className="hidden md:block text-right">
               <span className="block font-bold text-sm uppercase tracking-widest text-[#2433FF]">Journal d'Architecture</span>
               <span className="block text-xs font-mono text-gray-500 mt-1">ISSN 2025-COBALT</span>
            </div>
         </div>
      </div>

      {/* --- BARRE DE FILTRES (STICKY) --- */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-black/10 py-4 mb-12">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex items-center gap-8 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 relative pb-1
                  ${activeCategory === cat 
                    ? 'text-[#2433FF]' 
                    : 'text-gray-400 hover:text-black'
                  }`}
              >
                {cat}
                {/* Ligne de soulignement active */}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2433FF]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message si aucun article */}
      {!featured && (
         <div className="max-w-7xl mx-auto py-24 text-center text-gray-400">
            Aucun article dans cette catégorie pour le moment.
         </div>
      )}

      {/* SECTION 1 : À LA UNE (Featured) */}
      {featured && (
        <div className="max-w-7xl mx-auto mb-24 animate-fade-in">
           <Link to={`/article/${featured.id}`} className="group grid md:grid-cols-12 gap-8 items-start">
              
              {/* Image (Prend 8 colonnes) */}
              <div className="md:col-span-8 relative overflow-hidden bg-gray-100 aspect-[16/9] md:aspect-auto md:h-[60vh] border border-black/5">
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                 <img 
                   src={featured.image} 
                   alt={featured.title} 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" 
                 />
                 <div className="absolute top-0 left-0 bg-[#2433FF] text-white px-4 py-2 font-bold uppercase tracking-widest text-xs z-20">
                    À la une
                 </div>
              </div>

              {/* Texte (Prend 4 colonnes) */}
              <div className="md:col-span-4 flex flex-col h-full justify-center border-t border-black/10 md:border-t-0 pt-6 md:pt-0">
                 <div className="flex items-center gap-4 mb-6 text-xs font-mono uppercase tracking-widest text-gray-500">
                    <span className="text-[#2433FF] font-bold">{featured.category}</span>
                    <span>— {featured.date}</span>
                 </div>
                 
                 <h2 className="cobalt-heading text-4xl md:text-5xl mb-6 leading-tight group-hover:text-[#2433FF] transition-colors">
                    {featured.title}
                 </h2>
                 
                 <p className="text-gray-600 text-lg leading-relaxed mb-8 font-serif">
                    {featured.intro}
                 </p>

                 <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black border-b border-black pb-1 w-fit group-hover:border-[#2433FF] group-hover:text-[#2433FF] transition-all">
                    Lire l'article <ArrowRight className="w-4 h-4" />
                 </span>
              </div>
           </Link>
        </div>
      )}

      {/* SECTION 2 : LA GRILLE (Les autres articles) */}
      {others.length > 0 && (
        <div className="max-w-7xl mx-auto">
           <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-black/10 flex-grow"></div>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Plus d'articles {activeCategory !== 'Tout' ? `(${activeCategory})` : ''}
              </span>
              <div className="h-px bg-black/10 flex-grow"></div>
           </div>

           <div className="grid md:grid-cols-3 gap-x-8 gap-y-16">
              {others.map((article, i) => (
                 <ScrollAnimation key={article.id || i} delay={i * 100} animation="slide-up">
                    <Link to={`/article/${article.id}`} className="group block h-full flex flex-col">
                       
                       {/* Image Card */}
                       <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-6 relative border border-black/5">
                          <div className="absolute top-4 right-4 bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-md">
                             <ArrowUpRight className="w-5 h-5" />
                          </div>
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          />
                       </div>

                       {/* Contenu Textuel */}
                       <div className="flex flex-col flex-grow border-t border-black/10 pt-4">
                          <div className="flex justify-between items-center mb-3">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-[#2433FF]">{article.category}</span>
                             <span className="text-[10px] font-mono text-gray-400">{article.date}</span>
                          </div>
                          
                          <h3 className="text-2xl font-bold leading-tight mb-3 group-hover:text-[#2433FF] transition-colors">
                             {article.title}
                          </h3>
                          
                          <p className="text-gray-500 text-sm line-clamp-3 mb-4 font-serif">
                             {article.intro}
                          </p>
                       </div>
                    </Link>
                 </ScrollAnimation>
              ))}
           </div>
        </div>
      )}

    </div>
  );
}