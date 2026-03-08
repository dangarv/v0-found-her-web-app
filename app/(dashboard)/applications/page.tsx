import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ExternalLink, FileText, CheckCircle2, XCircle, Clock, Send, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data with progress tracking
const applications = [
  {
    id: "1",
    opportunity: {
      id: "1",
      title: "Google STEP Internship",
      organization: "Google",
      category: "internship",
      url: "https://careers.google.com",
      deadline: "Mar 15, 2026",
    },
    status: "submitted",
    applied_at: "2026-02-15",
    notes: "Submitted resume and cover letter. Waiting for response.",
    checklist: [
      { id: "1", title: "Resume ready", completed: true },
      { id: "2", title: "Cover letter drafted", completed: true },
      { id: "3", title: "Application submitted", completed: true },
      { id: "4", title: "Follow-up sent", completed: false },
    ],
  },
  {
    id: "2",
    opportunity: {
      id: "2",
      title: "TechWomen Scholarship",
      organization: "TechWomen Foundation",
      category: "scholarship",
      url: "https://example.com",
      deadline: "Apr 1, 2026",
    },
    status: "applying",
    applied_at: null,
    notes: "Need to complete essay section.",
    checklist: [
      { id: "1", title: "Resume ready", completed: true },
      { id: "2", title: "Personal statement drafted", completed: true },
      { id: "3", title: "Recommendation letters requested", completed: false },
      { id: "4", title: "Transcripts ordered", completed: false },
      { id: "5", title: "Application submitted", completed: false },
    ],
  },
  {
    id: "3",
    opportunity: {
      id: "3",
      title: "Women in AI Fellowship",
      organization: "AI for Good",
      category: "fellowship",
      url: "https://example.com",
      deadline: "Jan 15, 2026",
    },
    status: "accepted",
    applied_at: "2026-01-20",
    notes: "Accepted! Starting in March.",
    checklist: [
      { id: "1", title: "Resume ready", completed: true },
      { id: "2", title: "Research proposal written", completed: true },
      { id: "3", title: "References provided", completed: true },
      { id: "4", title: "Application submitted", completed: true },
    ],
  },
  {
    id: "4",
    opportunity: {
      id: "4",
      title: "Tech Innovation Grant",
      organization: "NSF",
      category: "grant",
      url: "https://example.com",
      deadline: "Jan 5, 2026",
    },
    status: "rejected",
    applied_at: "2026-01-10",
    notes: "Did not advance. Try again next cycle.",
    checklist: [
      { id: "1", title: "Project proposal", completed: true },
      { id: "2", title: "Budget plan", completed: true },
      { id: "3", title: "Application submitted", completed: true },
    ],
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  interested: { label: "Interested", color: "bg-muted text-muted-foreground", icon: Clock },
  applying: { label: "In Progress", color: "bg-chart-4/10 text-chart-4", icon: FileText },
  submitted: { label: "Submitted", color: "bg-secondary/10 text-secondary", icon: Send },
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

  const getProgress = (checklist: { completed: boolean }[]) => {
    const completed = checklist.filter((item) => item.completed).length
    return Math.round((completed / checklist.length) * 100)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Application Manager</h1>
        <p className="text-muted-foreground mt-1">
          Track the progress of your applications and stay organized.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {allStatuses.map((status) => {
          const config = statusConfig[status]
          const count = getApplicationsByStatus(status).length
          return (
            <Card key={status} className="border-border/50 rounded-2xl">
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
        <TabsList className="rounded-xl">
          <TabsTrigger value="all" className="rounded-lg">All ({applications.length})</TabsTrigger>
          <TabsTrigger value="applying" className="rounded-lg">In Progress ({getApplicationsByStatus("applying").length})</TabsTrigger>
          <TabsTrigger value="submitted" className="rounded-lg">Submitted ({getApplicationsByStatus("submitted").length})</TabsTrigger>
          <TabsTrigger value="accepted" className="rounded-lg">Accepted ({getApplicationsByStatus("accepted").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {applications.map((app) => {
              const config = statusConfig[app.status]
              const progress = getProgress(app.checklist)
              const completedItems = app.checklist.filter(item => item.completed).length
              return (
                <Card key={app.id} className="border-border/50 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className={`rounded-full ${config.color}`}>
                            <config.icon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Badge>
                          <Badge variant="outline" className="rounded-full">
                            {app.opportunity.category}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg text-foreground">
                          {app.opportunity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {app.opportunity.organization}
                        </p>
                        
                        {/* Progress Section */}
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{completedItems}/{app.checklist.length} completed</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        {/* Checklist Preview */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {app.checklist.map((item) => (
                            <span 
                              key={item.id} 
                              className={`text-xs px-2 py-1 rounded-full ${
                                item.completed 
                                  ? "bg-primary/10 text-primary" 
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {item.completed ? "✓" : "○"} {item.title}
                            </span>
                          ))}
                        </div>

                        {app.notes && (
                          <p className="text-sm text-muted-foreground mt-3 italic border-l-2 border-primary/30 pl-3">
                            {app.notes}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Deadline: {app.opportunity.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            <Send className="h-4 w-4" />
                            Applied: {formatDate(app.applied_at)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button size="lg" className="rounded-xl" asChild>
                          <Link href={`/opportunities/${app.opportunity.id}`}>
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-lg" asChild>
                          <a
                            href={app.opportunity.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Original
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
                  const progress = getProgress(app.checklist)
                  const completedItems = app.checklist.filter(item => item.completed).length
                  return (
                    <Card key={app.id} className="border-border/50 rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className={`rounded-full ${config.color}`}>
                                <config.icon className="h-3 w-3 mr-1" />
                                {config.label}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-lg text-foreground">
                              {app.opportunity.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {app.opportunity.organization}
                            </p>
                            
                            {/* Progress Section */}
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{completedItems}/{app.checklist.length} completed</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>

                            {app.notes && (
                              <p className="text-sm text-muted-foreground mt-3 italic">
                                {app.notes}
                              </p>
                            )}
                          </div>
                          <Button size="lg" className="rounded-xl" asChild>
                            <Link href={`/opportunities/${app.opportunity.id}`}>
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
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
