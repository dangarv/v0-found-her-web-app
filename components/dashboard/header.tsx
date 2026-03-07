"use client"

import { User } from "@supabase/supabase-js"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-sm px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <div className="flex-1" />
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
        <span className="sr-only">Notifications</span>
      </Button>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
          <span className="text-sm font-medium text-primary">
            {user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  )
}
