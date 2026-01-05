import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function Eshop({ products }) {
  
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'Tout';
  const [activeCategory, setActiveCategory] = useState(
     ['Mobilier', 'Objets', 'Prints'].includes(initialCategory) ? initialCategory : 'Tout'
  );

  // 1. RÉCUPÉRATION DES DONNÉES STRAPI
  // On utilise la prop 'products' reçue de App.jsx
  const safeProducts = products || [];

  // Catégories dynamiques
  const categories = ['Tout', 'Mobilier', 'Objets', 'Prints'];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Tout') return safeProducts;
    return safeProducts.filter(p => p.category === activeCategory);
  }, [activeCategory, safeProducts]);

  return (
    // 2. PASSAGE EN DARK MODE (Pour coller avec la page Atelier)
    <div className="animate-fade-in min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-6 bg-[#0A0A0C] text-white selection:bg-[#2433FF] selection:text-white">
      
      {/* HEADER E-SHOP */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 md:pb-12">
           <div>
              <span className="text-[#2433FF] font-bold text-xs uppercase tracking-widest mb-2 md:mb-4 block">Éditions Limitées</span>
              <h1 className="cobalt-heading text-5xl md:text-9xl leading-[0.9] tracking-tighter">
                E-SHOP
              </h1>
           </div>
           
           <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
             <span>{filteredProducts.length} Articles</span>
             <span className="hidden md:inline">Livraison France & Europe</span>
           </div>
        </div>
      </div>

      {/* FILTRES (Scrollable Mobile) */}
      <div className="sticky top-20 z-30 bg-[#0A0A0C]/90 backdrop-blur border-b border-white/10 py-4 mb-8 md:mb-12 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar">
           <div className="flex items-center gap-6 md:gap-8 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs md:text-sm font-bold uppercase tracking-widest transition-colors
                    ${activeCategory === cat ? 'text-[#2433FF]' : 'text-gray-500 hover:text-white'}
                  `}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* GRILLE PRODUITS */}
      <div className="max-w-7xl mx-auto">
         <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-16">
            
            {filteredProducts.length > 0 ? (
               filteredProducts.map((product, i) => (
                  <ScrollAnimation key={product.id} delay={i * 50} animation="slide-up">
                     <Link to={`/produit/${product.id}`} className={`group block cursor-pointer ${!product.inStock ? 'pointer-events-none' : ''}`}>
                        
                        {/* 3. LOGIQUE STOCK & VISUEL */}
                        <div className={`aspect-[3/4] overflow-hidden bg-gray-900 mb-4 relative border border-white/5 transition-all duration-500 
                           ${!product.inStock ? 'opacity-50 grayscale border-white/10' : 'hover:border-white/20'}
                        `}>
                           
                           {/* Badge Nouveauté (Seulement si en stock) */}
                           {product.isNew && product.inStock && (
                              <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#2433FF] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                                 New
                              </div>
                           )}

                           {/* Badge ÉPUISÉ (Si pas en stock) */}
                           {!product.inStock && (
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                                 <div className="bg-black/80 backdrop-blur border border-white/20 text-white text-xs font-bold px-4 py-2 uppercase tracking-widest whitespace-nowrap">
                                    Épuisé
                                 </div>
                              </div>
                           )}
                           
                           {/* Image */}
                           {product.image ? (
                              <img 
                                 src={product.image} 
                                 alt={product.title} 
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                              />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">Image manquante</div>
                           )}
                           
                           {/* Bouton rapide (Seulement si en stock) */}
                           {product.inStock && (
                              <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block z-20">
                                 <div className="bg-white text-black py-3 text-center text-xs font-bold uppercase tracking-widest hover:bg-[#2433FF] hover:text-white transition-colors">
                                    Voir le produit
                                 </div>
                              </div>
                           )}
                        </div>

                        {/* Infos Produit */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                           <div>
                              <h3 className="text-sm md:text-lg font-bold leading-tight group-hover:text-[#2433FF] transition-colors">
                                 {product.title}
                              </h3>
                              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
                           </div>
                           <span className="text-sm md:text-lg font-mono font-medium md:font-bold mt-1 md:mt-0 text-white">
                              {product.price}€
                           </span>
                        </div>

                     </Link>
                  </ScrollAnimation>
               ))
            ) : (
               <div className="col-span-2 md:col-span-3 py-24 text-center text-gray-500 font-mono">
                  Aucun produit trouvé dans cette catégorie.
               </div>
            )}

         </div>
      </div>
    </div>
  );
}