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
    services: [], 
    home: null,
    isLoaded: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Chargement complet depuis Strapi...");

        // On lance les 3 appels en parallèle
        const [resProjects, resArticles, resProducts] = await Promise.all([
          fetch(`${STRAPI_URL}/api/projects?populate=*`),
          fetch(`${STRAPI_URL}/api/articles?populate=*`),
          fetch(`${STRAPI_URL}/api/products?populate=*`),
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

        // --- 2. ARTICLES (PRESSE) ---
        if (resArticles.ok) {
            const d = await resArticles.json();
            if (d.data) {
                newData.articles = d.data.map(item => {
                    const attrs = item.attributes || item;
                    return {
                        id: item.documentId || item.id,
                        title: attrs.title,
                        subtitle: attrs.source, // On map 'source' vers 'subtitle' pour le design
                        date: attrs.date,
                        link: attrs.link,
                        image: makeUrl(attrs.cover?.data || attrs.cover)
                    };
                });
            }
        }

        // --- 3. PRODUITS (BOUTIQUE) ---
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