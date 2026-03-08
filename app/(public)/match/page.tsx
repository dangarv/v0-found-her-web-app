"use client"

import { MatchCard } from "@/components/match/match-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"

// Mock data
const mockMatches = [
  {
    id: "1",
    profile: {
      id: "user1",
      email: "emma@example.com",
      full_name: "Emma Watson",
      avatar_url: null,
      bio: "Software engineer at a fintech startup. Passionate about financial inclusion and women in tech. Looking to connect with like-minded founders.",
      location: "London, UK",
      skills: ["TypeScript", "React", "Node.js", "Fintech"],
      interests: ["Startups", "Financial Inclusion", "Women in Tech"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    matchScore: 92,
  },
  {
    id: "2",
    profile: {
      id: "user2",
      email: "priya@example.com",
      full_name: "Priya Patel",
      avatar_url: null,
      bio: "Product manager with 5 years of experience in B2B SaaS. Currently exploring startup ideas in the HR tech space.",
      location: "Mumbai, India",
      skills: ["Product Management", "User Research", "Analytics", "Agile"],
      interests: ["HR Tech", "B2B SaaS", "Entrepreneurship"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    matchScore: 87,
  },
  {
    id: "3",
    profile: {
      id: "user3",
      email: "chen@example.com",
      full_name: "Li Chen",
      avatar_url: null,
      bio: "AI researcher specializing in NLP and computer vision. Looking for collaborators on AI-for-good projects.",
      location: "Singapore",
      skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
      interests: ["AI Ethics", "AI for Good", "Research"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    matchScore: 84,
  },
  {
    id: "4",
    profile: {
      id: "user4",
      email: "fatima@example.com",
      full_name: "Fatima Al-Hassan",
      avatar_url: null,
      bio: "UX designer with a background in psychology. Interested in designing products that improve mental health and well-being.",
      location: "Dubai, UAE",
      skills: ["UI/UX Design", "Figma", "User Research", "Psychology"],
      interests: ["Mental Health Tech", "Accessibility", "Design Systems"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    matchScore: 79,
  },
]

export default function MatchPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  const handleTabChange = (value: string) => {
    if ((value === "requests" || value === "connections") && !isAuthenticated) {
      setShowAuthDialog(true)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Match</h1>
        <p className="text-muted-foreground mt-1">
          Discover people with similar interests and complementary skills.
        </p>
      </div>

      <Tabs defaultValue="discover" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="rounded-xl">
          <TabsTrigger value="discover" className="rounded-lg">Discover</TabsTrigger>
          <TabsTrigger value="requests" className="rounded-lg">Requests</TabsTrigger>
          <TabsTrigger value="connections" className="rounded-lg">Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockMatches.map((match) => (
              <MatchCard
                key={match.id}
                profile={match.profile}
                matchScore={match.matchScore}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          {isAuthenticated ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pending requests</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Sign in to view your requests</p>
              <Button className="mt-4 rounded-xl" onClick={() => setShowAuthDialog(true)}>Sign In</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="connections" className="mt-6">
          {isAuthenticated ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No connections yet. Start matching to build your network!</p>
              <Button className="mt-4 rounded-xl">Discover People</Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Sign in to view your connections</p>
              <Button className="mt-4 rounded-xl" onClick={() => setShowAuthDialog(true)}>Sign In</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AuthRequiredDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  )
}
