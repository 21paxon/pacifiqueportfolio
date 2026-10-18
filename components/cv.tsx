"use client"

import Link from "next/link"
import { site } from "@/lib/site"

export function CV() {
  const skillGroups = [
    { title: "Software Development", items: ["Java", "Spring Boot", "Python", "JavaScript", "TypeScript", "Angular", "Node.js", "Express.js", "REST APIs"] },
    { title: "Data & Databases", items: ["SQL", "PostgreSQL", "MySQL", "Pandas", "Scikit-learn (learning)"] },
    { title: "Networking & Systems", items: ["Cisco Networking", "Network Configuration", "Linux", "IT Support", "Troubleshooting", "Cybersecurity Fundamentals"] },
    { title: "IoT & Embedded Systems", items: ["ESP32", "Arduino", "Sensors", "Wi-Fi Connectivity", "IoT Monitoring Concepts"] },
  ]
  const certifications = [
    "Software Development - DTP",
    "Cybersecurity - DTP",
    "AI Career Essentials - ALX Africa",
    "EF SET English Certificate (B2)",
  ]

  return (
    <>
      <div className="mx-auto mt-6 flex max-w-[1000px] items-center justify-between gap-3 px-4 sm:px-0 print:hidden">
        <Link href="/" className="rounded-md border border-[#b6cae0] bg-white px-4 py-2 text-sm font-medium text-[#1f4d7d] transition hover:bg-[#f3f8fe]" aria-label="Back to portfolio">
          Back to Portfolio
        </Link>
        <button onClick={() => window.print()} className="rounded-md bg-[#0a66c2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0856a3]" aria-label="Download CV as PDF">
          Download PDF
        </button>
      </div>
      <style jsx global>{`
        #cv-root { font-family: "Source Serif 4", "Georgia", "Times New Roman", serif; }
        #cv-root .cv-label, #cv-root .cv-chip, #cv-root .cv-meta, #cv-root .cv-body { font-family: "IBM Plex Sans", "Segoe UI", "Helvetica Neue", sans-serif; }
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #cv-root { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; border-radius: 0 !important; }
          a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>

      <div id="cv-root" className="mx-auto my-8 max-w-[1000px] overflow-hidden rounded-2xl border border-[#d6dfeb] bg-white shadow-[0_24px_60px_rgba(18,42,66,0.2)]">
        <header className="relative overflow-hidden border-b border-[#d6dfeb] bg-[linear-gradient(130deg,#0f3058_0%,#124a86_42%,#2679c8_100%)] px-6 py-8 text-white md:px-8">
          <div className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 right-0 h-44 w-44 rounded-full bg-[#7fd8ff]/30 blur-2xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="cv-label text-xs uppercase tracking-[0.22em] text-white/80">Curriculum Vitae</p>
              <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">{site.name}</h1>
              <p className="cv-body mt-2 max-w-2xl text-sm text-white/90 md:text-base">
                Full-Stack Developer | Network Engineer | IoT Systems Specialist
              </p>
              <p className="cv-body mt-2 max-w-2xl text-sm text-white/80">
                Building useful software, reliable IT systems, and connected-device solutions.
              </p>
            </div>
            <div className="cv-meta grid gap-1 text-sm md:text-right">
              <p>{site.location}</p><p>{site.phone}</p><p>{site.email}</p>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-[280px_1fr]">
          <aside className="border-b border-[#d6dfeb] bg-[#f6f9fc] px-6 py-7 md:border-b-0 md:border-r md:px-7 md:py-8">
            <h2 className="cv-label text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Profile Links</h2>
            <div className="cv-body mt-3 space-y-1.5 text-[13px] leading-6 text-[#21456b]">
              <p><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] hover:underline">LinkedIn Profile</a></p>
              <p><a href={site.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] hover:underline">Portfolio Website</a></p>
              <p><a href={site.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] hover:underline">GitHub Profile</a></p>
            </div>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Technical Skills</h2>
            <div className="mt-3 space-y-4">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="cv-body mb-2 text-[12px] font-semibold text-[#21456b]">{group.title}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => <span key={skill} className="cv-chip rounded-full border border-[#c8d8eb] bg-white px-2.5 py-1 text-[11px] font-medium text-[#15406b]">{skill}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Certifications</h2>
            <ul className="cv-body mt-3 list-disc space-y-1 pl-5 text-[13px] text-[#1d4266]">
              {certifications.map((item) => <li key={item}>{item}</li>)}
            </ul>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Languages</h2>
            <p className="cv-body mt-2 text-[13px] text-[#1d4266]">Kinyarwanda — Native</p>
            <p className="cv-body text-[13px] text-[#1d4266]">English — B2 (EF SET)</p>
          </aside>

          <section className="px-6 py-7 text-[#1d2733] md:px-8 md:py-8">
            <h2 className="cv-label text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Professional Summary</h2>
            <p className="cv-body mt-3 text-[14px] leading-[1.7] text-[#2e3945]">
              IT professional with hands-on interests and experience across software development, technical support, networking, and IoT. Builds Java/Spring Boot backend applications and web projects, works with databases and REST APIs, and is developing practical Machine Learning skills with Python and Scikit-learn. Interested in solving real operational problems through dependable, maintainable technology.
            </p>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Professional Experience</h2>
            <div className="mt-3 space-y-4">
              <div className="rounded-xl border border-[#d6dfeb] bg-[#fbfdff] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="cv-body text-[14px] font-semibold text-[#1e3349]">IT Instructor — Muhanga Technical Center</p>
                  <span className="cv-meta rounded-full bg-[#dcecff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#124a86]">Sep 2025 – 2026</span>
                </div>
                <ul className="cv-body mt-2 list-disc pl-5 text-[14px] leading-[1.6] text-[#344455]">
                  <li>Delivered instruction in networking, Internet Technology, and software development fundamentals.</li>
                  <li>Guided learners through practical ICT exercises and technical project work.</li>
                  <li>Supported learners in troubleshooting and applying concepts in hands-on activities.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[#d6dfeb] bg-[#fbfdff] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="cv-body text-[14px] font-semibold text-[#1e3349]">IT Consultant — Rwanda Information Society Authority (RISA)</p>
                  <span className="cv-meta rounded-full bg-[#dcecff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#124a86]">2025</span>
                </div>
                <ul className="cv-body mt-2 list-disc pl-5 text-[14px] leading-[1.6] text-[#344455]">
                  <li>Contributed IT support and technical assistance related to systems and infrastructure.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[#d6dfeb] bg-[#fbfdff] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="cv-body text-[14px] font-semibold text-[#1e3349]">IT Support Specialist — VTC Ltd</p>
                  <span className="cv-meta rounded-full bg-[#dcecff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#124a86]">2024</span>
                </div>
                <ul className="cv-body mt-2 list-disc pl-5 text-[14px] leading-[1.6] text-[#344455]">
                  <li>Assisted with technical support, system maintenance, and troubleshooting.</li>
                </ul>
              </div>
            </div>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Selected Projects</h2>
            <div className="cv-body mt-3 space-y-3 text-[14px] leading-[1.6] text-[#344455]">
              <div>
                <p className="font-semibold text-[#1e3349]">Campus Security and Reporting System (CSRS)</p>
                <p>Developing a campus incident-reporting and security management application, including a Node.js/Express API and PostgreSQL database.</p>
                <a href="https://github.com/21paxon/csrs" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a66c2] hover:underline">View source code</a>
              </div>
              <div>
                <p className="font-semibold text-[#1e3349]">Bus Booking System</p>
                <p>Building a Java and Spring Boot backend for trip management and reservations, with REST APIs and a planned Angular frontend.</p>
                <a href="https://github.com/21paxon/busbooking" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a66c2] hover:underline">View source code</a>
              </div>
              <div>
                <p className="font-semibold text-[#1e3349]">Machine Learning Practice</p>
                <p>Practising data preparation and linear regression with Python and Scikit-learn, including predicting exam scores from study hours.</p>
                <a href="https://github.com/21paxon/ML_Project" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a66c2] hover:underline">View source code</a>
              </div>
              <div>
                <p className="font-semibold text-[#1e3349]">Smart Security System Using IoT</p>
                <p>Developing a project concept for ESP32-based movement detection, connected sensors, remote monitoring, and security alerts for restricted spaces.</p>
              </div>
              <div>
                <p className="font-semibold text-[#1e3349]">USSD BMI Application</p>
                <p>Created a Node.js/Express application concept for BMI calculation with English and Kinyarwanda support.</p>
                <a href="https://github.com/21paxon/ussdbmi-app" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a66c2] hover:underline">View source code</a>
              </div>
            </div>

            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Education</h2>
            <div className="cv-body mt-3 text-[14px] leading-[1.6] text-[#344455]">
              <p className="font-semibold text-[#1e3349]">Bachelor of Technology in Information Technology</p>
              <p>Rwanda Polytechnic — Musanze College</p>
              <p>Current studies</p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
