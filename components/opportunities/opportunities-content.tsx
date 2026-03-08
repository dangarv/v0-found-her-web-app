"use client"

import { useEffect, useState } from "react"
import { OpportunityCard } from "./opportunity-card"
import { useLanguage } from "@/lib/language-context"
import { fetchOpportunities } from "@/lib/api"
import type { Opportunity } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface OpportunitiesContentProps {
  selectedCategory: string
  selectedLocation: string
  selectedLevel: string
  selectedField: string
  searchQuery: string
}

export function OpportunitiesContent({ 
  selectedCategory, 
  selectedLocation,
  selectedLevel,
  selectedField, 
  searchQuery 
}: OpportunitiesContentProps) {
  const { t } = useLanguage()
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function loadOpportunities() {
      setLoading(true)
      setError(null)
      
      try {
        const data = await fetchOpportunities({
          level: selectedLevel,
          type: selectedCategory,
          modality: selectedLocation,
          field: selectedField,
          search: searchQuery,
        })
        setOpportunities(data)
      } catch (err) {
        console.error("[v0] Error fetching opportunities:", err)
        setError("Failed to load opportunities")
      } finally {
        setLoading(false)
      }
    }
    
    loadOpportunities()
  }, [selectedCategory, selectedLocation, selectedLevel, selectedField, searchQuery])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t('noMatchesFound')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('showing')} {opportunities.length} {t('opportunities').toLowerCase()}
        </p>
      </div>
      
      <div className="grid gap-4">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </div>
  )
}
