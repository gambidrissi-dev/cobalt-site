import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Truck, Info } from 'lucide-react';

export default function ProductDetail({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll en haut de page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 1. RECHERCHE SÉCURISÉE
  const safeProducts = products || [];
  // On compare les ID en String pour éviter les soucis de type (1 vs "1")
  const product = safeProducts.find(p => String(p.id) === String(id));

  // 2. ÉTAT DE CHARGEMENT / INTROUVABLE
  if (!product) {
     return (
        <div className="min-h-screen bg-[#0A0A0C] flex flex-col justify-center items-center text-white gap-4">
           <p className="font-mono animate-pulse">Chargement du produit...</p>
           <button onClick={() => navigate('/eshop')} className="text-[#2433FF] text-sm border-b border-[#2433FF] pb-1">
              Retour à la boutique
           </button>
        </div>
     );
  }

  // 3. AFFICHAGE
  return (
    <div className="animate-fade-in bg-[#0A0A0C] min-h-screen z-50 text-white selection:bg-[#2433FF] selection:text-white">
       
       {/* NAVIGATION */}
       <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-12">
          <button 
             onClick={() => navigate('/eshop')} 
             className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
             <ArrowLeft className="w-4 h-4" /> Retour E-Shop
          </button>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
             
             {/* COLONNE IMAGE */}
             <div className="aspect-[3/4] bg-gray-900 border border-white/10 overflow-hidden relative group">
                {product.image ? (
                   <img 
                      src={product.image} 
                      className={`w-full h-full object-cover transition-all duration-700 ${!product.inStock ? 'grayscale opacity-60' : 'group-hover:scale-105'}`} 
                      alt={product.title} 
                   />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-600 font-mono text-xs">Image non disponible</div>
                )}

                {/* Badge Nouveauté */}
                {product.isNew && product.inStock && (
                   <div className="absolute top-4 left-4 bg-[#2433FF] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                      Nouveauté
                   </div>
                )}
             </div>

             {/* COLONNE INFOS */}
             <div className="md:sticky md:top-32">
                
                <span className="text-[#2433FF] font-bold text-xs uppercase tracking-widest mb-4 block">
                   {product.category || "Édition"}
                </span>
                
                <h1 className="cobalt-heading text-5xl md:text-6xl mb-6 leading-none">
                   {product.title}
                </h1>
                
                <p className="text-3xl font-light mb-8 font-mono">
                   {product.price}€
                </p>
                
                <hr className="border-white/10 mb-8" />
                
                {/* Description avec fallback */}
                <div className="prose prose-invert prose-p:text-gray-400 prose-p:font-light mb-12 leading-relaxed">
                   {product.description || product.desc || "Description détaillée à venir. Cette pièce est fabriquée dans notre atelier avec le plus grand soin et des matériaux sourcés localement."}
                </div>
                
                {/* LOGIQUE DE STOCK & BOUTON */}
                <div className="space-y-6">
                   {product.inStock ? (
                      // CAS 1 : EN STOCK
                      <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-[#2433FF] hover:text-white transition-all duration-300">
                         Ajouter au panier
                      </button>
                   ) : (
                      // CAS 2 : ÉPUISÉ
                      <button disabled className="w-full bg-gray-800 text-gray-500 py-4 font-bold uppercase tracking-widest cursor-not-allowed border border-white/10 flex items-center justify-center gap-2">
                         Rupture de stock
                      </button>
                   )}
                   
                   {/* Infos Livraison / Stock */}
                   <div className="flex flex-col gap-3 text-xs text-gray-500 font-mono uppercase tracking-wider pt-4">
                      {product.inStock ? (
                         <>
                           <div className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-[#2433FF]" /> 
                              <span>En stock, expédition immédiate</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <Truck className="w-4 h-4 text-[#2433FF]" /> 
                              <span>Livraison France (2-4 jours)</span>
                           </div>
                         </>
                      ) : (
                         <div className="flex items-center gap-3 text-red-400">
                            <Info className="w-4 h-4" /> 
                            <span>Victime de son succès - Réassort en cours</span>
                         </div>
                      )}
                   </div>
                </div>

             </div>
          </div>
       </div>
    </div>
  );
}