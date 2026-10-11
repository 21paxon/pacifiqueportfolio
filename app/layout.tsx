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
  title: "Pacifique Niyogushimwa | Software Developer, Network Engineer & IoT",
  description:
    "Portfolio of Pacifique Niyogushimwa, an IT professional in Kigali, Rwanda, focused on software development, networking, IoT systems, and Machine Learning.",
  keywords: [
    "Pacifique Niyogushimwa",
    "Software Developer Rwanda",
    "Full-Stack Developer Kigali",
    "Network Engineer",
    "IoT Developer",
    "Spring Boot",
    "Angular",
  ],
  openGraph: {
    title: "Pacifique Niyogushimwa | Technology Portfolio",
    description:
      "Explore software development, networking, and IoT projects by Pacifique Niyogushimwa.",
    type: "website",
    locale: "en_RW",
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
