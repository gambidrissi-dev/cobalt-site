import { useState, useEffect } from 'react';
import { 
  projects as staticProjects, 
  mediaArticles as staticArticles, 
  shopProducts as staticProducts, 
  teamMembers as staticTeam 
} from '../data/staticData';

// --- CONFIGURATION ---
// On détecte si on est en local ou en prod, ou on force ton URL
const STRAPI_URL = "https://strapi.collectifcobalt.eu"; 

// Helper pour nettoyer les URLs
const makeUrl = (data) => {
  if (!data) return null;
  // Gestion de la compatibilité Strapi v4/v5 (attributes ou direct)
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
    home: null,
    isLoaded: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Démarrage de la synchronisation Strapi...");

        // --- CONSTRUCTION DE L'URL HOMEPAGE (C'est là que la magie opère) ---
        // 1. Hero : On veut tout (*).
        // 2. Blocks : On veut descendre dans 'cards' pour avoir l'icon.
        // 3. Blocks : On veut descendre dans 'leftImage' pour la section Featured.
        const homeQuery = new URLSearchParams({
            'populate[hero][populate]': '*',
            'populate[blocks][populate]': 'cards.icon,leftImage' 
        }).toString();

        const [resProjects, resArticles, resProducts, resHome] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          fetch(`${STRAPI_URL}/api/articles?populate=*`),
          fetch(`${STRAPI_URL}/api/products?populate=*`),
          fetch(`${STRAPI_URL}/api/homepage?${homeQuery}`), 
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

        // --- 4. HOMEPAGE ---
        if (resHome.ok) {
            const h = await resHome.json();
            const homeAttributes = h.data?.attributes || h.data;
            
            if (homeAttributes) {
                console.log("🏠 Homepage reçue avec succès :", homeAttributes);
                newData.home = homeAttributes;
            }
        } else {
            console.warn("⚠️ Echec chargement Homepage");
        }

        setData(newData);
        console.log("✅ Toutes les données sont à jour.");

      } catch (err) {
        console.error("⚠️ Erreur critique Strapi :", err);
      }
    };

    fetchData();
  }, []); 

  return data;
};