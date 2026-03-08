"use client"

import { OpportunityCard } from "./opportunity-card"
import { useLanguage } from "@/lib/language-context"

// Mock data for now - will be replaced with Supabase queries
const mockOpportunities = [
  {
    id: "1",
    title: "Google STEP Internship",
    description: "A developmental internship program for first and second-year undergraduate students with a passion for computer science.",
    organization: "Google",
    category: "internship" as const,
    location: "United States",
    is_remote: false,
    deadline: "2026-03-15",
    url: "https://careers.google.com/students/",
    eligibility: "First or second-year undergraduate students",
    amount: null,
    tags: ["tech", "engineering", "undergraduate"],
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "TechWomen Scholarship",
    description: "Full scholarship for women pursuing degrees in STEM fields at top universities worldwide.",
    organization: "TechWomen Foundation",
    category: "scholarship" as const,
    location: null,
    is_remote: true,
    deadline: "2026-04-01",
    url: "https://example.com",
    eligibility: "Women enrolled in STEM programs",
    amount: 50000,
    tags: ["scholarship", "stem", "women"],
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Women in AI Research Grant",
    description: "Research funding for innovative AI projects led by women researchers and students.",
    organization: "AI for Good Foundation",
    category: "grant" as const,
    location: null,
    is_remote: true,
    deadline: "2026-05-15",
    url: "https://example.com",
    eligibility: "Women researchers in AI/ML",
    amount: 25000,
    tags: ["ai", "research", "grant"],
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Grace Hopper Fellowship",
    description: "A prestigious fellowship program for women pursuing graduate studies in computer science.",
    organization: "Anita Borg Institute",
    category: "fellowship" as const,
    location: "Global",
    is_remote: true,
    deadline: "2026-06-01",
    url: "https://example.com",
    eligibility: "Graduate students in CS",
    amount: 75000,
    tags: ["fellowship", "graduate", "cs"],
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "She Builds Hackathon",
    description: "A 48-hour hackathon for women to build innovative solutions addressing social challenges.",
    organization: "Women Who Code",
    category: "competition" as const,
    location: "San Francisco, CA",
    is_remote: false,
    deadline: "2026-03-20",
    url: "https://example.com",
    eligibility: "Women developers of all levels",
    amount: 10000,
    tags: ["hackathon", "competition", "coding"],
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Women Founders Accelerator",
    description: "12-week accelerator program for women-led startups with funding and mentorship opportunities.",
    organization: "Female Founders Fund",
    category: "program" as const,
    location: "New York, NY",
    is_remote: false,
    deadline: "2026-04-15",
    url: "https://example.com",
    eligibility: "Women-led early-stage startups",
    amount: 150000,
    tags: ["startup", "accelerator", "funding"],
    created_at: new Date().toISOString(),
  },
]

interface OpportunitiesContentProps {
  selectedCategory: string
  selectedLocation: string
  searchQuery: string
}

export function OpportunitiesContent({ 
  selectedCategory, 
  selectedLocation, 
  searchQuery 
}: OpportunitiesContentProps) {
  const { t } = useLanguage()
  
  // Filter opportunities based on props
  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesCategory = selectedCategory === "all" || opp.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || 
      (selectedLocation === "remote" && opp.is_remote) ||
      (opp.location?.toLowerCase().includes(selectedLocation.toLowerCase()))
    const matchesSearch = !searchQuery || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesLocation && matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('showing')} {filteredOpportunities.length} {t('opportunities').toLowerCase()}
        </p>
      </div>
      
      <div className="grid gap-4">
        {filteredOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </div>
  )
}
