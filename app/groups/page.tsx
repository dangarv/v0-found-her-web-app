"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { GroupCard } from "@/components/groups/group-card"
import { useLanguage } from "@/lib/language-context"
import { Input } from "@/components/ui/input"
import { Search, Rocket, Heart, RefreshCw, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Group } from "@/lib/types"

const groupTypes = [
  { 
    id: "all", 
    label: "All", 
    labelEs: "Todos",
    icon: null,
    description: null,
  },
  { 
    id: "project", 
    label: "Project Squad", 
    labelEs: "Equipo de Proyecto",
    icon: Rocket,
    description: "Building a startup or product together",
    descriptionEs: "Construyendo una startup o producto juntas",
  },
  { 
    id: "motivation", 
    label: "Motivation Circle", 
    labelEs: "Círculo de Motivación",
    icon: Heart,
    description: "Learning and applying to opportunities together",
    descriptionEs: "Aprendiendo y aplicando a oportunidades juntas",
  },
  { 
    id: "skill-swap", 
    label: "Skill-Swap Pair", 
    labelEs: "Intercambio de Habilidades",
    icon: RefreshCw,
    description: "1-on-1 reciprocal mentorship",
    descriptionEs: "Mentoría recíproca 1 a 1",
  },
]

// Fallback mock data for when database is empty
const fallbackGroups = [
  {
    id: "1",
    name: "Fulbright Application Squad",
    description: "A motivation circle for women applying to Fulbright scholarships. Weekly check-ins, essay reviews, and interview prep.",
    type: "motivation",
    creator_id: null,
    member_count: 12,
  },
  {
    id: "2",
    name: "LatAm EdTech Founders",
    description: "Building the future of education in Latin America. Join us if you're working on EdTech startups or products.",
    type: "project",
    creator_id: null,
    member_count: 28,
  },
  {
    id: "3",
    name: "UX Design Skill Exchange",
    description: "1-on-1 reciprocal mentorship for designers. Share your expertise and learn new skills from peers.",
    type: "skill-swap",
    creator_id: null,
    member_count: 8,
  },
  {
    id: "4",
    name: "Climate Tech Builders",
    description: "Project squad for women building climate solutions. From ideation to launch, we support each other's ventures.",
    type: "project",
    creator_id: null,
    member_count: 45,
  },
  {
    id: "5",
    name: "Grad School Motivation Circle",
    description: "Applying to graduate programs? Join us for weekly accountability, SOP reviews, and emotional support.",
    type: "motivation",
    creator_id: null,
    member_count: 18,
  },
  {
    id: "6",
    name: "Marketing & Dev Exchange",
    description: "Pair up with someone who has complementary skills. Marketers teach growth, developers teach code.",
    type: "skill-swap",
    creator_id: null,
    member_count: 14,
  },
]

export default function GroupsPage() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGroups() {
      setLoading(true)
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from("Groups")
        .select("*")
      
      if (error) {
        console.error("[v0] Error fetching groups:", error)
        // Use fallback data if error
        setGroups(fallbackGroups as Group[])
      } else if (data && data.length > 0) {
        setGroups(data)
      } else {
        // Use fallback data if empty
        setGroups(fallbackGroups as Group[])
      }
      
      setLoading(false)
    }
    
    fetchGroups()
  }, [])

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = 
      (group.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (group.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    
    const matchesType = selectedType === "all" || group.type === selectedType

    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">{t('groups')}</h1>
            <p className="text-muted-foreground text-lg">
              {t('groupsSubtitle')}
            </p>
          </div>

          {/* Group Type Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {groupTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedType === type.id 
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {type.icon && (
                    <div className={`p-2 rounded-lg ${selectedType === type.id ? "bg-primary/20" : "bg-muted"}`}>
                      <type.icon className={`h-5 w-5 ${selectedType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                  )}
                  <span className={`font-semibold ${selectedType === type.id ? "text-primary" : "text-foreground"}`}>
                    {language === "es" ? type.labelEs : type.label}
                  </span>
                </div>
                {type.description && (
                  <p className="text-sm text-muted-foreground">
                    {language === "es" ? type.descriptionEs : type.description}
                  </p>
                )}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchGroups')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}

          {!loading && filteredGroups.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t('noGroupsFound')}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
