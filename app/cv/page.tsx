import { Navigation } from "@/components/navigation"
import { CV } from "@/components/cv"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "CV - Pacifique Niyogushimwa",
  description: "Pacifique Niyogushimwa CV - IT Professional, Software Developer, Cybersecurity, IoT",
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
