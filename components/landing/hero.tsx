"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Users, Rocket } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Globe className="h-4 w-4" />
            <span>{t.empoweringWomen}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
            {t.heroSlogan}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {t.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto rounded-xl">
              <Link href="/auth/sign-up">
                {t.startExploring}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto rounded-xl">
              <Link href="/opportunities">{t.browseOpportunities}</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-primary/10">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground">{t.opportunitiesCount}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-secondary/10">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">{t.membersCount}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">50+</p>
              <p className="text-sm text-muted-foreground">{t.countriesCount}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
