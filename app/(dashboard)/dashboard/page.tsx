import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Users, Bookmark, TrendingUp, ArrowRight, Calendar, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const stats = [
    {
      title: "Opportunities Saved",
      value: "12",
      description: "Ready to apply",
      icon: Bookmark,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Applications in Progress",
      value: "4",
      description: "Keep going!",
      icon: Clock,
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Projects Joined",
      value: "2",
      description: "Active collaborations",
      icon: Users,
      color: "bg-chart-3/10 text-chart-3",
    },
    {
      title: "Mentorship Matches",
      value: "3",
      description: "Skill-swap connections",
      icon: RefreshCw,
      color: "bg-chart-4/10 text-chart-4",
    },
  ]

  const recommendedOpportunities = [
    { id: "1", title: "Google STEP Internship", org: "Google", deadline: "Mar 15, 2026", matchScore: 95, tags: ["STEM", "Internship"] },
    { id: "2", title: "Tech Women Scholarship", org: "TechCrunch", deadline: "Apr 1, 2026", matchScore: 88, tags: ["Scholarship", "Women Only"] },
    { id: "3", title: "STEM Leadership Grant", org: "NSF", deadline: "Mar 30, 2026", matchScore: 82, tags: ["Grant", "Research"] },
  ]

  const recommendedCollaborators = [
    { id: "1", name: "Valentina Silva", location: "Sao Paulo, Brazil", skills: ["UI/UX Design", "Figma"], matchReason: "Both interested in EdTech" },
    { id: "2", name: "Sofia Herrera", location: "Lima, Peru", skills: ["Machine Learning", "Python"], matchReason: "Complementary skills" },
    { id: "3", name: "Lucia Fernandez", location: "Santiago, Chile", skills: ["Marketing", "Growth"], matchReason: "Looking for similar opportunities" },
  ]

  const skillSwapMatches = [
    { 
      id: "1", 
      userHas: "UX Design", 
      userNeeds: "Python", 
      matchName: "Carolina Gomez",
      matchLocation: "Medellin, Colombia",
      matchHas: "Python", 
      matchNeeds: "UX Design" 
    },
    { 
      id: "2", 
      userHas: "Marketing", 
      userNeeds: "Web Dev", 
      matchName: "Ana Perez",
      matchLocation: "Monterrey, Mexico",
      matchHas: "React", 
      matchNeeds: "SEO" 
    },
  ]

  const upcomingDeadlines = [
    { title: "Fulbright Application", deadline: "Oct 10, 2026", daysLeft: 216, progress: 65 },
    { title: "Google STEP", deadline: "Mar 15, 2026", daysLeft: 7, progress: 90 },
    { title: "NSF Grant", deadline: "Mar 30, 2026", daysLeft: 22, progress: 45 },
  ]

  const recentPosts = [
    { id: "1", title: "Looking for co-founder for EdTech startup", author: "Veronica Torres", location: "Bogota, Colombia", skills: ["React", "AI"] },
    { id: "2", title: "Motivation circle for Fulbright applications", author: "Camila Rodriguez", location: "Buenos Aires, Argentina", skills: ["Writing", "Research"] },
    { id: "3", title: "Skill-Swap: My UX Design for your Python", author: "Isabella Martinez", location: "Mexico City, Mexico", skills: ["Figma", "Design Systems"] },
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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 rounded-2xl">
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

      {/* Recommended Opportunities */}
      <Card className="border-border/50 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Recommended Opportunities
          </CardTitle>
          <CardDescription>Based on your profile and interests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendedOpportunities.map((opp) => (
              <div key={opp.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{opp.title}</p>
                    <Badge variant="secondary" className="text-xs rounded-full">{opp.matchScore}% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{opp.org}</p>
                  <div className="flex gap-1 mt-1">
                    {opp.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{opp.deadline}</p>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg" asChild>
                    <Link href={`/opportunities/${opp.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" asChild className="w-full mt-4 rounded-xl">
            <Link href="/opportunities">View all opportunities</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recommended Collaborators */}
        <Card className="border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recommended Collaborators
            </CardTitle>
            <CardDescription>People who match your interests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedCollaborators.map((person) => (
                <div key={person.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-sm font-semibold text-primary">
                      {person.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.location}</p>
                    <p className="text-xs text-primary mt-0.5">{person.matchReason}</p>
                  </div>
                  <Button size="sm" className="rounded-lg">Connect</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" asChild className="w-full mt-4 rounded-xl">
              <Link href="/match">Find more matches</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Skill-Swap Matches */}
        <Card className="border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-secondary" />
              Skill-Swap Matches
            </CardTitle>
            <CardDescription>1-on-1 reciprocal mentorship opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillSwapMatches.map((match) => (
                <div key={match.id} className="p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                      <span className="text-sm font-semibold text-secondary">
                        {match.matchName.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{match.matchName}</p>
                      <p className="text-xs text-muted-foreground">{match.matchLocation}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <p className="text-xs text-muted-foreground">They can teach</p>
                      <p className="font-medium text-primary">{match.matchHas}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <p className="text-xs text-muted-foreground">They want to learn</p>
                      <p className="font-medium text-secondary">{match.matchNeeds}</p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 rounded-lg">Start Exchange</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Application Deadlines */}
        <Card className="border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Application Deadlines
            </CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((item) => (
                <div key={item.title} className="py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <Badge variant={item.daysLeft <= 7 ? "destructive" : "secondary"} className="rounded-full">
                      {item.daysLeft} days left
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={item.progress} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground">{item.progress}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Due: {item.deadline}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" asChild className="w-full mt-4 rounded-xl">
              <Link href="/applications">Manage applications</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Collaboration Posts */}
        <Card className="border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Collaboration Posts</CardTitle>
            <CardDescription>Find people to work with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="py-2 border-b border-border/50 last:border-0">
                  <p className="font-medium text-foreground">{post.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground">by {post.author} • {post.location}</p>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {post.skills.map((skill) => (
                      <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" asChild className="w-full mt-4 rounded-xl">
              <Link href="/collaborate">Browse all posts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
