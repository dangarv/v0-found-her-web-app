"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// As per query.sql specifications
const educationLevels = [
  { id: "high_school", label: "High School", labelEs: "Secundaria" },
  { id: "undergraduate", label: "Undergraduate", labelEs: "Universitario" },
]

const opportunityTypes = [
  { id: "scholarship", label: "Scholarship", labelEs: "Beca" },
  { id: "research", label: "Research", labelEs: "Investigación" },
  { id: "summer program", label: "Summer Program", labelEs: "Programa de Verano" },
  { id: "fellowship", label: "Fellowship", labelEs: "Fellowship" },
  { id: "internship", label: "Internship", labelEs: "Pasantía" },
  { id: "grant", label: "Grant", labelEs: "Subvención" },
  { id: "competition", label: "Competition", labelEs: "Competencia" },
  { id: "conference", label: "Conference", labelEs: "Conferencia" },
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

const fields = [
  { id: "stem", label: "STEM", labelEs: "STEM" },
  { id: "technology", label: "Technology", labelEs: "Tecnología" },
  { id: "science", label: "Science", labelEs: "Ciencia" },
  { id: "engineering", label: "Engineering", labelEs: "Ingeniería" },
  { id: "business", label: "Business", labelEs: "Negocios" },
  { id: "arts", label: "Arts", labelEs: "Artes" },
  { id: "social sciences", label: "Social Sciences", labelEs: "Ciencias Sociales" },
  { id: "health", label: "Health", labelEs: "Salud" },
]

const genderFocus = [
  { id: "women-focused", label: "Women Focused", labelEs: "Enfocado en Mujeres" },
  { id: "open to all", label: "Open to All", labelEs: "Abierto a Todos" },
]

export interface OpportunityFilters {
  searchQuery: string
  selectedEducation: string[]
  selectedTypes: string[]
  selectedModality: string[]
  selectedPricing: string[]
  selectedFields: string[]
  selectedGenderFocus: string[]
}

interface OpportunitiesFiltersProps {
  filters: OpportunityFilters
  onFiltersChange: (filters: OpportunityFilters) => void
}

export function OpportunitiesFilters({
  filters,
  onFiltersChange,
}: OpportunitiesFiltersProps) {
  const { language } = useLanguage()

  const toggle = (id: string, currentSelection: string[], field: keyof OpportunityFilters) => {
    const newSelection = currentSelection.includes(id) 
      ? currentSelection.filter((c) => c !== id) 
      : [...currentSelection, id]
    onFiltersChange({ ...filters, [field]: newSelection })
  }

  const clearFilters = () => {
    onFiltersChange({
      searchQuery: "",
      selectedEducation: [],
      selectedTypes: [],
      selectedModality: [],
      selectedPricing: [],
      selectedFields: [],
      selectedGenderFocus: [],
    })
  }

  const hasFilters = filters.searchQuery || 
    filters.selectedEducation.length > 0 ||
    filters.selectedTypes.length > 0 ||
    filters.selectedModality.length > 0 ||
    filters.selectedPricing.length > 0 ||
    filters.selectedFields.length > 0 ||
    filters.selectedGenderFocus.length > 0

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
              value={filters.searchQuery}
              onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
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
                  checked={filters.selectedEducation.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, filters.selectedEducation, "selectedEducation")}
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
                  checked={filters.selectedTypes.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, filters.selectedTypes, "selectedTypes")}
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
                  checked={filters.selectedModality.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, filters.selectedModality, "selectedModality")}
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
          <Label>{language === "es" ? "Costo" : "Cost"}</Label>
          <div className="space-y-2">
            {pricing.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={`price-${item.id}`}
                  checked={filters.selectedPricing.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, filters.selectedPricing, "selectedPricing")}
                />
                <Label htmlFor={`price-${item.id}`} className="font-normal cursor-pointer">
                  {language === "es" ? item.labelEs : item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-3">
          <Label>{language === "es" ? "Campo" : "Field"}</Label>
          <div className="space-y-2">
            {fields.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={`field-${item.id}`}
                  checked={filters.selectedFields.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, filters.selectedFields, "selectedFields")}
                />
                <Label htmlFor={`field-${item.id}`} className="font-normal cursor-pointer">
                  {language === "es" ? item.labelEs : item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Focus */}
        <div className="space-y-3">
          <Label>{language === "es" ? "Enfoque de Género" : "Gender Focus"}</Label>
          <div className="space-y-2">
            {genderFocus.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={`gender-${item.id}`}
                  checked={filters.selectedGenderFocus.includes(item.id)}
                  onCheckedChange={() => toggle(item.id, filters.selectedGenderFocus, "selectedGenderFocus")}
                />
                <Label htmlFor={`gender-${item.id}`} className="font-normal cursor-pointer">
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
