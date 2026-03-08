"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, ExternalLink, MapPin, Calendar, GraduationCap, Globe } from "lucide-react"
import { Opportunity } from "@/lib/types"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

interface OpportunityCardProps {
  opportunity: Opportunity
}

const typeColors: Record<string, string> = {
  scholarship: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  internship: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  grant: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  fellowship: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  competition: "bg-secondary/10 text-secondary border-secondary/20",
  program: "bg-primary/10 text-primary border-primary/20",
  research: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  bootcamp: "bg-primary/10 text-primary border-primary/20",
  conference: "bg-chart-3/10 text-chart-3 border-chart-3/20",
}

const levelColors: Record<string, string> = {
  high_school: "bg-pink-100 text-pink-700 border-pink-200",
  undergraduate: "bg-purple-100 text-purple-700 border-purple-200",
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  const handleSave = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true)
      return
    }
    setIsSaved(!isSaved)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('noDeadline')
    // Handle various date formats - use UTC to avoid hydration mismatch
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
  }

  const isRemote = opportunity.modality?.toLowerCase().includes("remote") || 
                   opportunity.modality?.toLowerCase().includes("virtual") ||
                   opportunity.modality?.toLowerCase().includes("online")

  const opportunityType = opportunity.type?.toLowerCase() || "program"
  const typeColor = typeColors[opportunityType] || typeColors.program

  return (
    <>
      <Card className="border-border/50 hover:shadow-md transition-shadow rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {opportunity.type && (
                  <Badge variant="outline" className={typeColor}>
                    {opportunity.type}
                  </Badge>
                )}
                {opportunity.level && (
                  <Badge variant="outline" className={levelColors[opportunity.level] || levelColors.undergraduate}>
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {opportunity.level === "high_school" ? "High School" : "Undergraduate"}
                  </Badge>
                )}
                {isRemote && (
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    <Globe className="h-3 w-3 mr-1" />
                    {t('remote')}
                  </Badge>
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
              onClick={handleSave}
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
            {opportunity.scope && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{opportunity.scope}</span>
              </div>
            )}
            {opportunity.deadline && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(opportunity.deadline)}</span>
              </div>
            )}
            {opportunity.field && (
              <Badge variant="outline" className="text-xs">
                {opportunity.field}
              </Badge>
            )}
          </div>

          {opportunity.eligibility && (
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Eligibility:</span> {opportunity.eligibility}
            </p>
          )}

          {opportunity.financial_aid && (
            <p className="text-xs text-primary font-medium">
              {opportunity.financial_aid}
            </p>
          )}

          <div className="flex items-center gap-2 pt-2">
            <Button asChild className="flex-1 rounded-xl" size="lg">
              <Link href={`/opportunities/${opportunity.id}?level=${opportunity.level}`}>
                {t('learnMore')}
              </Link>
            </Button>
            {opportunity.link && (
              <Button variant="outline" className="rounded-xl" size="lg" asChild>
                <a href={opportunity.link} target="_blank" rel="noopener noreferrer">
                  {t('apply')}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AuthRequiredDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  )
}
