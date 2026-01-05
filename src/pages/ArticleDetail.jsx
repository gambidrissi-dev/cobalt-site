import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, ArrowRight } from 'lucide-react';
import { ScrollAnimation } from '../components/ui/CobaltComponents';

export default function ArticleDetail({ articles }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll tout en haut quand on change d'article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // --- DONNÉES DE SECOURS (MOCK) ---
  // Pour que la page marche même si tu cliques sur un lien "en dur"
  const allArticles = articles || [
    {
        id: "architecture-radicale",
        title: "Vers une architecture radicale",
        category: "Réflexion",
        date: "30 DEC 2024",
        author: "Thomas Dubreuil",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1517544845501-bb78ccdad008?w=1200&q=80",
        intro: "Comment repenser l'habitat collectif à l'heure de la densification urbaine ? Une approche sans concession sur la matière et l'usage.",
        content: `L'architecture contemporaine se trouve à un carrefour décisif. Face à l'urgence climatique et à la crise du logement, la réponse ne peut plus être uniquement technologique. Elle doit être structurelle, sociale et radicale.
        
        Nous croyons en un retour aux fondamentaux : la matière brute, la lumière naturelle et la ventilation passive. Il ne s'agit pas de nostalgie, mais de bon sens constructif. Construire en pierre massive ou en béton de chanvre n'est pas un luxe, c'est une nécessité pour garantir la pérennité de nos ouvrages.
        
        Dans nos projets récents, nous avons cherché à supprimer tout superflu. Pas de faux-plafonds, pas de doublages inutiles. La structure est l'architecture. Cela demande une rigueur d'exécution absolue, car rien ne peut être caché.`
    },
    // Fallback générique si l'ID ne matche pas
    {
       id: "beton-chanvre",
       title: "Le retour du béton de chanvre",
       category: "Matériaux",
       date: "28 DEC 2024", 
       author: "Sarah Lemoine",
       readTime: "3 min",
       image: "https://images.unsplash.com/photo-1591955506264-3f51322ab2af?w=800&q=80",
       intro: "Le béton de chanvre offre une alternative biosourcée crédible.",
       content: "Lorem ipsum dolor sit amet..."
    }
  ];

  // Trouver l'article ou prendre le premier par défaut (pour éviter la page blanche)
  const article = allArticles.find(a => a.id === id) || allArticles[0];

  return (
    <div className="animate-fade-in min-h-screen bg-white text-black selection:bg-[#2433FF] selection:text-white pt-24 md:pt-32 pb-24">
       
       {/* 1. BARRE DE NAVIGATION (Sticky) */}
       <div className="fixed top-20 left-0 w-full z-20 pointer-events-none px-4 md:px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-start pt-6">
             <button 
                onClick={() => navigate('/media')}
                className="pointer-events-auto flex items-center gap-2 bg-white/80 backdrop-blur border border-black/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
             >
                <ArrowLeft className="w-4 h-4" /> <span className="hidden md:inline">Retour au Média</span>
             </button>
             
             <button className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur border border-black/10 rounded-full hover:bg-[#2433FF] hover:text-white hover:border-[#2433FF] transition-all shadow-sm">
                <Share2 className="w-4 h-4" />
             </button>
          </div>
       </div>

       <div className="max-w-4xl mx-auto px-4 md:px-6">
          
          {/* 2. EN-TÊTE ARTICLE */}
          <div className="text-center mb-12 md:mb-16 mt-8 md:mt-0">
             <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-[#2433FF] mb-6">
                <span>{article.category}</span>
                <span className="w-1 h-1 bg-black/20 rounded-full"></span>
                <span>{article.date}</span>
             </div>
             
             {/* Titre responsive : 4xl sur mobile / 6xl sur bureau */}
             <h1 className="cobalt-heading text-4xl md:text-6xl leading-tight mb-8">
                {article.title}
             </h1>

             <div className="flex items-center justify-center gap-6 text-xs text-gray-500 font-mono border-t border-b border-black/10 py-4 max-w-md mx-auto">
                <span>Par {article.author || "La Rédaction"}</span>
                <div className="flex items-center gap-1">
                   <Clock className="w-3 h-3" /> {article.readTime || "5 min"}
                </div>
             </div>
          </div>

          {/* 3. IMAGE PRINCIPALE */}
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100 mb-12 md:mb-16 shadow-xl">
             <img 
               src={article.image} 
               alt={article.title} 
               className="w-full h-full object-cover"
             />
          </div>

          {/* 4. CONTENU (Intro + Texte) */}
          <div className="max-w-2xl mx-auto">
             <p className="text-lg md:text-xl font-serif font-medium leading-relaxed mb-12 text-black/80">
                {article.intro}
             </p>
             
             {/* Corps du texte */}
             <div className="prose prose-lg prose-headings:font-bold prose-a:text-[#2433FF] text-gray-600 font-serif leading-loose">
                {/* On simule des paragraphes avec split si c'est du texte brut */}
                {article.content ? article.content.split('\n').map((paragraph, idx) => (
                   <p key={idx} className="mb-6">{paragraph}</p>
                )) : (
                   <p>Contenu en cours de rédaction...</p>
                )}
             </div>

             {/* Signature */}
             <div className="mt-16 pt-8 border-t border-black/10 flex items-center justify-between">
                <span className="font-bold text-sm uppercase tracking-widest">Collectif Cobalt</span>
                <div className="w-12 h-[1px] bg-black"></div>
             </div>
          </div>

       </div>

       {/* 5. LIRE AUSSI (Navigation bas de page) */}
       <div className="mt-24 border-t border-black/10 pt-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
             <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500">Lire ensuite</h3>
                <Link to="/media" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1">Voir tout</Link>
             </div>
             
             {/* Une petite grille de 2 articles suggérés */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allArticles.filter(a => a.id !== article.id).slice(0, 2).map(nextArt => (
                   <Link key={nextArt.id} to={`/article/${nextArt.id}`} className="group flex gap-4 items-center bg-white p-4 border border-black/5 hover:border-[#2433FF] transition-colors shadow-sm">
                      <div className="w-24 h-24 bg-gray-200 flex-shrink-0 overflow-hidden">
                         <img src={nextArt.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-[#2433FF] mb-1 block">{nextArt.category}</span>
                         <h4 className="font-bold text-lg leading-tight group-hover:text-[#2433FF] transition-colors">{nextArt.title}</h4>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#2433FF]" />
                   </Link>
                ))}
             </div>
          </div>
       </div>

    </div>
  );
}