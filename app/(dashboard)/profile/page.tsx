"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Link as LinkIcon, Linkedin, Save, Plus, Users, FileText, Folder, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  email: string
  full_name: string
  tags: string[]
  skills: string[]
  needs: string[]
  background: string
  age_bracket: string
  location?: string
  bio?: string
  linkedin_url?: string
  website_url?: string
}

interface UserPost {
  id: string
  title: string
  content: string
  tags: string[]
  created_at: string
}

interface UserGroup {
  id: string
  name: string
  description: string
  type: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<UserPost[]>([])
  const [groups, setGroups] = useState<UserGroup[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newSkill, setNewSkill] = useState('')
  const [newTag, setNewTag] = useState('')
  
  const [editForm, setEditForm] = useState({
    full_name: '',
    bio: '',
    location: '',
    background: '',
    linkedin_url: '',
    website_url: '',
    skills: [] as string[],
    tags: [] as string[],
    needs: [] as string[],
  })

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    
    if (user) {
      // Fetch profile from Users table
      const { data: profileData } = await supabase
        .from('Users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (profileData) {
        setProfile(profileData)
        setEditForm({
          full_name: profileData.full_name || '',
          bio: profileData.bio || '',
          location: profileData.location || '',
          background: profileData.background || '',
          linkedin_url: profileData.linkedin_url || '',
          website_url: profileData.website_url || '',
          skills: profileData.skills || [],
          tags: profileData.tags || [],
          needs: profileData.needs || [],
        })
      }
      
      // Fetch user's posts
      const { data: postsData } = await supabase
        .from('Posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (postsData) setPosts(postsData)
      
      // Fetch user's groups
      const { data: membershipData } = await supabase
        .from('Group Members')
        .select('group_id')
        .eq('user_id', user.id)
      
      if (membershipData && membershipData.length > 0) {
        const groupIds = membershipData.map(m => m.group_id)
        const { data: groupsData } = await supabase
          .from('Groups')
          .select('*')
          .in('id', groupIds)
        
        if (groupsData) setGroups(groupsData)
      }
    }
    
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!user) return
    
    const supabase = createClient()
    
    const { error } = await supabase
      .from('Users')
      .update({
        full_name: editForm.full_name,
        bio: editForm.bio,
        location: editForm.location,
        background: editForm.background,
        linkedin_url: editForm.linkedin_url,
        website_url: editForm.website_url,
        skills: editForm.skills,
        tags: editForm.tags,
        needs: editForm.needs,
      })
      .eq('id', user.id)
    
    if (!error) {
      setProfile(prev => prev ? { ...prev, ...editForm } : null)
      setIsEditing(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
      setEditForm(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setEditForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  const addTag = () => {
    if (newTag.trim() && !editForm.tags.includes(newTag.trim())) {
      setEditForm(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setEditForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">
            Your mini-portfolio and public profile
          </p>
        </div>
        <Button 
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="rounded-xl"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            "Edit Profile"
          )}
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card className="border-border/50 overflow-hidden rounded-2xl">
        <div className="h-32 bg-gradient-to-r from-primary/40 via-secondary/30 to-primary/40" />
        <CardContent className="relative pt-0 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-card border-4 border-card shadow-lg">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {initials}
              </span>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  className="text-2xl font-bold rounded-xl"
                />
              ) : (
                <h2 className="text-2xl font-bold text-foreground">{displayName}</h2>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                {(isEditing || editForm.location) && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {isEditing ? (
                      <Input
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        placeholder="City, Country"
                        className="h-7 w-32 text-sm rounded-lg"
                      />
                    ) : (
                      <span>{editForm.location || 'Add location'}</span>
                    )}
                  </div>
                )}
                {(isEditing || editForm.website_url) && (
                  <div className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" />
                    {isEditing ? (
                      <Input
                        value={editForm.website_url}
                        onChange={(e) => setEditForm({ ...editForm, website_url: e.target.value })}
                        placeholder="https://..."
                        className="h-7 w-40 text-sm rounded-lg"
                      />
                    ) : (
                      <a href={editForm.website_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        Website
                      </a>
                    )}
                  </div>
                )}
                {(isEditing || editForm.linkedin_url) && (
                  <div className="flex items-center gap-1">
                    <Linkedin className="h-4 w-4" />
                    {isEditing ? (
                      <Input
                        value={editForm.linkedin_url}
                        onChange={(e) => setEditForm({ ...editForm, linkedin_url: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="h-7 w-48 text-sm rounded-lg"
                      />
                    ) : (
                      <a href={editForm.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio Section */}
      <Card className="border-border/50 rounded-2xl">
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              placeholder="Tell us about yourself, your goals, and what you're working on..."
              rows={4}
              className="rounded-xl"
            />
          ) : (
            <p className="text-muted-foreground">
              {editForm.bio || 'Add a bio to tell others about yourself...'}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Skills & Tags */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Your expertise and capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {editForm.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-primary/20 rounded-lg"
                >
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {isEditing && (
                <div className="flex items-center gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill"
                    className="h-7 w-24 text-sm rounded-lg"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button size="sm" variant="outline" onClick={addSkill} className="h-7 rounded-lg">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle>Interests</CardTitle>
            <CardDescription>Topics you are passionate about</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {editForm.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-secondary/10 text-secondary border-secondary/20 rounded-lg"
                >
                  {tag}
                  {isEditing && (
                    <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {isEditing && (
                <div className="flex items-center gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add interest"
                    className="h-7 w-24 text-sm rounded-lg"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button size="sm" variant="outline" onClick={addTag} className="h-7 rounded-lg">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Posts, Projects, Groups */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-xl">
          <TabsTrigger value="posts" className="rounded-lg gap-2">
            <FileText className="h-4 w-4" />
            Posts ({posts.length})
          </TabsTrigger>
          <TabsTrigger value="projects" className="rounded-lg gap-2">
            <Folder className="h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="groups" className="rounded-lg gap-2">
            <Users className="h-4 w-4" />
            Groups ({groups.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-4 space-y-4">
          {posts.length === 0 ? (
            <Card className="border-border/50 rounded-2xl">
              <CardContent className="py-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No posts yet</p>
                <Button variant="outline" className="mt-4 rounded-xl" asChild>
                  <a href="/collaborate">Create your first post</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="border-border/50 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-lg">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <Card className="border-border/50 rounded-2xl">
            <CardContent className="py-8 text-center">
              <Folder className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No projects yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Projects you collaborate on will appear here
              </p>
              <Button variant="outline" className="mt-4 rounded-xl" asChild>
                <a href="/collaborate">Find collaborators</a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="mt-4 space-y-4">
          {groups.length === 0 ? (
            <Card className="border-border/50 rounded-2xl">
              <CardContent className="py-8 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Not in any groups yet</p>
                <Button variant="outline" className="mt-4 rounded-xl" asChild>
                  <a href="/groups">Browse groups</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            groups.map((group) => (
              <Card key={group.id} className="border-border/50 rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <Badge variant="secondary" className="rounded-lg">
                      {group.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{group.description}</p>
                  <Button variant="outline" className="mt-4 rounded-xl" asChild>
                    <a href={`/groups/${group.id}`}>View Group</a>
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
