"use client"

import Link from "next/link"
import { site } from "@/lib/site"

export function CV() {
  const skills = ["Java", "Spring Boot", "Angular", "Node.js", "MySQL", "REST APIs", "IoT", "Cybersecurity", "Networking"]
  const certifications = [
    "Software Development - DTP",
    "Cybersecurity - DTP",
    "AI Career Essentials - ALX Africa",
    "EF SET English Certificate (B2)",
  ]

  return (
    <>
      <div className="mx-auto mt-6 flex max-w-[1000px] items-center justify-between gap-3 px-4 sm:px-0 print:hidden">
        <Link
          href="/"
          className="rounded-md border border-[#b6cae0] bg-white px-4 py-2 text-sm font-medium text-[#1f4d7d] transition hover:bg-[#f3f8fe]"
          aria-label="Back to portfolio"
        >
          Back to Portfolio
        </Link>
        <button
          onClick={() => window.print()}
          className="rounded-md bg-[#0a66c2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0856a3]"
          aria-label="Download CV as PDF"
        >
          Download PDF
        </button>
      </div>
      <style jsx global>{`
        #cv-root {
          font-family: "Source Serif 4", "Georgia", "Times New Roman", serif;
        }

        #cv-root .cv-label,
        #cv-root .cv-chip,
        #cv-root .cv-meta,
        #cv-root .cv-body {
          font-family: "IBM Plex Sans", "Segoe UI", "Helvetica Neue", sans-serif;
        }

        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          #cv-root {
            box-shadow: none !important;
            margin: 0 !important;
            max-width: 100% !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
      <div
        id="cv-root"
        className="mx-auto my-8 max-w-[1000px] overflow-hidden rounded-2xl border border-[#d6dfeb] bg-white shadow-[0_24px_60px_rgba(18,42,66,0.2)]"
      >
        <header className="relative overflow-hidden border-b border-[#d6dfeb] bg-[linear-gradient(130deg,#0f3058_0%,#124a86_42%,#2679c8_100%)] px-6 py-8 text-white md:px-8">
          <div className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 right-0 h-44 w-44 rounded-full bg-[#7fd8ff]/30 blur-2xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="cv-label text-xs uppercase tracking-[0.22em] text-white/80">Curriculum Vitae</p>
              <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">{site.name}</h1>
              <p className="cv-body mt-2 max-w-2xl text-sm text-white/90 md:text-base">
                Full-Stack Developer focused on software development, networking, cybersecurity, and IoT systems.
              </p>
            </div>

            <div className="cv-meta grid gap-1 text-sm md:text-right">
                <p>{site.location}</p>
                <p>{site.phone}</p>
                <p>{site.email}</p>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-[280px_1fr]">
          <aside className="border-b border-[#d6dfeb] bg-[#f6f9fc] px-6 py-7 md:border-b-0 md:border-r md:px-7 md:py-8">
            <h2 className="cv-label text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Profile Links</h2>
            <div className="cv-body mt-3 space-y-1.5 text-[13px] leading-6 text-[#21456b]">
              <p>
                <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] hover:underline">
                  LinkedIn Profile
                </a>
              </p>
              <p>
                <a href={site.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] hover:underline">
                  Portfolio Website
                </a>
              </p>
              <p>
                <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] hover:underline">
                  GitHub Profile
                </a>
              </p>
            </div>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Core Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="cv-chip rounded-full border border-[#c8d8eb] bg-white px-3 py-1 text-[12px] font-medium text-[#15406b]">
                  {skill}
                </span>
              ))}
            </div>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Certifications</h2>
            <ul className="cv-body mt-3 list-disc space-y-1 pl-5 text-[13px] text-[#1d4266]">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Languages</h2>
            <p className="cv-body mt-2 text-[13px] text-[#1d4266]">English (B2)</p>
            <p className="cv-body text-[13px] text-[#1d4266]">Kinyarwanda (Native)</p>
          </aside>

          <section className="px-6 py-7 text-[#1d2733] md:px-8 md:py-8">
            <h2 className="cv-label text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Professional Summary</h2>
            <p className="cv-body mt-3 text-[14px] leading-[1.7] text-[#2e3945]">
              Results-driven Full-Stack Developer with strong experience in software development, networking, cybersecurity, and IoT systems.
              Skilled in Java, Spring Boot, Angular, and backend API development with hands-on experience building scalable applications,
              secure backend systems, and practical smart solutions.
            </p>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Professional Experience</h2>
            <div className="mt-3 space-y-4">
              <div className="rounded-xl border border-[#d6dfeb] bg-[#fbfdff] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="cv-body text-[14px] font-semibold text-[#1e3349]">IT Instructor - Muhanga Technical Center</p>
                  <span className="cv-meta rounded-full bg-[#dcecff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#124a86]">
                    2025 - Present
                  </span>
                </div>
                <ul className="cv-body mt-2 list-disc pl-5 text-[14px] leading-[1.6] text-[#344455]">
                  <li>Train students in software development and networking fundamentals</li>
                  <li>Supervise and guide real-world technical projects</li>
                </ul>
              </div>

              <div className="rounded-xl border border-[#d6dfeb] bg-[#fbfdff] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="cv-body text-[14px] font-semibold text-[#1e3349]">IT Consultant - RISA</p>
                  <span className="cv-meta rounded-full bg-[#dcecff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#124a86]">
                    2025
                  </span>
                </div>
                <ul className="cv-body mt-2 list-disc pl-5 text-[14px] leading-[1.6] text-[#344455]">
                  <li>Supported IT infrastructure, system deployment, and troubleshooting</li>
                </ul>
              </div>

              <div className="rounded-xl border border-[#d6dfeb] bg-[#fbfdff] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="cv-body text-[14px] font-semibold text-[#1e3349]">IT Support Specialist - VTC Ltd</p>
                  <span className="cv-meta rounded-full bg-[#dcecff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#124a86]">
                    2024
                  </span>
                </div>
                <ul className="cv-body mt-2 list-disc pl-5 text-[14px] leading-[1.6] text-[#344455]">
                  <li>Provided technical support, system maintenance, and deployment services</li>
                </ul>
              </div>
            </div>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Featured Projects</h2>
            <ul className="cv-body mt-3 list-disc space-y-3 pl-5 text-[14px] leading-[1.6] text-[#344455]">
              <li>
                <strong className="text-[#1e3349]">Smart Security System (IoT)</strong>
                <br />
                Developed a real-time monitoring and alert system using IoT sensors with a focus on automation and security efficiency.
              </li>
              <li>
                <strong className="text-[#1e3349]">Bus Booking System (Spring Boot)</strong>
                <br />
                Built a RESTful backend for reservations and scheduling.
                <a href={`${site.portfolioUrl}#projects`} target="_blank" rel="noopener noreferrer" className="ml-1 font-semibold text-[#0a66c2] hover:underline">
                  View Projects
                </a>
              </li>
              <li>
                <strong className="text-[#1e3349]">Inventory Management System</strong>
                <br />
                Designed backend logic and database integration.
              </li>
              <li>
                <strong className="text-[#1e3349]">IoT Patient Monitoring System</strong>
                <br />
                Developed a system for real-time health monitoring using connected sensors.
              </li>
            </ul>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Education</h2>
            <p className="cv-body mt-3 text-[14px] leading-[1.6] text-[#344455]">
              Bachelor&apos;s Degree in Information Technology - RP Musanze College (2023-2025)
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
