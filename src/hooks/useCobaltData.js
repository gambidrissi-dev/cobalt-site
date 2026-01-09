import { useState, useEffect } from 'react';
import { 
  projects as staticProjects, 
  mediaArticles as staticArticles, 
  shopProducts as staticProducts, 
  teamMembers as staticTeam 
} from '../data/staticData';

const STRAPI_URL = "https://strapi.collectifcobalt.eu"; 

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
    services: null, // On prépare le terrain pour les services
    home: null,
    isLoaded: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Synchronisation Strapi...");

        // --- 1. CONFIGURATION DES URLS ---
        
        // Homepage (Complexe)
        const homeParams = new URLSearchParams();
        homeParams.append('populate[hero][populate]', '*');
        homeParams.append('populate[blocks][on][sections.approche-section][populate][cards][populate]', 'icon');
        homeParams.append('populate[blocks][on][sections.featured-section][populate]', 'leftImage');
        const queryHome = homeParams.toString();

        // Prestations (Nouveau !)
        // On récupère la page ET la liste des cartes (composant répétable)
        const servicesParams = new URLSearchParams();
        servicesParams.append('populate[listePrestations][populate]', '*'); 
        const queryServices = servicesParams.toString();

        // --- 2. APPELS API PARALLÈLES ---
        const [resProjects, resArticles, resProducts, resHome, resServices] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          fetch(`${STRAPI_URL}/api/articles?populate=*`),
          fetch(`${STRAPI_URL}/api/products?populate=*`),
          fetch(`${STRAPI_URL}/api/homepage?${queryHome}`),
          fetch(`${STRAPI_URL}/api/page-prestations-archi?${queryServices}`), // <--- NOUVEAU
        ]);

        const newData = { ...data, isLoaded: true };

        // ... (Traitement Projets, Articles, Produits identique à avant -> Je raccourcis ici pour la lisibilité) ...
        // Tu gardes tes blocs if(resProjects.ok)... if(resArticles.ok)... if(resProducts.ok)... d'avant ici.
        // Si tu veux je peux te remettre tout le bloc, mais c'est le même.

        // --- TRAITEMENT PROJETS (Rappel rapide) ---
        if (resProjects.ok) {
           const d = await resProjects.json();
           if(d.data) {
             const formattedProjects = {};
             d.data.forEach(item => {
                const attrs = item.attributes || item;
                const id = item.documentId || item.id;
                let galleryImages = [];
                const rawGallery = attrs.gallery?.data || attrs.gallery;
                if (Array.isArray(rawGallery)) galleryImages = rawGallery.map(img => makeUrl(img)).filter(Boolean);
                
                formattedProjects[id] = {
                  id: id,
                  title: attrs.title,
                  category: attrs.category || "Architecture",
                  year: attrs.year,
                  location: attrs.location,
                  description: attrs.description,
                  images: { hero: makeUrl(attrs.cover?.data || attrs.cover), gallery: galleryImages }
                };
             });
             newData.projects = formattedProjects;
           }
        }

        // --- TRAITEMENT ARTICLES ---
        if (resArticles.ok) {
            const d = await resArticles.json();
            if (d.data) newData.articles = d.data.map(i => ({ id: i.id || i.documentId, ...i.attributes, image: makeUrl(i.attributes?.cover?.data || i.attributes?.cover) }));
        }
        
        // --- TRAITEMENT PRODUITS ---
        if (resProducts.ok) {
            const d = await resProducts.json();
            if (d.data) newData.products = d.data.map(i => ({ id: i.id || i.documentId, ...i.attributes, image: makeUrl(i.attributes?.cover?.data || i.attributes?.cover) }));
        }

        // --- TRAITEMENT HOMEPAGE ---
        if (resHome.ok) {
            const h = await resHome.json();
            if (h.data) newData.home = h.data.attributes || h.data;
        }

        // --- 5. TRAITEMENT PRESTATIONS (NOUVEAU) ---
        if (resServices.ok) {
            const s = await resServices.json();
            const sData = s.data?.attributes || s.data;
            if (sData) {
                console.log("🛠 Prestations reçues :", sData);
                newData.services = sData;
            }
        }

        setData(newData);
        console.log("✅ Données synchronisées !");

      } catch (err) {
        console.error("⚠️ Erreur Strapi :", err);
      }
    };

    fetchData();
  }, []); 

  return data;
};