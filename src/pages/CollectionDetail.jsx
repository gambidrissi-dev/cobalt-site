// src/pages/CollectionDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CobaltCard, ScrollAnimation } from '../components/ui/CobaltComponents';
import { Check, ArrowLeft } from 'lucide-react';

export default function CollectionDetail({ collections, products }) {
  const { id } = useParams();
  
  // On trouve la collection et les produits associés
  const collection = collections.find(c => c.id === id);
  const collectionProducts = products ? products.filter(p => p.collectionId === id) : [];

  if (!collection) return <div className="pt-32 text-center h-screen flex flex-col justify-center items-center">Collection introuvable <Link to="/eshop" className="text-[#2433FF] mt-4">Retour Eshop</Link></div>;

  return (
    <div className="animate-fade-in bg-[#0A0A0C] min-h-screen z-50">
      {/* HEADER HERO */}
      <div className="h-[60vh] relative flex items-center justify-center border-b border-white/15">
         <div className="absolute inset-0 z-0">
             <img src={collection.image} className="w-full h-full object-cover opacity-40" alt={collection.title} />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] to-transparent" />
         </div>
         <div className="relative z-10 text-center px-6">
             <span className="bg-[#2433FF] text-white px-4 py-2 font-bold text-xs uppercase tracking-wider mb-6 inline-block">{collection.tag}</span>
             <h1 className="cobalt-heading text-6xl md:text-9xl mb-6">{collection.title}</h1>
             <p className="text-xl text-gray-300 max-w-2xl mx-auto cobalt-body">{collection.description}</p>
         </div>
         <Link to="/eshop" className="absolute top-32 left-6 text-sm font-bold uppercase tracking-widest text-[#2433FF] hover:text-white transition-colors duration-200 flex items-center gap-2 clickable z-20 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
             <ArrowLeft className="w-4 h-4" /> Retour Catalogue
         </Link>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-6 py-24">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map((p, i) => (
                <ScrollAnimation key={i} delay={i * 100} animation="slide-up">
                    <Link to={`/produit/${p.id}`}>
                        <CobaltCard className="group bg-[#0F0F11] border border-white/15 cursor-pointer clickable">
                            <div className="aspect-[4/5] relative overflow-hidden bg-gray-900">
                                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={p.title} />
                                {p.status === "En stock" && (
                                    <div className="absolute top-4 left-4 bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 uppercase backdrop-blur-md border border-green-500/30 flex items-center gap-1">
                                        <Check className="w-3 h-3" /> En Stock
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="cobalt-heading text-2xl group-hover:text-[#2433FF] transition-colors">{p.title}</h3>
                                    <span className="text-white font-bold">{p.price}</span>
                                </div>
                                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{p.desc}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <span className="text-xs text-gray-400 uppercase tracking-widest">{p.status}</span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#2433FF] group-hover:underline">Voir le détail</span>
                                </div>
                            </div>
                        </CobaltCard>
                    </Link>
                </ScrollAnimation>
            ))}
         </div>
      </div>
    </div>
  );
}