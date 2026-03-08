"use client"

import { useLanguage } from "@/lib/language-context"
import { UserPlus, Search, Users, Rocket, Banknote } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    titleEn: "Create Profile",
    titleEs: "Crea tu Perfil",
    descEn: "Sign up and tell us about your skills, interests, and goals.",
    descEs: "Regístrate y cuéntanos sobre tus habilidades, intereses y metas.",
  },
  {
    icon: Search,
    titleEn: "Discover Opportunities",
    titleEs: "Descubre Oportunidades",
    descEn: "Browse scholarships, internships, grants, and programs tailored for you.",
    descEs: "Explora becas, pasantías, subvenciones y programas diseñados para ti.",
  },
  {
    icon: Users,
    titleEn: "Find Collaborators",
    titleEs: "Encuentra Colaboradoras",
    descEn: "Connect with like-minded women to build projects together.",
    descEs: "Conecta con mujeres afines para construir proyectos juntas.",
  },
  {
    icon: Rocket,
    titleEn: "Build Projects",
    titleEs: "Construye Proyectos",
    descEn: "Turn your ideas into reality with your new team.",
    descEs: "Convierte tus ideas en realidad con tu nuevo equipo.",
  },
  {
    icon: Banknote,
    titleEn: "Access Funding",
    titleEs: "Accede a Financiamiento",
    descEn: "Find grants and funding opportunities to support your ventures.",
    descEs: "Encuentra subvenciones y oportunidades de financiamiento para tus proyectos.",
  },
]

export function HowItWorks() {
  const { language } = useLanguage()

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            {language === "es" ? "Cómo Funciona" : "How It Works"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            {language === "es" 
              ? "Tu camino hacia el éxito en cinco simples pasos."
              : "Your path to success in five simple steps."}
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {language === "es" ? step.titleEs : step.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "es" ? step.descEs : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
