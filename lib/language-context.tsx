"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "es"

interface Translations {
  // Header
  features: string
  stories: string
  opportunities: string
  collaborate: string
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
  // CTA
  ctaTitle: string
  ctaSubtitle: string
  joinNow: string
  // Auth Required Dialog
  authRequired: string
  authRequiredMessage: string
  signUp: string
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
}

const translations: Record<Language, Translations> = {
  en: {
    // Header
    features: "Features",
    stories: "Stories",
    opportunities: "Opportunities",
    collaborate: "Collaborate",
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
    // CTA
    ctaTitle: "Ready to start your journey?",
    ctaSubtitle: "Join thousands of young women already using FoundHer to discover opportunities and build meaningful connections.",
    joinNow: "Join FoundHer Now",
    // Auth Required Dialog
    authRequired: "Sign in required",
    authRequiredMessage: "You need to sign in or create an account to perform this action.",
    signUp: "Sign up",
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
  },
  es: {
    // Header
    features: "Funciones",
    stories: "Historias",
    opportunities: "Oportunidades",
    collaborate: "Colaborar",
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
    // CTA
    ctaTitle: "¿Lista para comenzar tu viaje?",
    ctaSubtitle: "Únete a miles de mujeres jóvenes que ya usan FoundHer para descubrir oportunidades y construir conexiones significativas.",
    joinNow: "Únete a FoundHer Ahora",
    // Auth Required Dialog
    authRequired: "Inicio de sesión requerido",
    authRequiredMessage: "Necesitas iniciar sesión o crear una cuenta para realizar esta acción.",
    signUp: "Registrarse",
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
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
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
