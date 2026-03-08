"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const testimonials = [
  {
    quote: {
      en: "FoundHer helped me find a scholarship that changed my life. I'm now pursuing my dream of studying computer science at MIT.",
      es: "FoundHer me ayudó a encontrar una beca que cambió mi vida. Ahora estoy persiguiendo mi sueño de estudiar ciencias de la computación en MIT."
    },
    author: "Priya Sharma",
    role: { en: "Computer Science Student", es: "Estudiante de Ciencias de la Computación" },
    location: { en: "India", es: "India" },
  },
  {
    quote: {
      en: "I found my co-founder through the collaboration feature. We're now building a startup that empowers women in STEM.",
      es: "Encontré a mi cofundadora a través de la función de colaboración. Ahora estamos construyendo una startup que empodera a las mujeres en STEM."
    },
    author: "Maria Santos",
    role: { en: "Startup Founder", es: "Fundadora de Startup" },
    location: { en: "Brazil", es: "Brasil" },
  },
  {
    quote: {
      en: "The community here is incredible. I've received mentorship and support that helped me land my dream internship.",
      es: "La comunidad aquí es increíble. He recibido mentoría y apoyo que me ayudaron a conseguir la pasantía de mis sueños."
    },
    author: "Aisha Mbeki",
    role: { en: "Business Student", es: "Estudiante de Negocios" },
    location: { en: "Kenya", es: "Kenia" },
  },
]

export function Testimonials() {
  const { t, language } = useLanguage()
  
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            {t('testimonialsTitle')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            {t('testimonialsSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="bg-card border-border/50 rounded-2xl">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 text-pretty">{testimonial.quote[language]}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role[language]} • {testimonial.location[language]}
                    </p>
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
