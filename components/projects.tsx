"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { ProjectModal } from "./project-modal"
import { site } from "@/lib/site"

type Project = {
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  live?: string
  problem?: string
  solution?: string
}

type ProjectState = Project | null

const projects: Project[] = [
  {
    title: "Bus Booking System",
    description: "A booking application project focused on trip management, reservations, and backend API development.",
    problem: "Trip and reservation workflows need clear data handling and reliable backend endpoints.",
    solution: "Developing a Spring Boot backend to organize trips and bookings through REST APIs.",
    image: "/modern-ecommerce-interface.png",
    tech: ["Java", "Spring Boot", "Maven", "REST API"],
    github: "https://github.com/21paxon/busbooking",
  },
  {
    title: "Smart Security System Using IoT",
    description: "An IoT project concept for monitoring restricted spaces and supporting remote security alerts.",
    problem: "Restricted rooms can benefit from timely movement detection and remote monitoring.",
    solution: "Exploring ESP32-based sensing, Wi-Fi connectivity, and a web dashboard for security monitoring.",
    image: "/task-management-dashboard.png",
    tech: ["ESP32", "IoT", "Sensors", "Wi-Fi", "Dashboard"],
    github: "https://github.com/21paxon",
  },
  {
    title: "Machine Learning Practice",
    description: "Learning the end-to-end Machine Learning workflow, from preparing data to training and evaluating models.",
    image: "/weather-dashboard-with-maps-and-charts.png",
    tech: ["Python", "Pandas", "Scikit-learn", "Regression"],
    github: "https://github.com/21paxon/ML_Project",
  },
  {
    title: "Spring Boot CRUD Application",
    description: "A practice application demonstrating create, read, update, and delete operations with a Java backend.",
    image: "/modern-ecommerce-interface.png",
    tech: ["Java", "Spring Boot", "REST API"],
    github: "https://github.com/21paxon/crudsringboot",
  },
  {
    title: "Employee Management App",
    description: "An application project for managing employee information and connecting frontend screens to backend services.",
    image: "/task-management-dashboard.png",
    tech: ["Angular", "REST API"],
    github: "https://github.com/21paxon/employee-app",
  },
  {
    title: "USSD BMI Application",
    description: "A lightweight USSD-style application concept for calculating and returning BMI information.",
    image: "/weather-dashboard-with-maps-and-charts.png",
    tech: ["Node.js", "Express", "USSD"],
    github: "https://github.com/21paxon/ussdbmi-app",
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectState>(null)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">Selected work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects and learning work across backend development, connected devices, and data-driven applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-border overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(projects[index])}
            >
              <div className="overflow-hidden rounded-t-lg h-48 relative">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">View project details</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-foreground line-clamp-2 group-hover:text-accent transition-colors">{project.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-muted-foreground">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1" onClick={(event) => event.stopPropagation()}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" /> Code
                    </a>
                  </Button>
                  {project.live && (
                    <Button asChild size="sm" className="flex-1" onClick={(event) => event.stopPropagation()}>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" /> Live demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
              Explore all repositories <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>

        {selectedProject && (
          <ProjectModal project={selectedProject} isOpen={true} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </section>
  )
}
