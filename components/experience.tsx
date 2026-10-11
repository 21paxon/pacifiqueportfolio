import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

const experiences = [
  {
    title: "IT Instructor",
    company: "Muhanga Technical Center",
    period: "2025–2026",
    description: "Delivered ICT training and supported learners with practical technical exercises.",
    achievements: [
      "Supported hands-on learning in networking and information technology",
      "Guided learners through practical exercises and technical problem-solving",
    ],
  },
  {
    title: "IT Intern",
    company: "Rwanda Information Society Authority (RISA)",
    period: "2025",
    description: "Gained practical exposure to IT support and information technology operations.",
    achievements: [
      "Supported technical troubleshooting and IT-related tasks",
      "Developed practical understanding of workplace IT processes",
    ],
  },
  {
    title: "IT Support",
    company: "VTC Ltd",
    period: "2024",
    description: "Supported users with day-to-day IT needs and basic system maintenance.",
    achievements: [
      "Assisted with user support and technical issue resolution",
      "Helped maintain computer systems and software",
    ],
  },
  {
    title: "Bachelor of Technology in Information Technology",
    company: "Rwanda Polytechnic – Musanze College",
    period: "2026–Present",
    description: "Continuing studies in Information Technology, with interests in software development, networking, IoT, and Machine Learning.",
    achievements: [],
    isEducation: true,
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">My journey</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Experience & Education</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical work, teaching, and continued learning in information technology.
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card key={exp.title} className="border-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-foreground">{exp.title}</CardTitle>
                    <CardDescription className="text-accent font-medium text-base">{exp.company}</CardDescription>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm shrink-0">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    {exp.period}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="text-muted-foreground text-sm flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.isEducation && (
                  <div className="pt-4 border-t border-border mt-4">
                    <span className="text-sm text-muted-foreground font-medium">Currently studying</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
