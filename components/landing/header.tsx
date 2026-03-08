"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-6xl">
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg shadow-foreground/5">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/foundher-logo.png" 
                  alt="FoundHer" 
                  width={36} 
                  height={36} 
                  className="rounded-lg"
                />
                <span className="text-lg font-bold text-foreground">FoundHer</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t('features')}
                </Link>
                <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t('stories')}
                </Link>
                <Link href="/opportunities" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t('opportunities')}
                </Link>
                <Link href="/collaborate" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t('collaborate')}
                </Link>
              </nav>

              <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span className="uppercase text-xs font-medium">{language}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem 
                      onClick={() => setLanguage("en")}
                      className={language === "en" ? "bg-primary/10 text-primary" : ""}
                    >
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setLanguage("es")}
                      className={language === "es" ? "bg-primary/10 text-primary" : ""}
                    >
                      Español
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/login">{t('login')}</Link>
                </Button>
                <Button size="sm" asChild className="rounded-xl">
                  <Link href="/auth/sign-up">{t('getStarted')}</Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem 
                      onClick={() => setLanguage("en")}
                      className={language === "en" ? "bg-primary/10 text-primary" : ""}
                    >
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setLanguage("es")}
                      className={language === "es" ? "bg-primary/10 text-primary" : ""}
                    >
                      Español
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  className="p-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5 text-foreground" />
                  ) : (
                    <Menu className="h-5 w-5 text-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border/50">
              <div className="px-4 py-4 space-y-3">
                <Link href="#features" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                  {t('features')}
                </Link>
                <Link href="#testimonials" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                  {t('stories')}
                </Link>
                <Link href="/opportunities" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                  {t('opportunities')}
                </Link>
                <Link href="/collaborate" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                  {t('collaborate')}
                </Link>
                <div className="pt-4 flex flex-col gap-2">
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/auth/login">{t('login')}</Link>
                  </Button>
                  <Button asChild className="w-full rounded-xl">
                    <Link href="/auth/sign-up">{t('getStarted')}</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
