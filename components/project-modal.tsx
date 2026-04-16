"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

type ProjectModalProps = {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

interface Project {
  title: string
  description: string
  problem?: string
  solution?: string
  image: string
  tech: string[]
  github: string
  live?: string
}


export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>

        
        <div className="grid lg:grid-cols-2 gap-8 items-start pt-4">
          <div>
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech: string, idx: number) => (
                <Badge key={idx} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Problem Solved</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.problem || "Real-world problem requiring scalable backend and intuitive frontend."}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Solution</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.solution || "Built comprehensive full-stack solution with Spring Boot backend and modern frontend."}
              </p>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button asChild variant="outline">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
              {project.live && (
                <Button asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

