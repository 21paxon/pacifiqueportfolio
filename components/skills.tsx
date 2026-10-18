"use client"

import { Code2, Database, Network, Cpu, ShieldCheck, BrainCircuit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skillCategories = [
  {
    title: "Software Development",
    description: "Building applications and APIs",
    icon: Code2,
    skills: ["Java", "Spring Boot", "JavaScript", "TypeScript", "Angular", "Python", "Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Databases & Data",
    description: "Working with application data and analysis",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "SQL", "R", "Pandas", "Tidyverse", "Exploratory Data Analysis"],
  },
  {
    title: "Networking & Systems",
    description: "Connecting and supporting systems",
    icon: Network,
    skills: ["Cisco Networking", "Linux", "Network Configuration", "System Administration", "IT Support", "Troubleshooting"],
  },
  {
    title: "IoT & Embedded Systems",
    description: "Connecting sensors and devices",
    icon: Cpu,
    skills: ["ESP32", "Arduino", "Sensors", "Wi-Fi Connectivity", "Web Dashboards"],
  },
  {
    title: "Cybersecurity",
    description: "Building security awareness into technology",
    icon: ShieldCheck,
    skills: ["Cybersecurity Fundamentals", "Network Security", "Role-Based Access", "Secure System Practices"],
  },
  {
    title: "Machine Learning & Statistics",
    description: "Learning and practising data-driven methods",
    icon: BrainCircuit,
    skills: ["Python", "Scikit-learn", "Linear Regression", "R Regression", "Model Evaluation"],
  },
  {
    title: "Mobile & Integration",
    description: "Exploring mobile applications and connected services",
    icon: Code2,
    skills: ["Kotlin", "Android", "Retrofit", "USSD Applications", "API Integration"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">What I work with</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and methods represented in my projects, alongside skills I am continuing to develop through practical work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.title} className="border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-accent/10 p-3 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground text-base">{category.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
