"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { MapPin, Link as LinkIcon, Linkedin, Save } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    full_name: "Jane Doe",
    email: "jane@example.com",
    bio: "Software engineer passionate about building products that empower women. Currently exploring opportunities in AI and EdTech.",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Node.js", "Python", "AI/ML"],
    interests: ["EdTech", "Women in Tech", "AI", "Startups"],
    linkedin_url: "https://linkedin.com/in/janedoe",
    website_url: "https://janedoe.dev",
    is_looking_for_collaborators: true,
  })

  const handleSave = async () => {
    // TODO: Implement Supabase update
    setIsEditing(false)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your profile information and preferences.
          </p>
        </div>
        <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
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

      {/* Profile Header */}
      <Card className="border-border/50 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 to-accent/30" />
        <CardContent className="relative pt-0 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-card border-4 border-card shadow-lg">
              <span className="text-3xl font-bold text-primary">
                {profile.full_name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{profile.full_name}</h2>
              <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-muted-foreground">
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.website_url && (
                  <a
                    href={profile.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span>Website</span>
                  </a>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Your public profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={profile.email} disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              disabled={!isEditing}
              placeholder="City, Country"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={!isEditing}
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills & Interests */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Skills & Interests</CardTitle>
          <CardDescription>Help us match you with the right opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {skill}
                </span>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" className="rounded-full">
                  + Add Skill
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Interests</Label>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm"
                >
                  {interest}
                </span>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" className="rounded-full">
                  + Add Interest
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>Add your social profiles and website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={profile.linkedin_url}
              onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
              disabled={!isEditing}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              value={profile.website_url}
              onChange={(e) => setProfile({ ...profile, website_url: e.target.value })}
              disabled={!isEditing}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Control your visibility and matching preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Open to Collaboration</Label>
              <p className="text-sm text-muted-foreground">
                Show that you are looking for collaborators on projects
              </p>
            </div>
            <Switch
              checked={profile.is_looking_for_collaborators}
              onCheckedChange={(checked) =>
                setProfile({ ...profile, is_looking_for_collaborators: checked })
              }
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
