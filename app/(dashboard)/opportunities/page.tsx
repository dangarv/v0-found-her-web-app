import { Suspense } from "react"
import { OpportunitiesContent } from "@/components/opportunities/opportunities-content"
import { OpportunitiesFilters } from "@/components/opportunities/opportunities-filters"
import { Spinner } from "@/components/ui/spinner"

export default function OpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Opportunities</h1>
        <p className="text-muted-foreground mt-1">
          Discover scholarships, internships, grants, and more tailored for you.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-64 shrink-0">
          <OpportunitiesFilters />
        </aside>
        <div className="flex-1">
          <Suspense fallback={<div className="flex justify-center py-12"><Spinner className="h-8 w-8" /></div>}>
            <OpportunitiesContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
