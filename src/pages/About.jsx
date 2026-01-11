import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Instagram } from 'lucide-react';
import { getStrapiMedia } from '../lib/strapi';

export default function About({ team, pageContent }) {

  // 1. Données de la page (Haut)
  const title = pageContent?.pageTitle || "L'AGENCE";
  const description = pageContent?.description || "Collectif d'architecture et de design basé entre Biarritz et Bordeaux. Nous concevons des espaces vivants et durables.";
  const email = pageContent?.email || "contact@collectifcobalt.eu";
  const instagram = pageContent?.instagram || "https://instagram.com";
  
  const coverImage = pageContent?.cover?.data?.attributes?.url 
    ? getStrapiMedia(pageContent.cover.data.attributes.url)
    : null;

  // 2. Helper pour l'image des membres
  const getMemberImage = (member) => {
      const img = member.attributes?.photo?.data?.attributes?.url || member.photo?.data?.attributes?.url;
      return img ? getStrapiMedia(img) : null;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white pt-32 pb-20 px-4 md:px-8">
      
      {/* --- HEADER AGENCE --- */}
      <div className="max-w-7xl mx-auto mb-20 grid md:grid-cols-2 gap-12 items-end">
         <div>
            <span className="text-[#2433FF] font-mono text-sm tracking-widest uppercase mb-4 block">
                À propos
            </span>
            <h1 className="cobalt-heading text-6xl md:text-9xl mb-6">
                {title}
            </h1>
         </div>
         <div className="md:pb-4">
            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-8">
                {description}
            </p>
            <div className="flex gap-6">
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#2433FF] transition-colors">
                    <Mail size={16} /> Nous écrire
                </a>
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#2433FF] transition-colors">
                    <Instagram size={16} /> Instagram
                </a>
            </div>
         </div>
      </div>

      {/* --- IMAGE DE COUVERTURE --- */}
      {coverImage && (
          <div className="max-w-7xl mx-auto mb-32 aspect-[21/9] bg-gray-900 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[#2433FF]/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
              <img 
                src={coverImage} 
                alt="L'agence" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
          </div>
      )}

      {/* --- L'ÉQUIPE (TEAM) --- */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold">L'ÉQUIPE</h2>
            <div className="h-px bg-white/10 flex-grow"></div>
        </div>

        {team && team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member) => {
                    const data = member.attributes || member;
                    const id = member.id;
                    const imgUrl = getMemberImage(member);

                    return (
                        <Link key={id} to={`/equipe/${id}`} className="group block">
                            <div className="aspect-[3/4] bg-[#111] mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                                {imgUrl ? (
                                    <img src={imgUrl} alt={data.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs uppercase">Photo à venir</div>
                                )}
                            </div>
                            <h3 className="text-lg font-bold group-hover:text-[#2433FF] transition-colors">{data.name}</h3>
                            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{data.role}</p>
                        </Link>
                    );
                })}
            </div>
        ) : (
            <div className="text-center py-20 border border-white/10 text-gray-500">
                L'équipe est en cours de constitution sur Strapi.
            </div>
        )}
      </div>

    </div>
  );
}