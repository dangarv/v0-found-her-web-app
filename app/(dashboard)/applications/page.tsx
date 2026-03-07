import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ExternalLink, FileText, CheckCircle2, XCircle, Clock, Send } from "lucide-react"
import Link from "next/link"

// Mock data
const applications = [
  {
    id: "1",
    opportunity: {
      title: "Google STEP Internship",
      organization: "Google",
      category: "internship",
      url: "https://careers.google.com",
    },
    status: "submitted",
    applied_at: "2026-02-15",
    notes: "Submitted resume and cover letter. Waiting for response.",
  },
  {
    id: "2",
    opportunity: {
      title: "TechWomen Scholarship",
      organization: "TechWomen Foundation",
      category: "scholarship",
      url: "https://example.com",
    },
    status: "applying",
    applied_at: null,
    notes: "Need to complete essay section.",
  },
  {
    id: "3",
    opportunity: {
      title: "Women in AI Fellowship",
      organization: "AI for Good",
      category: "fellowship",
      url: "https://example.com",
    },
    status: "accepted",
    applied_at: "2026-01-20",
    notes: "Accepted! Starting in March.",
  },
  {
    id: "4",
    opportunity: {
      title: "Tech Innovation Grant",
      organization: "NSF",
      category: "grant",
      url: "https://example.com",
    },
    status: "rejected",
    applied_at: "2026-01-10",
    notes: "Did not advance. Try again next cycle.",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  interested: { label: "Interested", color: "bg-muted text-muted-foreground", icon: Clock },
  applying: { label: "In Progress", color: "bg-chart-4/10 text-chart-4", icon: FileText },
  submitted: { label: "Submitted", color: "bg-chart-2/10 text-chart-2", icon: Send },
  accepted: { label: "Accepted", color: "bg-chart-3/10 text-chart-3", icon: CheckCircle2 },
  rejected: { label: "Not Selected", color: "bg-destructive/10 text-destructive", icon: XCircle },
}

export default function ApplicationsPage() {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not yet"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getApplicationsByStatus = (status: string) =>
    applications.filter((app) => app.status === status)

  const allStatuses = ["applying", "submitted", "accepted", "rejected"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground mt-1">
          Track the progress of your applications.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {allStatuses.map((status) => {
          const config = statusConfig[status]
          const count = getApplicationsByStatus(status).length
          return (
            <Card key={status} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color}`}>
                    <config.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{count}</p>
                    <p className="text-sm text-muted-foreground">{config.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
          <TabsTrigger value="applying">In Progress ({getApplicationsByStatus("applying").length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({getApplicationsByStatus("submitted").length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({getApplicationsByStatus("accepted").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {applications.map((app) => {
              const config = statusConfig[app.status]
              return (
                <Card key={app.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className={config.color}>
                            <config.icon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground">
                          {app.opportunity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {app.opportunity.organization}
                        </p>
                        {app.notes && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            {app.notes}
                          </p>
                        )}
                        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Applied: {formatDate(app.applied_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={app.opportunity.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {["applying", "submitted", "accepted"].map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            <div className="space-y-4">
              {getApplicationsByStatus(status).length > 0 ? (
                getApplicationsByStatus(status).map((app) => {
                  const config = statusConfig[app.status]
                  return (
                    <Card key={app.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className={config.color}>
                                <config.icon className="h-3 w-3 mr-1" />
                                {config.label}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-foreground">
                              {app.opportunity.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {app.opportunity.organization}
                            </p>
                            {app.notes && (
                              <p className="text-sm text-muted-foreground mt-2 italic">
                                {app.notes}
                              </p>
                            )}
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={app.opportunity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No applications in this category</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
