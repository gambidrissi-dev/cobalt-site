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
    // Collections (Listes)
    projects: staticProjects,
    articles: staticArticles,
    products: staticProducts, 
    team: staticTeam,
    
    // Navigation & Structure
    navigation: [],
    home: null,

    // Pages HUBS (Les aiguillages)
    pageCobaltPlus: null, // <-- NOUVEAU
    pageAtelier: null,    // <-- NOUVEAU

    // Pages Listes (Titres & Intros)
    pageProjects: null,   // <-- NOUVEAU
    pageEshop: null,      // <-- NOUVEAU
    services: null,       // Prestations Archi
    atelierServices: null,// Savoir-faire Atelier

    // Pages Autonomes
    pageMedia: null,      // <-- NOUVEAU
    pageAsso: null,       // <-- NOUVEAU
    pageAgence: null,     // <-- NOUVEAU

    isLoaded: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Chargement Global Strapi...");

        // --- 1. CONFIGURATION DES REQUÊTES ---

        // Homepage (Complexe)
        const homeParams = new URLSearchParams();
        homeParams.append('populate[hero][populate]', '*');
        homeParams.append('populate[blocks][on][sections.approche-section][populate][cards][populate]', 'icon');
        homeParams.append('populate[blocks][on][sections.featured-section][populate]', 'leftImage');

        // Hubs (Cobalt+ & Atelier) : On veut les cartes, les images ET les URLs
        const hubParams = new URLSearchParams();
        hubParams.append('populate[cards][populate]', 'image'); 
        const hubQuery = hubParams.toString();

        // Standard (Pour tout le reste : Titres, Textes, Images simples)
        const standardParams = new URLSearchParams();
        standardParams.append('populate', '*');
        const standardQuery = standardParams.toString();


        // --- 2. LE GRAND BAIN : TOUS LES APPELS API ---
        const [
            // Collections
            resProjects, resArticles, resProducts, resTeam,
            // Structure
            resNav, resHome,
            // Services Listes
            resServices, resAtelierServices,
            // Hubs
            resCobaltPlus, resAtelier,
            // Headers des Listes
            resPageProjets, resPageEshop,
            // Pages Autonomes
            resMedia, resAsso, resAgence
        ] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          fetch(`${STRAPI_URL}/api/articles?populate=*`),
          fetch(`${STRAPI_URL}/api/products?populate=*`),
          fetch(`${STRAPI_URL}/api/team-members?populate=*`), // Assure-toi que cette collection existe, sinon ça renverra vide sans planter

          fetch(`${STRAPI_URL}/api/navigation?${standardQuery}`),
          fetch(`${STRAPI_URL}/api/homepage?${homeParams.toString()}`),

          fetch(`${STRAPI_URL}/api/page-prestations-archi?${standardQuery}`),
          fetch(`${STRAPI_URL}/api/page-savoir-faire?${standardQuery}`),

          // NOUVEAUX APPELS
          fetch(`${STRAPI_URL}/api/page-cobalt-plus?${hubQuery}`),
          fetch(`${STRAPI_URL}/api/page-atelier?${hubQuery}`),
          
          fetch(`${STRAPI_URL}/api/page-projets?${standardQuery}`),
          fetch(`${STRAPI_URL}/api/page-eshop?${standardQuery}`),
          
          fetch(`${STRAPI_URL}/api/page-media?${standardQuery}`),
          fetch(`${STRAPI_URL}/api/page-association?${standardQuery}`),
          fetch(`${STRAPI_URL}/api/page-agence?${standardQuery}`),
        ]);

        const newData = { ...data, isLoaded: true };

        // Petite fonction pour extraire proprement les données Single Type
        const unwrap = async (res, name) => {
            if (!res.ok) return null;
            const json = await res.json();
            const attr = json.data?.attributes || json.data;
            if (attr) console.log(`✅ ${name} chargé`);
            return attr || null;
        };

        // --- 3. TRAITEMENT DES DONNÉES ---

        // Collections (Logique existante préservée)
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
        
        // Single Types (Nouveaux & Anciens)
        newData.navigation = (await unwrap(resNav, "Menu"))?.mainNavigation || [];
        newData.home = await unwrap(resHome, "Home");
        
        newData.services = await unwrap(resServices, "Prestations Archi");
        newData.atelierServices = await unwrap(resAtelierServices, "Savoir-Faire Atelier");

        newData.pageCobaltPlus = await unwrap(resCobaltPlus, "Page Cobalt+");
        newData.pageAtelier = await unwrap(resAtelier, "Page Atelier");

        newData.pageProjects = await unwrap(resPageProjets, "Intro Projets");
        newData.pageEshop = await unwrap(resPageEshop, "Intro Eshop");

        newData.pageMedia = await unwrap(resMedia, "Page Média");
        newData.pageAsso = await unwrap(resAsso, "Page Asso");
        newData.pageAgence = await unwrap(resAgence, "Page Agence");

        setData(newData);

      } catch (err) {
        console.error("⚠️ Erreur Strapi :", err);
      }
    };

    fetchData();
  }, []); 

  return data;
};