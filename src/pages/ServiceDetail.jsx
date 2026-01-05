import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { archiServicesList } from '../data/staticData';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = archiServicesList.find(s => s.id === id);

  if (!service) return <div className="pt-32 text-center text-white">Prestation introuvable</div>;

  return (
    <div className="animate-fade-in bg-[#0A0A0C] min-h-screen z-50 pt-32 pb-24">
       <div className="max-w-6xl mx-auto px-6">
          <Link to="/prestations" className="text-sm font-bold uppercase tracking-widest text-[#2433FF] mb-12 hover:text-white transition-colors flex items-center gap-2 clickable w-fit">
             <ArrowLeft className="w-4 h-4"/> Retour aux prestations
          </Link>

          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1">
                <span className="text-[#2433FF] font-bold uppercase tracking-widest mb-4 block">{service.tag}</span>
                <h1 className="cobalt-heading text-5xl md:text-7xl mb-8 leading-tight">{service.title}</h1>
                <p className="text-2xl text-white font-light mb-8">{service.price}</p>
                <div className="w-20 h-1 bg-white/20 mb-8"></div>
                <p className="text-gray-300 text-lg leading-relaxed mb-12">{service.content}</p>
                <button className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#2433FF] hover:text-white transition-all clickable">
                   Demander un devis
                </button>
             </div>
             
             <div className="order-1 md:order-2 relative">
                <div className="aspect-square bg-gray-900 border border-white/10 overflow-hidden">
                   <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}