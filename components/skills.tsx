import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "AngularJS", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Java", level: 95 },
      { name: "Spring Boot", level: 92 },
      { name: "REST APIs", level: 90 },
      { name: "MySQL", level: 88 },
    ],
  },
  {
    title: "IoT & Systems",
    skills: [
      { name: "IoT Development", level: 85 },
    ],
  },
  {
    title: "Cybersecurity & Networking",
    skills: [
      { name: "Cybersecurity", level: 90 },
      { name: "Networking", level: 88 },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Core technical skills and proficiency levels from my professional experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
