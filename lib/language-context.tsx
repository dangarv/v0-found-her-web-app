"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "es"

interface Translations {
  // Header
  features: string
  stories: string
  opportunities: string
  collaborate: string
  match: string
  groups: string
  login: string
  getStarted: string
  // Hero
  heroSlogan: string
  heroSubtitle: string
  startExploring: string
  browseOpportunities: string
  opportunitiesCount: string
  membersCount: string
  countriesCount: string
  empoweringWomen: string
  // Features
  featuresTitle: string
  featuresSubtitle: string
  opportunitiesFeatureTitle: string
  opportunitiesFeatureDescription: string
  collaborateFeatureTitle: string
  collaborateFeatureDescription: string
  matchFeatureTitle: string
  matchFeatureDescription: string
  groupsFeatureTitle: string
  groupsFeatureDescription: string
  careerGrowth: string
  careerGrowthDescription: string
  safeSpace: string
  safeSpaceDescription: string
  // How it Works
  howItWorksTitle: string
  howItWorksSubtitle: string
  step1Title: string
  step1Description: string
  step2Title: string
  step2Description: string
  step3Title: string
  step3Description: string
  step4Title: string
  step4Description: string
  // CTA
  ctaTitle: string
  ctaSubtitle: string
  joinNow: string
  // Auth Required Dialog
  authRequired: string
  authRequiredMessage: string
  signUp: string
  // Auth Pages
  welcomeBack: string
  signInToContinue: string
  email: string
  password: string
  signIn: string
  forgotPassword: string
  dontHaveAccount: string
  createAccount: string
  joinCommunity: string
  fullName: string
  confirmPassword: string
  agreeToTerms: string
  termsOfService: string
  privacyPolicy: string
  alreadyHaveAccount: string
  // Page Subtitles
  opportunitiesSubtitle: string
  collaborateSubtitle: string
  matchSubtitle: string
  groupsSubtitle: string
  // Common
  apply: string
  save: string
  like: string
  comment: string
  connect: string
  learnMore: string
  search: string
  filter: string
  all: string
  remote: string
  deadline: string
  location: string
  noDeadline: string
  createPost: string
  searchPosts: string
  createCollaborationPost: string
  searchByNameOrSkills: string
  noMatchesFound: string
  searchGroups: string
  noGroupsFound: string
  joinGroup: string
  members: string
  showing: string
  loading: string
  noResults: string
  tryAgain: string
  // Filter Labels
  educationLevel: string
  highSchool: string
  undergraduate: string
  type: string
  scholarship: string
  internship: string
  fellowship: string
  grant: string
  program: string
  competition: string
  modality: string
  inPerson: string
  hybrid: string
  cost: string
  free: string
  paid: string
  field: string
  stem: string
  arts: string
  business: string
  socialSciences: string
  health: string
  environment: string
  genderFocus: string
  womenOnly: string
  allGenders: string
  clearFilters: string
  // Opportunity Card
  financialAid: string
  available: string
  // Profile
  myProfile: string
  miniPortfolio: string
  editProfile: string
  saveChanges: string
  aboutMe: string
  skills: string
  interests: string
  posts: string
  projects: string
  noPostsYet: string
  createFirstPost: string
  noProjectsYet: string
  findCollaborators: string
  notInGroups: string
  browseGroups: string
  viewGroup: string
  addBio: string
  addLocation: string
  addSkill: string
  addInterest: string
  // Stats
  statsTitle: string
  statsSubtitle: string
  fundingAccessed: string
  fundingDescription: string
  successfulMatches: string
  matchesDescription: string
  successRate: string
  successDescription: string
  globalAccess: string
  globalDescription: string
  // Testimonials
  testimonialsTitle: string
  testimonialsSubtitle: string
  // Footer
  platform: string
  resources: string
  company: string
  legal: string
  blog: string
  guides: string
  successStories: string
  faq: string
  about: string
  careers: string
  contact: string
  press: string
  privacy: string
  terms: string
  cookies: string
  footerDescription: string
  allRightsReserved: string
  messages: string
  // Dashboard
  dashboard: string
  welcome: string
  savedOpportunities: string
  applications: string
  recentActivity: string
  // Groups
  groupDescription: string
  membersList: string
  progressTracker: string
  groupChat: string
  activityFeed: string
  project: string
  motivationCircle: string
  skillSwap: string
  projectDescription: string
  motivationCircleDescription: string
  skillSwapDescription: string
}

