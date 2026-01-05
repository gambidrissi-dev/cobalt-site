import { useState, useEffect } from 'react';
import { getStrapiText } from '../utils/strapi';
import { 
  projects as staticProjects, 
  mediaArticles as staticArticles, 
  shopProducts as staticProducts, 
  teamMembers as staticTeam 
} from '../data/staticData';

const makeUrl = (data) => {
  if (!data) return null;
  const attrs = data.attributes || data;
  const url = attrs?.url;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `http://localhost:1337${url}`;
};

export const useCobaltData = () => {
  const [data, setData] = useState({
    projects: staticProjects,
    articles: staticArticles,
    products: staticProducts, 
    team: staticTeam,
    services: [], // Liste des services
    home: null,
    isLoaded: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🚀 Démarrage chargement Strapi...");

        const [resProjects, resArticles, resProducts, resMembers, resHome, resServices] = await Promise.all([
          fetch('http://localhost:1337/api/projects?populate=*'),
          fetch('http://localhost:1337/api/articles?populate=*'),
          fetch('http://localhost:1337/api/products?populate=*'),
          fetch('http://localhost:1337/api/members?populate=*'),
          fetch('http://localhost:1337/api/homepages?populate=*'),
          fetch('http://localhost:1337/api/services?populate=*') // On charge TOUS les services
        ]);

        const newData = { ...data, isLoaded: true };

        // 1. PROJETS
        if (resProjects.ok) {
          const d = await resProjects.json();
          if (d.data) {
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
                category: attrs.category,
                year: attrs.year || "2025",
                location: attrs.location || "Bordeaux",
                description: attrs.description,
                images: { 
                   hero: makeUrl(attrs.cover?.data || attrs.cover) || makeUrl(attrs.hero?.data || attrs.hero), 
                   gallery: galleryImages 
                }
              };
            });
            newData.projects = formattedProjects;
          }
        }

        // 2. PRODUITS
        if (resProducts.ok) {
           const d = await resProducts.json();
           if (d.data && Array.isArray(d.data)) {
              newData.products = d.data.map(item => {
                 const attrs = item.attributes || item;
                 let cleanPrice = attrs.price ? String(attrs.price).replace('€', '').trim() : "0";
                 return {
                   id: item.documentId || item.id,
                   title: attrs.title,
                   price: cleanPrice, 
                   category: attrs.category || "Objets",
                   image: makeUrl(attrs.image?.data || attrs.image),
                   description: attrs.description,
                   isNew: attrs.nouveaute === true, 
                   inStock: attrs.inStock === true
                 };
              });
           }
        }

        // 3. SERVICES (Avec récupération du DEPARTEMENT)
        if (resServices.ok) {
           const d = await resServices.json();
           if (d.data && Array.isArray(d.data)) {
              newData.services = d.data.map(item => {
                 const attrs = item.attributes || item;
                 return {
                   id: item.documentId || item.id,
                   title: attrs.title,
                   subtitle: attrs.subtitle,
                   shortDescription: attrs.shortDescription,
                   fullDescription: getStrapiText(attrs.fullDescription),
                   image: makeUrl(attrs.image?.data || attrs.image),
                   // C'est ici qu'on récupère le tri "Architecture" ou "Atelier"
                   department: attrs.department || 'Architecture' 
                 };
              });
           }
        }

        // 4. ARTICLES
        if (resArticles.ok) {
          const d = await resArticles.json();
          if (d.data) {
            newData.articles = d.data.map(item => {
              const attrs = item.attributes || item;
              return {
                id: item.documentId || item.id,
                title: attrs.title,
                category: attrs.category,
                date: attrs.date,
                intro: attrs.intro,
                content: getStrapiText(attrs.content),
                image: makeUrl(attrs.image?.data || attrs.image)
              };
            });
          }
        }

        // 5. HOMEPAGE & TEAM
        if (resHome.ok) {
           const d = await resHome.json();
           const homeData = Array.isArray(d.data) ? d.data[0] : d.data;
           if (homeData) {
              const attrs = homeData.attributes || homeData;
              newData.home = {
                 heroTitle: attrs.heroTitle,
                 heroSubtitle: attrs.heroSubtitle,
                 agencyText: attrs.agencyText,
                 atelierText: attrs.atelierText
              };
           }
        }

        if (resMembers.ok) {
           const d = await resMembers.json();
           if (d.data) {
             const rawMembers = Array.isArray(d.data) ? d.data : [];
             let members = rawMembers.map(item => {
                const attrs = item.attributes || item;
                return {
                   id: item.documentId || item.id,
                   name: attrs.name,
                   role: attrs.role,
                   bio: getStrapiText(attrs.bio),
                   order: attrs.rang || 99,
                   image: makeUrl(attrs.image?.data || attrs.image)
                };
             });
             members.sort((a, b) => a.order - b.order);
             newData.team = members;
           }
        }

        setData(newData);
      } catch (err) {
        console.error("☠️ ERREUR GÉNÉRALE :", err);
      }
    };

    fetchData();
  }, []); 

  return data;
};