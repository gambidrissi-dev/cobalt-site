import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail, Instagram } from 'lucide-react'; // Ajout de l'icône Instagram
import { getStrapiMedia } from '../lib/strapi';

export default function MemberDetail({ team }) {
  const { id } = useParams();
  
  // 1. On trouve le membre
  // On utilise '==' pour comparer l'ID URL (string) avec l'ID Strapi (number)
  const member = team ? team.find(m => m.id == id) : null;

  if (!member) return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl mb-4 font-bold">Membre introuvable</h1>
      <Link to="/about" className="text-[#2433FF] border-b border-[#2433FF] pb-1">
          Retour à l'équipe
      </Link>
    </div>
  );

  // 2. On sécurise les données (Compatible Strapi)
  const data = member.attributes || member;

  // 3. Récupération de l'image (C'est ici que ça bloquait)
  // On vérifie chaque étape du chemin pour éviter le crash
  const imgData = data.photo?.data?.attributes || data.image; 
  const imgUrl = imgData?.url ? getStrapiMedia(imgData.url) : null;

  // 4. Récupération des liens sociaux
  const email = data.email;
  const linkedin = data.linkedin;
  const instagram = data.instagram;

  return (
    <div className="animate-fade-in bg-[#0A0A0C] min-h-screen z-50 pt-32 pb-24 text-white">
       <div className="max-w-6xl mx-auto px-6">
          
          {/* BOUTON RETOUR */}
          <Link to="/about" className="text-sm font-bold uppercase tracking-widest text-[#2433FF] mb-12 hover:text-white transition-colors duration-200 flex items-center gap-2 clickable w-fit">
             <ArrowLeft className="w-4 h-4"/> Retour à l'équipe
          </Link>

          <div className="grid md:grid-cols-2 gap-16 items-start">
             
             {/* COLONNE IMAGE */}
             <div className="relative sticky top-32">
                <div className="aspect-[3/4] overflow-hidden border border-white/10 bg-gray-900">
                   {imgUrl ? (
                       <img 
                         src={imgUrl} 
                         className="w-full h-full object-cover" 
                         alt={data.name} 
                       />
                   ) : (
                       <div className="w-full h-full flex items-center justify-center text-gray-700 flex-col gap-2">
                           <span>Pas de photo</span>
                           <span className="text-xs opacity-50">(Vérifier Strapi)</span>
                       </div>
                   )}
                </div>
                {/* Décoration graphique */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-[#2433FF] opacity-50"></div>
             </div>

             {/* COLONNE TEXTE */}
             <div className="flex flex-col h-full justify-center md:pt-12">
                <span className="text-[#2433FF] font-mono text-sm tracking-widest uppercase mb-4 block">
                    {data.role}
                </span>
                <h1 className="cobalt-heading text-5xl md:text-7xl mb-8 leading-tight">
                    {data.name}
                </h1>
                
                <div className="w-20 h-1 bg-white/20 mb-8"></div>

                {/* BIOGRAPHIE */}
                <div className="prose prose-lg prose-invert text-gray-300 font-light leading-relaxed whitespace-pre-line mb-12">
                   {data.bio || "Biographie à venir..."}
                </div>

                {/* LIENS DYNAMIQUES */}
                <div className="flex flex-wrap gap-6 pt-8 border-t border-white/10">
                   
                   {/* Email - S'affiche seulement si rempli dans Strapi */}
                   {email && (
                       <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-[#2433FF] transition-colors clickable">
                          <Mail className="w-5 h-5" /> Contacter
                       </a>
                   )}

                   {/* LinkedIn - S'affiche seulement si rempli */}
                   {linkedin && (
                       <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-[#2433FF] transition-colors clickable">
                          <Linkedin className="w-5 h-5" /> LinkedIn
                       </a>
                   )}

                   {/* Instagram - S'affiche seulement si rempli */}
                   {instagram && (
                       <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-[#2433FF] transition-colors clickable">
                          <Instagram className="w-5 h-5" /> Instagram
                       </a>
                   )}

                </div>
             </div>
          </div>
       </div>
    </div>
  );
}