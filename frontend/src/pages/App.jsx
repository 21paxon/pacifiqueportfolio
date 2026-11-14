import { Link, Route, Routes } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowDown, ArrowLeft, ArrowUpRight, Github, Linkedin, Mail, MapPin, Menu, Moon, Sun, X } from "lucide-react"
import api from "../services/api"
import Admin from "./Admin.jsx"
import DOMPurify from "dompurify"

const empty = { profile: null, projects: [], skills: [], experiences: [], education: [], certifications: [], blog: [], settings: {} }
const portfolioLinks = [{ href: "#about", label: "About" }, { href: "#work", label: "Work" }, { href: "#skills", label: "Skills" }, { href: "#experience", label: "Experience" }, { href: "#contact", label: "Contact" }]

function usePortfolio() {
  const [data, setData] = useState(empty)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  useEffect(() => {
    Promise.all(["profile", "projects", "skills", "experiences", "education", "certifications", "blog", "settings"].map((key) => api.get(`/${key}`).then(({ data: result }) => [key, result]).catch(() => [key, key === "profile" ? null : key === "settings" ? {} : []])))
      .then((entries) => { const value = Object.fromEntries(entries); setData(value); if (!value.profile) setError("Portfolio content is not connected yet. Configure the API and run its database migrations to publish your content.") })
      .finally(() => setLoading(false))
  }, [])
  useEffect(() => {
    if (data.settings?.site_title) document.title = data.settings.site_title
    if (data.settings?.site_description) {
      const description = document.querySelector('meta[name="description"]')
      if (description) description.content = data.settings.site_description
    }
    if (!localStorage.getItem("theme") && data.settings?.default_theme) document.documentElement.dataset.theme = data.settings.default_theme === "light" ? "light" : "dark"
    if (data.settings?.favicon_url) {
      let icon = document.querySelector('link[rel="icon"]')
      if (!icon) { icon = document.createElement("link"); icon.rel = "icon"; document.head.appendChild(icon) }
      icon.href = data.settings.favicon_url
    }
  }, [data.settings])
  return { data, loading, error }
}

function Header({ profile, settings = {} }) {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem("theme") !== "light")
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; localStorage.setItem("theme", dark ? "dark" : "light") }, [dark])
  useEffect(() => { if (!localStorage.getItem("theme") && settings.default_theme) setDark(settings.default_theme !== "light") }, [settings.default_theme])
  return <header className="site-header"><a className="wordmark" href="/#home">{settings.logo_url ? <img className="site-logo" src={settings.logo_url} alt={settings.site_title || "Portfolio"} /> : <>PN<span>.</span></>}</a><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button><nav className={open ? "site-nav open" : "site-nav"}>{portfolioLinks.map((item) => <a key={item.href} href={`/${item.href}`} onClick={() => setOpen(false)}>{item.label}</a>)}<button className="icon-button theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>{profile?.cv_url && <a className="nav-resume" href={profile.cv_url} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a>}</nav></header>
}

function ProjectCard({ project }) {
  return <article className="project-card"><Link to={`/projects/${project.slug}`} className="project-image">{project.cover_image && <img src={project.cover_image} alt={project.title} loading="lazy" />}<span className="project-status">{project.status}</span></Link><div className="project-copy"><div className="project-meta">{project.category || "Project"}{project.featured && <span>Featured</span>}</div><h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.description}</p><div className="tag-list">{(project.technologies || []).map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="text-link" to={`/projects/${project.slug}`}>Project details <ArrowUpRight size={15} /></Link></div></article>
}

