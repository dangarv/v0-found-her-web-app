"use client"

import { Suspense, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CollaborationPosts } from "@/components/collaborate/collaboration-posts"
import { CreatePostDialog } from "@/components/collaborate/create-post-dialog"
import { Spinner } from "@/components/ui/spinner"
import { Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import { useLanguage } from "@/lib/language-context"

export default function CollaboratePage() {
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

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true)
      return
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t.collaborate}</h1>
          <p className="text-muted-foreground mt-1">
            Find collaborators and share your project ideas with the community.
          </p>
        </div>
        {isAuthenticated ? (
          <CreatePostDialog>
            <Button className="rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </CreatePostDialog>
        ) : (
          <Button className="rounded-xl" onClick={handleCreatePost}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        )}
      </div>

      <Suspense fallback={<div className="flex justify-center py-12"><Spinner className="h-8 w-8" /></div>}>
        <CollaborationPosts />
      </Suspense>

      <AuthRequiredDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  )
}
