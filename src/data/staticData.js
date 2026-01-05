// src/data/staticData.js

export const navItems = [
  { id: 'cobalt-plus', label: 'COBALT +' },   // Le Hub Archi
  { id: 'atelier', label: "L'ATELIER" },      // Le Hub Création
  { id: 'media', label: 'MÉDIA' },
  { id: 'asso', label: 'ASSOCIATION' },
  { id: 'about', label: 'AGENCE' },
];

export const projects = {
  "residence-omega": {
    id: "residence-omega",
    title: "Résidence OMEGA",
    type: "LOGEMENT COLLECTIF",
    category: "Résidentiel",
    year: "2024",
    location: "Bordeaux",
    surface: "3 200 m²",
    client: "Promoteur privé",
    description: "Un programme de 42 logements qui réinvente l'habitat collectif urbain en proposant des espaces généreux et lumineux, tournés vers un jardin intérieur partagé.",
    concept: "Le projet s'articule autour d'une faille centrale qui devient l'espace de vie collective. Le béton brut dialogue avec le bois pour créer une esthétique brutalist moderne.",
    materials: ["Béton brut", "Bardage mélèze", "Aluminium"],
    images: {
      hero: "https://images.unsplash.com/photo-1695067440629-b5e513976100?w=1920&q=80",
      gallery: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1080&q=80"]
    }
  },
  "pole-eco-tech": {
    id: "pole-eco-tech",
    title: "Pôle Éco-Tech",
    type: "TERTIAIRE",
    category: "Tertiaire",
    year: "2023",
    location: "Biarritz",
    surface: "5 800 m²",
    client: "Agglo",
    description: "Incubateur green-tech.",
    concept: "Principes Low-Tech et ventilation naturelle.",
    materials: ["Bois", "Terre crue"],
    images: {
      hero: "https://images.unsplash.com/photo-1673978484308-6f32e2c4a984?w=1920&q=80",
      gallery: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80"]
    }
  },
  "villa-k": {
    id: "villa-k",
    title: "Villa K",
    type: "INDIVIDUEL",
    category: "Résidentiel",
    year: "2024",
    location: "Cap-Ferret",
    surface: "280 m²",
    client: "Privé",
    description: "Villa contemporaine dans la pinède.",
    concept: "Dialogue noyer et travertin.",
    materials: ["Noyer", "Travertin"],
    images: {
      hero: "https://images.unsplash.com/photo-1572457598110-2e060c4588ad?w=1920&q=80",
      gallery: ["https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1080&q=80"]
    }
  },
  "hub-culturel": {
    id: "hub-culturel",
    title: "Hub Culturel",
    type: "PUBLIC",
    category: "Culturel",
    year: "2023",
    location: "Pau",
    surface: "1 900 m²",
    client: "Ville de Pau",
    description: "Réhabilitation industrielle.",
    concept: "Boîte de béton dans structure acier.",
    materials: ["Acier", "Béton"],
    images: {
      hero: "https://images.unsplash.com/photo-1721244653757-b76cc4679dfb?w=1920&q=80",
      gallery: ["https://images.unsplash.com/photo-1586366461834-d2d65d725a2e?w=1080&q=80"]
    }
  },
  "maison-vertigo": {
    id: "maison-vertigo",
    title: "Maison Vertigo",
    type: "INDIVIDUEL",
    category: "Résidentiel",
    year: "2024",
    location: "Hossegor",
    surface: "320 m²",
    client: "Privé",
    description: "Résidence sur pilotis.",
    concept: "Lévitation au dessus du paysage.",
    materials: ["Acier", "Verre"],
    images: {
      hero: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
      gallery: []
    }
  },
  "cowork-factory": {
    id: "cowork-factory",
    title: "Cowork Factory",
    type: "TERTIAIRE",
    category: "Tertiaire",
    year: "2023",
    location: "Bordeaux",
    surface: "2 400 m²",
    client: "Privé",
    description: "Espace de travail flexible.",
    concept: "Patrimoine industriel réactivé.",
    materials: ["Brique", "Acier"],
    images: {
      hero: "https://images.unsplash.com/photo-1586366461834-d2d65d725a2e?w=1920&q=80",
      gallery: []
    }
  },
  "logements-adaptatifs": {
    id: "logements-adaptatifs",
    title: "Logements Adaptatifs",
    type: "LOGEMENT COLLECTIF",
    category: "Résidentiel",
    year: "2024",
    location: "Bayonne",
    surface: "1 850 m²",
    client: "Bailleur social",
    description: "Un programme de logements sociaux expérimentaux.",
    concept: "Plateaux libres.",
    materials: ["CLT", "Douglas"],
    images: {
      hero: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80",
      gallery: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1080&q=80"]
    }
  }
};

