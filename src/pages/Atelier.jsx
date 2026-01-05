import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Hammer } from 'lucide-react';

export default function Atelier() {
  return (
    <div className="animate-fade-in bg-[#0A0A0C] min-h-screen pt-32 pb-24 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* TITRE PRINCIPAL (Style identique à Cobalt +) */}
        <div className="mb-16 text-center border-b border-white/10 pb-12">
            <h1 className="cobalt-heading text-7xl md:text-9xl mb-4">L'ATELIER</h1>
            <p className="text-xl text-gray-400">Département Design, Fabrication & Éditions</p>
        </div>

        {/* LE SPLIT : DEUX GRANDS CHOIX */}
        <div className="grid md:grid-cols-2 gap-8 h-[60vh]">
            
            {/* BLOC 1 : SUR-MESURE (Equivalent de "Projets") */}
            <Link to="/atelier-savoir-faire" className="group relative border border-white/15 bg-[#0F0F11] overflow-hidden flex flex-col justify-end p-12 hover:border-[#2433FF] transition-all duration-500">
                {/* Image de fond dégradée (comme l'autre page) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
                
                <div className="relative z-20">
                    {/* Icone Cercle Bleu */}
                    <div className="bg-[#2433FF] w-12 h-12 flex items-center justify-center mb-6 rounded-full group-hover:scale-110 transition-transform">
                        <Hammer className="text-white w-6 h-6" />
                    </div>
                    
                    <h2 className="cobalt-heading text-5xl mb-4 text-white">Sur-Mesure</h2>
                    <p className="text-gray-300 mb-8 max-w-sm">Notre laboratoire de fabrication. Conception de mobilier unique et agencement pour architectes.</p>
                    
                    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2433FF] group-hover:text-white transition-colors">
                        Découvrir le savoir-faire <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </Link>

            {/* BLOC 2 : E-SHOP (Equivalent de "Prestations") */}
            <Link to="/eshop" className="group relative border border-white/15 bg-[#0F0F11] overflow-hidden flex flex-col justify-end p-12 hover:border-[#2433FF] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
                
                <div className="relative z-20">
                    {/* Icone Cercle Blanc */}
                    <div className="bg-white w-12 h-12 flex items-center justify-center mb-6 rounded-full group-hover:bg-[#2433FF] group-hover:text-white transition-colors">
                        <ShoppingBag className="text-black group-hover:text-white w-6 h-6 transition-colors" />
                    </div>
                    
                    <h2 className="cobalt-heading text-5xl mb-4 text-white">E-Shop</h2>
                    <p className="text-gray-300 mb-8 max-w-sm">Objets et mobilier en petites séries. L'expression libre de notre studio, disponible immédiatement.</p>
                    
                    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:text-[#2433FF] transition-colors">
                        Accéder à la boutique <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </Link>

        </div>
      </div>
    </div>
  );
}