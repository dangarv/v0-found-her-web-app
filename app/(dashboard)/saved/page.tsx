import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, ExternalLink, Calendar, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data
const savedOpportunities = [
  {
    id: "1",
    opportunity: {
      id: "opp1",
      title: "Google STEP Internship",
      organization: "Google",
      category: "internship",
      deadline: "2026-03-15",
      url: "https://careers.google.com",
    },
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    opportunity: {
      id: "opp2",
      title: "TechWomen Scholarship",
      organization: "TechWomen Foundation",
      category: "scholarship",
      deadline: "2026-04-01",
      url: "https://example.com",
    },
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    opportunity: {
      id: "opp3",
      title: "Women in AI Research Grant",
      organization: "AI for Good Foundation",
      category: "grant",
      deadline: "2026-05-15",
      url: "https://example.com",
    },
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const categoryColors: Record<string, string> = {
  scholarship: "bg-chart-1/10 text-chart-1",
  internship: "bg-chart-2/10 text-chart-2",
  grant: "bg-chart-3/10 text-chart-3",
  fellowship: "bg-chart-4/10 text-chart-4",
  competition: "bg-accent/10 text-accent",
  program: "bg-primary/10 text-primary",
}

export default function SavedPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Saved Opportunities</h1>
        <p className="text-muted-foreground mt-1">
          Keep track of opportunities you are interested in.
        </p>
      </div>

      {savedOpportunities.length > 0 ? (
        <div className="space-y-4">
          {savedOpportunities.map((saved) => (
            <Card key={saved.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="secondary"
                        className={categoryColors[saved.opportunity.category]}
                      >
                        {saved.opportunity.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {saved.opportunity.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {saved.opportunity.organization}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {formatDate(saved.opportunity.deadline)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" asChild>
                      <a
                        href={saved.opportunity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No saved opportunities</h3>
            <p className="mt-2 text-muted-foreground">
              Start browsing and save opportunities you are interested in.
            </p>
            <Button asChild className="mt-4">
              <Link href="/opportunities">Browse Opportunities</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
