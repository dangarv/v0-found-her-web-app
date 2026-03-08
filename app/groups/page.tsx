"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { GroupCard } from "@/components/groups/group-card"
import { useLanguage } from "@/lib/language-context"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Rocket, Heart, RefreshCw } from "lucide-react"
import { useState } from "react"

const mockGroups = [
  {
    id: "1",
    name: "Fulbright Application Squad",
    description: "A motivation circle for women applying to Fulbright scholarships. Weekly check-ins, essay reviews, and interview prep.",
    memberCount: 12,
    type: "Motivation Circle",
    category: "motivation",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "2",
    name: "LatAm EdTech Founders",
    description: "Building the future of education in Latin America. Join us if you're working on EdTech startups or products.",
    memberCount: 28,
    type: "Project Squad",
    category: "project",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "3",
    name: "UX Design Skill Exchange",
    description: "1-on-1 reciprocal mentorship for designers. Share your expertise and learn new skills from peers.",
    memberCount: 8,
    type: "Skill-Swap Pair",
    category: "skill-swap",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "4",
    name: "Climate Tech Builders",
    description: "Project squad for women building climate solutions. From ideation to launch, we support each other's ventures.",
    memberCount: 45,
    type: "Project Squad",
    category: "project",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "5",
    name: "Grad School Motivation Circle",
    description: "Applying to graduate programs? Join us for weekly accountability, SOP reviews, and emotional support.",
    memberCount: 18,
    type: "Motivation Circle",
    category: "motivation",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "6",
    name: "Marketing & Dev Exchange",
    description: "Pair up with someone who has complementary skills. Marketers teach growth, developers teach code.",
    memberCount: 14,
    type: "Skill-Swap Pair",
    category: "skill-swap",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    isJoined: false,
  },
]

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

export default function GroupsPage() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch = 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = selectedType === "all" || group.category === selectedType

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>

          {filteredGroups.length === 0 && (
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
