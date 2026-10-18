import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pacifique Niyogushimwa | Full-Stack Developer, Network Engineer & IoT",
  description:
    "Portfolio of Pacifique Niyogushimwa in Kigali, Rwanda, featuring full-stack development, campus security software, bus booking, USSD applications, IoT concepts, and Machine Learning and R data-analysis practice.",
  keywords: [
    "Pacifique Niyogushimwa",
    "Full-Stack Developer Rwanda",
    "Software Developer Kigali",
    "Network Engineer Rwanda",
    "IoT Systems",
    "Java",
    "Spring Boot",
    "Angular",
    "Node.js",
    "PostgreSQL",
    "Machine Learning",
    "R Data Analysis",
    "Campus Security and Reporting System",
  ],
  openGraph: {
    title: "Pacifique Niyogushimwa | Technology Portfolio",
    description:
      "Explore software applications, networking, campus security, USSD services, IoT concepts, and data-analysis projects by Pacifique Niyogushimwa.",
    type: "website",
    locale: "en_RW",
    url: "https://pacifiqueniyogushimwa.netlify.app/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
