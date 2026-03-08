// Database types matching Supabase schema

// Users table
export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  tags: string | null
  skills: string | null
  needs: string | null
  background: string | null
  age_bracket: string | null
  avatar_url?: string | null
  location?: string | null
  bio?: string | null
  linkedin_url?: string | null
  website_url?: string | null
  interests?: string[]
  is_looking_for_collaborators?: boolean
  created_at?: string
  updated_at?: string
}

// Opportunities tables (High School and Undergraduate)
export interface Opportunity {
  id: string
  title: string | null
  type: string | null  // scholarship, internship, grant, fellowship, competition, program
  modality: string | null  // remote, in-person, hybrid
  scope: string | null  // local, regional, national, international
  field: string | null  // STEM, Arts, Business, etc.
  cost: string | null
  eligibility: string | null
  requirements: string | null
  gender_focus: string | null
  organization: string | null
  financial_aid: string | null
  language: string | null
  status: string | null
  deadline: string | null
  link: string | null
  description: string | null
  level: string | null  // high_school, undergraduate
  // Computed/UI fields
  is_remote?: boolean
  category?: string
  url?: string
  amount?: number | null
  tags?: string[]
  location?: string | null
  created_at?: string
}

// Posts table (for collaboration posts)
export interface Post {
  id: string
  user_id: string | null
  title: string | null
  content: string | null
  tags: string | null
}

// Groups table
export interface Group {
  id: string
  name: string | null
  description: string | null
  type: string | null  // project, motivation_circle, skill_swap
  creator_id: string | null
  image_url?: string | null
  is_private?: boolean
  created_at?: string
  member_count?: number
  is_member?: boolean
}

// Group Members table
export interface GroupMember {
  group_id: string | null
  user_id: string | null
  role: string | null  // admin, moderator, member
  profile?: Profile
  joined_at?: string
}

// Messages table
export interface Message {
  id: string
  sender_id: string | null
  receiver_id: string | null
  content: string | null
  created_at?: string
  is_read?: boolean
  sender?: Profile
}

// Comments table
export interface Comment {
  id: string
  post_id: string | null
  user_id: string | null
  content: string | null
  created_at?: string
  profile?: Profile
}

// Saved Opportunities table
export interface SavedOpportunity {
  user_id: string
  opportunity_id: string | null
  status: string | null
  created_at?: string
  opportunity?: Opportunity
}

// Application Progress table
export interface ApplicationProgress {
  id: string
  user_id: string | null
  opportunity_id: string | null
  checklist_json: Record<string, boolean> | null
  notes: string | null
  status?: string
  opportunity?: Opportunity
}

// Extended types for UI
export interface CollaborationPost {
  id: string
  user_id?: string
  title: string
  description: string
  looking_for: string[]
  project_type: "Project" | "Motivation Circle" | "Skill-Swap"
  is_active?: boolean
  created_at: string
  updated_at?: string
  profile: {
    id: string
    full_name: string
    avatar_url: string | null
    location: string
  }
  likes_count?: number
  comments_count?: number
  is_liked?: boolean
}

export interface PostComment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  profile?: Profile
}

export interface Match {
  id: string
  user_id: string
  matched_user_id: string
  status: 'pending' | 'accepted' | 'rejected'
  message: string | null
  created_at: string
  matched_profile?: Profile
}

export interface Conversation {
  id: string
  participant_1: string
  participant_2: string
  created_at: string
  updated_at: string
  other_participant?: Profile
  last_message?: Message
}

export interface ApplicationTracker {
  id: string
  user_id: string
  opportunity_id: string
  status: 'interested' | 'applying' | 'submitted' | 'accepted' | 'rejected'
  notes: string | null
  applied_at: string | null
  created_at: string
  updated_at: string
  opportunity?: Opportunity
  checklist?: Record<string, boolean>
}
