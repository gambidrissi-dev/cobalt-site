import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function Eshop({ products, collections, pageContent }) {
  
  const title = pageContent?.pageTitle || "L'ATELIER";
  const intro = pageContent?.description || "Objets manifestes, micro-séries et sélections d'outils. Fabriqué ou curaté à Biarritz.";

  const [activeCategory, setActiveCategory] = useState('Tout');
  
  // Catégories définies dans Strapi
  const categories = ['Tout', 'Mobilier', 'Deco & Maison', 'Prints', 'Outils Archi'];

  // --- LOGIQUE DE TRI ---
  // 1. On filtre d'abord par catégorie (Mobilier, Prints...)
  const filteredProducts = useMemo(() => {
     if (activeCategory === 'Tout') return products;
     return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  // 2. On groupe par Collection (Drop)
  // On ne garde que les collections qui ont des produits après filtrage
  const activeDrops = useMemo(() => {
     if (!collections) return [];
     
     return collections.map(col => {
        // On cherche les produits qui appartiennent à ce Drop
        const dropProducts = filteredProducts.filter(p => p.collectionId === col.id);
        
        if (dropProducts.length === 0) return null; // On cache le drop s'il est vide

        return {
           ...col,
           products: dropProducts
        };
     }).filter(Boolean); // On retire les nulls
  }, [collections, filteredProducts]);

  // 3. Les Orphelins (Produits sans Drop)
  const orphanProducts = useMemo(() => {
      return filteredProducts.filter(p => !p.collectionId);
  }, [filteredProducts]);


  // --- COMPOSANT CARTE PRODUIT ---
  const ProductCard = ({ product }) => {
     // Logique des Badges
     const isSoldOut = product.stock === 0;
     const isUnique = product.stock === 1;
     const isLowStock = product.stock > 1 && product.stock <= 5;

     return (
        <Link to={`/produit/${product.id}`} className="group block relative">
            <div className="aspect-[4/5] bg-[#F5F5F5] overflow-hidden relative mb-4">
                
                {/* Image */}
                {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isSoldOut ? 'grayscale opacity-70' : ''}`} 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">NO IMAGE</div>
                )}

                {/* BADGES (Le cœur de ta rareté) */}
                <div className="absolute top-2 left-2 flex flex-col gap-2 items-start">
                    {isSoldOut && (
                        <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                            Épuisé
                        </span>
                    )}
                    {!isSoldOut && isUnique && (
                        <span className="bg-[#2433FF] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                            Pièce Unique
                        </span>
                    )}
                    {!isSoldOut && isLowStock && (
                        <span className="bg-white text-black border border-black text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                            Série Limitée {product.limitedLabel ? `(${product.limitedLabel})` : ''}
                        </span>
                    )}
                </div>

            </div>

            {/* Infos */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold uppercase text-sm group-hover:text-[#2433FF] transition-colors">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{product.category}</p>
                </div>
                <div className="text-sm font-mono text-right">
                    {isSoldOut ? (
                        <span className="text-gray-400 line-through text-xs">SOLD OUT</span>
                    ) : (
                        <span>{product.price} €</span>
                    )}
                </div>
            </div>
        </Link>
     );
  };


  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-4 md:px-8">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-black pb-8 flex flex-col md:flex-row justify-between items-end gap-8">
         <h1 className="cobalt-heading text-6xl md:text-9xl tracking-tighter leading-none">
             {title}
         </h1>
         <p className="md:max-w-md text-right text-gray-600 text-lg leading-relaxed">
             {intro}
         </p>
      </div>

      {/* FILTRES */}
      <div className="max-w-7xl mx-auto mb-20">
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition-all ${
                        activeCategory === cat 
                        ? 'text-[#2433FF] border-[#2433FF]' 
                        : 'text-gray-400 border-transparent hover:text-black'
                    }`}
                  >
                      {cat}
                  </button>
              ))}
          </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* LISTE DES DROPS */}
        {activeDrops.map((drop) => (
            <section key={drop.id}>
                {/* Header du Drop */}
                <div className="mb-12 flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
                    <div>
                        <span className="text-[#2433FF] font-mono text-xs uppercase tracking-widest mb-2 block">
                            Drop Collection
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none">
                            {drop.title}
                        </h2>
                    </div>
                    <p className="max-w-md text-sm text-gray-500 leading-relaxed text-right">
                        {drop.description}
                    </p>
                </div>

                {/* Grille Produits du Drop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {drop.products.map((p, i) => (
                        <ScrollAnimation key={p.id} delay={i * 50}>
                            <ProductCard product={p} />
                        </ScrollAnimation>
                    ))}
                </div>
            </section>
        ))}

        {/* PRODUITS HORS COLLECTION (S'il y en a) */}
        {orphanProducts.length > 0 && (
            <section>
                 <div className="mb-12 border-t border-black/10 pt-12">
                    <h2 className="text-2xl font-bold uppercase">Les Essentiels</h2>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {orphanProducts.map((p, i) => (
                        <ScrollAnimation key={p.id} delay={i * 50}>
                            <ProductCard product={p} />
                        </ScrollAnimation>
                    ))}
                 </div>
            </section>
        )}

        {/* SI RIEN NE MATCHE */}
        {activeDrops.length === 0 && orphanProducts.length === 0 && (
            <div className="py-20 text-center text-gray-400 font-mono">
                Aucune pièce disponible dans cette catégorie pour le moment.
            </div>
        )}

      </div>

    </div>
  );
}