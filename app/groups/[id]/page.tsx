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
  Clock,
  Loader2,
  ArrowLeft
} from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import type { User } from "@supabase/supabase-js"
import type { Group, Profile } from "@/lib/types"
import { use } from "react"
import Link from "next/link"

// Fallback data structure
const fallbackProgressItems = [
  { id: "1", title: "Complete personal statement draft", completed: true, dueDate: "2024-02-01" },
  { id: "2", title: "Get 2 recommendation letters", completed: true, dueDate: "2024-02-15" },
  { id: "3", title: "Research host institutions", completed: false, dueDate: "2024-02-28" },
  { id: "4", title: "Submit application", completed: false, dueDate: "2024-03-15" },
]

const fallbackMessages = [
  { id: "1", userId: "1", userName: "Camila", text: "Just finished my first draft! Anyone want to swap for feedback?", time: "10:30 AM" },
  { id: "2", userId: "2", userName: "Sofia", text: "I would love to! I can review yours this weekend.", time: "10:45 AM" },
  { id: "3", userId: "3", userName: "Valentina", text: "Reminder: Our weekly check-in is tomorrow at 6pm!", time: "11:00 AM" },
]

const fallbackActivity = [
  { id: "1", user: "Camila Rodriguez", action: "completed", item: "Personal statement draft", time: "2 hours ago" },
  { id: "2", user: "Sofia Herrera", action: "joined", item: "the group", time: "1 day ago" },
  { id: "3", user: "Valentina Silva", action: "added", item: "new milestone: Research host institutions", time: "2 days ago" },
]

const fallbackMembers = [
  { id: "1", full_name: "Camila Rodriguez", location: "Buenos Aires, Argentina", role: "Admin" },
  { id: "2", full_name: "Sofia Herrera", location: "Lima, Peru", role: "Member" },
  { id: "3", full_name: "Valentina Silva", location: "Sao Paulo, Brazil", role: "Member" },
  { id: "4", full_name: "Isabella Martinez", location: "Mexico City, Mexico", role: "Member" },
  { id: "5", full_name: "Lucia Fernandez", location: "Santiago, Chile", role: "Member" },
]

const typeLabels: Record<string, { en: string; es: string }> = {
  "project": { en: "Project Squad", es: "Equipo de Proyecto" },
  "motivation": { en: "Motivation Circle", es: "Círculo de Motivación" },
  "skill-swap": { en: "Skill-Swap Pair", es: "Intercambio de Habilidades" },
}

export default function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { language } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [group, setGroup] = useState<Group | null>(null)
  const [members, setMembers] = useState<(Profile & { role?: string })[]>(fallbackMembers as never[])
  const [loading, setLoading] = useState(true)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [progressItems, setProgressItems] = useState(fallbackProgressItems)
  const [messages, setMessages] = useState(fallbackMessages)
  const [activityFeed, setActivityFeed] = useState(fallbackActivity)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  useEffect(() => {
    async function fetchGroupData() {
      setLoading(true)
      const supabase = createClient()
      
      // Fetch group
      const { data: groupData, error: groupError } = await supabase
        .from("Groups")
        .select("*")
        .eq("id", resolvedParams.id)
        .single()
      
      if (groupError) {
        console.error("[v0] Error fetching group:", groupError)
      } else if (groupData) {
        setGroup(groupData)
      }
      
      // Fetch group members
      const { data: memberData, error: memberError } = await supabase
        .from("Group Members")
        .select("user_id, role")
        .eq("group_id", resolvedParams.id)
      
      if (!memberError && memberData && memberData.length > 0) {
        const userIds = memberData.map(m => m.user_id).filter(Boolean)
        
        if (userIds.length > 0) {
          const { data: profiles } = await supabase
            .from("Users")
            .select("*")
            .in("id", userIds)
          
          if (profiles) {
            const membersWithRoles = profiles.map(p => ({
              ...p,
              role: memberData.find(m => m.user_id === p.id)?.role || "Member"
            }))
            setMembers(membersWithRoles)
          }
        }
      }
      
      setLoading(false)
    }
    
    fetchGroupData()
  }, [resolvedParams.id])

  const handleAuthRequired = (action: () => void) => {
    if (!user) {
      setShowAuthDialog(true)
      return
    }
    action()
  }

  const completedTasks = progressItems.filter(item => item.completed).length
  const totalTasks = progressItems.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  const handleSendMessage = () => {
    handleAuthRequired(() => {
      if (newMessage.trim()) {
        setNewMessage("")
      }
    })
  }

  const toggleProgressItem = (itemId: string) => {
    handleAuthRequired(() => {
      setProgressItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )
      )
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">
              {language === "es" ? "Grupo no encontrado" : "Group not found"}
            </h1>
            <Button asChild>
              <Link href="/groups">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === "es" ? "Volver a Grupos" : "Back to Groups"}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const groupType = group.type || "project"
  const typeLabel = typeLabels[groupType] 
    ? (language === "es" ? typeLabels[groupType].es : typeLabels[groupType].en)
    : group.type

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6 rounded-xl">
            <Link href="/groups">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === "es" ? "Volver" : "Back"}
            </Link>
          </Button>

          {/* Group Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <Badge className="mb-2 rounded-full">{typeLabel}</Badge>
                <h1 className="text-3xl font-bold text-foreground mb-2">{group.name}</h1>
                <p className="text-muted-foreground max-w-2xl">{group.description}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {members.length} {language === "es" ? "miembros" : "members"}
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
                    {progressItems.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer ${
                          item.completed ? "bg-primary/5 border-primary/20" : "bg-muted/50 border-border"
                        }`}
                        onClick={() => toggleProgressItem(item.id)}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className={`font-medium ${item.completed ? "text-primary line-through" : "text-foreground"}`}>
                            {item.title}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {language === "es" ? "Fecha límite:" : "Due:"} {item.dueDate}
                          </p>
                        </div>
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
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center gap-4 p-4 rounded-xl border border-border">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {(member.full_name || "U").split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{member.full_name || "Unknown"}</p>
                          <p className="text-sm text-muted-foreground">{member.background || member.location || ""}</p>
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
                      {messages.map((message) => (
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
                    {activityFeed.map((activity) => (
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
