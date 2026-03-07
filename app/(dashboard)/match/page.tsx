import { MatchCard } from "@/components/match/match-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

const pendingRequests = [
  {
    id: "p1",
    profile: {
      id: "user5",
      email: "anna@example.com",
      full_name: "Anna Kowalski",
      avatar_url: null,
      bio: "Data scientist exploring opportunities in climate tech.",
      location: "Berlin, Germany",
      skills: ["Python", "Data Science", "Machine Learning"],
      interests: ["Climate Tech", "Sustainability"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    message: "Hi! I loved your post about the EdTech project. Would love to connect and discuss potential collaboration!",
  },
]

export default function MatchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Match</h1>
        <p className="text-muted-foreground mt-1">
          Discover people with similar interests and complementary skills.
        </p>
      </div>

      <Tabs defaultValue="discover" className="w-full">
        <TabsList>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="requests">
            Requests
            {pendingRequests.length > 0 && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
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
          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-sm font-semibold text-primary">
                      {request.profile.full_name?.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{request.profile.full_name}</p>
                    <p className="text-sm text-muted-foreground">{request.profile.location}</p>
                    <p className="text-sm text-foreground mt-2">{request.message}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pending requests</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="connections" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No connections yet. Start matching to build your network!</p>
            <Button className="mt-4">Discover People</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
