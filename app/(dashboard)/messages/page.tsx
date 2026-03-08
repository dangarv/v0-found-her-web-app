"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock data
const mockConversations = [
  {
    id: "1",
    other_participant: {
      id: "user1",
      full_name: "Veronica Torres",
      avatar_url: null,
    },
    last_message: {
      content: "That sounds great! Let me know when you're free to chat about the project.",
      created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      is_read: false,
    },
  },
  {
    id: "2",
    other_participant: {
      id: "user2",
      full_name: "Camila Rodriguez",
      avatar_url: null,
    },
    last_message: {
      content: "Thanks for connecting! I'd love to learn more about your experience with climate tech.",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      is_read: true,
    },
  },
  {
    id: "3",
    other_participant: {
      id: "user3",
      full_name: "Sofia Herrera",
      avatar_url: null,
    },
    last_message: {
      content: "The research paper is coming along nicely. I'll send you the draft by tomorrow.",
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      is_read: true,
    },
  },
]

const mockMessages = [
  {
    id: "m1",
    sender_id: "other",
    content: "Hi! I saw your collaboration post about the EdTech startup. It sounds really interesting!",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "m2",
    sender_id: "me",
    content: "Thank you! Yes, I'm really excited about it. Are you interested in potentially collaborating?",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
  },
  {
    id: "m3",
    sender_id: "other",
    content: "Definitely! I have experience in product management and would love to help shape the roadmap.",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "m4",
    sender_id: "me",
    content: "That's exactly what we need! When are you free for a call this week?",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "m5",
    sender_id: "other",
    content: "That sounds great! Let me know when you're free to chat about the project.",
    created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    // TODO: Implement Supabase insert
    setNewMessage("")
  }

  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="flex h-full gap-4">
        {/* Conversations List */}
        <Card className="w-full md:w-80 shrink-0 border-border/50 flex flex-col">
          <div className="p-4 border-b border-border/50">
            <h1 className="text-xl font-bold text-foreground mb-3">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 text-left hover:bg-muted/50 transition-colors border-b border-border/50 ${
                  selectedConversation?.id === conversation.id ? "bg-muted/50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-sm font-semibold text-primary">
                      {conversation.other_participant.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground truncate">
                        {conversation.other_participant.full_name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatDistanceToNow(new Date(conversation.last_message.created_at), {
                          addSuffix: false,
                        })}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        !conversation.last_message.is_read
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {conversation.last_message.content}
                    </p>
                  </div>
                  {!conversation.last_message.is_read && (
                    <div className="h-2 w-2 rounded-full bg-accent shrink-0 mt-2" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="hidden md:flex flex-1 border-border/50 flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-border/50 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <span className="text-sm font-semibold text-primary">
                    {selectedConversation.other_participant.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {selectedConversation.other_participant.full_name}
                  </p>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        message.sender_id === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender_id === "me"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
