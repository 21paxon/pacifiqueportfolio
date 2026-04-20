"use client"

import { BriefcaseBusiness } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HireMeButtonProps = {
  targetId?: string
  className?: string
  label?: string
  href?: string
}

export function HireMeButton({
  targetId = "contact",
  className,
  label = "Hire Me",
  href,
}: HireMeButtonProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = () => {
    if (pathname !== "/") {
      router.push(`/#${targetId}`)
      return
    }

    const targetSection = document.getElementById(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }

    window.location.hash = `#${targetId}`
  }

  if (href) {
    return (
      <Button
        asChild
        size="lg"
        aria-label="Hire me"
        className={cn(
          "w-full rounded-xl bg-[#2563eb] text-sm font-semibold text-white",
          "shadow-[0_10px_28px_rgba(37,99,235,0.35)] transition-all duration-300",
          "hover:scale-[1.03] hover:bg-[#1d4ed8] hover:shadow-[0_16px_34px_rgba(29,78,216,0.45)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "sm:w-auto",
          className,
        )}
      >
        <a href={href}>
          <BriefcaseBusiness className="h-4 w-4" />
          {label}
        </a>
      </Button>
    )
  }

  return (
    <Button
      type="button"
      size="lg"
      onClick={handleClick}
      aria-label="Hire me"
      className={cn(
        "w-full rounded-xl bg-[#2563eb] text-sm font-semibold text-white",
        "shadow-[0_10px_28px_rgba(37,99,235,0.35)] transition-all duration-300",
        "hover:scale-[1.03] hover:bg-[#1d4ed8] hover:shadow-[0_16px_34px_rgba(29,78,216,0.45)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "sm:w-auto",
        className,
      )}
    >
      <BriefcaseBusiness className="h-4 w-4" />
      {label}
    </Button>
  )
}