export const atelierServices = [
  {
    id: "mobilier",
    title: "Mobilier Sur-Mesure",
    category: "Design & Fabrication",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1080&q=80",
    intro: "Conception et fabrication de pièces uniques.",
    details: ["Bois massif", "Acier", "Béton"]
  },
  {
    id: "agencement",
    title: "Agencement",
    category: "Espace & Usage",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1080&q=80",
    intro: "Optimisation spatiale et menuiserie intégrée.",
    details: ["Bureaux", "Commerce", "Habitat"]
  },
  {
    id: "sceno",
    title: "Scénographie",
    category: "Éphémère & Événementiel",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1080&q=80",
    intro: "Installations éphémères et muséographie.",
    details: ["Exposition", "Festival", "Stand"]
  }
];

export const shopCollections = [
  { 
    id: "mineral", 
    tag: "DROP #01",
    status: "DISPONIBLE",
    title: "Collection Minéral", 
    subtitle: "VASES & OBJETS",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80", 
    description: "Une série de 5 vases en grès émaillé, inspirés des formations géologiques du Pays Basque. Façonnés à la main.",
    edition: "Édition limitée à 5 exemplaires par modèle"
  },
  { 
    id: "lineaire", 
    tag: "DROP #02",
    status: "DISPONIBLE",
    title: "Collection Linéaire", 
    subtitle: "LUMINAIRES",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80", 
    description: "Une série de 3 luminaires suspendus en laiton et verre soufflé, célébrant la géométrie pure et la lumière.",
    edition: "Édition limitée à 3 exemplaires par modèle"
  }
];

