"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import { 
  Users, 
  MessageCircle, 
  Activity, 
  Target, 
  Send,
  CheckCircle2,
  Circle,
  Clock
} from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import type { User } from "@supabase/supabase-js"
import { use } from "react"

// Mock group data
const mockGroup = {
  id: "1",
  name: "Fulbright Application Squad",
  description: "A motivation circle for women applying to Fulbright scholarships. We meet weekly to review essays, practice interviews, and keep each other accountable.",
  type: "Motivation Circle",
  memberCount: 12,
  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
  createdAt: "2024-01-15",
  members: [
    { id: "1", name: "Camila Rodriguez", location: "Buenos Aires, Argentina", role: "Admin" },
    { id: "2", name: "Sofia Herrera", location: "Lima, Peru", role: "Member" },
    { id: "3", name: "Valentina Silva", location: "Sao Paulo, Brazil", role: "Member" },
    { id: "4", name: "Isabella Martinez", location: "Mexico City, Mexico", role: "Member" },
    { id: "5", name: "Lucia Fernandez", location: "Santiago, Chile", role: "Member" },
  ],
  progressItems: [
    { id: "1", title: "Complete personal statement draft", completed: true, dueDate: "2024-02-01" },
    { id: "2", title: "Get 2 recommendation letters", completed: true, dueDate: "2024-02-15" },
    { id: "3", title: "Research host institutions", completed: false, dueDate: "2024-02-28" },
    { id: "4", title: "Submit application", completed: false, dueDate: "2024-03-15" },
  ],
  messages: [
    { id: "1", userId: "1", userName: "Camila", text: "Just finished my first draft! Anyone want to swap for feedback?", time: "10:30 AM" },
    { id: "2", userId: "2", userName: "Sofia", text: "I would love to! I can review yours this weekend.", time: "10:45 AM" },
    { id: "3", userId: "3", userName: "Valentina", text: "Reminder: Our weekly check-in is tomorrow at 6pm!", time: "11:00 AM" },
  ],
  activityFeed: [
    { id: "1", user: "Camila Rodriguez", action: "completed", item: "Personal statement draft", time: "2 hours ago" },
    { id: "2", user: "Sofia Herrera", action: "joined", item: "the group", time: "1 day ago" },
    { id: "3", user: "Valentina Silva", action: "added", item: "new milestone: Research host institutions", time: "2 days ago" },
  ],
}

export default function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { language } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const handleAuthRequired = (action: () => void) => {
    if (!user) {
      setShowAuthDialog(true)
      return
    }
    action()
  }

  const completedTasks = mockGroup.progressItems.filter(item => item.completed).length
  const totalTasks = mockGroup.progressItems.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  const handleSendMessage = () => {
    handleAuthRequired(() => {
      if (newMessage.trim()) {
        // In production, send to Supabase
        setNewMessage("")
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Group Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <Badge className="mb-2 rounded-full">{mockGroup.type}</Badge>
                <h1 className="text-3xl font-bold text-foreground mb-2">{mockGroup.name}</h1>
                <p className="text-muted-foreground max-w-2xl">{mockGroup.description}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {mockGroup.memberCount} {language === "es" ? "miembros" : "members"}
                  </span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="rounded-xl"
                onClick={() => handleAuthRequired(() => {})}
              >
                {language === "es" ? "Unirse al Grupo" : "Join Group"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="progress" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-lg rounded-xl">
              <TabsTrigger value="progress" className="rounded-lg">
                <Target className="h-4 w-4 mr-2" />
                {language === "es" ? "Progreso" : "Progress"}
              </TabsTrigger>
              <TabsTrigger value="members" className="rounded-lg">
                <Users className="h-4 w-4 mr-2" />
                {language === "es" ? "Miembros" : "Members"}
              </TabsTrigger>
              <TabsTrigger value="chat" className="rounded-lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-lg">
                <Activity className="h-4 w-4 mr-2" />
                {language === "es" ? "Actividad" : "Activity"}
              </TabsTrigger>
            </TabsList>

            {/* Progress Tab */}
            <TabsContent value="progress">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{language === "es" ? "Progreso del Grupo" : "Group Progress"}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {completedTasks}/{totalTasks} {language === "es" ? "completados" : "completed"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-3 rounded-full" />
                    <p className="text-sm text-muted-foreground text-center">
                      {Math.round(progressPercentage)}% {language === "es" ? "completado" : "complete"}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {mockGroup.progressItems.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center gap-4 p-4 rounded-xl border ${
                          item.completed ? "bg-primary/5 border-primary/20" : "bg-muted/50 border-border"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className={`font-medium ${item.completed ? "text-primary" : "text-foreground"}`}>
                            {item.title}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {language === "es" ? "Fecha límite:" : "Due:"} {item.dueDate}
                          </p>
                        </div>
                        {!item.completed && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="rounded-lg"
                            onClick={() => handleAuthRequired(() => {})}
                          >
                            {language === "es" ? "Marcar" : "Mark Done"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{language === "es" ? "Miembros del Grupo" : "Group Members"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {mockGroup.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-4 p-4 rounded-xl border border-border">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.location}</p>
                        </div>
                        {member.role === "Admin" && (
                          <Badge variant="secondary" className="rounded-full">Admin</Badge>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-lg"
                          onClick={() => handleAuthRequired(() => {})}
                        >
                          {language === "es" ? "Mensaje" : "Message"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{language === "es" ? "Chat del Grupo" : "Group Chat"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80 mb-4 p-4 border border-border rounded-xl">
                    <div className="space-y-4">
                      {mockGroup.messages.map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-secondary/20 text-secondary text-xs">
                              {message.userName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{message.userName}</span>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className="text-sm text-foreground mt-1">{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      placeholder={language === "es" ? "Escribe un mensaje..." : "Type a message..."}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="rounded-xl"
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button size="icon" className="rounded-xl shrink-0" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{language === "es" ? "Actividad Reciente" : "Recent Activity"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockGroup.activityFeed.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium text-foreground">{activity.user}</span>{" "}
                            <span className="text-muted-foreground">{activity.action}</span>{" "}
                            <span className="font-medium text-foreground">{activity.item}</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      <AuthRequiredDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        action={language === "es" ? "interactuar con este grupo" : "interact with this group"}
      />
    </div>
  )
}
