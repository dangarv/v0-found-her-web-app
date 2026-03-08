"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/language-context"
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Bookmark, 
  Clock,
  DollarSign,
  Users,
  CheckCircle2
} from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import type { User } from "@supabase/supabase-js"
import { use } from "react"

// Mock opportunity data
const mockOpportunity = {
  id: "1",
  title: "Fulbright U.S. Student Program",
  organization: "U.S. Department of State",
  description: `The Fulbright U.S. Student Program provides grants for individually designed study/research projects or for English Teaching Assistant Programs. The program operates in over 140 countries worldwide.

Fulbright grants provide round-trip transportation, a monthly living allowance, and funding to support research, study, or teaching activities. The program includes pre-departure orientations and connections to Fulbright alumni networks.

This opportunity is open to recent graduates, graduate students, and young professionals. Applicants must have a bachelor's degree by the start of the grant period.`,
  deadline: "October 10, 2024",
  location: "Worldwide",
  category: "Fellowship",
  tags: ["Research", "Teaching", "Graduate", "International"],
  is_remote: false,
  is_paid: true,
  amount: "Full funding",
  eligibility: ["Women Only", "Bachelor's Required", "U.S. Citizen"],
  requirements: [
    "U.S. citizenship at the time of application",
    "Bachelor's degree by start of grant",
    "Proficiency in the language of the host country",
    "Good health",
    "Sufficient academic and professional qualifications",
  ],
  website: "https://us.fulbrightonline.org",
  acceptance_rate: "23%",
  experience_required: "Beginner to Intermediate",
}

const applicationChecklist = [
  { id: "1", title: "Resume ready", completed: false },
  { id: "2", title: "Personal statement drafted", completed: false },
  { id: "3", title: "Recommendation letters requested", completed: false },
  { id: "4", title: "Transcripts ordered", completed: false },
  { id: "5", title: "Language proficiency documented", completed: false },
  { id: "6", title: "Application submitted", completed: false },
]

export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { language } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [checklist, setChecklist] = useState(applicationChecklist)
  const [showTracker, setShowTracker] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const handleAuthRequired = (action: () => void) => {
    if (!user) {
      setShowAuthDialog(true)
      return
    }
    action()
  }

  const handleSave = () => {
    handleAuthRequired(() => {
      setIsSaved(!isSaved)
    })
  }

  const handleStartTracker = () => {
    handleAuthRequired(() => {
      setShowTracker(true)
    })
  }

  const toggleChecklistItem = (id: string) => {
    handleAuthRequired(() => {
      setChecklist(prev => 
        prev.map(item => 
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      )
    })
  }

  const completedItems = checklist.filter(item => item.completed).length
  const progressPercentage = (completedItems / checklist.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Badge className="mb-4 rounded-full">{mockOpportunity.category}</Badge>
                <h1 className="text-3xl font-bold text-foreground mb-2">{mockOpportunity.title}</h1>
                <p className="text-lg text-muted-foreground">{mockOpportunity.organization}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{language === "es" ? "Fecha límite:" : "Deadline:"} {mockOpportunity.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{mockOpportunity.location}</span>
                </div>
                {mockOpportunity.is_paid && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{mockOpportunity.amount}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {mockOpportunity.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{language === "es" ? "Descripción" : "Description"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">{mockOpportunity.description}</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{language === "es" ? "Requisitos" : "Requirements"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mockOpportunity.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Application Tracker */}
              {showTracker && (
                <Card className="rounded-2xl border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{language === "es" ? "Seguimiento de Aplicación" : "Application Tracker"}</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {completedItems}/{checklist.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Progress value={progressPercentage} className="h-3 rounded-full" />
                      <p className="text-sm text-muted-foreground text-center">
                        {Math.round(progressPercentage)}% {language === "es" ? "completado" : "complete"}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {checklist.map((item) => (
                        <div 
                          key={item.id} 
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                            item.completed 
                              ? "bg-primary/10 border border-primary/20" 
                              : "bg-card border border-border hover:border-primary/30"
                          }`}
                          onClick={() => toggleChecklistItem(item.id)}
                        >
                          <Checkbox checked={item.completed} />
                          <span className={item.completed ? "text-primary line-through" : "text-foreground"}>
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="rounded-2xl sticky top-28">
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{language === "es" ? "Tasa de aceptación" : "Acceptance Rate"}</span>
                      <span className="font-medium text-foreground">{mockOpportunity.acceptance_rate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{language === "es" ? "Experiencia" : "Experience"}</span>
                      <span className="font-medium text-foreground">{mockOpportunity.experience_required}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border space-y-2">
                    <p className="text-sm font-medium text-foreground mb-2">{language === "es" ? "Elegibilidad" : "Eligibility"}</p>
                    <div className="flex flex-wrap gap-2">
                      {mockOpportunity.eligibility.map((item) => (
                        <Badge key={item} variant="outline" className="rounded-full text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button className="w-full rounded-xl" size="lg" asChild>
                      <a href={mockOpportunity.website} target="_blank" rel="noopener noreferrer">
                        {language === "es" ? "Aplicar Ahora" : "Apply Now"}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                    <Button 
                      variant={isSaved ? "secondary" : "outline"} 
                      className="w-full rounded-xl" 
                      size="lg"
                      onClick={handleSave}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                      {isSaved 
                        ? (language === "es" ? "Guardado" : "Saved") 
                        : (language === "es" ? "Guardar" : "Save")}
                    </Button>
                    {!showTracker && (
                      <Button 
                        variant="outline" 
                        className="w-full rounded-xl" 
                        size="lg"
                        onClick={handleStartTracker}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {language === "es" ? "Iniciar Seguimiento" : "Start Application Tracker"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <AuthRequiredDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        action={language === "es" ? "guardar esta oportunidad" : "save this opportunity"}
      />
    </div>
  )
}
