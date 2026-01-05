// src/utils/strapi.js

export const getStrapiImage = (item) => {
  if (!item) return null;
  // Priorité aux différents champs possibles d'image
  const imgNode = item.avatar || item.photo || item.image || item.cover || item.hero;
  
  if (imgNode && imgNode.url) {
    // Si l'URL est relative (commence par /), on ajoute le localhost
    // Sinon on retourne l'URL telle quelle (cas des images Unsplash)
    if (imgNode.url.startsWith('/')) {
        return `http://localhost:1337${imgNode.url}`;
    }
    return imgNode.url;
  }
  return null;
};

export const getStrapiText = (content) => {
  if (!content) return "";
  if (typeof content === 'string') return content;
  
  // Gestion du format Rich Text de Strapi (Blocks)
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block.type === 'paragraph' || block.children) {
        return block.children.map(child => child.text).join(" ");
      }
      return "";
    }).join("\n\n");
  }
  
  return "Description disponible bientôt.";
};