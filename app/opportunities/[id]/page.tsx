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
  GraduationCap,
  Globe,
  CheckCircle2,
  Loader2,
  ArrowLeft
} from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import type { User } from "@supabase/supabase-js"
import type { Opportunity } from "@/lib/types"
import { use } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const defaultApplicationChecklist = [
  { id: "1", title: "Resume ready", completed: false },
  { id: "2", title: "Personal statement drafted", completed: false },
  { id: "3", title: "Recommendation letters requested", completed: false },
  { id: "4", title: "Transcripts ordered", completed: false },
  { id: "5", title: "Application submitted", completed: false },
]

export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const searchParams = useSearchParams()
  const level = searchParams.get("level") || "high_school"
  const { language } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [checklist, setChecklist] = useState(defaultApplicationChecklist)
  const [showTracker, setShowTracker] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  useEffect(() => {
    async function fetchOpportunity() {
      setLoading(true)
      const supabase = createClient()
      
      // Determine which table to query based on level
      const tableName = level === "undergraduate" 
        ? "Undergraduate Opportunities" 
        : "High School Opportunities"
      
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", resolvedParams.id)
        .single()
      
      if (error) {
        console.error("[v0] Error fetching opportunity:", error)
      } else {
        setOpportunity({ ...data, level })
      }
      setLoading(false)
    }
    
    fetchOpportunity()
  }, [resolvedParams.id, level])

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

  const isRemote = opportunity?.modality?.toLowerCase().includes("remote") || 
                   opportunity?.modality?.toLowerCase().includes("virtual") ||
                   opportunity?.modality?.toLowerCase().includes("online")

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">
              {language === "es" ? "Oportunidad no encontrada" : "Opportunity not found"}
            </h1>
            <Button asChild>
              <Link href="/opportunities">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === "es" ? "Volver a Oportunidades" : "Back to Opportunities"}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6 rounded-xl">
            <Link href="/opportunities">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === "es" ? "Volver" : "Back"}
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {opportunity.type && (
                    <Badge className="rounded-full">{opportunity.type}</Badge>
                  )}
                  {opportunity.level && (
                    <Badge variant="outline" className="rounded-full">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {opportunity.level === "high_school" ? "High School" : "Undergraduate"}
                    </Badge>
                  )}
                  {isRemote && (
                    <Badge variant="secondary" className="rounded-full">
                      <Globe className="h-3 w-3 mr-1" />
                      {language === "es" ? "Remoto" : "Remote"}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{opportunity.title}</h1>
                <p className="text-lg text-muted-foreground">{opportunity.organization}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                {opportunity.deadline && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{language === "es" ? "Fecha límite:" : "Deadline:"} {opportunity.deadline}</span>
                  </div>
                )}
                {opportunity.scope && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{opportunity.scope}</span>
                  </div>
                )}
                {opportunity.modality && (
                  <Badge variant="outline" className="rounded-full">
                    {opportunity.modality}
                  </Badge>
                )}
              </div>

              {opportunity.field && (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {opportunity.field}
                  </Badge>
                </div>
              )}

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{language === "es" ? "Descripción" : "Description"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {opportunity.description || (language === "es" ? "Sin descripción disponible" : "No description available")}
                  </p>
                </CardContent>
              </Card>

              {opportunity.requirements && (
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>{language === "es" ? "Requisitos" : "Requirements"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">{opportunity.requirements}</p>
                  </CardContent>
                </Card>
              )}

              {opportunity.eligibility && (
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>{language === "es" ? "Elegibilidad" : "Eligibility"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">{opportunity.eligibility}</p>
                  </CardContent>
                </Card>
              )}

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
                    {opportunity.cost && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{language === "es" ? "Costo" : "Cost"}</span>
                        <span className="font-medium text-foreground">{opportunity.cost}</span>
                      </div>
                    )}
                    {opportunity.financial_aid && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{language === "es" ? "Ayuda Financiera" : "Financial Aid"}</span>
                        <span className="font-medium text-primary">{opportunity.financial_aid}</span>
                      </div>
                    )}
                    {opportunity.language && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{language === "es" ? "Idioma" : "Language"}</span>
                        <span className="font-medium text-foreground">{opportunity.language}</span>
                      </div>
                    )}
                    {opportunity.status && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{language === "es" ? "Estado" : "Status"}</span>
                        <Badge variant={opportunity.status === "Open" ? "default" : "secondary"} className="rounded-full">
                          {opportunity.status}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {opportunity.gender_focus && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-medium text-foreground mb-2">
                        {language === "es" ? "Enfoque de Género" : "Gender Focus"}
                      </p>
                      <Badge variant="outline" className="rounded-full">
                        {opportunity.gender_focus}
                      </Badge>
                    </div>
                  )}

                  <div className="pt-4 space-y-3">
                    {opportunity.link && (
                      <Button className="w-full rounded-xl" size="lg" asChild>
                        <a href={opportunity.link} target="_blank" rel="noopener noreferrer">
                          {language === "es" ? "Aplicar Ahora" : "Apply Now"}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    )}
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
