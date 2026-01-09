import { useState, useEffect } from 'react';
import { 
  projects as staticProjects, 
  mediaArticles as staticArticles, 
  shopProducts as staticProducts, 
  teamMembers as staticTeam 
} from '../data/staticData';

const STRAPI_URL = "https://strapi.collectifcobalt.eu"; 

// Petit helper pour nettoyer les URLs d'images
const makeUrl = (data) => {
  if (!data) return null;
  const attrs = data.attributes || data;
  const url = attrs?.url;
  if (!url) return null;
  if (url.startsWith('/')) return `${STRAPI_URL}${url}`;
  return url;
};

export const useCobaltData = () => {
  const [data, setData] = useState({
    projects: staticProjects,
    articles: staticArticles,
    products: staticProducts, 
    team: staticTeam,
    services: [], 
    home: null, // C'est ici qu'on veut mettre les données
    isLoaded: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Chargement complet depuis Strapi...");

        // --- MODIFICATION 1 : AJOUT DE L'APPEL HOMEPAGE ---
        // On demande ?populate=* pour avoir les images et les composants du Hero
        const [resProjects, resArticles, resProducts, resHome] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          fetch(`${STRAPI_URL}/api/articles?populate=*`),
          fetch(`${STRAPI_URL}/api/products?populate=*`),
          fetch(`${STRAPI_URL}/api/homepage?populate=*`), // <--- LIGNE AJOUTÉE
        ]);

        const newData = { ...data, isLoaded: true };

        // --- 1. PROJETS ---
        if (resProjects.ok) {
          const d = await resProjects.json();
          if (d.data) {
            const formattedProjects = {};
            d.data.forEach(item => {
              const attrs = item.attributes || item;
              const id = item.documentId || item.id;
              
              let galleryImages = [];
              const rawGallery = attrs.gallery?.data || attrs.gallery;
              if (Array.isArray(rawGallery)) {
                  galleryImages = rawGallery.map(img => makeUrl(img)).filter(Boolean);
              }

              formattedProjects[id] = {
                id: id,
                title: attrs.title,
                category: attrs.category || "Architecture",
                year: attrs.year,
                location: attrs.location,
                description: attrs.description,
                images: { 
                   hero: makeUrl(attrs.cover?.data || attrs.cover), 
                   gallery: galleryImages 
                }
              };
            });
            newData.projects = formattedProjects;
          }
        }

        // --- 2. ARTICLES ---
        if (resArticles.ok) {
            const d = await resArticles.json();
            if (d.data) {
                newData.articles = d.data.map(item => {
                    const attrs = item.attributes || item;
                    return {
                        id: item.documentId || item.id,
                        title: attrs.title,
                        subtitle: attrs.source,
                        date: attrs.date,
                        link: attrs.link,
                        image: makeUrl(attrs.cover?.data || attrs.cover)
                    };
                });
            }
        }

        // --- 3. PRODUITS ---
        if (resProducts.ok) {
            const d = await resProducts.json();
            if (d.data) {
                newData.products = d.data.map(item => {
                    const attrs = item.attributes || item;
                    return {
                        id: item.documentId || item.id,
                        name: attrs.name,
                        price: attrs.price,
                        description: attrs.description,
                        link: attrs.link,
                        image: makeUrl(attrs.cover?.data || attrs.cover)
                    };
                });
            }
        }

        // --- 4. HOMEPAGE (NOUVEAU BLOC) ---
        if (resHome.ok) {
            const h = await resHome.json();
            // Strapi retourne souvent { data: { attributes: ... } } pour les single types
            // Ou parfois directement { data: ... } selon la version et les plugins
            const homeAttributes = h.data?.attributes || h.data;
            
            if (homeAttributes) {
                console.log("🏠 Homepage reçue :", homeAttributes);
                newData.home = homeAttributes;
            }
        } else {
            console.warn("⚠️ Impossible de charger la Homepage");
        }

        setData(newData);
        console.log("✅ Données synchronisées !");

      } catch (err) {
        console.error("⚠️ Erreur Strapi (Fallback sur statique) :", err);
      }
    };

    fetchData();
  }, []); 

  return data;
};