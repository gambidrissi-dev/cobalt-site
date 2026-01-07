import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react'; 
import { FaInstagram, FaLinkedin, FaPinterest } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [infos, setInfos] = useState(null);

  const STRAPI_URL = 'https://strapi.collectifcobalt.eu'; 

  useEffect(() => {
    // On suppose que tu as créé un Single Type "general-information" dans Strapi
    fetch(`${STRAPI_URL}/api/general-information`)
      .then((res) => res.json())
      .then((data) => {
        setInfos(data.data?.attributes);
      })
      .catch((err) => console.error("Erreur chargement infos:", err));
  }, []);

  return (
    <footer className="bg-[#0A0A0C] text-white pt-24 pb-8 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid md:grid-cols-4 gap-12 mb-24">
          
          {/* Colonne 1 : Réseaux (Dynamique) */}
          <div className="space-y-6">
            <h3 className="cobalt-heading text-2xl">Collectif<span className="text-[#2433FF]">.</span>Cobalt</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Agence d'architecture, atelier de fabrication et média indépendant. 
              Nous construisons le réel.
            </p>
            
            <div className="flex gap-4 pt-2">
              {infos?.instagram_url && (
                <a href={infos.instagram_url} target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all">
                  <FaInstagram className="w-4 h-4" />
                </a>
              )}
              {infos?.linkedin_url && (
                <a href={infos.linkedin_url} target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all">
                  <FaLinkedin className="w-4 h-4" />
                </a>
              )}
               {infos?.pinterest_url && (
                <a href={infos.pinterest_url} target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all">
                  <FaPinterest className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Colonne 2 : Navigation (Reste en dur car structurelle) */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-gray-500">Navigation</h4>
            <ul className="space-y-4 font-mono text-sm">
              <li><Link to="/cobalt-plus" className="hover:text-[#2433FF] transition-colors">Cobalt +</Link></li>
              <li><Link to="/atelier" className="hover:text-[#2433FF] transition-colors">L'Atelier</Link></li>
              <li><Link to="/media" className="hover:text-[#2433FF] transition-colors">Le Média</Link></li>
              <li><Link to="/asso" className="hover:text-[#2433FF] transition-colors">L'École du Faire</Link></li>
              <li><Link to="/eshop" className="hover:text-[#2433FF] transition-colors">E-Shop</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Bureaux (Dynamique ou par défaut) */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-gray-500">Bureaux</h4>
            <div className="space-y-6 text-sm text-gray-300">
              <div>
                <span className="block text-white font-bold mb-1">Biarritz (Siège)</span>
                {/* On affiche ce qui vient de Strapi, sinon la valeur par défaut */}
                <p className="whitespace-pre-line">
                  {infos?.address_biarritz || "42 Avenue de la Milady\n64200 Biarritz"}
                </p>
              </div>
              <div>
                <span className="block text-white font-bold mb-1">Bordeaux</span>
                <p className="whitespace-pre-line">
                  {infos?.address_bordeaux || "Darwin Écosystème\n87 Quai des Queyries"}
                </p>
              </div>
            </div>
          </div>

          {/* Colonne 4 : Contact (Dynamique) */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-gray-500">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={`mailto:${infos?.email_contact || 'contact@collectifcobalt.com'}`} className="hover:text-[#2433FF] transition-colors break-all">
                  {infos?.email_contact || 'contact@collectifcobalt.com'}
                </a>
              </li>
              <li>
                <span className="text-gray-500">
                  {infos?.phone_contact || '+33 (0)5 59 00 00 00'}
                </span>
              </li>
             <li className="pt-4">
                <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-white/20 pb-1 hover:border-[#2433FF] hover:text-[#2433FF] transition-all">
                    Télécharger le Press Kit <ArrowUpRight className="w-3 h-3" />
                </button>
            </li>
            </ul>
          </div>

        </div>

        {/* ... (Le reste du bas de page ne change pas) ... */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="text-xs text-gray-500 font-mono space-y-2 order-2 md:order-1">
            <p>&copy; {currentYear} COLLECTIF COBALT. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/legal" className="hover:text-white transition-colors">Mentions Légales</Link>
              <Link to="/cgv" className="hover:text-white transition-colors">CGV</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            </div>
          </div>
          <div className="order-1 md:order-2 w-full md:w-auto text-center md:text-right">
             <h2 className="text-[12vw] md:text-[8rem] leading-none font-black tracking-tighter text-[#1a1a1c] select-none hover:text-[#2433FF] transition-colors duration-700 cursor-default">
               COBALT
             </h2>
          </div>
        </div>

      </div>
    </footer>
  );
}