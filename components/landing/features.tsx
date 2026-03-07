import { Search, Users, MessageCircle, Bookmark, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Search,
    title: "Discover Opportunities",
    description: "Browse scholarships, internships, grants, and fellowships tailored for young women across the globe.",
  },
  {
    icon: Users,
    title: "Find Collaborators",
    description: "Connect with like-minded women to build projects, start ventures, or find mentorship.",
  },
  {
    icon: MessageCircle,
    title: "Join Communities",
    description: "Engage with groups based on your interests, industry, or location to expand your network.",
  },
  {
    icon: Bookmark,
    title: "Track Applications",
    description: "Save opportunities and manage your application progress all in one place.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Access resources and guidance to help you navigate your professional journey.",
  },
  {
    icon: Shield,
    title: "Safe Space",
    description: "A verified community built by women, for women, ensuring a supportive environment.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Everything you need to thrive
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            FoundHer provides all the tools and resources to help you discover opportunities 
            and build meaningful connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
