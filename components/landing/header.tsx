"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FoundHer</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Stories
            </Link>
            <Link href="/opportunities" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Opportunities
            </Link>
            <Link href="/collaborate" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Collaborate
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-3">
            <Link href="#features" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#testimonials" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              Stories
            </Link>
            <Link href="/opportunities" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              Opportunities
            </Link>
            <Link href="/collaborate" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              Collaborate
            </Link>
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="ghost" asChild className="w-full">
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
