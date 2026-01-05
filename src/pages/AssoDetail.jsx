import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

// Les données spécifiques de chaque programme
const programsData = {
  "alternance": {
    title: "ALTERNANCE",
    subtitle: "CURSUS 3 ANS",
    intro: "Un programme d'immersion totale pour apprendre le métier d'architecte-constructeur au contact du réel.",
    content: [
      "Notre cursus en alternance est conçu pour briser la barrière entre la théorie académique et la réalité du chantier.",
      "Pendant 3 ans, vous serez intégré à l'équipe du Collectif Cobalt. Vous participerez à toutes les phases du projet : esquisse, permis de construire, consultation des entreprises et surtout, suivi de chantier.",
      "Nous recherchons des profils passionnés, prêts à se salir les mains et à comprendre la matière."
    ],
    details: [
      "Rythme : 3 semaines en agence / 1 semaine école",
      "Rémunération selon grille légale",
      "Poste basé à Biarritz ou Bordeaux",
      "Accès aux outils de l'Atelier (Machines bois, métal, 3D)"
    ]
  },
  "workshops": {
    title: "WORKSHOPS",
    subtitle: "ÉTÉ 2025",
    intro: "Une semaine intensive pour construire une structure à l'échelle 1. Du dessin à l'assemblage final.",
    content: [
      "Chaque été, nous organisons un workshop de construction en plein air. L'objectif est simple : concevoir et bâtir une micro-architecture en 7 jours.",
      "Encadrés par nos architectes et nos artisans partenaires, vous apprendrez les techniques d'assemblage bois, le travail du métal et les bases de la charpente.",
      "Le projet construit restera pérenne et servira à la collectivité locale."
    ],
    details: [
      "Durée : 7 jours (Juillet ou Août)",
      "Logement et repas inclus",
      "Ouvert aux étudiants en archi, design et ingénierie",
      "Matériaux fournis (Bois locaux)"
    ]
  },
  "mentorat": {
    title: "MENTORAT",
    subtitle: "JEUNES DIPLÔMÉS",
    intro: "Ne restez pas seul après le diplôme. Un accompagnement pour lancer votre propre structure.",
    content: [
      "Le saut dans le grand bain est souvent brutal. Notre programme de mentorat vise à accompagner les jeunes architectes dans leurs premiers pas professionnels.",
      "Aide juridique, conseils sur les assurances, gestion de la relation client, et relecture technique de vos premiers dossiers.",
      "Nous mettons notre expérience et notre réseau à votre disposition pour sécuriser votre démarrage."
    ],
    details: [
      "Suivi mensuel personnalisé",
      "Accès à notre réseau d'entreprises",
      "Relecture de vos CCTP et plans d'exé",
      "Aide au chiffrage de vos honoraires"
    ]
  }
};

export default function AssoDetail({ onOpenContact }) {
  const { id } = useParams();
  const program = programsData[id];

  // Si le programme n'existe pas (mauvaise URL), on affiche une erreur propre
  if (!program) return <div className="pt-40 text-center text-white">Programme introuvable</div>;

  return (
    <div className="animate-fade-in min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* BOUTON RETOUR */}
        <Link to="/asso" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white border-b border-transparent hover:border-white transition-all mb-16 pb-1">
           <ArrowLeft className="w-4 h-4" /> Retour à l'école
        </Link>

        {/* EN-TÊTE DU PROGRAMME */}
        <div className="grid md:grid-cols-2 gap-16 mb-24 border-b border-white/20 pb-16">
           <div>
              <span className="font-mono text-[#2433FF] bg-white px-2 py-1 text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                {program.subtitle}
              </span>
              <h1 className="cobalt-heading text-6xl md:text-8xl mb-6 leading-none">
                {program.title}
              </h1>
           </div>
           <div className="flex flex-col justify-end">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                {program.intro}
              </p>
           </div>
        </div>

        {/* CONTENU DÉTAILLÉ */}
        <div className="grid md:grid-cols-12 gap-12">
            
            {/* Colonne Texte (Gauche) */}
            <div className="md:col-span-7">
               <h3 className="text-sm font-bold uppercase tracking-widest mb-8 border-l-2 border-white pl-4">Le Programme</h3>
               <div className="prose prose-lg prose-invert text-white/80 leading-relaxed space-y-6">
                  {program.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
               </div>
               
               <div className="mt-12">
                  <button 
                    onClick={onOpenContact}
                    className="bg-white text-[#2433FF] px-8 py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3"
                  >
                    Postuler maintenant <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </div>

            {/* Colonne Détails (Droite - Encadré) */}
            <div className="md:col-span-5">
               <div className="border border-white/30 p-8 bg-[#2433FF]/50 backdrop-blur-sm">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Modalités</h3>
                  <ul className="space-y-4">
                     {program.details.map((detail, i) => (
                       <li key={i} className="flex items-start gap-3 text-white/90">
                          <Check className="w-5 h-5 shrink-0 mt-0.5" />
                          <span className="text-sm">{detail}</span>
                       </li>
                     ))}
                  </ul>
                  
                  <div className="mt-12 pt-8 border-t border-white/20">
                     <p className="text-xs opacity-70 mb-2">Des questions ?</p>
                     <a href="mailto:contact@collectifcobalt.com" className="text-lg font-bold underline decoration-1 underline-offset-4 hover:text-white/80">
                        ecole@collectifcobalt.com
                     </a>
                  </div>
               </div>
            </div>

        </div>

      </div>
    </div>
  );
}