"use client"
import { useState } from "react"
import {

  MapPin,
  Mail,
  Code2,
  Database,
  Globe,
  Server,
  Menu,
  Github,
  Linkedin,
  ExternalLink,
  Network,
} from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"


export function Hero() {
  const skills = [
    { name: "Spring Boot", category: "Backend", icon: Server },
    { name: "Angular", category: "Frontend", icon: Globe },
    { name: "JavaScript", category: "Frontend", icon: Code2 },
    { name: "Node.js", category: "Backend", icon: Server },
    { name: "PHP", category: "Backend", icon: Code2 },
    { name: "Laravel", category: "Backend", icon: Server },
    { name: "Python", category: "Backend", icon: Code2 },
    { name: "MySQL", category: "Database", icon: Database },
    { name: "MongoDB", category: "Database", icon: Database },
    { name: "PostgreSQL", category: "Database", icon: Database },
    { name: "Network Configuration", category: "Networking", icon: Network },
    { name: "Network Security", category: "Networking", icon: Network },
    { name: "System Administration", category: "Networking", icon: Network },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-slate-950 text-lg sm:text-xl shadow-lg">
                PN
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-white">Pacifique NIYOGUSHIMWA</h1>
                <p className="text-xs sm:text-sm text-slate-400">Full-Stack Developer</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#about"
                className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
            </nav>

            {/* Social Links & Menu */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800/50 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <Github className="w-4 h-4 text-slate-300" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800/50 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <Linkedin className="w-4 h-4 text-slate-300" />
              </a>
              <button className="md:hidden w-9 h-9 bg-slate-800/50 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-200">
                <Menu className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-32">
        <div id="about" className="text-center mb-8 sm:mb-12">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer inline-block mb-6 sm:mb-8">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-all duration-300 -z-10" />
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-3xl overflow-hidden mx-auto shadow-2xl border-4 border-slate-700/30 ring-2 ring-emerald-400/30 hover:shadow-emerald/20 hover:border-emerald-400/50 hover:scale-[1.02] transition-all duration-500 bg-gradient-to-br from-slate-800 to-slate-900/50">
                    <Image
                      src="/profile-pacifique.jpg"
                      alt="Pacifique NIYOGUSHIMWA"
                      fill
                      sizes="(max-width: 640px) 144px, 176px, 208px"
                      className="w-full h-full object-cover hover:brightness-105 group-hover:contrast-110 transition-all duration-500"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-emerald-400/90 backdrop-blur-sm rounded-full border-4 border-slate-900 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 animate-pulse">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full shadow-lg animate-ping" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-6xl max-w-7xl p-0 max-h-[95vh] border-0 bg-transparent shadow-none">
                <div className="relative w-full h-full p-8">
                  <Image
                    src="/profile-pacifique.jpg"
                    alt="Pacifique NIYOGUSHIMWA"
                    fill
                    className="object-contain rounded-3xl cursor-zoom-in hover:scale-110 transition-transform duration-200"
                    priority
                  />
                </div>
              </DialogContent>

            </Dialog>



          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-wide text-balance">
            PACIFIQUE
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 mb-3 sm:mb-4 tracking-wide text-balance">
            NIYOGUSHIMWA
          </h2>
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-medium">Spring Boot & Angular Developer</p>
        </div>

        <div className="mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 mb-6 sm:mb-8 text-center text-balance">
            Welcome!
          </h3>

          <div id="contact" className="grid gap-4 sm:gap-6 sm:grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center gap-3 sm:gap-4 text-white bg-slate-900/40 rounded-2xl p-4 sm:p-5 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
              <span className="text-base sm:text-lg font-medium">Kigali - Rwanda</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-white bg-slate-900/40 rounded-2xl p-4 sm:p-5 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
              <span className="text-sm sm:text-base lg:text-lg font-medium break-all">
                niyogushimwapacifique6@gmail.com
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-emerald-400/10 via-emerald-400/5 to-transparent border-l-4 border-emerald-400 rounded-r-2xl p-5 sm:p-6 lg:p-8 bg-slate-900/30 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400 mb-4 sm:mb-6 text-balance">
              A little bit about me...
            </h3>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg lg:text-xl text-pretty">
              Passionate Full-Stack Developer with expertise in modern web technologies. I specialize in building
              scalable enterprise applications using Spring Boot, Angular, and various backend technologies including
              Node.js, PHP, Laravel, and Python. I focus on delivering clean, maintainable code and exceptional user
              experiences.
            </p>
          </div>
        </div>

        <div id="skills" className="mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 mb-6 sm:mb-8 text-center text-balance">
            Technical Expertise
          </h3>

          {/* Technology Categories */}
          <div className="grid gap-6 sm:gap-8 mb-8">
            {/* Frontend Technologies */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-white">Frontend Development</h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {skills
                  .filter((skill) => skill.category === "Frontend")
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-slate-800/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <skill.icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Backend Technologies */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-white">Backend Development</h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skills
                  .filter((skill) => skill.category === "Backend")
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-slate-800/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <skill.icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Database Technologies */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-white">Database & Storage</h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skills
                  .filter((skill) => skill.category === "Database")
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-slate-800/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <skill.icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Networking Technologies */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                  <Network className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-white">Networking & Infrastructure</h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skills
                  .filter((skill) => skill.category === "Networking")
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-slate-800/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <skill.icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 lg:grid-cols-3">
            <div className="bg-gradient-to-br from-emerald-400/10 to-emerald-600/5 border border-emerald-400/20 rounded-2xl p-5 sm:p-6 backdrop-blur-sm hover:from-emerald-400/15 hover:to-emerald-600/10 transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Full-Stack</h4>
                <p className="text-slate-300 text-sm">End-to-end application development</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-400/10 to-blue-600/5 border border-blue-400/20 rounded-2xl p-5 sm:p-6 backdrop-blur-sm hover:from-blue-400/15 hover:to-blue-600/10 transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Server className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Enterprise</h4>
                <p className="text-slate-300 text-sm">Scalable business solutions</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-400/10 to-purple-600/5 border border-purple-400/20 rounded-2xl p-5 sm:p-6 backdrop-blur-sm hover:from-purple-400/15 hover:to-purple-600/10 transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Data-Driven</h4>
                <p className="text-slate-300 text-sm">Robust database architecture</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg">
                  PN
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Pacifique NIYOGUSHIMWA</h3>
                  <p className="text-sm text-slate-400">Full-Stack Developer</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Building scalable web applications with modern technologies and best practices.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                <a
                  href="#about"
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  About Me
                </a>
                <a
                  href="#skills"
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Technical Skills
                </a>
                <a
                  href="#projects"
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Contact & Social */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">niyogushimwapacifique6@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">Kigali, Rwanda</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800/50 hover:bg-emerald-400/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 group"
                >
                  <Github className="w-4 h-4 text-slate-300 group-hover:text-emerald-400" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800/50 hover:bg-emerald-400/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 group"
                >
                  <Linkedin className="w-4 h-4 text-slate-300 group-hover:text-emerald-400" />
                </a>
                <a
                  href="mailto:niyogushimwapacifique6@gmail.com"
                  className="w-9 h-9 bg-slate-800/50 hover:bg-emerald-400/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 group"
                >
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800/50 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">© 2024 Pacifique NIYOGUSHIMWA. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-slate-400">Built with</span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-medium">Next.js</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-medium">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
