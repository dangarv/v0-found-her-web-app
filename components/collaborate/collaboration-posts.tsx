"use client"

import { CollaborationPostCard } from "./collaboration-post-card"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Mock data with Latin American names and locations
const mockPosts = [
  {
    id: "1",
    user_id: "user1",
    title: "Looking for co-founder for EdTech startup",
    description: "Building an AI-powered platform to help students learn coding. Need someone with business development experience and passion for education.",
    looking_for: ["Business Development", "Marketing", "Product Management"],
    project_type: "Project",
    category: "project",
    is_active: true,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      id: "user1",
      email: "veronica@example.com",
      full_name: "Veronica Torres",
      avatar_url: null,
      bio: "Software engineer passionate about education",
      location: "Bogota, Colombia",
      skills: ["React", "Node.js", "AI/ML"],
      interests: ["EdTech", "AI"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    likes_count: 24,
    comments_count: 8,
    is_liked: false,
  },
  {
    id: "2",
    user_id: "user2",
    title: "Motivation circle for Fulbright applications",
    description: "Forming a group to support each other through the Fulbright scholarship application process. Weekly check-ins, essay reviews, and interview prep.",
    looking_for: ["Essay Feedback", "Interview Practice", "Accountability"],
    project_type: "Motivation Circle",
    category: "motivation",
    is_active: true,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      id: "user2",
      email: "camila@example.com",
      full_name: "Camila Rodriguez",
      avatar_url: null,
      bio: "International relations student passionate about diplomacy",
      location: "Buenos Aires, Argentina",
      skills: ["Research", "Writing", "Public Speaking"],
      interests: ["International Relations", "Policy"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    likes_count: 45,
    comments_count: 15,
    is_liked: true,
  },
  {
    id: "3",
    user_id: "user3",
    title: "Skill-Swap: My UX Design for your Python skills",
    description: "I'm a UX designer looking to learn Python for data visualization. Happy to teach Figma, user research, and design systems in exchange.",
    looking_for: ["Python", "Data Science", "Visualization"],
    project_type: "Skill-Swap",
    category: "skill-swap",
    is_active: true,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      id: "user3",
      email: "isabella@example.com",
      full_name: "Isabella Martinez",
      avatar_url: null,
      bio: "UX Designer at a fintech startup",
      location: "Mexico City, Mexico",
      skills: ["Figma", "User Research", "Design Systems"],
      interests: ["Data Visualization", "Learning to Code"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    likes_count: 32,
    comments_count: 12,
    is_liked: false,
  },
  {
    id: "4",
    user_id: "user4",
    title: "Building sustainable fashion marketplace",
    description: "Creating a platform connecting local artisans with conscious consumers. Looking for developers and marketing experts who care about sustainability.",
    looking_for: ["Full-Stack Development", "Marketing", "Supply Chain"],
    project_type: "Project",
    category: "project",
    is_active: true,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      id: "user4",
      email: "valentina@example.com",
      full_name: "Valentina Silva",
      avatar_url: null,
      bio: "Fashion entrepreneur and sustainability advocate",
      location: "Sao Paulo, Brazil",
      skills: ["Business Strategy", "Sustainability", "E-commerce"],
      interests: ["Sustainable Fashion", "Social Enterprise"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    likes_count: 58,
    comments_count: 22,
    is_liked: false,
  },
  {
    id: "5",
    user_id: "user5",
    title: "Motivation circle for grad school applications",
    description: "Looking for 3-4 people applying to computer science masters programs. Let's review SOPs, share resources, and keep each other motivated!",
    looking_for: ["SOP Review", "Research Experience", "Motivation"],
    project_type: "Motivation Circle",
    category: "motivation",
    is_active: true,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      id: "user5",
      email: "sofia@example.com",
      full_name: "Sofia Herrera",
      avatar_url: null,
      bio: "CS undergrad aiming for top grad schools",
      location: "Lima, Peru",
      skills: ["Machine Learning", "Research", "Python"],
      interests: ["AI Research", "Graduate Studies"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    likes_count: 67,
    comments_count: 28,
    is_liked: false,
  },
  {
    id: "6",
    user_id: "user6",
    title: "Skill-Swap: Marketing for Web Development",
    description: "I have 5 years of digital marketing experience and want to learn web development. Can teach SEO, content marketing, and growth strategies.",
    looking_for: ["React", "Next.js", "Web Development"],
    project_type: "Skill-Swap",
    category: "skill-swap",
    is_active: true,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      id: "user6",
      email: "lucia@example.com",
      full_name: "Lucia Fernandez",
      avatar_url: null,
      bio: "Digital marketing specialist turned tech enthusiast",
      location: "Santiago, Chile",
      skills: ["SEO", "Content Marketing", "Growth Hacking"],
      interests: ["Web Development", "Tech Startups"],
      linkedin_url: null,
      website_url: null,
      is_looking_for_collaborators: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    likes_count: 41,
    comments_count: 16,
    is_liked: false,
  },
]

interface CollaborationPostsProps {
  searchQuery: string
}

const categoryFilters = [
  { id: "all", label: "All", labelEs: "Todos" },
  { id: "project", label: "Project", labelEs: "Proyecto", description: "Building a startup or product together" },
  { id: "motivation", label: "Motivation Circle", labelEs: "Círculo de Motivación", description: "Learning and applying to opportunities together" },
  { id: "skill-swap", label: "Skill-Swap", labelEs: "Intercambio de Habilidades", description: "1-on-1 reciprocal mentorship" },
]

export function CollaborationPosts({ searchQuery }: CollaborationPostsProps) {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  // Filter posts based on search and category
  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    
    if (!searchQuery) return matchesCategory
    const query = searchQuery.toLowerCase()
    return matchesCategory && (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.profile.full_name.toLowerCase().includes(query) ||
      post.looking_for.some(skill => skill.toLowerCase().includes(query))
    )
  })

  if (filteredPosts.length === 0) {
    return (
      <>
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryFilters.map((cat) => (
            <Badge
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className="cursor-pointer rounded-full px-4 py-2 text-sm transition-colors"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {language === "es" ? cat.labelEs : cat.label}
            </Badge>
          ))}
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noMatchesFound')}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {categoryFilters.map((cat) => (
          <Badge
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            className="cursor-pointer rounded-full px-4 py-2 text-sm transition-colors"
            onClick={() => setSelectedCategory(cat.id)}
          >
            {language === "es" ? cat.labelEs : cat.label}
          </Badge>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <CollaborationPostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}
