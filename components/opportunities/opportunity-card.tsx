"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, ExternalLink, MapPin, Calendar, DollarSign } from "lucide-react"
import { Opportunity } from "@/lib/types"
import { useState } from "react"

interface OpportunityCardProps {
  opportunity: Opportunity
}

const categoryColors: Record<string, string> = {
  scholarship: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  internship: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  grant: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  fellowship: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  competition: "bg-accent/10 text-accent border-accent/20",
  program: "bg-primary/10 text-primary border-primary/20",
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [isSaved, setIsSaved] = useState(false)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No deadline"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatAmount = (amount: number | null) => {
    if (!amount) return null
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="border-border/50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={categoryColors[opportunity.category]}>
                {opportunity.category}
              </Badge>
              {opportunity.is_remote && (
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">Remote</Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg text-foreground leading-tight">
              {opportunity.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{opportunity.organization}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className={isSaved ? "text-primary" : "text-muted-foreground"}
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            <span className="sr-only">{isSaved ? "Unsave" : "Save"} opportunity</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {opportunity.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          {(opportunity.location || opportunity.is_remote) && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{opportunity.is_remote ? "Remote" : opportunity.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(opportunity.deadline)}</span>
          </div>
          {opportunity.amount && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{formatAmount(opportunity.amount)}</span>
            </div>
          )}
        </div>

        {opportunity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {opportunity.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <Button asChild className="flex-1">
            <a href={opportunity.url} target="_blank" rel="noopener noreferrer">
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </CardContent>
    </Card>
  )
}
