// src/lib/strapi.js

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Fonction universelle pour récupérer des données depuis Strapi
 * @param {string} endpoint - L'endpoint (ex: 'homepage', 'global')
 * @param {object} queryParams - Les paramètres (ex: { populate: '*' })
 */
export async function getStrapiData(endpoint, queryParams = { populate: "*" }) {
  // 1. On transforme les paramètres en chaîne de caractères (ex: ?populate=*)
  // Pour faire simple, on utilise une librairie comme 'qs' si tu as, sinon on fait du fetch basique
  // Ici version sans dépendance externe pour commencer simple :
  
  let url = `${STRAPI_URL}/api/${endpoint}`;
  
  // Petit hack rapide pour le populate * (tu pourras installer 'qs' plus tard pour des filtres complexes)
  if (queryParams.populate) {
    url += `?populate=${queryParams.populate}`;
  }

  // 2. On appelle l'API
  const res = await fetch(url, {
    cache: 'no-store', // 'force-cache' si tu veux que ce soit statique
  });

  if (!res.ok) {
    console.error(`Erreur Strapi sur ${url}:`, res.status);
    return null;
  }

  const json = await res.json();
  return json.data; // On renvoie directement la data propre
}

// Petite fonction helper pour avoir l'URL complète d'une image
export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}