"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Mail, Phone, Github, Linkedin, ArrowDownRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HireMeButton } from "@/components/hire-me-button"
import { site } from "@/lib/site"



export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (

    <section id="home" className="pt-24 pb-14 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="order-2 space-y-6 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-sm text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Available for opportunities
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent tracking-tight leading-tight">
              {site.name}
            </h1>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-accent leading-tight">
              {site.subtitle}
            </h2>
            <p className="text-base sm:text-2xl lg:text-3xl text-muted-foreground max-w-2xl leading-relaxed">
              {site.valueStatement}
            </p>


            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
            <div>
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
            <div>
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
              className="pt-2 space-y-4"
            >
              <motion.div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg sm:w-auto">
                  <a href="#projects">
                    View Projects
                    <ArrowDownRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <a href="#contact">Contact Me</a>
                </Button>
              </motion.div>

              <motion.div className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-xl border-[#3b82f6]/40 bg-[#0b1220] text-[#dbeafe] transition-all duration-300 hover:scale-[1.02] hover:border-[#3b82f6] hover:bg-[#111b30] hover:shadow-[0_10px_30px_rgba(37,99,235,0.25)]"
                  aria-label="Download CV"
                >
                  <a href={site.cvUrl}>
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </Button>

                <HireMeButton
                  label="Hire Me"
                  href={`mailto:${site.email}?subject=Recruiter%20Inquiry%20-%20${encodeURIComponent(site.name)}&body=Hello%20${encodeURIComponent(site.name)},%0A%0AI'm%20a%20recruiter%20interested%20in%20your%20profile.%0A%0ARole:%20%0ACompany:%20%0ALocation:%20%0AEmployment%20Type:%20%0AStart%20Date:%20%0A%0ABest%20regards,%0A`}
                />

                <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto" aria-label="GitHub">
                  <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto" aria-label="LinkedIn">
                  <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </motion.div>
            </motion.div>

          </div>

          <div className="order-1 justify-self-center lg:order-2 lg:justify-self-end lg:-mt-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 to-transparent blur-2xl" />
                  <div className="relative h-36 w-36 rounded-3xl overflow-hidden border-4 border-border/50 ring-2 ring-accent/20 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:ring-accent/40 bg-gradient-to-br from-background to-muted sm:h-48 sm:w-48 lg:h-64 lg:w-64">
                    <Image
                      src="/profile-pacifique.jpg"
                      alt={site.name}
                      fill
                      sizes="(max-width: 640px) 144px, (max-width: 1024px) 192px, 256px"
                      className="object-cover hover:brightness-110 transition-all duration-300"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-background bg-emerald-400 shadow-lg transition-all duration-300 group-hover:scale-110 sm:-bottom-2 sm:-right-2 sm:h-8 sm:w-8">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-ping" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-6xl max-w-7xl p-0 max-h-[95vh] border-0 bg-transparent shadow-none">
                <div className="relative w-full h-full p-4 sm:p-8">
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

