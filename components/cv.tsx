"use client"

import Link from "next/link"
import { site } from "@/lib/site"

const skillGroups = [
  { title: "Software & Web", items: "Java, Spring Boot, JavaScript, TypeScript, Angular, Python, Node.js, Express.js, REST APIs" },
  { title: "Data & Databases", items: "SQL, PostgreSQL, MySQL, R, Pandas, Tidyverse, Scikit-learn (learning)" },
  { title: "Networking & IT", items: "Cisco networking, Linux, network configuration, system support, troubleshooting, cybersecurity fundamentals" },
  { title: "IoT & Embedded", items: "ESP32, Arduino, sensors, Wi-Fi connectivity, IoT monitoring concepts" },
]
const certifications = ["Software Development — DTP", "Cybersecurity — DTP", "AI Career Essentials — ALX Africa", "EF SET English Certificate — B2"]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="cv-section-title">{children}</h2>
}

export function CV() {
  return (
    <>
      <div className="mx-auto mt-5 flex max-w-[900px] items-center justify-between gap-3 px-4 print:hidden sm:px-0">
        <Link href="/" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">← Portfolio</Link>
        <button onClick={() => window.print()} title="Opens the print dialog; choose Save as PDF to download your CV" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Save CV as PDF</button>
      </div>
      <style jsx global>{`
        #cv-root { font-family: Arial, Helvetica, sans-serif; color: #172b3a; }
        #cv-root .cv-section-title { display:flex; align-items:center; gap:10px; margin:25px 0 12px; color:#123d5a; font-size:11px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        #cv-root .cv-section-title:after { content:""; height:1px; flex:1; background:#cbd8e2; }
        #cv-root .cv-copy { font-size:12px; line-height:1.7; color:#405363; }
        #cv-root .cv-role { font-size:13px; font-weight:700; color:#172f43; }
        #cv-root .cv-muted { font-size:11px; color:#607586; }
        @media print {
          @page { size:A4; margin:12mm; }
          * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
          body { background:#fff !important; }
          #cv-root { max-width:none !important; margin:0 !important; border:0 !important; border-radius:0 !important; box-shadow:none !important; overflow:visible !important; }
          #cv-root .cv-section-title { margin-top:17px; }
          #cv-root .cv-entry { break-inside:avoid; }
          .cv-tools { display:none !important; }
          a { color:inherit !important; text-decoration:none !important; }
        }
      `}</style>

      <main id="cv-root" className="mx-auto my-7 max-w-[900px] overflow-hidden border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,35,55,0.13)] print:my-0 print:max-w-none print:border-0 print:shadow-none">
        <header className="border-t-[7px] border-[#176b87] bg-[#f4f8fa] px-7 py-7 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#176b87]">Curriculum Vitae</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#122e43] sm:text-4xl">{site.name}</h1>
          <p className="mt-2 text-sm font-semibold text-[#176b87]">Full-Stack Developer <span className="px-1 text-slate-400">|</span> Network Engineer <span className="px-1 text-slate-400">|</span> IoT Systems Specialist</p>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-600">Software development, IT support and networking, database-driven applications, and connected-device solutions.</p>
          <div className="mt-5 grid gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-[11px] text-slate-600 sm:grid-cols-2">
            <p><strong className="text-slate-800">Location:</strong> {site.location}</p>
            <p><strong className="text-slate-800">Phone:</strong> {site.phone}</p>
            <p className="break-all"><strong className="text-slate-800">Email:</strong> {site.email}</p>
            <p className="break-all"><strong className="text-slate-800">Portfolio:</strong> {site.portfolioUrl}</p>
          </div>
        </header>

        <div className="grid md:grid-cols-[245px_minmax(0,1fr)]">
          <aside className="border-b border-slate-200 bg-[#f8fafb] px-7 py-6 md:border-b-0 md:border-r sm:px-8">
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="space-y-4">
              {skillGroups.map((group) => <div key={group.title}><h3 className="text-xs font-bold text-slate-800">{group.title}</h3><p className="cv-copy mt-1">{group.items}</p></div>)}
            </div>
            <SectionTitle>Certifications</SectionTitle>
            <ul className="cv-copy list-disc space-y-2 pl-4">{certifications.map((item) => <li key={item}>{item}</li>)}</ul>
            <SectionTitle>Languages</SectionTitle>
            <div className="cv-copy space-y-2"><p><strong className="text-slate-800">Kinyarwanda</strong><br />Native</p><p><strong className="text-slate-800">English</strong><br />B2 — EF SET</p></div>
            <SectionTitle>Links</SectionTitle>
            <div className="cv-copy space-y-2 break-words">
              <p><a className="underline decoration-slate-300 underline-offset-2" href={site.linkedinUrl}>LinkedIn profile</a></p>
              <p><a className="underline decoration-slate-300 underline-offset-2" href={site.githubUrl}>GitHub profile</a></p>
              <p><a className="underline decoration-slate-300 underline-offset-2" href={site.portfolioUrl}>Portfolio website</a></p>
            </div>
          </aside>

          <section className="px-7 py-6 sm:px-9">
            <SectionTitle>Professional Profile</SectionTitle>
            <p className="cv-copy">Information Technology professional with experience in ICT instruction and a technical background spanning software development, networking, IT support, and Internet technologies. Develops application projects using Java, Spring Boot, JavaScript/TypeScript, Node.js, REST APIs, and relational databases. Familiar with network configuration, Linux environments, system troubleshooting, and cybersecurity fundamentals. Currently expanding skills in data analysis and machine learning using Python, Scikit-learn, and R. Focused on practical problem solving, maintainable technology, and continuous professional development.</p>

            <SectionTitle>Core Competencies</SectionTitle>
            <ul className="cv-copy grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
              <li>• Application and API development</li><li>• Relational databases and SQL</li>
              <li>• Network setup and troubleshooting</li><li>• End-user IT support</li>
              <li>• ICT instruction and learner support</li><li>• Technical documentation</li>
              <li>• IoT sensors and embedded concepts</li><li>• Data analysis and regression practice</li>
            </ul>

            <SectionTitle>Professional Experience</SectionTitle>
            <div className="space-y-5">
              <article className="cv-entry border-l-2 border-[#176b87] pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"><h3 className="cv-role">IT Instructor</h3><span className="cv-muted">Sep 2025 – 2026</span></div>
                <p className="cv-muted mt-0.5">Muhanga Technical Center (MTC)</p>
                <ul className="cv-copy mt-2 list-disc space-y-1 pl-4"><li>Delivered lessons and practical training in Networking and Internet Technology and related ICT topics.</li><li>Prepared and guided hands-on exercises to help learners apply technical concepts.</li><li>Supported learners in diagnosing common networking and computer-related problems.</li><li>Explained technical procedures clearly and supported practical activities and assessments.</li></ul>
              </article>
              <article className="cv-entry border-l-2 border-slate-300 pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"><h3 className="cv-role">IT Support / Internship Experience</h3><span className="cv-muted">2025</span></div>
                <p className="cv-muted mt-0.5">Rwanda Information Society Authority (RISA)</p>
                <ul className="cv-copy mt-2 list-disc space-y-1 pl-4"><li>Gained exposure to IT support activities and technical workflows in an organisational environment.</li><li>Developed understanding of troubleshooting, system support, and reliable digital services.</li></ul>
              </article>
              <article className="cv-entry border-l-2 border-slate-300 pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"><h3 className="cv-role">IT Support Specialist</h3><span className="cv-muted">2024</span></div>
                <p className="cv-muted mt-0.5">VTC Ltd</p>
                <ul className="cv-copy mt-2 list-disc space-y-1 pl-4"><li>Assisted with day-to-day technical support and troubleshooting of computer and system issues.</li><li>Supported basic system maintenance and addressed user-facing technical problems.</li></ul>
              </article>
            </div>

            <SectionTitle>Selected Projects</SectionTitle>
            <div className="space-y-4">
              <article className="cv-entry"><h3 className="cv-role">Campus Security and Reporting System (CSRS)</h3><p className="cv-copy mt-1">Campus incident-reporting and security management project covering incident records, categories, locations, user access, and dashboard reporting. Uses a Node.js/Express backend and PostgreSQL database.</p><p className="cv-muted mt-1">Repository: github.com/21paxon/csrs</p></article>
              <article className="cv-entry"><h3 className="cv-role">Bus Booking System</h3><p className="cv-copy mt-1">Trip and passenger reservation application project using Java, Spring Boot, REST endpoints, and Angular/TypeScript frontend work.</p><p className="cv-muted mt-1">Repository: github.com/21paxon/busbooking</p></article>
              <article className="cv-entry"><h3 className="cv-role">Machine Learning — Exam Score Prediction</h3><p className="cv-copy mt-1">Practises data preparation, regression model training, prediction, and interpretation using Python and Scikit-learn.</p><p className="cv-muted mt-1">Repository: github.com/21paxon/ML_Project</p></article>
              <article className="cv-entry"><h3 className="cv-role">Data Analysis and Regression Practice</h3><p className="cv-copy mt-1">Practises data exploration, linear regression, model summaries, and interpretation using R and related packages.</p><p className="cv-muted mt-1">Repository: github.com/21paxon/ML_PRACTICE</p></article>
              <article className="cv-entry"><h3 className="cv-role">Smart Security System Using IoT — Project Concept</h3><p className="cv-copy mt-1">Proposed ESP32-based monitoring for restricted spaces using motion detection, connected sensors, a web dashboard, and security alerts.</p></article>
              <article className="cv-entry"><h3 className="cv-role">USSD BMI Application</h3><p className="cv-copy mt-1">Node.js/Express application practice for BMI calculation with English and Kinyarwanda prompts. Repository: github.com/21paxon/ussdbmi-app</p></article>
            </div>

            <SectionTitle>Education</SectionTitle>
            <article className="cv-entry"><h3 className="cv-role">Bachelor of Technology in Information Technology (BTech IT)</h3><p className="cv-copy mt-1">Rwanda Polytechnic (RP) — Musanze College</p><p className="cv-muted mt-1">Currently pursuing · One-year programme</p></article>
            <article className="cv-entry mt-4"><h3 className="cv-role">A1 Qualification in Information Technology</h3><p className="cv-copy mt-1">Completed</p><p className="cv-muted mt-1">Professional qualification</p></article>
            <article className="cv-entry mt-4"><h3 className="cv-role">Secondary Education — Networking</h3><p className="cv-copy mt-1">Lycée Saint Alexandre Sauli de Muhura</p><p className="cv-muted mt-1">Completed in 2022</p></article>

            <SectionTitle>Professional Development</SectionTitle>
            <p className="cv-copy">Continuously developing practical skills through personal software projects, GitHub version control, networking exercises, database work, and introductory machine-learning and statistical analysis. Interested in opportunities combining software engineering, technical support, networking, IoT, and data-driven problem solving.</p>
          </section>
        </div>
        <footer className="border-t border-slate-200 bg-white px-7 py-3 text-center text-[10px] text-slate-400 sm:px-10">PACIFIQUE NIYOGUSHIMWA · CURRICULUM VITAE</footer>
      </main>
    </>
  )
}
