"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { GroupCard } from "@/components/groups/group-card"
import { useLanguage } from "@/lib/language-context"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { useState } from "react"

const mockGroups = [
  {
    id: "1",
    name: "Women in Tech",
    description: "A community for women breaking barriers in technology. Share resources, opportunities, and support.",
    memberCount: 2450,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "2",
    name: "Startup Founders Circle",
    description: "Connect with fellow founders, share experiences, and get advice on building your startup.",
    memberCount: 1823,
    category: "Entrepreneurship",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "3",
    name: "Climate Action Network",
    description: "Young women working on climate solutions. Collaborate on projects and share opportunities.",
    memberCount: 1156,
    category: "Environment",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "4",
    name: "Creative Designers Hub",
    description: "A space for designers to showcase work, get feedback, and find collaboration opportunities.",
    memberCount: 987,
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "5",
    name: "Social Impact Leaders",
    description: "Building ventures that create positive change. Share impact measurement strategies and funding opportunities.",
    memberCount: 756,
    category: "Social Impact",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=400&h=200&fit=crop",
    isJoined: false,
  },
  {
    id: "6",
    name: "FinTech Innovators",
    description: "Exploring the future of finance. Discuss trends, share projects, and connect with industry leaders.",
    memberCount: 634,
    category: "Finance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    isJoined: false,
  },
]

const categoryFilters = ["All", "Technology", "Entrepreneurship", "Environment", "Design", "Social Impact", "Finance"]

export default function GroupsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch = 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "All" || group.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">{t('groups')}</h1>
            <p className="text-muted-foreground text-lg">
              {t('groupsSubtitle')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchGroups')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer rounded-full px-4 py-1.5 transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t('noGroupsFound')}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
