import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Ruler, Box, AlertCircle } from 'lucide-react';

export default function ProductDetail({ products }) {
  const { id } = useParams();
  
  // Recherche ID (compatible string/number)
  const product = products ? products.find(p => p.id == id || p.documentId == id) : null;
  
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center text-white">
       <div className="mb-4 font-mono">Objet introuvable...</div>
       <Link to="/eshop" className="border-b border-[#2433FF] text-[#2433FF]">Retour</Link>
    </div>
  );

  const isSoldOut = product.stock === 0;
  
  const mailSubject = `Commande : ${product.name} (Ref: ${product.id})`;
  const mailBody = `Bonjour l'Atelier,\n\nJe souhaite acquérir la pièce "${product.name}".\nMerci de me confirmer la disponibilité et les frais de port.\n\nCordialement.`;
  const mailToLink = `mailto:atelier@collectifcobalt.eu?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="animate-fade-in min-h-screen bg-[#0A0A0C] text-white pt-32 pb-20 px-4 md:px-8">
      
      <Link to="/eshop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#2433FF] transition-colors mb-8">
        <ArrowLeft size={14} /> Retour à l'atelier
      </Link>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* GAUCHE : GALERIE */}
        <div className="flex flex-col gap-4 sticky top-32 h-fit">
            <div className="aspect-square bg-[#111] overflow-hidden relative border border-white/5 group">
                {product.gallery && product.gallery[selectedImage] ? (
                    <img 
                        src={product.gallery[selectedImage]} 
                        alt={product.name} 
                        className={`w-full h-full object-cover ${isSoldOut ? 'grayscale opacity-50' : ''}`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-xs">Pas d'image</div>
                )}
                
                {isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-widest border border-white/20">Épuisé</span>
                    </div>
                )}
            </div>
            
            {/* Miniatures */}
            {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {product.gallery.map((img, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`w-20 h-20 flex-shrink-0 border transition-all ${selectedImage === idx ? 'border-[#2433FF] opacity-100' : 'border-white/10 opacity-40 hover:opacity-100'}`}
                        >
                            <img src={img} className="w-full h-full object-cover" alt="" />
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* DROITE : INFOS */}
        <div className="flex flex-col">
            <span className="text-[#2433FF] font-bold uppercase tracking-widest text-xs mb-4">
                {product.category}
            </span>
            
            <h1 className="cobalt-heading text-5xl md:text-6xl mb-6 leading-none text-white">
                {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-light font-mono text-white">
                    {product.price} €
                </span>
                {product.limitedLabel && (
                     <span className="bg-white text-black text-[10px] font-bold uppercase px-2 py-1 tracking-widest">
                         {product.limitedLabel}
                     </span>
                )}
            </div>

            <div className="w-full h-px bg-white/10 mb-8"></div>

            <div className="prose prose-lg prose-invert text-gray-300 mb-12 leading-relaxed">
                {product.description}
            </div>

            {/* Fiche Technique */}
            <div className="bg-[#111] p-8 border border-white/10 space-y-4 mb-12">
                <h3 className="font-bold uppercase tracking-widest text-xs mb-4 text-white">Détails</h3>
                
                {product.dimensions && (
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <Ruler size={18} className="text-[#2433FF]" />
                        <span>Dimensions : <span className="text-white font-medium">{product.dimensions}</span></span>
                    </div>
                )}
                
                {product.material && (
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <Box size={18} className="text-[#2433FF]" />
                        <span>Matériaux : <span className="text-white font-medium">{product.material}</span></span>
                    </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <Check size={18} className="text-[#2433FF]" />
                    <span>Fabrication : <span className="text-white font-medium">Fait main à l'Atelier (Biarritz)</span></span>
                </div>

                {product.stock > 0 && product.stock <= 5 && (
                    <div className="flex items-center gap-4 text-sm text-[#2433FF] pt-4 border-t border-white/10">
                        <AlertCircle size={18} />
                        <span className="font-bold">Attention, plus que {product.stock} exemplaire{product.stock > 1 ? 's' : ''} !</span>
                    </div>
                )}
            </div>

            {/* ACTION */}
            {isSoldOut ? (
                <button 
                    disabled 
                    className="bg-gray-800 text-gray-500 py-6 px-8 text-center font-bold uppercase tracking-widest cursor-not-allowed border border-white/10"
                >
                    Victime de son succès
                </button>
            ) : (
                <a 
                    href={mailToLink}
                    className="bg-white text-black py-6 px-8 text-center font-bold uppercase tracking-widest hover:bg-[#2433FF] hover:text-white transition-all duration-300"
                >
                    Commander cette pièce
                </a>
            )}
            
            {!isSoldOut && (
                <p className="text-xs text-center text-gray-500 mt-4">
                    Paiement sécurisé et livraison organisée par échange de mail.
                </p>
            )}

        </div>
      </div>
    </div>
  );
}