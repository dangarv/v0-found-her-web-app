"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-card border border-border overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          </div>

          <div className="px-8 py-16 md:px-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              {t('ctaTitle')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t('ctaSubtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="rounded-xl">
                <Link href="/auth/sign-up">
                  {t('joinNow')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-xl">
                <Link href="/opportunities">{t('browseOpportunities')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
