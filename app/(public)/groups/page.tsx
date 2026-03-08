"use client"

import { GroupCard } from "@/components/groups/group-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthRequiredDialog } from "@/components/auth-required-dialog"

// Mock data
const mockGroups = [
  {
    id: "1",
    name: "Women in AI",
    description: "A community for women working in artificial intelligence, machine learning, and data science.",
    image_url: null,
    is_private: false,
    created_by: "user1",
    created_at: new Date().toISOString(),
    member_count: 1250,
    is_member: false,
  },
  {
    id: "2",
    name: "Startup Founders Circle",
    description: "Connect with fellow women founders, share experiences, and get advice on building your startup.",
    image_url: null,
    is_private: false,
    created_by: "user2",
    created_at: new Date().toISOString(),
    member_count: 890,
    is_member: false,
  },
  {
    id: "3",
    name: "Tech Interview Prep",
    description: "Practice coding interviews, system design, and behavioral questions together.",
    image_url: null,
    is_private: false,
    created_by: "user3",
    created_at: new Date().toISOString(),
    member_count: 2100,
    is_member: false,
  },
  {
    id: "4",
    name: "Women in Fintech",
    description: "Discussing the latest trends in financial technology and opportunities in the fintech space.",
    image_url: null,
    is_private: false,
    created_by: "user4",
    created_at: new Date().toISOString(),
    member_count: 560,
    is_member: false,
  },
  {
    id: "5",
    name: "Design & UX Community",
    description: "A space for designers to share work, get feedback, and discuss the latest design trends.",
    image_url: null,
    is_private: false,
    created_by: "user5",
    created_at: new Date().toISOString(),
    member_count: 1800,
    is_member: false,
  },
  {
    id: "6",
    name: "Climate Tech Pioneers",
    description: "Working on climate solutions? Join us to collaborate on sustainability projects.",
    image_url: null,
    is_private: true,
    created_by: "user6",
    created_at: new Date().toISOString(),
    member_count: 340,
    is_member: false,
  },
]

export default function GroupsPage() {
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

  const handleCreateGroup = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true)
      return
    }
    // Open create group dialog
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Groups</h1>
          <p className="text-muted-foreground mt-1">
            Join communities based on your interests and connect with like-minded women.
          </p>
        </div>
        <Button className="rounded-xl" onClick={handleCreateGroup}>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search groups..." className="pl-9 rounded-xl" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Discover Groups</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>

      <AuthRequiredDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  )
}
