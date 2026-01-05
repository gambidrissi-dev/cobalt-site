import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler, Users } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function ProjectDetail({ projects }) {
  const { id } = useParams();
  
  // Scroll en haut au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 1. TROUVER LE PROJET
  const projectList = projects ? Object.values(projects) : [];
  
  // On compare en String pour éviter les bugs id vs documentId
  const project = projectList.find(p => String(p.id) === String(id));

  // Si pas de projet trouvé (chargement ou erreur URL)
  if (!project) {
     return (
        <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center text-white">
           <p className="font-mono animate-pulse">Chargement du projet...</p>
        </div>
     );
  }

  // 2. NAVIGATION (Suivant / Précédent)
  const currentIndex = projectList.findIndex(p => p.id === project.id);
  const nextProject = projectList[(currentIndex + 1) % projectList.length];
  const prevProject = projectList[(currentIndex - 1 + projectList.length) % projectList.length];

  // 3. PRÉPARATION GALERIE
  const gallery = project.images?.gallery || [];

  return (
    <div className="animate-fade-in min-h-screen bg-[#0A0A0C] text-white selection:bg-[#2433FF] selection:text-white pt-24 md:pt-32 pb-24">
       
       {/* J'ai supprimé la DIV "NAVIGATION TOP" ici */}

       <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* TITRE & INFOS */}
          <div className="mb-12 md:mb-24 mt-8 md:mt-0">
             <span className="text-[#2433FF] font-bold text-xs uppercase tracking-widest mb-4 block">
                {project.category} — {project.year}
             </span>
             <h1 className="cobalt-heading text-4xl md:text-8xl leading-[0.9] mb-8">
                {project.title}
             </h1>
          </div>

          {/* IMAGE HERO */}
          <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-gray-900 mb-12 md:mb-24 relative overflow-hidden">
             <ScrollAnimation animation="scale-up" className="w-full h-full">
                <img 
                   src={project.images?.hero} 
                   alt={project.title} 
                   className="w-full h-full object-cover"
                />
             </ScrollAnimation>
          </div>

          {/* CONTENU & SIDEBAR */}
          <div className="grid md:grid-cols-12 gap-12 md:gap-24 items-start">
             
             {/* COLONNE TECHNIQUE */}
             <div className="md:col-span-4 md:sticky md:top-40">
                <div className="border-t border-white/20 pt-6">
                   <h3 className="font-bold uppercase tracking-widest text-sm mb-8 text-gray-500">Fiche Technique</h3>
                   
                   <div className="space-y-6 font-mono text-sm">
                      <div className="flex items-start gap-4">
                         <MapPin className="w-4 h-4 text-[#2433FF] mt-1" />
                         <div>
                            <span className="block text-gray-500 text-xs uppercase">Lieu</span>
                            <span>{project.location}</span>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <Ruler className="w-4 h-4 text-[#2433FF] mt-1" />
                         <div>
                            <span className="block text-gray-500 text-xs uppercase">Surface</span>
                            <span>{project.surface || "Non communiqué"}</span>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <Users className="w-4 h-4 text-[#2433FF] mt-1" />
                         <div>
                            <span className="block text-gray-500 text-xs uppercase">Client</span>
                            <span>{project.client || "Privé"}</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* DESCRIPTION & GALERIE */}
             <div className="md:col-span-8">
                
                {/* Description Longue */}
                <div className="mb-16 md:mb-24">
                   <div className="text-xl md:text-2xl font-light leading-relaxed mb-8 whitespace-pre-line text-gray-300">
                      {project.description}
                   </div>
                </div>

                {/* GALERIE PHOTOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {gallery.length > 0 ? (
                      gallery.map((img, i) => (
                         <div key={i} className={i % 3 === 0 ? 'md:col-span-2' : ''}>
                            <ScrollAnimation animation="slide-up">
                               <div className={`bg-gray-900 overflow-hidden w-full ${i % 3 === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                                  <img 
                                     src={img} 
                                     alt={`Vue ${i+1}`} 
                                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                                  />
                               </div>
                            </ScrollAnimation>
                         </div>
                      ))
                   ) : (
                      // DEBUG : Message discret si pas d'images
                      <div className="md:col-span-2 border border-dashed border-white/10 p-8 text-center text-gray-600 font-mono text-xs opacity-50">
                         Galerie en attente d'images...
                      </div>
                   )}
                </div>

             </div>
          </div>

       </div>

       {/* NAVIGATION FOOTER */}
       <div className="mt-24 border-t border-white/10">
          <div className="grid grid-cols-2 divide-x divide-white/10">
             
             {prevProject && (
                <Link to={`/projet/${prevProject.id}`} className="group p-8 md:p-12 hover:bg-white hover:text-black transition-colors text-left">
                   <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black/50 mb-2">Précédent</span>
                   <span className="text-lg md:text-2xl font-bold flex items-center gap-4">
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" /> 
                      <span className="line-clamp-1">{prevProject.title}</span>
                   </span>
                </Link>
             )}

             {nextProject && (
                <Link to={`/projet/${nextProject.id}`} className="group p-8 md:p-12 hover:bg-white hover:text-black transition-colors text-right">
                   <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black/50 mb-2">Suivant</span>
                   <span className="text-lg md:text-2xl font-bold flex items-center justify-end gap-4">
                      <span className="line-clamp-1">{nextProject.title}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                   </span>
                </Link>
             )}

          </div>
       </div>

    </div>
  );
}