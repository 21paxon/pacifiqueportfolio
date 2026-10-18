"use client"

import Link from "next/link"
import { site } from "@/lib/site"

export function CV() {
  const skillGroups = [
    { title: "Software Development", items: ["Java", "Spring Boot", "Python", "JavaScript", "TypeScript", "Angular", "Node.js", "Express.js", "REST APIs"] },
    { title: "Data & Databases", items: ["SQL", "PostgreSQL", "MySQL", "R", "Pandas", "Tidyverse", "Scikit-learn (learning)"] },
    { title: "Networking & Systems", items: ["Cisco Networking", "Linux", "Network Configuration", "System Administration", "IT Support", "Troubleshooting", "Cybersecurity Fundamentals"] },
    { title: "IoT & Embedded Systems", items: ["ESP32", "Arduino", "Sensors", "Wi-Fi Connectivity", "IoT Monitoring"] },
  ]
  const certifications = ["Software Development — DTP", "Cybersecurity — DTP", "AI Career Essentials — ALX Africa", "EF SET English Certificate — B2"]

  return (
    <>
      <div className="mx-auto mt-6 flex max-w-[1000px] items-center justify-between gap-3 px-4 print:hidden sm:px-0">
        <Link href="/" className="rounded-md border border-[#b6cae0] bg-white px-4 py-2 text-sm font-medium text-[#1f4d7d]">Back to Portfolio</Link>
        <button onClick={() => window.print()} className="rounded-md bg-[#0a66c2] px-4 py-2 text-sm font-medium text-white">Download / Print CV</button>
      </div>
      <style jsx global>{`
        #cv-root { font-family: "Source Serif 4", Georgia, "Times New Roman", serif; }
        #cv-root .cv-label, #cv-root .cv-chip, #cv-root .cv-meta, #cv-root .cv-body { font-family: "IBM Plex Sans", "Segoe UI", sans-serif; }
        @media print {
          @page { size: A4; margin: 14mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #cv-root { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; border: 0 !important; border-radius: 0 !important; overflow: visible !important; }
          .cv-entry, .cv-section { break-inside: avoid; }
          a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>
      <div id="cv-root" className="mx-auto my-8 max-w-[1000px] overflow-hidden rounded-2xl border border-[#d6dfeb] bg-white shadow-[0_24px_60px_rgba(18,42,66,0.2)]">
        <header className="relative overflow-hidden border-b border-[#d6dfeb] bg-[linear-gradient(130deg,#0f3058_0%,#124a86_42%,#2679c8_100%)] px-6 py-8 text-white md:px-8">
          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="cv-label text-xs uppercase tracking-[0.22em] text-white/80">Curriculum Vitae</p>
              <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">{site.name}</h1>
              <p className="cv-body mt-2 max-w-2xl text-sm md:text-base">Full-Stack Developer | Network Engineer | IoT Systems Specialist</p>
              <p className="cv-body mt-2 max-w-2xl text-sm leading-6 text-white/85">Software development, IT support and networking, database-driven applications, and connected-device solutions.</p>
            </div>
            <div className="cv-meta grid gap-1 text-sm md:text-right"><p>{site.location}</p><p>{site.phone}</p><p>{site.email}</p></div>
          </div>
        </header>
        <div className="grid md:grid-cols-[280px_1fr]">
          <aside className="border-b border-[#d6dfeb] bg-[#f6f9fc] px-6 py-7 md:border-b-0 md:border-r md:px-7 md:py-8">
            <h2 className="cv-label text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Professional Links</h2>
            <div className="cv-body mt-3 space-y-1.5 break-words text-[13px] leading-6 text-[#21456b]">
              <p><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
              <p><a href={site.portfolioUrl} target="_blank" rel="noopener noreferrer">Portfolio Website</a></p>
              <p><a href={site.githubUrl} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
            </div>
            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Technical Competencies</h2>
            <div className="mt-3 space-y-4">
              {skillGroups.map((group) => <div key={group.title}><p className="cv-body mb-2 text-[12px] font-semibold text-[#21456b]">{group.title}</p><div className="flex flex-wrap gap-1.5">{group.items.map((skill) => <span key={skill} className="cv-chip rounded-full border border-[#c8d8eb] bg-white px-2.5 py-1 text-[11px] font-medium text-[#15406b]">{skill}</span>)}</div></div>)}
            </div>
            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Certifications</h2>
            <ul className="cv-body mt-3 list-disc space-y-1.5 pl-5 text-[13px] leading-5 text-[#1d4266]">{certifications.map((item) => <li key={item}>{item}</li>)}</ul>
            <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Languages</h2>
            <p className="cv-body mt-2 text-[13px] text-[#1d4266]">Kinyarwanda — Native</p><p className="cv-body text-[13px] text-[#1d4266]">English — B2 (EF SET)</p>
          </aside>
          <section className="px-6 py-7 text-[#1d2733] md:px-8 md:py-8">
            <div className="cv-section">
              <h2 className="cv-label text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Professional Profile</h2>
              <p className="cv-body mt-3 text-[14px] leading-[1.75] text-[#2e3945]">Information Technology professional with experience in ICT instruction and a technical background spanning software development, networking, IT support, and Internet technologies. Develops application projects using Java, Spring Boot, JavaScript/TypeScript, Node.js, REST APIs, and relational databases. Familiar with network configuration, Linux environments, system troubleshooting, and cybersecurity fundamentals. Currently expanding skills in data analysis and machine learning using Python, Scikit-learn, and R. Focused on building maintainable technology solutions, documenting work clearly, and solving technical problems methodically.</p>
            </div>
            <div className="cv-section">
              <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Core Competencies</h2>
              <ul className="cv-body mt-3 grid gap-x-5 gap-y-2 text-[14px] leading-[1.6] text-[#344455] sm:grid-cols-2">
                <li>• Application development and REST API integration</li><li>• Relational database design and SQL</li><li>• Network configuration and troubleshooting</li><li>• End-user technical support</li><li>• ICT instruction and practical learner support</li><li>• Technical documentation and project development</li><li>• IoT concepts, ESP32, Arduino, and sensors</li><li>• Data analysis and regression practice</li>
              </ul>
            </div>
            <div className="cv-section">
              <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Professional Experience</h2>
              <div className="mt-3 space-y-4">
                <div className="cv-entry rounded-xl border border-[#d6dfeb] bg-[#fbfdff] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="cv-body text-[15px] font-semibold text-[#1e3349]">IT Instructor</p><p className="cv-body mt-0.5 text-[13px] text-[#456078]">Muhanga Technical Center (MTC)</p></div><span className="cv-meta rounded-full bg-[#dcecff] px-2.5 py-1 text-[11px] font-semibold text-[#124a86]">Sep 2025 – 2026</span></div>
                  <ul className="cv-body mt-3 list-disc space-y-1.5 pl-5 text-[14px] leading-[1.65] text-[#344455]"><li>Delivered lessons and practical training in Networking and Internet Technology and related ICT topics.</li><li>Prepared and guided hands-on exercises to help learners apply technical concepts.</li><li>Supported learners in diagnosing common networking and computer-related problems.</li><li>Explained technical procedures in accessible language and supported practical classroom activities and assessments.</li></ul>
                </div>
                <div className="cv-entry rounded-xl border border-[#d6dfeb] bg-[#fbfdff] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="cv-body text-[15px] font-semibold text-[#1e3349]">IT Support / Internship Experience</p><p className="cv-body mt-0.5 text-[13px] text-[#456078]">Rwanda Information Society Authority (RISA)</p></div><span className="cv-meta rounded-full bg-[#dcecff] px-2.5 py-1 text-[11px] font-semibold text-[#124a86]">2025</span></div>
                  <ul className="cv-body mt-3 list-disc space-y-1.5 pl-5 text-[14px] leading-[1.65] text-[#344455]"><li>Gained exposure to IT support activities and technical workflows in an organisational environment.</li><li>Developed understanding of troubleshooting, system support, and the importance of reliable digital services.</li></ul>
                </div>
                <div className="cv-entry rounded-xl border border-[#d6dfeb] bg-[#fbfdff] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="cv-body text-[15px] font-semibold text-[#1e3349]">IT Support Specialist</p><p className="cv-body mt-0.5 text-[13px] text-[#456078]">VTC Ltd</p></div><span className="cv-meta rounded-full bg-[#dcecff] px-2.5 py-1 text-[11px] font-semibold text-[#124a86]">2024</span></div>
                  <ul className="cv-body mt-3 list-disc space-y-1.5 pl-5 text-[14px] leading-[1.65] text-[#344455]"><li>Assisted with day-to-day technical support and troubleshooting of computer and system issues.</li><li>Supported basic system maintenance and helped address user-facing technical problems.</li></ul>
                </div>
              </div>
            </div>
            <div className="cv-section">
              <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Selected Technical Projects</h2>
              <div className="cv-body mt-3 space-y-4 text-[14px] leading-[1.65] text-[#344455]">
                <div className="cv-entry"><p className="font-semibold text-[#1e3349]">Campus Security and Reporting System (CSRS)</p><p className="mt-1">Campus incident-reporting and security management project covering incident records, categories, locations, user access, and dashboard reporting. Uses a Node.js/Express backend and PostgreSQL database.</p><p className="mt-1">Repository: <a href="https://github.com/21paxon/csrs" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a66c2] hover:underline">github.com/21paxon/csrs</a></p></div>
                <div className="cv-entry"><p className="font-semibold text-[#1e3349]">Bus Booking System</p><p className="mt-1">Application project for managing trips and passenger reservations, using Java, Spring Boot, REST endpoints, and Angular/TypeScript frontend work.</p><p className="mt-1">Repository: <a href="https://github.com/21paxon/busbooking" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a66c2] hover:underline">github.com/21paxon/busbooking</a></p></div>
                <div className="cv-entry"><p className="font-semibold text-[#1e3349]">Machine Learning — Exam Score Prediction</p><p className="mt-1">Learning project that uses a simple regression workflow to explore the relationship between study time and predicted exam scores. Practises data loading, model training, prediction, and interpretation with Python and Scikit-learn.</p><p className="mt-1">Repository: <a href="https://github.com/21paxon/ML_Project" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a66c2] hover:underline">github.com/21paxon/ML_Project</a></p></div>
                <div className="cv-entry"><p className="font-semibold text-[#1e3349]">Data Analysis and Regression Practice</p><p className="mt-1">Practises dataset exploration, linear regression, model summaries, and interpretation of variable relationships using R and related packages.</p><p className="mt-1">Repository: <a href="https://github.com/21paxon/ML_PRACTICE" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a66c2] hover:underline">github.com/21paxon/ML_PRACTICE</a></p></div>
                <div className="cv-entry"><p className="font-semibold text-[#1e3349]">Smart Security System Using IoT — Project Concept</p><p className="mt-1">Proposed ESP32-based monitoring for restricted spaces using motion detection, connected sensors, a web dashboard, and security alerts.</p></div>
                <div className="cv-entry"><p className="font-semibold text-[#1e3349]">USSD BMI Application</p><p className="mt-1">Node.js/Express application practice for BMI calculation with English and Kinyarwanda prompts.</p><p className="mt-1">Repository: <a href="https://github.com/21paxon/ussdbmi-app" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a66c2] hover:underline">github.com/21paxon/ussdbmi-app</a></p></div>
              </div>
            </div>
            <div className="cv-section">
              <h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Education</h2>
              <div className="cv-body mt-3 space-y-4 text-[14px] leading-[1.65] text-[#344455]">
                <div className="cv-entry"><p className="font-semibold text-[#1e3349]">Bachelor of Technology in Information Technology</p><p>Rwanda Polytechnic (RP) — Musanze College</p><p className="text-[13px] text-[#5b6b7b]">Current programme</p></div>
                <div className="cv-entry"><p className="font-semibold text-[#1e3349]">Secondary Education — Networking</p><p>Lycée Saint Alexandre Sauli de Muhura</p><p className="text-[13px] text-[#5b6b7b]">Secondary studies completed in 2022</p></div>
              </div>
            </div>
            <div className="cv-section"><h2 className="cv-label mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f4d7d]">Professional Development</h2><p className="cv-body mt-3 text-[14px] leading-[1.7] text-[#344455]">Continuously developing practical skills through personal software projects, GitHub version control, networking exercises, database work, and introductory machine-learning and statistical analysis. Interested in opportunities combining software engineering, technical support, networking, IoT, and data-driven problem solving.</p></div>
          </section>
        </div>
      </div>
    </>
  )
}