function HomePage() {
  const { data, loading, error } = usePortfolio()
  const { profile, projects, skills, experiences, education, certifications, blog } = data
  const categories = [...new Set(skills.map((skill) => skill.category || "Technical skills"))]
  return <><Header profile={profile} settings={data.settings} /><main id="home">
    <section className="hero-shell"><div className="hero-grid"><div className="hero-content"><div className="availability"><span></span>{profile?.available ? "Available for opportunities" : "Information Technology professional"}</div><p className="hero-kicker">SOFTWARE · NETWORKS · CONNECTED SYSTEMS</p><h1>{profile?.headline || "Building useful software and connected systems."}</h1><p className="hero-intro">{profile?.introduction || (loading ? "Loading portfolio…" : error)}</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowDown size={16} /></a><a className="button button-quiet" href="#contact">Get in touch <ArrowUpRight size={16} /></a></div><div className="hero-socials">{profile?.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>}{profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>}</div></div><div className="hero-portrait"><img src={profile?.photo_url || "/pssportphot.jpeg"} alt={profile?.full_name || "Portfolio owner"} /><div className="portrait-caption"><span className="portrait-dot"></span><div><strong>{profile?.full_name || "Pacifique NIYOGUSHIMWA"}</strong><small>{profile?.location || "Kigali, Rwanda"}</small></div><MapPin size={17} /></div><div className="portrait-index">01 / RW</div></div></div><div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span>BASED IN {profile?.location?.toUpperCase() || "KIGALI, RWANDA"}</span></div></section>
    <section className="section section-about" id="about"><div className="section-label">01 / ABOUT</div><div className="about-layout"><h2>Curious about how things work. Focused on making them work better.</h2><div><p>{profile?.about || profile?.introduction}</p><p>My work spans application development, IT support, networking, teaching and hands-on exploration of connected systems.</p></div></div></section>
    <section className="section section-projects" id="work"><div className="section-heading"><div><div className="section-label">02 / SELECTED WORK</div><h2>Projects & practice</h2></div><p>Software, data and IoT work rooted in practical problems and continued learning.</p></div>{loading ? <p className="inline-state">Loading projects…</p> : projects.length ? <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="empty-panel">Projects will appear here when they are published in the portfolio dashboard.</div>}</section>
    <section className="section section-skills" id="skills"><div className="section-heading"><div><div className="section-label">03 / TOOLKIT</div><h2>Things I work with</h2></div><p>Practiced technologies alongside areas I’m continuing to learn.</p></div><div className="skills-groups">{categories.map((category) => <article className="skill-group" key={category}><h3>{category}</h3><div className="tag-list">{skills.filter((skill) => (skill.category || "Technical skills") === category).map((skill) => <span key={skill.id}>{skill.name}<small>{skill.proficiency_type === "learning" ? "learning" : "practical"}</small></span>)}</div></article>)}</div>{!skills.length && !loading && <div className="empty-panel">Published skills will appear here.</div>}</section>
    <section className="section section-experience" id="experience"><div className="section-label">04 / EXPERIENCE & EDUCATION</div><div className="experience-columns"><div><h2>Work that shaped my approach.</h2><div className="timeline">{experiences.map((item) => <article className="timeline-item" key={item.id}><span className="timeline-mark"></span><div><h3>{item.position}</h3><strong>{item.organization}</strong><time>{item.start_date ? new Date(item.start_date).getFullYear() : ""}{item.current ? " — Present" : item.end_date ? ` — ${new Date(item.end_date).getFullYear()}` : ""}</time><ul>{(item.responsibilities || []).map((text) => <li key={text}>{text}</li>)}</ul></div></article>)}</div></div><div><h2>Learning in progress.</h2><div className="education-list">{education.map((item) => <article key={item.id}><span>{item.end_date ? new Date(item.end_date).getFullYear() : item.expected_completion || "Education"}</span><h3>{item.qualification}</h3><p>{item.institution}</p>{item.details && <small>{item.details}</small>}</article>)}</div><div className="cert-list"><h3>Certificates</h3>{certifications.map((certificate) => <p key={certificate.id}>{certificate.name}<span>{certificate.issuer}</span></p>)}</div></div></div></section>
    <section className="section section-writing" id="writing"><div className="section-heading"><div><div className="section-label">05 / NOTES</div><h2>Writing & ideas</h2></div><p>Technical notes and things I have learned along the way.</p></div>{blog.length ? <div className="blog-grid">{blog.slice(0, 3).map((post) => <Link className="blog-card" key={post.id} to={`/blog/${post.slug}`}><span>{post.category || "ARTICLE"}</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="text-link">Read article <ArrowUpRight size={15} /></span></Link>)}</div> : <div className="empty-panel">New writing will appear here after it is published.</div>}</section>
    <section className="section section-contact" id="contact"><div className="section-label">06 / LET’S TALK</div><div className="contact-layout"><div><h2>Have a problem worth solving?</h2><p>Tell me a little about it. I’ll get back to you as soon as I can.</p><a className="contact-email" href={`mailto:${profile?.email || data.settings.email || "niyogushimwapacifique6@gmail.com"}`}>{profile?.email || data.settings.email || "niyogushimwapacifique6@gmail.com"} <ArrowUpRight size={16} /></a></div><ContactForm /></div></section>
  </main><footer className="site-footer"><a className="wordmark" href="#home">PN<span>.</span></a><span>{data.settings.footer_text || `Designed and built by ${profile?.full_name || "Pacifique NIYOGUSHIMWA"}`}</span><span>© {new Date().getFullYear()}</span><a href="/admin">Admin</a></footer></>
}

