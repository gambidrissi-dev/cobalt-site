import React from 'react';
import { ArrowDown } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function About({ team }) {

  // Données statiques si l'API n'est pas connectée
  const staff = team && team.length > 0 ? team : [
    { name: "Thomas Dubreuil", role: "Architecte Associé", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
    { name: "Sarah Lemoine", role: "Directrice Technique", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" },
    { name: "Marc Alibert", role: "Chef d'Atelier", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" },
    { name: "Elise Faure", role: "Architecte DE", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" },
    { name: "Julien Moreau", role: "Conducteur de Travaux", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
    { name: "Clara Besson", role: "Designer Mobilier", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" },
  ];

  const stats = [
    { value: "12", label: "Années d'existence" },
    { value: "45", label: "Projets livrés" },
    { value: "2", label: "Ateliers (Biarritz & Bdx)" },
    { value: "100%", label: "Indépendance" },
  ];

  return (
    <div className="animate-fade-in min-h-screen pt-32 pb-24 px-6 relative bg-[#0A0A0C] text-white">
      
      {/* 1. HERO SECTION : LE MANIFESTE */}
      <div className="max-w-7xl mx-auto mb-32 border-b border-white/10 pb-24">
         <div className="grid md:grid-cols-2 gap-16 items-start">
            
            {/* Titre Collant */}
            <div className="sticky top-32">
               <span className="text-[#2433FF] font-bold text-xs uppercase tracking-widest mb-4 block">L'Agence</span>
               <h1 className="cobalt-heading text-6xl md:text-8xl leading-none mb-8">
                  ARCHI<br/>TECTES<br/>CONSTR<br/>UCTEURS.
               </h1>
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce mt-12">
                  <ArrowDown className="w-5 h-5" />
               </div>
            </div>

            {/* Texte Manifeste */}
            <div className="pt-2">
               <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12 text-white/90">
                  Nous avons supprimé la frontière entre le bureau d'études et l'atelier. 
                  <span className="text-[#2433FF]"> Nous dessinons ce que nous savons construire.</span>
               </p>
               <div className="space-y-8 text-gray-400 leading-relaxed text-lg">
                  <p>
                     Le Collectif Cobalt est né d'un constat simple : l'architecture perd son sens quand elle s'éloigne de la matière. 
                     C'est pourquoi nous avons intégré notre propre atelier de fabrication.
                  </p>
                  <p>
                     Cette double casquette nous permet de maîtriser la chaîne complète, du permis de construire jusqu'à la pose 
                     du dernier élément de mobilier. Nous garantissons ainsi les coûts, les délais, et surtout la qualité du détail.
                  </p>
               </div>

               {/* Stats Grid */}
               <div className="grid grid-cols-2 gap-8 mt-16 border-t border-white/10 pt-16">
                  {stats.map((stat, i) => (
                    <div key={i}>
                       <span className="block text-4xl md:text-5xl font-bold font-mono mb-2">{stat.value}</span>
                       <span className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</span>
                    </div>
                  ))}
               </div>
            </div>

         </div>
      </div>

      {/* 2. L'ÉQUIPE (GRID) */}
      <div className="max-w-7xl mx-auto mb-32">
         <div className="flex items-end justify-between mb-16">
            <h2 className="cobalt-heading text-5xl md:text-6xl">L'ÉQUIPE</h2>
            <p className="text-right text-sm text-gray-500 hidden md:block">
               Biarritz & Bordeaux<br/>France
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
            {staff.map((member, i) => (
               <ScrollAnimation key={i} delay={i * 50} animation="slide-up">
                  <div className="group cursor-pointer">
                     {/* Photo */}
                     <div className="aspect-[3/4] overflow-hidden bg-gray-900 mb-6 relative">
                        {/* Overlay couleur au survol */}
                        <div className="absolute inset-0 bg-[#2433FF] opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                        <img 
                           src={member.image} 
                           alt={member.name} 
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                        />
                     </div>
                     {/* Infos */}
                     <div className="border-t border-white/10 pt-4 flex justify-between items-start">
                        <div>
                           <h3 className="text-xl font-bold mb-1 group-hover:text-[#2433FF] transition-colors">{member.name}</h3>
                           <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">{member.role}</p>
                        </div>
                     </div>
                  </div>
               </ScrollAnimation>
            ))}
         </div>
      </div>

      {/* 3. LES BUREAUX (IMAGE FULL WIDTH) */}
      <div className="w-full h-[60vh] relative overflow-hidden mb-24 grayscale hover:grayscale-0 transition-all duration-1000">
         <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" 
            alt="Nos Bureaux" 
            className="w-full h-full object-cover"
         />
         <div className="absolute bottom-0 left-0 bg-black/50 backdrop-blur-md p-8 md:p-12 border-t border-r border-white/20">
            <h3 className="text-2xl font-bold mb-4">Venez nous voir</h3>
            <p className="text-gray-300 mb-6 max-w-md">
               Nos ateliers sont ouverts aux visites sur rendez-vous. Venez découvrir nos prototypes et rencontrer l'équipe.
            </p>
            <button className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-[#2433FF] hover:border-[#2433FF] transition-colors">
               Prendre rendez-vous
            </button>
         </div>
      </div>

    </div>
  );
}