"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { MatchCard } from "@/components/match/match-card"
import { useLanguage } from "@/lib/language-context"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { useState } from "react"

const mockMatches = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    location: "San Francisco, USA",
    bio: "CS student passionate about AI and machine learning. Looking for collaborators on a healthcare AI project.",
    skills: ["Python", "TensorFlow", "React"],
    interests: ["AI/ML", "Healthcare Tech", "Startups"],
    matchScore: 95,
  },
  {
    id: "2",
    name: "Maria Garcia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    location: "Madrid, Spain",
    bio: "Entrepreneur and designer building sustainable fashion tech. Seeking technical co-founders.",
    skills: ["UI/UX Design", "Figma", "Branding"],
    interests: ["Sustainability", "Fashion Tech", "Social Impact"],
    matchScore: 88,
  },
  {
    id: "3",
    name: "Aisha Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    location: "Mumbai, India",
    bio: "Fintech enthusiast working on financial inclusion solutions for rural communities.",
    skills: ["Node.js", "MongoDB", "AWS"],
    interests: ["Fintech", "Social Impact", "Emerging Markets"],
    matchScore: 82,
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    location: "London, UK",
    bio: "Climate tech researcher exploring carbon capture technologies. Looking for engineering partners.",
    skills: ["Data Science", "R", "Environmental Science"],
    interests: ["Climate Tech", "Research", "Sustainability"],
    matchScore: 79,
  },
  {
    id: "5",
    name: "Yuki Tanaka",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
    location: "Tokyo, Japan",
    bio: "Game developer creating educational games for children. Seeking artists and storytellers.",
    skills: ["Unity", "C#", "Game Design"],
    interests: ["EdTech", "Gaming", "Children's Education"],
    matchScore: 75,
  },
  {
    id: "6",
    name: "Fatima Hassan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    location: "Dubai, UAE",
    bio: "E-commerce specialist helping small businesses go digital. Building a marketplace platform.",
    skills: ["Shopify", "Digital Marketing", "SEO"],
    interests: ["E-commerce", "SMB Tech", "MENA Region"],
    matchScore: 71,
  },
]

const skillFilters = ["All", "Python", "React", "Design", "Marketing", "Data Science"]

export default function MatchPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("All")

  const filteredMatches = mockMatches.filter((match) => {
    const matchesSearch = 
      match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesSkill = selectedSkill === "All" || match.skills.some(s => 
      s.toLowerCase().includes(selectedSkill.toLowerCase())
    )

    return matchesSearch && matchesSkill
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">{t('match')}</h1>
            <p className="text-muted-foreground text-lg">
              {t('matchSubtitle')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchByNameOrSkills')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {skillFilters.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkill === skill ? "default" : "outline"}
                  className="cursor-pointer rounded-full px-4 py-1.5 transition-colors"
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          {filteredMatches.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t('noMatchesFound')}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
