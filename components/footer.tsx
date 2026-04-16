import { Github, Linkedin, Mail } from "lucide-react"
import { site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-semibold">{site.name}</div>
            <div className="text-sm text-muted-foreground">{site.role}</div>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              className="hover:text-foreground transition-colors"
              href={`mailto:${site.email}`}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              className="hover:text-foreground transition-colors"
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              className="hover:text-foreground transition-colors"
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

