import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Users, Bookmark, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const stats = [
    {
      title: "Opportunities Found",
      value: "24",
      description: "New this week",
      icon: Search,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Saved Items",
      value: "12",
      description: "Across all categories",
      icon: Bookmark,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Connections",
      value: "8",
      description: "Potential collaborators",
      icon: Users,
      color: "bg-chart-3/10 text-chart-3",
    },
    {
      title: "Application Rate",
      value: "67%",
      description: "Higher than average",
      icon: TrendingUp,
      color: "bg-chart-4/10 text-chart-4",
    },
  ]

  const quickActions = [
    {
      title: "Browse Opportunities",
      description: "Discover scholarships, grants, and more",
      href: "/opportunities",
      icon: Search,
    },
    {
      title: "Find Collaborators",
      description: "Connect with like-minded women",
      href: "/collaborate",
      icon: Users,
    },
    {
      title: "Complete Profile",
      description: "Improve your match rate",
      href: "/profile",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here is what is happening with your opportunities and connections.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => (
            <Card key={action.title} className="border-border/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild className="p-0 h-auto">
                  <Link href={action.href} className="flex items-center gap-2 text-primary hover:underline">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Opportunities</CardTitle>
            <CardDescription>Latest opportunities matching your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Google STEP Internship", org: "Google", deadline: "Mar 15, 2026" },
                { title: "Tech Women Scholarship", org: "TechCrunch", deadline: "Apr 1, 2026" },
                { title: "STEM Leadership Grant", org: "NSF", deadline: "Mar 30, 2026" },
              ].map((opp) => (
                <div key={opp.title} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{opp.title}</p>
                    <p className="text-sm text-muted-foreground">{opp.org}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{opp.deadline}</div>
                </div>
              ))}
            </div>
            <Button variant="outline" asChild className="w-full mt-4">
              <Link href="/opportunities">View all opportunities</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Collaboration Posts</CardTitle>
            <CardDescription>Find people to work with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Looking for co-founder for EdTech startup", author: "Sarah K.", skills: ["React", "AI"] },
                { title: "Need designer for hackathon project", author: "Maria L.", skills: ["UI/UX", "Figma"] },
                { title: "Research partner wanted for ML project", author: "Aisha M.", skills: ["Python", "ML"] },
              ].map((post) => (
                <div key={post.title} className="py-2 border-b border-border/50 last:border-0">
                  <p className="font-medium text-foreground">{post.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground">by {post.author}</p>
                    <div className="flex gap-1">
                      {post.skills.map((skill) => (
                        <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" asChild className="w-full mt-4">
              <Link href="/collaborate">Browse all posts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
