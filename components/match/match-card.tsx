"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, X, MessageCircle, Sparkles } from "lucide-react"
import { Profile } from "@/lib/types"

interface MatchCardProps {
  profile: Profile
  matchScore?: number
}

export function MatchCard({ profile, matchScore }: MatchCardProps) {
  return (
    <Card className="border-border/50 hover:shadow-md transition-shadow overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20" />
      <CardContent className="relative pt-0 -mt-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card border-4 border-card shadow-lg">
            <span className="text-2xl font-bold text-primary">
              {profile.full_name?.split(" ").map((n) => n[0]).join("") || "?"}
            </span>
          </div>

          {matchScore && (
            <div className="absolute top-2 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
              <Sparkles className="h-3 w-3" />
              {matchScore}% match
            </div>
          )}

          <h3 className="font-semibold text-foreground mt-3">
            {profile.full_name || "Anonymous"}
          </h3>

          {profile.location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{profile.location}</span>
            </div>
          )}

          {profile.bio && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
              {profile.bio}
            </p>
          )}

          {profile.skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 mt-3">
              {profile.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                >
                  {skill}
                </span>
              ))}
              {profile.skills.length > 4 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  +{profile.skills.length - 4}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 mt-4 w-full">
            <Button variant="outline" size="icon" className="rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Skip</span>
            </Button>
            <Button className="flex-1">Connect</Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Message</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
