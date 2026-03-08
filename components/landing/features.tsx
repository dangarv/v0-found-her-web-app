"use client"

import { Search, Users, MessageCircle, Bookmark, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Search,
      title: t('opportunitiesFeatureTitle'),
      description: t('opportunitiesFeatureDescription'),
    },
    {
      icon: Users,
      title: t('collaborateFeatureTitle'),
      description: t('collaborateFeatureDescription'),
    },
    {
      icon: MessageCircle,
      title: t('groupsFeatureTitle'),
      description: t('groupsFeatureDescription'),
    },
    {
      icon: Bookmark,
      title: t('matchFeatureTitle'),
      description: t('matchFeatureDescription'),
    },
    {
      icon: TrendingUp,
      title: t('careerGrowth'),
      description: t('careerGrowthDescription'),
    },
    {
      icon: Shield,
      title: t('safeSpace'),
      description: t('safeSpaceDescription'),
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            {t('featuresTitle')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
