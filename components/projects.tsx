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
    title: "Smart Security System (IoT)",
    description: "Real-time monitoring and alert system using IoT sensors for enhanced security.",
    problem: "Businesses needed better security monitoring without constant manual oversight.",
    solution: "Built IoT sensor network with real-time alerts and dashboard for instant monitoring.",
    image: "/task-management-dashboard.png",
    tech: ["IoT", "Sensors", "Real-time", "Dashboard"],
    github: "https://github.com/21paxon",
    live: undefined
  },
  {
    title: "Bus Booking System (Spring Boot)",
    description: "RESTful backend for bus reservation and scheduling system.",
    problem: "Manual bus booking process was inefficient for operators and passengers.",
    solution: "Developed scalable Spring Boot backend with REST APIs and MySQL database.",
    image: "/modern-ecommerce-interface.png",
    tech: ["Spring Boot", "REST APIs", "MySQL", "PostgreSQL"],
    github: "https://github.com/21paxon/busbooking"
  },

  {
    title: "Inventory Management System",
    description: "Designed backend logic and database integration for inventory tracking.",
    image: "/weather-dashboard-with-maps-and-charts.png", 
    tech: ["Java", "Spring Boot", "MySQL"],
    github: "https://github.com/21paxon"
  },
  {
    title: "IoT Patient Monitoring System",
    description: "Developed system for real-time health monitoring using sensors.",
    image: "/task-management-dashboard.png",
    tech: ["IoT", "Sensors", "Real-time"],
    github: "https://github.com/21paxon"
  },
  {
    title: "CRUD Spring Boot",
    description: "CRUD operations app built with Spring Boot and REST APIs.",
    image: "/modern-ecommerce-interface.png",
    tech: ["Spring Boot", "Java", "REST APIs"],
    github: "https://github.com/21paxon/crudsringboot"
  },
  {
    title: "Employee Management App",
    description: "Employee management application with backend integration.",
    image: "/weather-dashboard-with-maps-and-charts.png",
    tech: ["AngularJS", "REST APIs"],
    github: "https://github.com/21paxon/employee-app"
  }
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectState>(null)


  return (

    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hands-on projects demonstrating skills in IoT, Spring Boot, REST APIs, and real-world system development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-border overflow-hidden cursor-pointer" onClick={() => setSelectedProject(projects[index])}>
              <div className="overflow-hidden rounded-t-lg h-48 relative">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-bold text-sm">View Details</span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-foreground line-clamp-1 group-hover:text-accent">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-muted-foreground">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  </Button>
                  {project.live && (
                    <Button asChild size="sm" className="flex-1 bg-accent/90 hover:bg-accent">
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
              View All Repositories (25+)
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>

        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            isOpen={true} 
            onClose={() => setSelectedProject(null)} 
          />
        )}

      </div>
    </section>
  )
}

