"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { OpportunitiesFilters, type OpportunityFilters } from "@/components/opportunities/opportunities-filters"
import { OpportunitiesContent } from "@/components/opportunities/opportunities-content"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"

const initialFilters: OpportunityFilters = {
  searchQuery: "",
  selectedEducation: [],
  selectedTypes: [],
  selectedModality: [],
  selectedPricing: [],
  selectedFields: [],
  selectedGenderFocus: [],
}

export default function OpportunitiesPage() {
  const { t } = useLanguage()
  const [filters, setFilters] = useState<OpportunityFilters>(initialFilters)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">{t('opportunities')}</h1>
            <p className="text-muted-foreground text-lg">
              {t('opportunitiesSubtitle')}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-72 shrink-0">
              <OpportunitiesFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            </aside>
            <div className="flex-1">
              <OpportunitiesContent filters={filters} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
