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
  const url = attrs?.url || data.url; 
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};

export const useCobaltData = () => {
  const [data, setData] = useState({
    projects: staticProjects,
    articles: staticArticles,
    products: staticProducts, 
    shopCollections: [], 
    team: staticTeam,
    
    navigation: [],
    home: null,
    pageCobaltPlus: null, 
    pageAtelier: null,    
    pageProjects: null,   
    pageEshop: null,      
    services: null,       
    atelierServices: null,
    pageMedia: null,      
    pageAsso: null,       
    pageAgence: null,     

    isLoaded: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Chargement Global Strapi...");

        // On veut TOUT savoir sur les produits (images, collection liée, etc.)
        const productParams = new URLSearchParams();
        productParams.append('populate', '*'); 
        
        const collectionParams = new URLSearchParams();
        collectionParams.append('populate', '*');

        const [
            resProjects, resArticles, resProducts, resTeam, resCollections,
            resNav, resHome,
            resServices, resAtelierServices,
            resCobaltPlus, resAtelier,
            resPageProjets, resPageEshop,
            resMedia, resAsso, resAgence
        ] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          fetch(`${STRAPI_URL}/api/articles?populate=*`),
          fetch(`${STRAPI_URL}/api/products?${productParams}`), 
          fetch(`${STRAPI_URL}/api/team-members?populate=*&sort=rang:asc`), 
          fetch(`${STRAPI_URL}/api/shop-collections?${collectionParams}`), // On charge les Drops

          fetch(`${STRAPI_URL}/api/navigation?populate=*`),
          fetch(`${STRAPI_URL}/api/homepage?populate[hero][populate]=*&populate[blocks][populate]=*`),

          fetch(`${STRAPI_URL}/api/page-prestations-archi?populate=*`),
          fetch(`${STRAPI_URL}/api/page-savoir-faire?populate=*`),
          fetch(`${STRAPI_URL}/api/page-cobalt-plus?populate[cards][populate]=image`),
          fetch(`${STRAPI_URL}/api/page-atelier?populate[cards][populate]=image`),
          fetch(`${STRAPI_URL}/api/page-projets?populate=*`),
          fetch(`${STRAPI_URL}/api/page-eshop?populate=*`),
          fetch(`${STRAPI_URL}/api/page-media?populate=*`),
          fetch(`${STRAPI_URL}/api/page-association?populate=*`),
          fetch(`${STRAPI_URL}/api/page-agence?populate=*`),
        ]);

        const newData = { ...data, isLoaded: true };
        const unwrap = async (res) => {
            if (!res.ok) return null;
            const json = await res.json();
            return json.data?.attributes || json.data || null;
        };

        // --- TRAITEMENT DES PRODUITS (NOUVELLE LOGIQUE) ---
        if (resProducts.ok) {
            const d = await resProducts.json();
            if (d.data) {
                newData.products = d.data.map(item => {
                    const attrs = item.attributes || item;
                    
                    // Galerie Images
                    const rawImages = attrs.gallery?.data || attrs.gallery || [];
                    const gallery = Array.isArray(rawImages) ? rawImages.map(img => makeUrl(img)) : [];
                    
                    // Cover (soit champ cover, soit 1ere image galerie)
                    const coverUrl = makeUrl(attrs.cover?.data) || gallery[0] || null;

                    // Liaison Collection (Drop)
                    const colData = attrs.shop_collection?.data;
                    const collectionId = colData?.id || colData?.documentId || null;

                    return {
                        id: item.id || item.documentId,
                        ...attrs,
                        image: coverUrl,
                        gallery: gallery,
                        // Champs cruciaux pour ta logique :
                        stock: attrs.stock !== undefined ? attrs.stock : 0, // Par défaut 0 si vide
                        category: attrs.category || "Divers",
                        collectionId: collectionId, // Pour grouper par Drop
                        limitedLabel: attrs.limitedLabel
                    };
                });
            }
        }

        // --- TRAITEMENT DES DROPS (COLLECTIONS) ---
        if (resCollections.ok) {
            const d = await resCollections.json();
            if (d.data) {
                // On trie peut-être par date de sortie inverse (le plus récent en haut)
                newData.shopCollections = d.data.map(item => ({
                    id: item.id || item.documentId,
                    ...item.attributes || item,
                    image: makeUrl(item.attributes?.cover?.data || item.cover)
                }));
            }
        }

        if (resTeam.ok) { 
             const t = await resTeam.json();
             if(t.data) newData.team = t.data;
        }

        // (Le reste ne change pas...)
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

        newData.navigation = (await unwrap(resNav))?.mainNavigation || [];
        newData.home = await unwrap(resHome);
        newData.pageCobaltPlus = await unwrap(resCobaltPlus);
        newData.pageAtelier = await unwrap(resAtelier);
        newData.pageProjects = await unwrap(resPageProjets);
        newData.pageEshop = await unwrap(resPageEshop);
        newData.pageMedia = await unwrap(resMedia);
        newData.pageAsso = await unwrap(resAsso);
        newData.pageAgence = await unwrap(resAgence);
        newData.services = await unwrap(resServices);
        newData.atelierServices = await unwrap(resAtelierServices);

        setData(newData);
      } catch (err) { console.error("⚠️", err); }
    };
    fetchData();
  }, []); 

  return data;
};