"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Users, Rocket, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-primary/40 rounded-full animate-float" />
        <div className="absolute top-40 right-[15%] w-3 h-3 bg-secondary/40 rounded-full animate-float animation-delay-2000" />
        <div className="absolute bottom-40 left-[20%] w-2 h-2 bg-primary/30 rounded-full animate-float animation-delay-4000" />
        <div className="absolute top-60 right-[25%] w-1.5 h-1.5 bg-secondary/50 rounded-full animate-float animation-delay-1000" />
        <div className="absolute bottom-60 right-[10%] w-2.5 h-2.5 bg-primary/35 rounded-full animate-float animation-delay-3000" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>{t('empoweringWomen')}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t('heroSlogan')}
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              <Link href="/auth/sign-up">
                {t('startExploring')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto rounded-xl backdrop-blur-sm">
              <Link href="/opportunities">{t('browseOpportunities')}</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center group">
              <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-2xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground">{t('opportunitiesCount')}</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-2xl bg-secondary/10 border border-secondary/20 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">{t('membersCount')}</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-2xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">50+</p>
              <p className="text-sm text-muted-foreground">{t('countriesCount')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
