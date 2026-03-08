import { createClient } from "@/lib/supabase/client"
import type { Opportunity, Profile, Post, Group, Message, SavedOpportunity, ApplicationProgress } from "./types"

// Table names with spaces need to be quoted
const TABLES = {
  HIGH_SCHOOL_OPPORTUNITIES: "High School Opportunities",
  UNDERGRADUATE_OPPORTUNITIES: "Undergraduate Opportunities", 
  USERS: "Users",
  POSTS: "Posts",
  GROUPS: "Groups",
  GROUP_MEMBERS: "Group Members",
  MESSAGES: "Messages",
  COMMENTS: "Comments",
  SAVED_OPPORTUNITIES: "Saved Opportunities",
  APPLICATION_PROGRESS: "Application Progress",
}

interface FetchOpportunitiesFilters {
  levels?: string[]
  types?: string[]
  modalities?: string[]
  costs?: string[]
  fields?: string[]
  genderFocus?: string[]
  search?: string
}

// Fetch all opportunities from both tables with filtering
export async function fetchOpportunities(filters?: FetchOpportunitiesFilters): Promise<Opportunity[]> {
  const supabase = createClient()
  const results: Opportunity[] = []
  
  // Determine which tables to query based on level filter
  const queryHighSchool = !filters?.levels?.length || filters.levels.includes("high_school")
  const queryUndergraduate = !filters?.levels?.length || filters.levels.includes("undergraduate")
  
  // Helper function to apply filters to a query and fetch results
  async function fetchFromTable(tableName: string, level: string): Promise<Opportunity[]> {
    const { data, error } = await supabase.from(tableName).select("*")
    
    if (error || !data) {
      console.error(`[v0] Error fetching from ${tableName}:`, error)
      return []
    }
    
    // Apply client-side filtering for complex multi-select filters
    let filtered = data.map(opp => ({ ...opp, level }))
    
    // Filter by type (supports multiple selections)
    if (filters?.types && filters.types.length > 0) {
      filtered = filtered.filter(opp => {
        const oppType = (opp.type || "").toLowerCase()
        return filters.types!.some(t => oppType.includes(t.toLowerCase()))
      })
    }
    
    // Filter by modality (supports multiple selections)
    if (filters?.modalities && filters.modalities.length > 0) {
      filtered = filtered.filter(opp => {
        const oppModality = (opp.modality || "").toLowerCase()
        return filters.modalities!.some(m => oppModality.includes(m.toLowerCase()))
      })
    }
    
    // Filter by cost (supports multiple selections)
    if (filters?.costs && filters.costs.length > 0) {
      filtered = filtered.filter(opp => {
        const oppCost = (opp.cost || "").toLowerCase()
        // Check for free vs paid
        const isFree = oppCost.includes("free") || oppCost === "$0" || oppCost === "0" || oppCost === ""
        
        if (filters.costs!.includes("free") && isFree) return true
        if (filters.costs!.includes("paid") && !isFree) return true
        return false
      })
    }
    
    // Filter by field (supports multiple selections)
    if (filters?.fields && filters.fields.length > 0) {
      filtered = filtered.filter(opp => {
        const oppField = (opp.field || "").toLowerCase()
        return filters.fields!.some(f => oppField.includes(f.toLowerCase()))
      })
    }
    
    // Filter by gender focus
    if (filters?.genderFocus && filters.genderFocus.length > 0) {
      filtered = filtered.filter(opp => {
        const oppGender = (opp.gender_focus || "").toLowerCase()
        
        if (filters.genderFocus!.includes("women-focused")) {
          return oppGender.includes("women") || oppGender.includes("female") || oppGender.includes("girl")
        }
        if (filters.genderFocus!.includes("open to all")) {
          return oppGender.includes("open") || oppGender.includes("all") || !oppGender
        }
        return true
      })
    }
    
    // Filter by search query
    if (filters?.search && filters.search.trim()) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(opp => {
        const title = (opp.title || "").toLowerCase()
        const description = (opp.description || "").toLowerCase()
        const organization = (opp.organization || "").toLowerCase()
        const field = (opp.field || "").toLowerCase()
        const type = (opp.type || "").toLowerCase()
        
        return title.includes(searchLower) || 
               description.includes(searchLower) || 
               organization.includes(searchLower) ||
               field.includes(searchLower) ||
               type.includes(searchLower)
      })
    }
    
    return filtered
  }
  
  // Fetch from High School Opportunities
  if (queryHighSchool) {
    const hsResults = await fetchFromTable(TABLES.HIGH_SCHOOL_OPPORTUNITIES, "high_school")
    results.push(...hsResults)
  }
  
  // Fetch from Undergraduate Opportunities
  if (queryUndergraduate) {
    const ugResults = await fetchFromTable(TABLES.UNDERGRADUATE_OPPORTUNITIES, "undergraduate")
    results.push(...ugResults)
  }
  
  return results
}

