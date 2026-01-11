import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function Eshop({ products, collections, pageContent }) {
  
  const title = pageContent?.pageTitle || "L'ATELIER";
  const intro = pageContent?.description || "Objets manifestes...";
  const [activeCategory, setActiveCategory] = useState('Tout');
  const categories = ['Tout', 'Mobilier', 'Deco & Maison', 'Prints', 'Outils Archi'];

  // --- DEBUG FORCE ---
  // On affiche ce bloc si on a un doute
  const debugData = {
      nbProduits: products ? products.length : 'NULL',
      exempleProduit: products && products.length > 0 ? products[0] : 'Aucun',
      nbCollections: collections ? collections.length : 'NULL'
  };

  const filteredProducts = useMemo(() => {
     if (!products) return [];
     if (activeCategory === 'Tout') return products;
     return products.filter(p => (p.category || "").toLowerCase() === activeCategory.toLowerCase());
  }, [products, activeCategory]);

  const activeDrops = useMemo(() => {
     if (!collections) return [];
     return collections.map(col => {
        const dropProducts = filteredProducts.filter(p => {
             // Vérification lien bi-directionnel
             if (p.collectionId && (p.collectionId === col.id || p.collectionId === col.documentId)) return true;
             if (col.linkedProducts && col.linkedProducts.some(lp => lp.id === p.id)) return true;
             return false;
        });
        if (dropProducts.length === 0) return null;
        return { ...col, products: dropProducts };
     }).filter(Boolean);
  }, [collections, filteredProducts]);

  const orphanProducts = useMemo(() => {
      const productsInDropsIds = activeDrops.flatMap(d => d.products.map(p => p.id));
      return filteredProducts.filter(p => !productsInDropsIds.includes(p.id));
  }, [filteredProducts, activeDrops]);

  const ProductCard = ({ product }) => (
      <Link to={`/produit/${product.id}`} className="block border border-white/10 p-4">
          <div className="aspect-[4/5] bg-gray-800 mb-2 relative">
             <img src={product.image} className="w-full h-full object-cover" alt=""/>
          </div>
          <div className="text-white">{product.name}</div>
          <div className="text-gray-400 text-sm">{product.price} €</div>
      </Link>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white pt-32 pb-20 px-4">
      
      {/* --- ZONE DE DIAGNOSTIC --- */}
      <div className="bg-gray-900 border border-yellow-500 p-6 mb-12 font-mono text-xs overflow-auto max-h-64">
          <h3 className="text-yellow-500 font-bold text-lg mb-2">🕵️‍♂️ DIAGNOSTIC DIRECT</h3>
          <p><strong>Produits reçus :</strong> {debugData.nbProduits}</p>
          <p><strong>Collections reçues :</strong> {debugData.nbCollections}</p>
          <pre className="mt-2 text-green-400 whitespace-pre-wrap">
              {JSON.stringify(debugData.exempleProduit, null, 2)}
          </pre>
      </div>
      {/* ------------------------- */}

      <div className="max-w-7xl mx-auto mb-16">
         <h1 className="text-6xl font-bold">{title}</h1>
         <p className="text-gray-400 mt-4">{intro}</p>
      </div>

      <div className="max-w-7xl mx-auto mb-10 flex gap-4">
          {categories.map(cat => (
             <button key={cat} onClick={() => setActiveCategory(cat)} className={activeCategory===cat ? 'text-blue-500 font-bold' : 'text-gray-500'}>{cat}</button>
          ))}
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {activeDrops.map(drop => (
            <div key={drop.id}>
                <h2 className="text-3xl font-bold mb-6 text-blue-500">{drop.title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {drop.products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>
        ))}

        {orphanProducts.length > 0 && (
            <div>
                <h2 className="text-3xl font-bold mb-6">Les Essentiels</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {orphanProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>
        )}

        {activeDrops.length === 0 && orphanProducts.length === 0 && (
            <div className="text-center text-gray-500 py-10">Aucun produit affiché.</div>
        )}
      </div>
    </div>
  );
}