import { useState, useEffect } from 'react';
import { getStrapiText } from '../utils/strapi';
import { 
  projects as staticProjects, 
  mediaArticles as staticArticles, 
  shopProducts as staticProducts, 
  teamMembers as staticTeam 
} from '../data/staticData';

// 👇 C'est ici que la magie opère
const STRAPI_URL = "https://strapi.collectifcobalt.eu"; 

const makeUrl = (data) => {
  if (!data) return null;
  const attrs = data.attributes || data;
  const url = attrs?.url;
  if (!url) return null;
  // Si l'image vient de Strapi (chemin relatif), on colle le domaine devant
  if (url.startsWith('/')) return `${STRAPI_URL}${url}`;
  return url;
};

export const useCobaltData = () => {
  const [data, setData] = useState({
    projects: staticProjects, // On garde le statique en secours au début
    articles: staticArticles,
    products: staticProducts, 
    team: staticTeam,
    services: [], 
    home: null,
    isLoaded: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Connexion à Strapi distant...");

        // On lance tous les appels en parallèle
        const [resProjects] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          // Tu pourras décommenter les autres lignes quand tu auras créé les collections dans Strapi
          // fetch(`${STRAPI_URL}/api/articles?populate=*`),
          // fetch(`${STRAPI_URL}/api/products?populate=*`),
        ]);

        const newData = { ...data, isLoaded: true };

        // --- 1. PROJETS ---
        if (resProjects.ok) {
          const d = await resProjects.json();
          // Strapi v5 renvoie souvent 'data' directement
          if (d.data && d.data.length > 0) {
            const formattedProjects = {};
            d.data.forEach(item => {
              const attrs = item.attributes || item; // Compatibilité v4/v5
              const id = item.documentId || item.id;
              
              // Gestion de la galerie
              let galleryImages = [];
              const rawGallery = attrs.gallery?.data || attrs.gallery;
              if (Array.isArray(rawGallery)) {
                  galleryImages = rawGallery.map(img => makeUrl(img)).filter(Boolean);
              }

              formattedProjects[id] = {
                id: id,
                title: attrs.title,
                category: attrs.category || "Architecture",
                year: attrs.year || "2025",
                location: attrs.location || "Bordeaux",
                description: attrs.description,
                images: { 
                   // On cherche l'image 'cover', sinon on cherche 'hero'
                   hero: makeUrl(attrs.cover?.data || attrs.cover) || makeUrl(attrs.hero?.data || attrs.hero), 
                   gallery: galleryImages 
                }
              };
            });
            newData.projects = formattedProjects;
            console.log("✅ Projets chargés depuis Strapi :", Object.keys(formattedProjects).length);
          }
        }

        setData(newData);
      } catch (err) {
        console.error("⚠️ Impossible de joindre Strapi (On reste sur le statique) :", err);
      }
    };

    fetchData();
  }, []); 

  return data;
};