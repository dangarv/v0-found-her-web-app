"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

// As per query.sql specifications
const educationLevels = [
  { id: "high-school", label: "High School", labelEs: "Secundaria" },
  { id: "undergraduate", label: "Undergraduate", labelEs: "Universitario" },
  { id: "gap-year", label: "Gap Year", labelEs: "Año Sabático" },
]

const opportunityTypes = [
  { id: "scholarship", label: "Scholarship", labelEs: "Beca" },
  { id: "research", label: "Research", labelEs: "Investigación" },
  { id: "summer-program", label: "Summer Program", labelEs: "Programa de Verano" },
  { id: "fellowship", label: "Fellowship", labelEs: "Fellowship" },
  { id: "internship", label: "Internship", labelEs: "Pasantía" },
  { id: "grant", label: "Grant", labelEs: "Subvención" },
]

const modalities = [
  { id: "virtual", label: "Virtual", labelEs: "Virtual" },
  { id: "in-person", label: "In-Person", labelEs: "Presencial" },
  { id: "hybrid", label: "Hybrid", labelEs: "Híbrido" },
]

const pricing = [
  { id: "free", label: "Free", labelEs: "Gratis" },
  { id: "paid", label: "Paid", labelEs: "Pago" },
]

const tags = [
  { id: "stem", label: "STEM", labelEs: "STEM" },
  { id: "ai", label: "AI", labelEs: "IA" },
  { id: "research", label: "Research", labelEs: "Investigación" },
  { id: "entrepreneurship", label: "Entrepreneurship", labelEs: "Emprendimiento" },
  { id: "climate", label: "Climate", labelEs: "Clima" },
  { id: "social-impact", label: "Social Impact", labelEs: "Impacto Social" },
]

const womenEligibility = [
  { id: "women-only", label: "Women Only", labelEs: "Solo Mujeres" },
  { id: "women-preferred", label: "Women Preferred", labelEs: "Mujeres Preferidas" },
  { id: "open", label: "Open", labelEs: "Abierto" },
]

interface OpportunitiesFiltersProps {
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedLocation: string
  setSelectedLocation: (value: string) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
}

export function OpportunitiesFilters({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  searchQuery,
  setSearchQuery,
}: OpportunitiesFiltersProps) {
  const { language } = useLanguage()
  const [selectedEducation, setSelectedEducation] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedModality, setSelectedModality] = useState<string[]>([])
  const [selectedPricing, setSelectedPricing] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedWomenElig, setSelectedWomenElig] = useState<string[]>([])

  const toggle = (id: string, state: string[], setState: (value: string[]) => void) => {
    setState(state.includes(id) ? state.filter((c) => c !== id) : [...state, id])
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedLocation("all")
    setSelectedEducation([])
    setSelectedTypes([])
    setSelectedModality([])
    setSelectedPricing([])
    setSelectedTags([])
    setSelectedWomenElig([])
  }

  const hasFilters = searchQuery || 
    selectedCategory !== "all" || 
    selectedLocation !== "all" ||
    selectedEducation.length > 0 ||
    selectedTypes.length > 0 ||
    selectedModality.length > 0 ||
    selectedPricing.length > 0 ||
    selectedTags.length > 0 ||
    selectedWomenElig.length > 0

  return (
    <Card className="border-border/50 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{language === "es" ? "Filtros" : "Filters"}</CardTitle>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="rounded-lg">
            <X className="h-4 w-4 mr-1" />
            {language === "es" ? "Limpiar" : "Clear"}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">{language === "es" ? "Buscar" : "Search"}</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder={language === "es" ? "Buscar oportunidades..." : "Search opportunities..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-xl"
            />
          </div>
        </div>

        {/* Education Level */}
        <div className="space-y-3">
          <Label>{language === "es" ? "Nivel Educativo" : "Education Level"}</Label>
          <div className="space-y-2">
            {educationLevels.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={`edu-${item.id}`}
                  checked={selectedEducation.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, selectedEducation, setSelectedEducation)}
                />
                <Label htmlFor={`edu-${item.id}`} className="font-normal cursor-pointer">
                  {language === "es" ? item.labelEs : item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunity Type */}
        <div className="space-y-3">
          <Label>{language === "es" ? "Tipo de Oportunidad" : "Opportunity Type"}</Label>
          <div className="space-y-2">
            {opportunityTypes.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={`type-${item.id}`}
                  checked={selectedTypes.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, selectedTypes, setSelectedTypes)}
                />
                <Label htmlFor={`type-${item.id}`} className="font-normal cursor-pointer">
                  {language === "es" ? item.labelEs : item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Modality */}
        <div className="space-y-3">
          <Label>{language === "es" ? "Modalidad" : "Modality"}</Label>
          <div className="space-y-2">
            {modalities.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={`mod-${item.id}`}
                  checked={selectedModality.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, selectedModality, setSelectedModality)}
                />
                <Label htmlFor={`mod-${item.id}`} className="font-normal cursor-pointer">
                  {language === "es" ? item.labelEs : item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="space-y-3">
          <Label>{language === "es" ? "Precio" : "Price"}</Label>
          <div className="space-y-2">
            {pricing.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={`price-${item.id}`}
                  checked={selectedPricing.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, selectedPricing, setSelectedPricing)}
                />
                <Label htmlFor={`price-${item.id}`} className="font-normal cursor-pointer">
                  {language === "es" ? item.labelEs : item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <Label>{language === "es" ? "Etiquetas" : "Tags"}</Label>
          <div className="space-y-2">
            {tags.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={`tag-${item.id}`}
                  checked={selectedTags.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, selectedTags, setSelectedTags)}
                />
                <Label htmlFor={`tag-${item.id}`} className="font-normal cursor-pointer">
                  {language === "es" ? item.labelEs : item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Women Eligibility */}
        <div className="space-y-3">
          <Label>{language === "es" ? "Elegibilidad para Mujeres" : "Women Eligibility"}</Label>
          <div className="space-y-2">
            {womenEligibility.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={`women-${item.id}`}
                  checked={selectedWomenElig.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, selectedWomenElig, setSelectedWomenElig)}
                />
                <Label htmlFor={`women-${item.id}`} className="font-normal cursor-pointer">
                  {language === "es" ? item.labelEs : item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