const translations: Record<Language, Translations> = {
  en: {
    // Header
    features: "Features",
    stories: "Stories",
    opportunities: "Opportunities",
    collaborate: "Collaborate",
    match: "Match",
    groups: "Groups",
    login: "Log in",
    getStarted: "Get Started",
    // Hero
    heroSlogan: "Build without Barriers",
    heroSubtitle: "FoundHer connects ambitious young women with opportunities, funding, mentorship, and like-minded collaborators to build anything you want regardless of your age, experience, background, location, or resources.",
    startExploring: "Start exploring",
    browseOpportunities: "Browse opportunities",
    opportunitiesCount: "Opportunities",
    membersCount: "Members",
    countriesCount: "Countries",
    empoweringWomen: "Empowering young women globally",
    // Features
    featuresTitle: "Everything you need to succeed",
    featuresSubtitle: "From discovering opportunities to finding your co-founder, we've got you covered.",
    opportunitiesFeatureTitle: "Opportunity Explorer",
    opportunitiesFeatureDescription: "Browse curated scholarships, internships, grants, and programs tailored for young women.",
    collaborateFeatureTitle: "Collaboration Hub",
    collaborateFeatureDescription: "Post your project ideas and find talented collaborators who share your vision.",
    matchFeatureTitle: "Smart Matching",
    matchFeatureDescription: "Our algorithm connects you with people who have complementary skills and interests.",
    groupsFeatureTitle: "Communities",
    groupsFeatureDescription: "Join groups based on your interests and connect with like-minded women globally.",
    careerGrowth: "Career Growth",
    careerGrowthDescription: "Access resources and guidance to help you navigate your professional journey.",
    safeSpace: "Safe Space",
    safeSpaceDescription: "A verified community built by women, for women, ensuring a supportive environment.",
    // How it Works
    howItWorksTitle: "How it works",
    howItWorksSubtitle: "Get started in just a few simple steps",
    step1Title: "Create Your Profile",
    step1Description: "Sign up and tell us about your skills, interests, and what you're looking for.",
    step2Title: "Explore Opportunities",
    step2Description: "Browse scholarships, internships, grants, and programs curated for you.",
    step3Title: "Connect & Collaborate",
    step3Description: "Find like-minded women, join groups, and start building together.",
    step4Title: "Grow Together",
    step4Description: "Track your progress, celebrate wins, and support each other.",
    // CTA
    ctaTitle: "Ready to start your journey?",
    ctaSubtitle: "Join thousands of young women already using FoundHer to discover opportunities and build meaningful connections.",
    joinNow: "Join FoundHer Now",
    // Auth Required Dialog
    authRequired: "Sign in required",
    authRequiredMessage: "You need to sign in or create an account to perform this action.",
    signUp: "Sign up",
    // Auth Pages
    welcomeBack: "Welcome back",
    signInToContinue: "Sign in to continue your journey",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?",
    createAccount: "Create account",
    joinCommunity: "Join the FoundHer community",
    fullName: "Full name",
    confirmPassword: "Confirm password",
    agreeToTerms: "I agree to the",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    alreadyHaveAccount: "Already have an account?",
    // Page Subtitles
    opportunitiesSubtitle: "Discover scholarships, internships, grants, and programs curated for ambitious young women.",
    collaborateSubtitle: "Find project partners and build something amazing together.",
    matchSubtitle: "Connect with people who share your interests and have complementary skills.",
    groupsSubtitle: "Join communities of like-minded women and grow together.",
    // Common
    apply: "Apply Now",
    save: "Save",
    like: "Like",
    comment: "Comment",
    connect: "Connect",
    learnMore: "Learn More",
    search: "Search",
    filter: "Filter",
    all: "All",
    remote: "Remote",
    deadline: "Deadline",
    location: "Location",
    noDeadline: "No deadline",
    createPost: "Create Post",
    searchPosts: "Search posts...",
    createCollaborationPost: "create a collaboration post",
    searchByNameOrSkills: "Search by name or skills...",
    noMatchesFound: "No matches found. Try adjusting your filters.",
    searchGroups: "Search groups...",
    noGroupsFound: "No groups found. Try adjusting your filters.",
    joinGroup: "Join Group",
    members: "members",
    showing: "Showing",
    loading: "Loading...",
    noResults: "No results found",
    tryAgain: "Try again",
    // Filter Labels
    educationLevel: "Education Level",
    highSchool: "High School",
    undergraduate: "Undergraduate",
    type: "Type",
    scholarship: "Scholarship",
    internship: "Internship",
    fellowship: "Fellowship",
    grant: "Grant",
    program: "Program",
    competition: "Competition",
    modality: "Modality",
    inPerson: "In Person",
    hybrid: "Hybrid",
    cost: "Cost",
    free: "Free",
    paid: "Paid",
    field: "Field",
    stem: "STEM",
    arts: "Arts",
    business: "Business",
    socialSciences: "Social Sciences",
    health: "Health",
    environment: "Environment",
    genderFocus: "Gender Focus",
    womenOnly: "Women Only",
    allGenders: "All Genders",
    clearFilters: "Clear filters",
    // Opportunity Card
    financialAid: "Financial Aid",
    available: "Available",
    // Profile
    myProfile: "My Profile",
    miniPortfolio: "Your mini-portfolio and public profile",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    aboutMe: "About Me",
    skills: "Skills",
    interests: "Interests",
    posts: "Posts",
    projects: "Projects",
    noPostsYet: "No posts yet",
    createFirstPost: "Create your first post",
    noProjectsYet: "No projects yet",
    findCollaborators: "Find collaborators",
    notInGroups: "Not in any groups yet",
    browseGroups: "Browse groups",
    viewGroup: "View Group",
    addBio: "Add a bio to tell others about yourself...",
    addLocation: "Add location",
    addSkill: "Add skill",
    addInterest: "Add interest",
    // Stats
    statsTitle: "Making a real impact",
    statsSubtitle: "Join thousands of young women who have already transformed their futures through FoundHer.",
    fundingAccessed: "Funding Accessed",
    fundingDescription: "Through our platform",
    successfulMatches: "Successful Matches",
    matchesDescription: "Collaborations formed",
    successRate: "Success Rate",
    successDescription: "Application acceptances",
    globalAccess: "Global Access",
    globalDescription: "Available anywhere",
    // Testimonials
    testimonialsTitle: "Stories from our community",
    testimonialsSubtitle: "Hear from women who have found success through FoundHer.",
    // Footer
    platform: "Platform",
    resources: "Resources",
    company: "Company",
    legal: "Legal",
    blog: "Blog",
    guides: "Guides",
    successStories: "Success Stories",
    faq: "FAQ",
    about: "About",
    careers: "Careers",
    contact: "Contact",
    press: "Press",
    privacy: "Privacy",
    terms: "Terms",
    cookies: "Cookies",
    footerDescription: "Empowering young women globally to discover opportunities and build meaningful connections.",
    allRightsReserved: "All rights reserved.",
    messages: "Messages",
    // Dashboard
    dashboard: "Dashboard",
    welcome: "Welcome",
    savedOpportunities: "Saved Opportunities",
    applications: "Applications",
    recentActivity: "Recent Activity",
    // Groups
    groupDescription: "Group Description",
    membersList: "Members List",
    progressTracker: "Progress Tracker",
    groupChat: "Group Chat",
    activityFeed: "Activity Feed",
    project: "Project",
    motivationCircle: "Motivation Circle",
    skillSwap: "Skill-Swap",
    projectDescription: "Building a startup or product together.",
    motivationCircleDescription: "Learning and applying to opportunities together.",
    skillSwapDescription: "1-on-1 reciprocal mentorship.",
  },
  es: {
    // Header
    features: "Funciones",
    stories: "Historias",
    opportunities: "Oportunidades",
    collaborate: "Colaborar",
    match: "Conectar",
    groups: "Grupos",
    login: "Iniciar sesión",
    getStarted: "Comenzar",
    // Hero
    heroSlogan: "Construye sin Barreras",
    heroSubtitle: "FoundHer conecta a jóvenes ambiciosas con oportunidades, financiamiento, mentoría y colaboradoras afines para construir lo que quieras, sin importar tu edad, experiencia, origen, ubicación o recursos.",
    startExploring: "Empezar a explorar",
    browseOpportunities: "Ver oportunidades",
    opportunitiesCount: "Oportunidades",
    membersCount: "Miembros",
    countriesCount: "Países",
    empoweringWomen: "Empoderando mujeres jóvenes globalmente",
    // Features
    featuresTitle: "Todo lo que necesitas para triunfar",
    featuresSubtitle: "Desde descubrir oportunidades hasta encontrar tu cofundadora, te tenemos cubierta.",
    opportunitiesFeatureTitle: "Explorador de Oportunidades",
    opportunitiesFeatureDescription: "Explora becas, pasantías, subvenciones y programas seleccionados para mujeres jóvenes.",
    collaborateFeatureTitle: "Centro de Colaboración",
    collaborateFeatureDescription: "Publica tus ideas de proyectos y encuentra colaboradoras talentosas que compartan tu visión.",
    matchFeatureTitle: "Coincidencias Inteligentes",
    matchFeatureDescription: "Nuestro algoritmo te conecta con personas que tienen habilidades e intereses complementarios.",
    groupsFeatureTitle: "Comunidades",
    groupsFeatureDescription: "Únete a grupos según tus intereses y conecta con mujeres afines a nivel global.",
    careerGrowth: "Crecimiento Profesional",
    careerGrowthDescription: "Accede a recursos y orientación para ayudarte a navegar tu trayectoria profesional.",
    safeSpace: "Espacio Seguro",
    safeSpaceDescription: "Una comunidad verificada creada por mujeres, para mujeres, garantizando un ambiente de apoyo.",
    // How it Works
    howItWorksTitle: "Cómo funciona",
    howItWorksSubtitle: "Comienza en unos simples pasos",
    step1Title: "Crea Tu Perfil",
    step1Description: "Regístrate y cuéntanos sobre tus habilidades, intereses y lo que buscas.",
    step2Title: "Explora Oportunidades",
    step2Description: "Navega por becas, pasantías, subvenciones y programas seleccionados para ti.",
    step3Title: "Conecta y Colabora",
    step3Description: "Encuentra mujeres afines, únete a grupos y comienza a construir juntas.",
    step4Title: "Crecen Juntas",
    step4Description: "Sigue tu progreso, celebra logros y apóyense mutuamente.",
    // CTA
    ctaTitle: "¿Lista para comenzar tu viaje?",
    ctaSubtitle: "Únete a miles de mujeres jóvenes que ya usan FoundHer para descubrir oportunidades y construir conexiones significativas.",
    joinNow: "Únete a FoundHer Ahora",
    // Auth Required Dialog
    authRequired: "Inicio de sesión requerido",
    authRequiredMessage: "Necesitas iniciar sesión o crear una cuenta para realizar esta acción.",
    signUp: "Registrarse",
    // Auth Pages
    welcomeBack: "Bienvenida de nuevo",
    signInToContinue: "Inicia sesión para continuar tu viaje",
    email: "Correo electrónico",
    password: "Contraseña",
    signIn: "Iniciar sesión",
    forgotPassword: "¿Olvidaste tu contraseña?",
    dontHaveAccount: "¿No tienes cuenta?",
    createAccount: "Crear cuenta",
    joinCommunity: "Únete a la comunidad FoundHer",
    fullName: "Nombre completo",
    confirmPassword: "Confirmar contraseña",
    agreeToTerms: "Acepto los",
    termsOfService: "Términos de Servicio",
    privacyPolicy: "Política de Privacidad",
    alreadyHaveAccount: "¿Ya tienes cuenta?",
    // Page Subtitles
    opportunitiesSubtitle: "Descubre becas, pasantías, subvenciones y programas seleccionados para mujeres jóvenes ambiciosas.",
    collaborateSubtitle: "Encuentra socias de proyecto y construye algo increíble juntas.",
    matchSubtitle: "Conecta con personas que comparten tus intereses y tienen habilidades complementarias.",
    groupsSubtitle: "Únete a comunidades de mujeres afines y crezcan juntas.",
    // Common
    apply: "Aplicar Ahora",
    save: "Guardar",
    like: "Me gusta",
    comment: "Comentar",
    connect: "Conectar",
    learnMore: "Más información",
    search: "Buscar",
    filter: "Filtrar",
    all: "Todos",
    remote: "Remoto",
    deadline: "Fecha límite",
    location: "Ubicación",
    noDeadline: "Sin fecha límite",
    createPost: "Crear Publicación",
    searchPosts: "Buscar publicaciones...",
    createCollaborationPost: "crear una publicación de colaboración",
    searchByNameOrSkills: "Buscar por nombre o habilidades...",
    noMatchesFound: "No se encontraron coincidencias. Intenta ajustar los filtros.",
    searchGroups: "Buscar grupos...",
    noGroupsFound: "No se encontraron grupos. Intenta ajustar los filtros.",
    joinGroup: "Unirse al Grupo",
    members: "miembros",
    showing: "Mostrando",
    loading: "Cargando...",
    noResults: "No se encontraron resultados",
    tryAgain: "Intentar de nuevo",
    // Filter Labels
    educationLevel: "Nivel Educativo",
    highSchool: "Secundaria",
    undergraduate: "Universitario",
    type: "Tipo",
    scholarship: "Beca",
    internship: "Pasantía",
    fellowship: "Beca de Investigación",
    grant: "Subvención",
    program: "Programa",
    competition: "Competencia",
    modality: "Modalidad",
    inPerson: "Presencial",
    hybrid: "Híbrido",
    cost: "Costo",
    free: "Gratis",
    paid: "Pagado",
    field: "Campo",
    stem: "STEM",
    arts: "Artes",
    business: "Negocios",
    socialSciences: "Ciencias Sociales",
    health: "Salud",
    environment: "Medio Ambiente",
    genderFocus: "Enfoque de Género",
    womenOnly: "Solo Mujeres",
    allGenders: "Todos los Géneros",
    clearFilters: "Limpiar filtros",
    // Opportunity Card
    financialAid: "Ayuda Financiera",
    available: "Disponible",
    // Profile
    myProfile: "Mi Perfil",
    miniPortfolio: "Tu mini-portafolio y perfil público",
    editProfile: "Editar Perfil",
    saveChanges: "Guardar Cambios",
    aboutMe: "Sobre Mí",
    skills: "Habilidades",
    interests: "Intereses",
    posts: "Publicaciones",
    projects: "Proyectos",
    noPostsYet: "Sin publicaciones aún",
    createFirstPost: "Crea tu primera publicación",
    noProjectsYet: "Sin proyectos aún",
    findCollaborators: "Encontrar colaboradoras",
    notInGroups: "Aún no estás en ningún grupo",
    browseGroups: "Explorar grupos",
    viewGroup: "Ver Grupo",
    addBio: "Agrega una biografía para contarles a otros sobre ti...",
    addLocation: "Agregar ubicación",
    addSkill: "Agregar habilidad",
    addInterest: "Agregar interés",
    // Stats
    statsTitle: "Generando un impacto real",
    statsSubtitle: "Únete a miles de mujeres jóvenes que ya han transformado su futuro a través de FoundHer.",
    fundingAccessed: "Financiamiento Accedido",
    fundingDescription: "A través de nuestra plataforma",
    successfulMatches: "Coincidencias Exitosas",
    matchesDescription: "Colaboraciones formadas",
    successRate: "Tasa de Éxito",
    successDescription: "Aceptaciones de solicitudes",
    globalAccess: "Acceso Global",
    globalDescription: "Disponible en cualquier lugar",
    // Testimonials
    testimonialsTitle: "Historias de nuestra comunidad",
    testimonialsSubtitle: "Escucha a mujeres que han encontrado éxito a través de FoundHer.",
    // Footer
    platform: "Plataforma",
    resources: "Recursos",
    company: "Empresa",
    legal: "Legal",
    blog: "Blog",
    guides: "Guías",
    successStories: "Historias de Éxito",
    faq: "Preguntas Frecuentes",
    about: "Acerca de",
    careers: "Carreras",
    contact: "Contacto",
    press: "Prensa",
    privacy: "Privacidad",
    terms: "Términos",
    cookies: "Cookies",
    footerDescription: "Empoderando a mujeres jóvenes globalmente para descubrir oportunidades y construir conexiones significativas.",
    allRightsReserved: "Todos los derechos reservados.",
    messages: "Mensajes",
    // Dashboard
    dashboard: "Panel",
    welcome: "Bienvenida",
    savedOpportunities: "Oportunidades Guardadas",
    applications: "Aplicaciones",
    recentActivity: "Actividad Reciente",
    // Groups
    groupDescription: "Descripción del Grupo",
    membersList: "Lista de Miembros",
    progressTracker: "Seguimiento de Progreso",
    groupChat: "Chat del Grupo",
    activityFeed: "Actividad del Grupo",
    project: "Proyecto",
    motivationCircle: "Círculo de Motivación",
    skillSwap: "Intercambio de Habilidades",
    projectDescription: "Construyendo una startup o producto juntas.",
    motivationCircleDescription: "Aprendiendo y aplicando a oportunidades juntas.",
    skillSwapDescription: "Mentoría recíproca 1 a 1.",
  },
}

type TranslationKey = keyof Translations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
