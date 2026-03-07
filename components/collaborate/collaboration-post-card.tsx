"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, MapPin } from "lucide-react"
import { CollaborationPost } from "@/lib/types"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"

interface CollaborationPostCardProps {
  post: CollaborationPost
}

const projectTypeColors: Record<string, string> = {
  Startup: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  Hackathon: "bg-accent/10 text-accent border-accent/20",
  Research: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Community: "bg-primary/10 text-primary border-primary/20",
  "Open Source": "bg-chart-4/10 text-chart-4 border-chart-4/20",
}

export function CollaborationPostCard({ post }: CollaborationPostCardProps) {
  const [isLiked, setIsLiked] = useState(post.is_liked)
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true })

  return (
    <Card className="border-border/50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <span className="text-sm font-semibold text-primary">
              {post.profile?.full_name?.split(" ").map((n) => n[0]).join("") || "?"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-foreground">
                {post.profile?.full_name || "Anonymous"}
              </span>
              {post.project_type && (
                <Badge variant="outline" className={projectTypeColors[post.project_type] || "bg-muted"}>
                  {post.project_type}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {post.profile?.location && (
                <>
                  <MapPin className="h-3 w-3" />
                  <span>{post.profile.location}</span>
                  <span>•</span>
                </>
              )}
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{post.description}</p>
        </div>

        {post.looking_for.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Looking for:</p>
            <div className="flex flex-wrap gap-1">
              {post.looking_for.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={isLiked ? "text-accent" : "text-muted-foreground"}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
              {likesCount}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments_count || 0}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm">Connect</Button>
        </div>
      </CardContent>
    </Card>
  )
}
