"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Rocket, Heart, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import { useLanguage } from "@/lib/language-context"

interface GroupCardProps {
  group: {
    id: string
    name: string
    description: string
    memberCount: number
    type: string
    category: string
    image?: string
    isJoined?: boolean
  }
}

const typeIcons: Record<string, typeof Rocket> = {
  "Project Squad": Rocket,
  "Motivation Circle": Heart,
  "Skill-Swap Pair": RefreshCw,
}

const typeColors: Record<string, string> = {
  "Project Squad": "bg-primary/10 text-primary border-primary/20",
  "Motivation Circle": "bg-secondary/10 text-secondary border-secondary/20",
  "Skill-Swap Pair": "bg-chart-3/10 text-chart-3 border-chart-3/20",
}

export function GroupCard({ group }: GroupCardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  const handleJoin = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true)
      return
    }
    // Join group logic
  }

  const TypeIcon = typeIcons[group.type] || Users

  return (
    <>
      <Card className="border-border/50 hover:shadow-md transition-shadow overflow-hidden group">
        <div 
          className="h-32 bg-gradient-to-r from-primary/30 to-secondary/30 relative"
          style={group.image ? { 
            backgroundImage: `url(${group.image})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          } : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
        <CardContent className="relative pt-0 -mt-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card border-2 border-card shadow-lg">
            <TypeIcon className="h-7 w-7 text-primary" />
          </div>

          <div className="mt-3">
            <Badge variant="outline" className={`mb-2 rounded-full text-xs ${typeColors[group.type] || ''}`}>
              {group.type}
            </Badge>
            <h3 className="font-semibold text-foreground text-lg">{group.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {group.description}
            </p>
            <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1">
              <Users className="h-4 w-4" />
              {group.memberCount} {language === "es" ? "miembros" : "members"}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <Button asChild variant="outline" className="flex-1 rounded-xl">
              <Link href={`/groups/${group.id}`}>
                {language === "es" ? "Ver Grupo" : "View Group"}
              </Link>
            </Button>
            <Button className="flex-1 rounded-xl" onClick={handleJoin}>
              {language === "es" ? "Unirse" : "Join"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AuthRequiredDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        action={language === "es" ? "unirse a este grupo" : "join this group"}
      />
    </>
  )
}
