import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

const experiences = [
  {
    title: "IT Instructor", 
    company: "Muhanga Technical Center",
    period: "2025 – Present",
    description: "Train students in software development and networking fundamentals. Supervise and guide real-world technical projects.",
    achievements: [
      "Deliver hands-on training in Java Spring Boot, AngularJS, and networking",
      "Guide student projects from concept to deployment", 
      "Mentor on cybersecurity best practices and IoT implementations"
    ],
  },
  {
    title: "IT Consultant",
    company: "RISA",
    period: "2025",
    description: "Supported IT infrastructure, system deployment, and troubleshooting.",
    achievements: [
      "Assisted in system deployment and configuration",
      "Provided technical troubleshooting and support",
      "Contributed to IT infrastructure improvements"
    ],
  },
  {
    title: "IT Support", 
    company: "VTC Ltd",
    period: "2024",
    description: "Provided technical support, system maintenance, and deployment.",
    achievements: [
      "Handled system maintenance and user support",
      "Managed software deployments and updates",
      "Resolved technical issues for end-users"
    ],
  },
  {
    title: "Bachelor's Degree in Information Technology",
    company: "RP Musanze College",
    period: "2023–2025", 
    description: "Pursuing comprehensive IT education covering software development, networking, and systems.",
    achievements: [], // Education entry
    isEducation: true
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Results-driven IT professional with experience in software development, networking, cybersecurity, and IoT systems
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-foreground">{exp.title}</CardTitle>
                    <CardDescription className="text-accent font-medium text-base">{exp.company}</CardDescription>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {exp.period}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4">{exp.description}</p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-muted-foreground text-sm flex items-start">
                          <span className="text-accent mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {exp.isEducation && (
                  <div className="pt-4 border-t border-border mt-4">
                    <span className="text-sm text-muted-foreground font-medium">Education</span>
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
