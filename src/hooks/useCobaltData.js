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
    services: null,       // Architecture
    atelierServices: null, // <--- NOUVEAU : Atelier
    navigation: [],
    home: null,
    isLoaded: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Synchronisation Strapi...");

        // Configs URL
        const homeParams = new URLSearchParams();
        homeParams.append('populate[hero][populate]', '*');
        homeParams.append('populate[blocks][on][sections.approche-section][populate][cards][populate]', 'icon');
        homeParams.append('populate[blocks][on][sections.featured-section][populate]', 'leftImage');

        const servicesParams = new URLSearchParams();
        servicesParams.append('populate[listePrestations][populate]', '*'); 

        const navParams = new URLSearchParams();
        navParams.append('populate[mainNavigation][populate]', '*');

        // Appel API
        const [resProjects, resArticles, resProducts, resHome, resServices, resNav, resAtelier] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          fetch(`${STRAPI_URL}/api/articles?populate=*`),
          fetch(`${STRAPI_URL}/api/products?populate=*`),
          fetch(`${STRAPI_URL}/api/homepage?${homeParams.toString()}`),
          fetch(`${STRAPI_URL}/api/page-prestations-archi?${servicesParams.toString()}`),
          fetch(`${STRAPI_URL}/api/navigation?${navParams.toString()}`),
          fetch(`${STRAPI_URL}/api/page-savoir-faire?${servicesParams.toString()}`), // <--- NOUVEAU FETCH (Mêmes params que services)
        ]);

        const newData = { ...data, isLoaded: true };

        // ... (Codes Projets, Articles, Produits, Home, Nav inchangés -> je ne les remets pas pour raccourcir) ...
        
        // --- 1. Réintégration des blocs précédents pour que tu aies le fichier complet ---
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
        if (resArticles.ok) {
            const d = await resArticles.json();
            if (d.data) newData.articles = d.data.map(i => ({ id: i.id || i.documentId, ...i.attributes, image: makeUrl(i.attributes?.cover?.data || i.attributes?.cover) }));
        }
        if (resProducts.ok) {
            const d = await resProducts.json();
            if (d.data) newData.products = d.data.map(i => ({ id: i.id || i.documentId, ...i.attributes, image: makeUrl(i.attributes?.cover?.data || i.attributes?.cover) }));
        }
        if (resHome.ok) {
            const h = await resHome.json();
            if (h.data) newData.home = h.data.attributes || h.data;
        }
        if (resServices.ok) {
            const s = await resServices.json();
            if (s.data) newData.services = s.data.attributes || s.data;
        }
        if (resNav.ok) {
            const n = await resNav.json();
            const navData = n.data?.attributes || n.data;
            if (navData && navData.mainNavigation) newData.navigation = navData.mainNavigation;
        }

        // --- 7. TRAITEMENT ATELIER (NOUVEAU) ---
        if (resAtelier.ok) {
            const a = await resAtelier.json();
            const aData = a.data?.attributes || a.data;
            if (aData) {
                console.log("🔨 Savoir-Faire reçu :", aData);
                newData.atelierServices = aData;
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