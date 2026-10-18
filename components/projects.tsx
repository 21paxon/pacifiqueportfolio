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
    title: "Campus Security and Reporting System (CSRS)",
    description: "A campus safety platform for incident reporting, emergency alerts, lost and found, visitor management, patrols, and security dashboards.",
    problem: "Campus safety workflows can become fragmented when incidents, visitor logs, and alerts are handled separately.",
    solution: "Building a centralized system with role-based access, a Node.js/Express API, PostgreSQL, and a web frontend.",
    image: "/task-management-dashboard.png",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT", "JavaScript"],
    github: "https://github.com/21paxon/csrs",
    live: "https://rp-csrs.vercel.app/home.html#register",
  },
  {
    title: "Bus Booking System",
    description: "A full-stack bus booking project for trip schedules, reservations, user accounts, and administrator management.",
    problem: "Booking workflows need reliable trip information and consistent reservation handling.",
    solution: "Developing a Spring Boot REST API with an Angular and TypeScript frontend and PostgreSQL data storage.",
    image: "/modern-ecommerce-interface.png",
    tech: ["Java", "Spring Boot", "Angular", "TypeScript", "PostgreSQL"],
    github: "https://github.com/21paxon/busbooking",
  },
  {
    title: "Machine Learning: Exam Score Prediction",
    description: "A beginner ML project that trains a linear regression model to predict an exam score from study hours using sample data.",
    problem: "Demonstrates how a model can learn a simple relationship from example data.",
    solution: "Prepared training data and used Python with Scikit-learn to fit a model and make predictions.",
    image: "/weather-dashboard-with-maps-and-charts.png",
    tech: ["Python", "Scikit-learn", "Linear Regression"],
    github: "https://github.com/21paxon/ML_Project",
  },
  {
    title: "Data Analysis and Regression Practice",
    description: "R practice covering exploratory data analysis, classical regression, and simple linear regression.",
    problem: "Data needs to be explored and summarized before drawing conclusions from a statistical model.",
    solution: "Practising data inspection, visualization and regression workflows using R and data-analysis packages.",
    image: "/weather-dashboard-with-maps-and-charts.png",
    tech: ["R", "Tidyverse", "Exploratory Data Analysis", "Regression"],
    github: "https://github.com/21paxon/ML_PRACTICE",
  },
  {
    title: "Hostel Management System",
    description: "An Android application project for managing students, hostel rooms, and room allocations.",
    problem: "Hostel administrators need a structured way to manage accommodation records and allocations.",
    solution: "Combines an Android client with API integration to a Node.js/Express backend and PostgreSQL database.",
    image: "/task-management-dashboard.png",
    tech: ["Kotlin", "Android", "Retrofit", "Node.js", "PostgreSQL"],
    github: "https://github.com/21paxon/hms",
  },
  {
    title: "USSD Food Menu Application",
    description: "A menu-based USSD application that lets users choose a language and browse food categories and meals in English or Kinyarwanda.",
    problem: "Users should be able to access a simple food menu without needing a smartphone app or internet connection.",
    solution: "Built a USSD interaction flow with Express that handles menu selections and returns the next prompt.",
    image: "/modern-ecommerce-interface.png",
    tech: ["Node.js", "Express", "USSD", "English", "Kinyarwanda"],
    github: "https://github.com/21paxon/ussdfoodapp",
  },
  {
    title: "USSD BMI Application",
    description: "A lightweight USSD-style project for calculating BMI and returning results with English and Kinyarwanda support.",
    image: "/weather-dashboard-with-maps-and-charts.png",
    tech: ["Node.js", "Express", "USSD"],
    github: "https://github.com/21paxon/ussdbmi-app",
  },
  {
    title: "Employee Management Frontend",
    description: "An Angular application project for employee information management and frontend development practice.",
    image: "/task-management-dashboard.png",
    tech: ["Angular", "TypeScript", "Web Development"],
    github: "https://github.com/21paxon/employee-app",
  },
  {
    title: "Spring Boot CRUD Application",
    description: "A Java backend practice project demonstrating create, read, update, and delete operations.",
    image: "/modern-ecommerce-interface.png",
    tech: ["Java", "Spring Boot", "REST API"],
    github: "https://github.com/21paxon/crudsringboot",
  },
  {
    title: "JavaScript Fundamentals Practice",
    description: "A collection of small HTML and JavaScript exercises covering functions, string length, loops, and basic programming logic.",
    problem: "Programming fundamentals improve through short, focused exercises and repeated practice.",
    solution: "Organized standalone browser-based examples to practise JavaScript functions, strings, and loop logic.",
    image: "/modern-ecommerce-interface.png",
    tech: ["JavaScript", "HTML", "Programming Fundamentals"],
    github: "https://github.com/21paxon/Javascriptcourse",
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
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectState>(null)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">Selected work from GitHub</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Projects & Practice</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore software applications, campus security systems, USSD services, IoT concepts, and ongoing data and Machine Learning practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-border overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(project)}
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
              Explore all GitHub repositories <ExternalLink className="h-4 w-4 ml-2" />
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