// Fetch single opportunity by ID
export async function fetchOpportunityById(id: string): Promise<Opportunity | null> {
  const supabase = createClient()
  
  // Try high school first
  const { data: hsData } = await supabase
    .from(TABLES.HIGH_SCHOOL_OPPORTUNITIES)
    .select("*")
    .eq("id", id)
    .single()
    
  if (hsData) return { ...hsData, level: "high_school" }
  
  // Try undergraduate
  const { data: ugData } = await supabase
    .from(TABLES.UNDERGRADUATE_OPPORTUNITIES)
    .select("*")
    .eq("id", id)
    .single()
    
  if (ugData) return { ...ugData, level: "undergraduate" }
  
  return null
}

// Fetch users/profiles
export async function fetchProfiles(): Promise<Profile[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from(TABLES.USERS).select("*")
  if (error) return []
  return data || []
}

export async function fetchProfileById(id: string): Promise<Profile | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(TABLES.USERS)
    .select("*")
    .eq("id", id)
    .single()
  if (error) return null
  return data
}

// Fetch posts (collaboration posts)
export async function fetchPosts(): Promise<Post[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from(TABLES.POSTS).select("*")
  if (error) return []
  return data || []
}

// Fetch groups
export async function fetchGroups(type?: string): Promise<Group[]> {
  const supabase = createClient()
  let query = supabase.from(TABLES.GROUPS).select("*")
  
  if (type && type !== "all") {
    query = query.eq("type", type)
  }
  
  const { data, error } = await query
  if (error) return []
  return data || []
}

export async function fetchGroupById(id: string): Promise<Group | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(TABLES.GROUPS)
    .select("*")
    .eq("id", id)
    .single()
  if (error) return null
  return data
}

// Fetch group members
export async function fetchGroupMembers(groupId: string): Promise<Profile[]> {
  const supabase = createClient()
  const { data: members, error: membersError } = await supabase
    .from(TABLES.GROUP_MEMBERS)
    .select("user_id")
    .eq("group_id", groupId)
    
  if (membersError || !members) return []
  
  const userIds = members.map(m => m.user_id).filter(Boolean)
  if (userIds.length === 0) return []
  
  const { data: profiles, error: profilesError } = await supabase
    .from(TABLES.USERS)
    .select("*")
    .in("id", userIds)
    
  if (profilesError) return []
  return profiles || []
}

// Fetch messages
export async function fetchMessages(userId: string): Promise<Message[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(TABLES.MESSAGES)
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    
  if (error) return []
  return data || []
}

// Fetch saved opportunities for a user
export async function fetchSavedOpportunities(userId: string): Promise<SavedOpportunity[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(TABLES.SAVED_OPPORTUNITIES)
    .select("*")
    .eq("user_id", userId)
    
  if (error) return []
  return data || []
}

// Save an opportunity
export async function saveOpportunity(userId: string, opportunityId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from(TABLES.SAVED_OPPORTUNITIES)
    .insert({ user_id: userId, opportunity_id: opportunityId, status: "saved" })
    
  return !error
}

// Remove saved opportunity
export async function unsaveOpportunity(userId: string, opportunityId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from(TABLES.SAVED_OPPORTUNITIES)
    .delete()
    .eq("user_id", userId)
    .eq("opportunity_id", opportunityId)
    
  return !error
}

// Fetch application progress
export async function fetchApplicationProgress(userId: string): Promise<ApplicationProgress[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(TABLES.APPLICATION_PROGRESS)
    .select("*")
    .eq("user_id", userId)
    
  if (error) return []
  return data || []
}

// Update application progress
export async function updateApplicationProgress(
  id: string, 
  updates: Partial<ApplicationProgress>
): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from(TABLES.APPLICATION_PROGRESS)
    .update(updates)
    .eq("id", id)
    
  return !error
}

// Create application progress
export async function createApplicationProgress(
  userId: string,
  opportunityId: string,
  checklist?: Record<string, boolean>
): Promise<ApplicationProgress | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(TABLES.APPLICATION_PROGRESS)
    .insert({
      id: crypto.randomUUID(),
      user_id: userId,
      opportunity_id: opportunityId,
      checklist_json: checklist || {},
      notes: ""
    })
    .select()
    .single()
    
  if (error) return null
  return data
}

// Fetch comments for a post
export async function fetchComments(postId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(TABLES.COMMENTS)
    .select("*")
    .eq("post_id", postId)
    
  if (error) return []
  return data || []
}

// Add a comment
export async function addComment(postId: string, userId: string, content: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from(TABLES.COMMENTS)
    .insert({
      id: crypto.randomUUID(),
      post_id: postId,
      user_id: userId,
      content
    })
    
  return !error
}

// Send a message
export async function sendMessage(senderId: string, receiverId: string, content: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from(TABLES.MESSAGES)
    .insert({
      id: crypto.randomUUID(),
      sender_id: senderId,
      receiver_id: receiverId,
      content
    })
    
  return !error
}

// Join a group
export async function joinGroup(groupId: string, userId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from(TABLES.GROUP_MEMBERS)
    .insert({
      group_id: groupId,
      user_id: userId,
      role: "member"
    })
    
  return !error
}

// Leave a group
export async function leaveGroup(groupId: string, userId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from(TABLES.GROUP_MEMBERS)
    .delete()
    .eq("group_id", groupId)
    .eq("user_id", userId)
    
  return !error
}
