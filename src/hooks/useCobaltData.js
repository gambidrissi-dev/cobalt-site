import { 
  projects, 
  mediaArticles, 
  shopProducts, 
  teamMembers,
  archiServicesList,
  atelierServices
} from '../data/staticData';

export const useCobaltData = () => {
  // On prépare les services en ajoutant le champ 'department' comme le faisait l'API
  const formattedArchiServices = archiServicesList.map(s => ({
    ...s,
    department: 'Architecture'
  }));

  const formattedAtelierServices = atelierServices.map(s => ({
    ...s,
    department: 'Atelier'
  }));

  // On combine tout
  const allServices = [...formattedArchiServices, ...formattedAtelierServices];

  // On renvoie la structure exacte qu'attend App.js
  return {
    projects: projects,
    articles: mediaArticles,
    products: shopProducts,
    team: teamMembers,
    services: allServices,
    home: { // Contenu statique pour la Home
        heroTitle: null, // Prendra le défaut défini dans Home.jsx
        heroSubtitle: "\"Manifeste du réel\"",
        agencyText: "Bureau d'étude, conception architecturale et maîtrise d'œuvre pour vos projets d'habitat et commerciaux.",
        atelierText: "Laboratoire de fabrication, prototypage sur-mesure et édition d'objets disponibles sur notre E-Shop."
    },
    isLoaded: true
  };
};