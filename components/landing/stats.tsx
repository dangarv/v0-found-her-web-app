export function Stats() {
  const stats = [
    { value: "$2M+", label: "Funding Accessed", description: "Through our platform" },
    { value: "1,200+", label: "Successful Matches", description: "Collaborations formed" },
    { value: "85%", label: "Success Rate", description: "Application acceptances" },
    { value: "24/7", label: "Global Access", description: "Available anywhere" },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary p-8 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
              Making a real impact
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
              Join thousands of young women who have already transformed their futures through FoundHer.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="mt-2 text-lg font-medium text-primary-foreground">{stat.label}</p>
                <p className="text-sm text-primary-foreground/70">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
