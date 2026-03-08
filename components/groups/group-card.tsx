"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Lock } from "lucide-react"
import { Group } from "@/lib/types"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"

interface GroupCardProps {
  group: Group
}

export function GroupCard({ group }: GroupCardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)

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

  const formatMemberCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <>
      <Card className="border-border/50 hover:shadow-md transition-shadow overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-primary/30 to-secondary/30" />
        <CardContent className="relative pt-0 -mt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card border-2 border-card shadow-md">
            <Users className="h-6 w-6 text-primary" />
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{group.name}</h3>
              {group.is_private && (
                <Badge variant="secondary" className="text-xs">
                  <Lock className="h-3 w-3 mr-1" />
                  Private
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {group.description}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {formatMemberCount(group.member_count || 0)} members
            </p>
          </div>

          <div className="mt-4">
            {group.is_member ? (
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link href={`/groups/${group.id}`}>View Group</Link>
              </Button>
            ) : (
              <Button className="w-full rounded-xl" onClick={handleJoin}>
                {group.is_private ? "Request to Join" : "Join Group"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AuthRequiredDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  )
}
