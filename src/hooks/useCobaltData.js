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
    assoPrograms: [],
    
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
        console.log("🚀 DÉMARRAGE DU CHARGEMENT STRAPI...");

        // On utilise populate=* pour tout récupérer
        const [
            resProjects, resArticles, resProducts, resTeam, resCollections,
            resAssoPrograms, resNav, resHome, resServices, resAtelierServices,
            resCobaltPlus, resAtelier, resPageProjets, resPageEshop,
            resMedia, resAsso, resAgence
        ] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          fetch(`${STRAPI_URL}/api/articles?populate=*`),
          fetch(`${STRAPI_URL}/api/products?populate=*`), 
          fetch(`${STRAPI_URL}/api/team-members?populate=*&sort=rang:asc`), 
          fetch(`${STRAPI_URL}/api/shop-collections?populate=*`), 
          fetch(`${STRAPI_URL}/api/asso-programs?populate=*&sort=rank:asc`), 

          fetch(`${STRAPI_URL}/api/navigation?populate=*`),
          fetch(`${STRAPI_URL}/api/homepage?populate[hero][populate]=*&populate[blocks][populate]=*`),

          fetch(`${STRAPI_URL}/api/page-prestations-archi?populate[listePrestations][populate]=image`),
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

        // --- 1. CHARGEMENT DES COLLECTIONS ---
        let loadedCollections = [];
        if (resCollections.ok) {
            const d = await resCollections.json();
            if (d.data) {
                loadedCollections = d.data.map(item => ({
                    id: item.id || item.documentId,
                    strapiId: item.id, // ID numérique important pour la comparaison
                    ...item.attributes || item,
                    image: makeUrl(item.attributes?.cover?.data || item.cover),
                    // On récupère la liste des produits liés dans cette collection
                    linkedProducts: item.attributes?.products?.data || item.products || []
                }));
            }
        }
        newData.shopCollections = loadedCollections;
        console.log(`📂 ${loadedCollections.length} Collections chargées :`, loadedCollections);

        // --- 2. CHARGEMENT DES PRODUITS ---
        if (resProducts.ok) {
            const d = await resProducts.json();
            if (d.data) {
                newData.products = d.data.map(item => {
                    const attrs = item.attributes || item;
                    
                    // Gestion Images
                    const rawImages = attrs.gallery?.data || attrs.gallery || [];
                    const gallery = Array.isArray(rawImages) ? rawImages.map(img => makeUrl(img)) : [];
                    const coverUrl = makeUrl(attrs.cover?.data) || gallery[0] || null;

                    // --- LOGIQUE DE LIEN (SIMPLIFIÉE) ---
                    let foundCollectionId = null;

                    // Méthode A : Le produit connaît sa collection
                    const rawCol = attrs.shop_collection || attrs.shopCollection;
                    const colData = rawCol?.data || rawCol;
                    if (colData) {
                        foundCollectionId = colData.id || colData.documentId;
                    }

                    // Méthode B : La collection connaît le produit (Lien Inverse)
                    if (!foundCollectionId) {
                        const parentCol = loadedCollections.find(col => 
                            col.linkedProducts.some(pLink => pLink.id === item.id)
                        );
                        if (parentCol) {
                            foundCollectionId = parentCol.id;
                            console.log(`🔗 Lien trouvé pour ${attrs.name} -> Collection ${parentCol.title}`);
                        }
                    }

                    return {
                        id: item.id || item.documentId,
                        ...attrs,
                        image: coverUrl,
                        gallery: gallery,
                        stock: Number(attrs.stock || 0), // Force en nombre
                        // Gestion Majuscule/Minuscule pour Category
                        category: attrs.Category || attrs.category || "Divers", 
                        collectionId: foundCollectionId, 
                        limitedLabel: attrs.limitedLabel
                    };
                });
                console.log(`📦 ${newData.products.length} Produits chargés :`, newData.products);
            }
        } else {
            console.error("❌ Erreur chargement Produits (Check URL ou Permissions)");
        }

        // (Le reste du code reste identique...)
        if (resAssoPrograms.ok) {
             const d = await resAssoPrograms.json();
             if (d.data) newData.assoPrograms = d.data.map(i => ({ id: i.id || i.documentId, ...i.attributes || i, image: makeUrl((i.attributes || i).image?.data || (i.attributes || i).image), slug: (i.attributes || i).slug }));
        }
        if (resTeam.ok) { 
             const t = await resTeam.json();
             if(t.data) newData.team = t.data;
        }
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
      } catch (err) { console.error("⚠️ CRASH CHARGEMENT :", err); }
    };
    fetchData();
  }, []); 

  return data;
};