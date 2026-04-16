"use client"

"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Download, MapPin, Mail, Phone, Github, Linkedin, ArrowDownRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"



export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (

    <section id="home" className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-sm text-muted-foreground mb-8">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Available for opportunities
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent tracking-tight mb-4">
              {site.name}
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-6">
              {site.subtitle}
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              {site.valueStatement}
            </p>


            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                {site.location}
              </span>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4 text-accent" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\\s/g, '')}`}
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                {site.phone}
              </a>
            </div>

            {/* Certifications */}
            <div className="mt-4">
              <span className="text-xs text-muted-foreground font-medium mr-2">Certifications:</span>
              <div className="flex flex-wrap gap-2">
                {site.certifications.slice(0, 3).map((cert, idx) => (
                  <span key={idx} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md">
                    {cert}
                  </span>
                ))}
                {site.certifications.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                    +{site.certifications.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="mt-2">
              <span className="text-xs text-muted-foreground font-medium mr-2">Languages:</span>
              <div className="flex flex-wrap gap-2">
                {site.languages.map((lang, idx) => (
                  <span key={idx} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md">
                    {lang.name} ({lang.level})
                  </span>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-12"
            >
              <motion.div className="flex gap-3">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
                  <a href="#projects">
                    View Projects
                    <ArrowDownRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#contact">Contact Me</a>
                </Button>
              </motion.div>
              <motion.div className="flex gap-2">
                <Button asChild variant="ghost" size="lg" aria-label="Download CV">
                  <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" download>
                    <Download className="h-5 w-5 mr-2" />
                    Download CV
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg" aria-label="GitHub">
                  <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg" aria-label="LinkedIn">
                  <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </motion.div>
            </motion.div>

          </div>

          <div className="justify-self-center lg:justify-self-end">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 to-transparent blur-2xl" />
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-4 border-border/50 ring-2 ring-accent/20 shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-3xl hover:ring-accent/40 bg-gradient-to-br from-background to-muted">
                    <Image
                      src="/profile-pacifique.jpg"
                      alt={site.name}
                      fill
                      sizes="(max-width: 640px) 176px, 224px, 256px"
                      className="object-cover hover:brightness-110 transition-all duration-300"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-400 rounded-full border-4 border-background shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-ping" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-6xl max-w-7xl p-0 max-h-[95vh] border-0 bg-transparent shadow-none">
                <div className="relative w-full h-full p-8">
                  <Image
                    src="/profile-pacifique.jpg"
                    alt={site.name}
                    fill
                    className="object-contain rounded-3xl cursor-zoom-in hover:scale-110 transition-transform duration-200"
                    priority
                  />
                </div>
              </DialogContent>

            </Dialog>
          </div>


        </div>
      </div>
    </section>
  )
}

