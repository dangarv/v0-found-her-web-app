export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  location: string | null
  skills: string[]
  interests: string[]
  linkedin_url: string | null
  website_url: string | null
  is_looking_for_collaborators: boolean
  created_at: string
  updated_at: string
}

export interface Opportunity {
  id: string
  title: string
  description: string
  organization: string
  category: 'scholarship' | 'internship' | 'grant' | 'fellowship' | 'competition' | 'program'
  location: string | null
  is_remote: boolean
  deadline: string | null
  url: string
  eligibility: string | null
  amount: number | null
  tags: string[]
  created_at: string
}

export interface SavedOpportunity {
  id: string
  user_id: string
  opportunity_id: string
  created_at: string
  opportunity?: Opportunity
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
}

export interface CollaborationPost {
  id: string
  user_id: string
  title: string
  description: string
  looking_for: string[]
  project_type: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  profile?: Profile
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

export interface Group {
  id: string
  name: string
  description: string | null
  image_url: string | null
  is_private: boolean
  created_by: string
  created_at: string
  member_count?: number
  is_member?: boolean
}

export interface GroupMember {
  id: string
  group_id: string
  user_id: string
  role: 'admin' | 'moderator' | 'member'
  joined_at: string
  profile?: Profile
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

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  is_read: boolean
  created_at: string
  sender?: Profile
}
