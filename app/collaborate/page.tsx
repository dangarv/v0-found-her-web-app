"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { CollaborationPosts } from "@/components/collaborate/collaboration-posts"
import { CreatePostDialog } from "@/components/collaborate/create-post-dialog"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"
import type { User } from "@supabase/supabase-js"

export default function CollaboratePage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const handleCreatePost = () => {
    if (!user) {
      setShowAuthDialog(true)
    } else {
      setShowCreateDialog(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{t('collaborate')}</h1>
              <p className="text-muted-foreground text-lg">
                {t('collaborateSubtitle')}
              </p>
            </div>
            <Button onClick={handleCreatePost} className="rounded-xl gap-2">
              <Plus className="h-4 w-4" />
              {t('createPost')}
            </Button>
          </div>
          
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPosts')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
          </div>

          <CollaborationPosts searchQuery={searchQuery} />
        </div>
      </main>
      <Footer />

      <CreatePostDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
      <AuthRequiredDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        action={t('createCollaborationPost')}
      />
    </div>
  )
}
