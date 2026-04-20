import { Navigation } from "@/components/navigation"
import { CV } from "@/components/cv"
import { Footer } from "@/components/footer"
import { site } from "@/lib/site"

export const metadata = {
  title: `CV - ${site.name}`,
  description: `${site.name} CV - IT Professional, Software Developer, Cybersecurity, IoT`,
}

export default function CVPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <CV />
      <Footer />
    </main>
  )
}