export const shopProducts = [
  { id: "vase-canyon", collectionId: "mineral", title: "Vase Canyon", price: "380€", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80", status: "En stock", desc: "Grès chamotté...", specs: ["H 28cm"] },
  { id: "vase-falaise", collectionId: "mineral", title: "Vase Falaise", price: "450€", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80", status: "1 exemplaire", desc: "Vase sculptural...", specs: ["H 35cm"] },
  { id: "chaise-beton", collectionId: "mineral", title: "Chaise Béton", price: "450€", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80", status: "Sur commande", desc: "Assise béton...", specs: ["H 45cm"] },
  { id: "lampe-tube", collectionId: "lineaire", title: "Lampe Tube", price: "890€", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80", status: "En stock", desc: "Structure acier...", specs: ["H 45cm"] },
  { id: "suspension-orbe", collectionId: "lineaire", title: "Suspension Orbe", price: "1050€", image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80", status: "Sur commande", desc: "Globe verre...", specs: ["Ø 30cm"] },
  { id: "table-basse", collectionId: "lineaire", title: "Table Basse", price: "1200€", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80", status: "Sur commande", desc: "Chêne massif...", specs: ["H 35cm"] }
];

export const archiServicesList = [
  { 
    id: "rendez-vous-conseil", 
    title: "Rendez-vous Conseil", 
    price: "150€ / Forfait", 
    tag: "DÉMARRAGE", 
    description: "Une rencontre simple pour poser les bases.",
    content: "Nous nous déplaçons sur site pour analyser le potentiel de votre bien. À l'issue de ce rendez-vous, nous vous remettons une note de synthèse comprenant les contraintes techniques et réglementaires.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
  },
  { 
    id: "etude-projet", 
    title: "Étude de Projet", 
    price: "Sur devis", 
    tag: "CONCEPTION", 
    description: "Plans 2D, planches de style, moodboards.",
    content: "De l'esquisse au permis de construire. Nous dessinons les plans, les coupes et les façades. Nous définissons ensemble l'ambiance matérielle et chromatique du projet.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
  },
  { 
    id: "modelisation-3d", 
    title: "Modélisation & 3D", 
    price: "1000€ / Forfait", 
    tag: "VISUALISATION", 
    description: "Images photoréalistes ou vues en volume.",
    content: "Projetez-vous dans votre futur espace grâce à nos outils de modélisation avancés. Visite virtuelle et rendus haute définition pour valider chaque choix esthétique.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200"
  },
  { 
    id: "suivi-chantier", 
    title: "Suivi de Chantier", 
    price: "Sur devis", 
    tag: "RÉALISATION", 
    description: "Coordination des artisans, planning.",
    content: "Nous sommes vos yeux sur le terrain. Réunions hebdomadaires, comptes-rendus, gestion financière et coordination des différents corps d'état jusqu'à la réception.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200"
  },
  { 
    id: "faisabilite", 
    title: "Faisabilité", 
    price: "Sur devis", 
    tag: "ANALYSE", 
    description: "Analyse réglementaire (PLU), études de capacité.",
    content: "Avant tout achat ou grand projet, nous vérifions ce qu'il est possible de faire. Analyse du Plan Local d'Urbanisme, servitudes, emprise au sol et hauteurs maximales.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200"
  }
];

export const mediaArticles = [
  { id: "art-1", title: "Le Retour du Brutalisme", date: "12 Oct 2024", category: "Architecture", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", intro: "Pourquoi le béton brut revient en force.", content: "Le béton brut n'a jamais été aussi vivant..." },
  { id: "art-2", title: "Entretien: Anne Lacaton", date: "15 Nov 2024", category: "Interview", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800", intro: "Rencontre avec la lauréate du Pritzker.", content: "..." },
  { id: "art-3", title: "Matériaux Bio-sourcés", date: "03 Nov 2024", category: "Tech", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800", intro: "L'avenir de la construction durable.", content: "..." },
  { id: "art-4", title: "Lumière et Matière", date: "28 Oct 2024", category: "Design", image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800", intro: "Sculpter l'espace par le vide.", content: "..." }
];

export const associationPrograms = [
  { id: "prog-1", title: "Alternance", desc: "Cursus 3 ans", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", details: "Formation en immersion totale." },
  { id: "prog-2", title: "Workshops", desc: "Été 2025", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800", details: "Semaine intensive de construction." },
  { id: "prog-3", title: "Mentorat", desc: "Jeunes diplômés", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800", details: "Accompagnement personnalisé." }
];

export const architectureExpertises = [
  { id: "logement-collectif", title: "Logement Collectif", subtitle: "HABITAT & USAGES", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1080&q=80", description: "Résidences contemporaines...", count: "2 Projets" },
  { id: "batiments-tertiaires", title: "Tertiaire", subtitle: "TRAVAIL & INNOVATION", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1080&q=80", description: "Bureaux, coworking...", count: "2 Projets" },
  { id: "maisons-individuelles", title: "Résidentiel", subtitle: "SUR-MESURE & PRESTIGE", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1080&q=80", description: "Villas sur-mesure...", count: "2 Projets" },
  { id: "equipements-publics", title: "Public", subtitle: "CULTURE & ÉDUCATION", image: "https://images.unsplash.com/photo-1586366461834-d2d65d725a2e?w=1080&q=80", description: "Écoles, salles de spectacle...", count: "1 Projet" }
];

export const teamMembers = [
  { 
    id: "sarah-lemoine", // AJOUT DE L'ID
    name: "Sarah Lemoine", 
    role: "Architecte Associée", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    bio: "Sarah pilote la conception architecturale..." 
  },
  { 
    id: "marc-dubois", // AJOUT DE L'ID
    name: "Marc Dubois", 
    role: "Architecte Associé", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    bio: "Marc est le garant de la technique..." 
  },
  { 
    id: "elena-rivas", 
    name: "Elena Rivas", 
    role: "Chef de Projet", 
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    bio: "Elena coordonne les équipes..." 
  },
  { 
    id: "thomas-vanh", 
    name: "Thomas Vanh", 
    role: "Designer Mobilier", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    bio: "Thomas dessine le mobilier..." 
  },
  { 
    id: "julie-chen", 
    name: "Julie Chen", 
    role: "Directrice Média", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    bio: "Julie gère l'image..." 
  },
  { 
    id: "alexandre-k", 
    name: "Alexandre K.", 
    role: "Responsable Chantier", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    bio: "Alexandre suit les travaux..." 
  }
];

export const values = [
  { title: "Radicalité", desc: "Aller à l'essentiel. Supprimer le superflu pour ne garder que la structure, la lumière et la matière." },
  { title: "Sincérité", desc: "Ne pas tricher avec les matériaux. Le béton est du béton, le bois est du bois. Pas de faux-semblants." },
  { title: "Transmission", desc: "Partager le savoir-faire. Notre association forme la prochaine génération directement sur le terrain." },
  { title: "Local", desc: "Construire avec ce que nous avons sous les pieds. Privilégier les circuits ultra-courts." }
];

export const faqData = [
  { q: "Travaillez-vous pour les particuliers ?", a: "Oui, via Cobalt +, nous réalisons des projets de maisons individuelles, de rénovation et d'extension." },
  { q: "Puis-je commander un meuble sur-mesure ?", a: "Absolument. L'Atelier de Cobalt conçoit et fabrique des pièces uniques." },
  { q: "Prenez-vous des stagiaires ?", a: "Nous privilégions l'alternance via notre association Bleu Cobalt." },
  { q: "Où êtes-vous situés ?", a: "Biarritz et Bordeaux." }
];