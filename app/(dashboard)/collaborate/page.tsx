import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { CollaborationPosts } from "@/components/collaborate/collaboration-posts"
import { CreatePostDialog } from "@/components/collaborate/create-post-dialog"
import { Spinner } from "@/components/ui/spinner"
import { Plus } from "lucide-react"

export default function CollaboratePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Collaborate</h1>
          <p className="text-muted-foreground mt-1">
            Find collaborators and share your project ideas with the community.
          </p>
        </div>
        <CreatePostDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </CreatePostDialog>
      </div>

      <Suspense fallback={<div className="flex justify-center py-12"><Spinner className="h-8 w-8" /></div>}>
        <CollaborationPosts />
      </Suspense>
    </div>
  )
}
