// src/lib/strapi.js

// CORRECTION ICI : On met ton vraie adresse Strapi en dur pour être sûr que ça marche
const STRAPI_URL = "https://strapi.collectifcobalt.eu";

/**
 * Fonction universelle pour récupérer des données depuis Strapi
 */
export async function getStrapiData(endpoint, queryParams = { populate: "*" }) {
  let url = `${STRAPI_URL}/api/${endpoint}`;
  
  if (queryParams.populate) {
    url += `?populate=${queryParams.populate}`;
  }

  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error(`Erreur Strapi sur ${url}:`, res.status);
    return null;
  }

  const json = await res.json();
  return json.data;
}

/**
 * C'EST CETTE FONCTION QUI RÉPARE TES IMAGES
 * Elle transforme "/uploads/image.jpg" en "https://strapi.collectifcobalt.eu/uploads/image.jpg"
 */
export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }
  
  // Si l'image a déjà une URL complète (ex: lien externe), on la garde telle quelle
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Sinon, on colle l'adresse de Strapi devant
  return `${STRAPI_URL}${url}`;
}