function ContactForm() {
  const [status, setStatus] = useState("")
  const [sending, setSending] = useState(false)
  async function submit(event) {
    event.preventDefault(); setSending(true); setStatus("")
    const form = event.currentTarget
    try { await api.post("/contact", Object.fromEntries(new FormData(form))); form.reset(); setStatus("Thanks for reaching out. Your message has been received.") }
    catch (error) { setStatus(error.message) }
    finally { setSending(false) }
  }
  return <form className="contact-form" onSubmit={submit}><label>Your name<input required name="name" autoComplete="name" /></label><label>Email address<input required name="email" type="email" autoComplete="email" /></label><label>Subject<input name="subject" /></label><label>Message<textarea required name="message" rows="4" /></label><button className="button button-primary" disabled={sending}>{sending ? "Sending…" : "Send message"} <ArrowUpRight size={16} /></button><p role="status">{status}</p></form>
}

function DetailPage({ type }) {
  const { slug } = useParams()
  const [record, setRecord] = useState(null)
  const [error, setError] = useState("")
  useEffect(() => { api.get(`/${type}/${slug}`).then(({ data }) => setRecord(data)).catch((reason) => setError(reason.message)) }, [type, slug])
  useEffect(() => {
    if (!record) return
    document.title = `${record.seo_title || record.title} | Pacifique NIYOGUSHIMWA`
    const description = record.seo_description || record.excerpt || record.description || ""
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
    meta.content = description
  }, [record])
  if (error) return <main className="detail-page"><Link to="/" className="text-link"><ArrowLeft size={15} /> Back home</Link><div className="empty-panel">{error}</div></main>
  if (!record) return <main className="detail-page"><p>Loading…</p></main>
  const isProject = type === "projects"
  return <><Header /><main className="detail-page"><Link to={isProject ? "/#work" : "/#writing"} className="text-link"><ArrowLeft size={15} /> Back to {isProject ? "projects" : "writing"}</Link><p className="section-label">{isProject ? record.category || "PROJECT" : record.category || "ARTICLE"}</p><h1>{record.title}</h1><p className="detail-lede">{record.description || record.excerpt}</p>{record.cover_image && <img className="detail-cover" src={record.cover_image} alt={record.title} />}{isProject && <div className="tag-list">{(record.technologies || []).map((item) => <span key={item}>{item}</span>)}</div>}<article className="detail-content">{isProject ? <><h2>Overview</h2><p>{record.description}</p>{record.problem && <><h2>Problem</h2><p>{record.problem}</p></>}{record.solution && <><h2>Approach</h2><p>{record.solution}</p></>}{record.contribution && <><h2>Contribution</h2><p>{record.contribution}</p></>}{(record.features || []).length > 0 && <><h2>Implemented features</h2><ul>{record.features.map((item) => <li key={item}>{item}</li>)}</ul></>}{(record.screenshots || []).map((image) => <img key={image} className="detail-cover" src={image} alt={`${record.title} screenshot`} loading="lazy" />)}<div className="hero-actions">{record.github_url && <a className="button button-primary" href={record.github_url} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>}{record.demo_url && <a className="button button-quiet" href={record.demo_url} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>}</div></> : <div className="article-body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(record.content || "") }} />}</article></main></>
}

function NotFound() { return <main className="detail-page"><h1>Page not found</h1><Link to="/" className="text-link">Return to portfolio</Link></main> }

export default function App() { return <Routes><Route path="/" element={<HomePage />} /><Route path="/projects/:slug" element={<DetailPage type="projects" />} /><Route path="/blog/:slug" element={<DetailPage type="blog" />} /><Route path="/admin/*" element={<Admin />} /><Route path="*" element={<NotFound />} /></Routes> }
