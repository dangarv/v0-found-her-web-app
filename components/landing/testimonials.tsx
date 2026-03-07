import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "FoundHer helped me find a scholarship that changed my life. I'm now pursuing my dream of studying computer science at MIT.",
    author: "Priya Sharma",
    role: "Computer Science Student",
    location: "India",
  },
  {
    quote: "I found my co-founder through the collaboration feature. We're now building a startup that empowers women in STEM.",
    author: "Maria Santos",
    role: "Startup Founder",
    location: "Brazil",
  },
  {
    quote: "The community here is incredible. I've received mentorship and support that helped me land my dream internship.",
    author: "Aisha Mbeki",
    role: "Business Student",
    location: "Kenya",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Stories from our community
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Hear from women who have found success through FoundHer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="bg-card border-border/50">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 text-pretty">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
