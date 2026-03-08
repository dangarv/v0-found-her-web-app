"use client"

import { useLanguage } from "@/lib/language-context"

export function Stats() {
  const { t } = useLanguage()
  
  const stats = [
    { value: "$2M+", label: t('fundingAccessed'), description: t('fundingDescription') },
    { value: "1,200+", label: t('successfulMatches'), description: t('matchesDescription') },
    { value: "85%", label: t('successRate'), description: t('successDescription') },
    { value: "24/7", label: t('globalAccess'), description: t('globalDescription') },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary p-8 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
              {t('statsTitle')}
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
              {t('statsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="mt-2 text-lg font-medium text-primary-foreground">{stat.label}</p>
                <p className="text-sm text-primary-foreground/70">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
