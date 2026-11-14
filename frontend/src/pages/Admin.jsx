import { useEffect, useMemo, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ReactQuill from "react-quill"
import { Activity, ArrowLeft, ArrowUpRight, BriefcaseBusiness, ChevronRight, FileText, FolderKanban, GraduationCap, ImagePlus, LayoutDashboard, LogOut, Mail, Plus, Save, Settings, ShieldCheck, Trash2, UserRound, Wrench } from "lucide-react"
import api from "../services/api"

const navigation = [
  ["", "Overview", LayoutDashboard], ["profile", "Profile", UserRound], ["projects", "Projects", FolderKanban],
  ["skills", "Skills", Wrench], ["experiences", "Experience", BriefcaseBusiness], ["education", "Education", GraduationCap],
  ["certifications", "Certifications", ShieldCheck], ["blog", "Blog", FileText], ["messages", "Messages", Mail],
  ["media", "Media library", ImagePlus], ["settings", "Website settings", Settings], ["account", "Account", ShieldCheck],
]

const schemas = {
  projects: [["title","Title"],["slug","URL slug"],["description","Description","textarea"],["problem","Problem","textarea"],["solution","Solution","textarea"],["contribution","My contribution","textarea"],["features","Implemented features","json"],["technologies","Technologies","json"],["category","Category"],["status","Status"],["cover_image","Cover image URL"],["screenshots","Screenshot URLs","json"],["github_url","GitHub URL"],["demo_url","Live demo URL"],["featured","Featured","boolean"],["published","Published","boolean"],["sort_order","Display order","number"]],
  skills: [["name","Skill name"],["category_id","Category","skillCategory"],["proficiency_type","Experience level","select",["practical","learning"]],["icon_url","Icon URL"],["sort_order","Display order","number"],["published","Published","boolean"]],
  experiences: [["organization","Organization"],["position","Position"],["employment_type","Employment type"],["start_date","Start date","date"],["end_date","End date","date"],["current","Current role","boolean"],["responsibilities","Responsibilities","json"],["achievements","Achievements","json"],["logo_url","Organization logo URL"],["published","Published","boolean"],["sort_order","Display order","number"]],
  education: [["institution","Institution"],["qualification","Qualification"],["start_date","Start date","date"],["end_date","End date","date"],["expected_completion","Expected completion"],["details","Details","textarea"],["published","Published","boolean"],["sort_order","Display order","number"]],
  certifications: [["name","Certificate name"],["issuer","Issuing organization"],["issue_date","Issue date","date"],["file_url","Certificate file URL"],["verification_url","Verification URL"],["published","Published","boolean"],["sort_order","Display order","number"]],
  blog: [["title","Title"],["slug","URL slug"],["excerpt","Excerpt","textarea"],["cover_image","Cover image URL"],["category_id","Category","blogCategory"],["tags","Tags","json"],["content","Article content","richtext"],["status","Status","select",["draft","published"]],["published_at","Publication date","datetime"],["seo_title","SEO title"],["seo_description","SEO description","textarea"]],
  skill_categories: [["name","Category name"],["sort_order","Display order","number"]],
  blog_categories: [["name","Category name"],["slug","URL slug"]],
}

function pretty(value) { return String(value || "").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) }
function parseMaybeJSON(value, fallback) { try { return JSON.parse(value) } catch { return fallback } }

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("")
    try { await api.post("/auth/login", { email, password }); onLogin() } catch (reason) { setError(reason.message) } finally { setBusy(false) }
  }
  return <main className="login-shell"><Link className="wordmark" to="/">PN<span>.</span></Link><form className="login-card" onSubmit={submit}><div className="section-label">PORTFOLIO MANAGEMENT</div><h1>Welcome back.</h1><p>Sign in to manage your portfolio content.</p><label>Email address<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <div className="form-error" role="alert">{error}</div>}<button className="button button-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"} <ChevronRight size={16} /></button><Link to="/" className="text-link"><ArrowLeft size={15} /> Back to portfolio</Link></form><small>Private portfolio administration</small></main>
}

function Admin({ user, onLogout }) {
  const location = useLocation()
  const segment = location.pathname.replace(/^\/admin\/?/, "").split("/")[0]
  const current = navigation.find(([key]) => key === segment) || navigation[0]
  const Icon = current[2]
  return <div className="admin-shell"><aside className="admin-sidebar"><Link className="admin-brand" to="/admin"><span className="admin-brand-icon">PN</span><span>Portfolio CMS<small>OWNER WORKSPACE</small></span></Link><div className="admin-nav-label">WORKSPACE</div><nav>{navigation.map(([key, title, ItemIcon]) => <Link className={segment === key ? "admin-link active" : "admin-link"} key={key || "overview"} to={`/admin${key ? `/${key}` : ""}`}><ItemIcon size={17} /><span>{title}</span>{key === "messages" && <span className="nav-indicator" />}</Link>)}</nav><button className="admin-link logout-link" onClick={onLogout}><LogOut size={17} /><span>Sign out</span></button></aside><main className="admin-main"><header className="admin-topbar"><div><div className="section-label">OWNER WORKSPACE / {segment || "OVERVIEW"}</div><h1>{current[1]}</h1></div><div className="admin-user"><span>{user?.email?.slice(0,1).toUpperCase() || "P"}</span><div>{user?.email}<small>Administrator</small></div><Link to="/" aria-label="View public website"><ArrowUpRight size={17} /></Link></div></header>{segment === "" && <Overview />} {segment === "profile" && <ProfileManager />} {schemas[segment] && <ResourceManager resource={segment} />} {segment === "messages" && <Messages />} {segment === "media" && <MediaLibrary />} {segment === "settings" && <SettingsManager />} {segment === "account" && <AccountManager />}</main></div>
}

function Overview() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState("")
  useEffect(() => { api.get("/admin/overview").then(({ data }) => setStats(data)).catch((reason) => setError(reason.message)) }, [])
  const cards = [["Total projects",stats?.projects,FolderKanban],["Published projects",stats?.published_projects,FolderKanban],["Blog articles",stats?.blog_posts,FileText],["Published articles",stats?.published_articles,FileText],["Certificates",stats?.certifications,ShieldCheck],["Unread messages",stats?.unread_messages,Mail]]
  return <div className="admin-content"><div className="admin-welcome"><div><div className="section-label">YOUR PORTFOLIO AT A GLANCE</div><h2>Good work starts with a clear view.</h2><p>Manage the information recruiters and collaborators see on your public portfolio.</p></div><Link className="button button-primary" to="/" target="_blank">View website <ArrowUpRight size={15} /></Link></div>{error && <div className="form-error">{error}. Run the database migrations and configure your API.</div>}<div className="stat-grid">{cards.map(([label,value,StatIcon]) => <article className="stat-card" key={label}><div className="stat-icon"><StatIcon size={18} /></div><span>{label}</span><strong>{value ?? "—"}</strong></article>)}</div><div className="admin-panel activity-panel"><div className="panel-heading"><div><div className="section-label">RECENT CHANGES</div><h2>Activity</h2></div><Activity size={19} /></div>{stats?.recent_activity?.length ? stats.recent_activity.map((item, index) => <div className="activity-row" key={`${item.created_at}-${index}`}><span className="activity-dot" /><span>{pretty(item.action)} · {pretty(item.entity)}</span><time>{new Date(item.created_at).toLocaleString()}</time></div>) : <div className="empty-panel">Administrative activity will appear here.</div>}</div><div className="quick-actions"><Link to="/admin/projects"><Plus size={16} /> Add a project</Link><Link to="/admin/blog"><Plus size={16} /> Write an article</Link><Link to="/admin/messages"><Mail size={16} /> Read messages</Link></div></div>
}

function ProfileManager() {
  const fields = [["full_name","Full name"],["headline","Professional headline"],["introduction","Introduction","textarea"],["about","About me","textarea"],["photo_url","Profile photo URL"],["email","Email"],["phone","Phone"],["location","Location"],["github_url","GitHub URL"],["linkedin_url","LinkedIn URL"],["cv_url","CV URL"],["available","Available for opportunities","boolean"]]
  const [form, setForm] = useState(null)
  const [status, setStatus] = useState("")
  useEffect(() => { api.get("/profile").then(({ data }) => setForm(data || {})).catch((error) => setStatus(error.message)) }, [])
  async function save(event) { event.preventDefault(); try { await api.put("/profile", form); setStatus("Profile saved.") } catch (error) { setStatus(error.message) } }
  if (!form) return <div className="admin-content"><div className="empty-panel">Loading profile…</div></div>
  return <div className="admin-content"><form className="admin-panel edit-form" onSubmit={save}><div className="panel-heading"><div><div className="section-label">PUBLIC IDENTITY</div><h2>Profile details</h2></div><button className="button button-primary"><Save size={15} /> Save profile</button></div><div className="field-grid">{fields.map((field) => <AdminField key={field[0]} field={field} value={form[field[0]]} onChange={(value) => setForm({ ...form, [field[0]]: value })} />)}</div><p className="save-status" role="status">{status}</p></form></div>
}

function AdminField({ field, value, onChange }) {
  const [key,label,type="text",options] = field
  const [categories, setCategories] = useState([])
  useEffect(() => { if (["skillCategory", "blogCategory"].includes(type)) api.get(type === "skillCategory" ? "/skill_categories" : "/blog_categories").then(({ data }) => setCategories(data)).catch(() => {}) }, [type])
  const id = `field-${key}`
  if (type === "boolean") return <label className="field-check"><input id={id} type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} /><span>{label}</span></label>
  if (type === "richtext") return <div className="field-wrap field-wide"><span>{label}</span><ReactQuill theme="snow" value={value || ""} onChange={onChange} /></div>
  if (type === "json") return <label className="field-wrap"><span>{label} <small>Use JSON arrays, e.g. ["item one", "item two"]</small></span><textarea rows="4" value={Array.isArray(value) || value && typeof value === "object" ? JSON.stringify(value, null, 2) : value || "[]"} onChange={(event) => onChange(event.target.value)} /></label>
  if (["skillCategory", "blogCategory"].includes(type)) return <label className="field-wrap"><span>{label}</span><select id={id} value={value || ""} onChange={(event) => onChange(event.target.value || null)}><option value="">Choose category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
  if (type === "textarea") return <label className="field-wrap"><span>{label}</span><textarea id={id} rows="4" value={value || ""} onChange={(event) => onChange(event.target.value)} /></label>
  if (type === "select") return <label className="field-wrap"><span>{label}</span><select id={id} value={value || ""} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
  return <label className="field-wrap"><span>{label}</span><input id={id} type={type} value={value == null ? "" : value} onChange={(event) => onChange(type === "number" ? Number(event.target.value) : event.target.value)} /></label>
}

function ResourceManager({ resource }) {
  const [records, setRecords] = useState([])
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState("")
  const [query, setQuery] = useState("")
  const schema = schemas[resource]
  const title = pretty(resource)
  async function load() { try { const { data } = await api.get(`/${resource}`, { params: { limit: 200 } }); setRecords(data); setError("") } catch (reason) { setError(reason.message) } }
  useEffect(() => { load() }, [resource])
  const filtered = useMemo(() => records.filter((record) => `${record.title || ""} ${record.name || ""} ${record.organization || ""} ${record.position || ""} ${record.institution || ""}`.toLowerCase().includes(query.toLowerCase())), [records, query])
  function newRecord() { setEditing(Object.fromEntries(schema.map(([key, , type]) => [key, type === "boolean" ? (key === "published" ? true : false) : type === "json" ? "[]" : ""]))) }
  function editRecord(record) { setEditing(Object.fromEntries(schema.map(([key, , type]) => [key, type === "json" ? JSON.stringify(record[key] || [], null, 2) : record[key] ?? (type === "boolean" ? false : "")]))); setEditing((value) => ({ ...value, _id: record.id })) }
  async function save(event) {
    event.preventDefault(); setError("")
    try {
      const body = { ...editing }; const id = body._id; delete body._id
      for (const [key, , type] of schema) if (type === "json") body[key] = parseMaybeJSON(body[key], null)
      if (Object.values(body).some((value) => value === null)) throw new Error("Check JSON fields; each must contain valid JSON.")
      if (id) await api.put(`/${resource}/${id}`, body); else await api.post(`/${resource}`, body)
      setEditing(null); await load()
    } catch (reason) { setError(reason.message) }
  }
  async function remove(record) {
    const name = record.title || record.name || record.position || record.qualification
    if (!window.confirm(`Delete “${name}”? This cannot be undone.`)) return
    try { await api.delete(`/${resource}/${record.id}`); await load() } catch (reason) { setError(reason.message) }
  }
  return <div className="admin-content"><div className="admin-panel table-panel"><div className="panel-heading"><div><div className="section-label">CONTENT LIBRARY</div><h2>{title}</h2></div><button className="button button-primary" onClick={newRecord}><Plus size={16} /> Add {resource === "blog" ? "article" : "item"}</button></div><div className="table-tools"><input aria-label={`Search ${title}`} placeholder="Search entries…" value={query} onChange={(event) => setQuery(event.target.value)} /><span>{filtered.length} entries</span></div>{error && <div className="form-error">{error}</div>}<div className="data-table"><div className="data-head"><span>Title / name</span><span>Status</span><span>Updated</span><span>Actions</span></div>{filtered.map((record) => <div className="data-row" key={record.id}><strong>{record.title || record.name || record.position || record.qualification || record.organization || "Untitled"}</strong><span className={`status-pill ${record.published || record.status === "published" ? "published" : "draft"}`}>{record.status || (record.published ? "Published" : "Draft")}</span><span>{record.updated_at ? new Date(record.updated_at).toLocaleDateString() : "—"}</span><div className="row-actions"><button onClick={() => editRecord(record)}>Edit</button><button className="delete-action" onClick={() => remove(record)} aria-label="Delete"><Trash2 size={15} /></button></div></div>)}{!filtered.length && <div className="empty-panel">No matching entries. Add an item to get started.</div>}</div></div>{editing && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setEditing(null)}><form className="edit-modal" onSubmit={save}><div className="panel-heading"><div><div className="section-label">{editing._id ? "EDIT ENTRY" : "NEW ENTRY"}</div><h2>{editing._id ? "Update content" : `Add ${resource === "blog" ? "article" : "content"}`}</h2></div><button type="button" className="plain-close" onClick={() => setEditing(null)}>×</button></div><div className="field-grid">{schema.map((field) => <AdminField key={field[0]} field={field} value={editing[field[0]]} onChange={(value) => setEditing({ ...editing, [field[0]]: value })} />)}</div>{error && <div className="form-error">{error}</div>}<div className="modal-actions"><button type="button" className="button button-quiet" onClick={() => setEditing(null)}>Cancel</button><button className="button button-primary"><Save size={15} /> Save</button></div></form></div>}</div>
}

function Messages() {
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState("")
  async function load() { try { const { data } = await api.get("/admin/messages"); setMessages(data) } catch (reason) { setError(reason.message) } }
  useEffect(() => { load() }, [])
  async function update(id, body) { try { await api.patch(`/admin/messages/${id}`, body); await load(); if (selected?.id === id) setSelected({ ...selected, ...body }) } catch (reason) { setError(reason.message) } }
  async function remove(id) { try { await api.delete(`/admin/messages/${id}`); setSelected(null); await load() } catch (reason) { setError(reason.message) } }
  return <div className="admin-content"><div className="admin-panel table-panel"><div className="panel-heading"><div><div className="section-label">INBOX</div><h2>Contact messages <span className="count-badge">{messages.filter((message) => !message.is_read).length}</span></h2></div></div>{error && <div className="form-error">{error}</div>}<div className="message-list">{messages.map((message) => <button className={selected?.id === message.id ? "message-row selected" : "message-row"} key={message.id} onClick={() => { setSelected(message); if (!message.is_read) update(message.id, { is_read: true }) }}><span className={!message.is_read ? "message-dot unread" : "message-dot"}></span><span><strong>{message.name}</strong><small>{message.subject || message.email}</small></span><time>{new Date(message.created_at).toLocaleDateString()}</time></button>)}{!messages.length && <div className="empty-panel">No contact messages yet.</div>}</div></div>{selected && <div className="admin-panel message-detail"><button className="plain-close" onClick={() => setSelected(null)}>×</button><div className="section-label">MESSAGE DETAILS</div><h2>{selected.subject || "New message"}</h2><p><strong>{selected.name}</strong> · <a href={`mailto:${selected.email}`}>{selected.email}</a></p><time>{new Date(selected.created_at).toLocaleString()}</time><div className="message-body">{selected.message}</div><div className="modal-actions"><button className="button button-quiet" onClick={() => update(selected.id, { archived: !selected.archived })}>{selected.archived ? "Restore" : "Archive"}</button><button className="button button-danger" onClick={() => remove(selected.id)}><Trash2 size={15} /> Delete</button></div></div>}</div>
}

function MediaLibrary() {
  const [media, setMedia] = useState([])
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState("")
  async function load() { try { const { data } = await api.get("/admin/media"); setMedia(data) } catch (error) { setStatus(error.message) } }
  useEffect(() => { load() }, [])
  async function upload(event) { event.preventDefault(); if (!file) return; setBusy(true); setStatus(""); const form = new FormData(); form.append("file", file); try { await api.post("/admin/media", form); setFile(null); event.currentTarget.reset(); setStatus("Upload complete."); await load() } catch (error) { setStatus(error.message) } finally { setBusy(false) } }
  return <div className="admin-content"><div className="admin-panel upload-panel"><div><div className="section-label">CLOUDINARY STORAGE</div><h2>Add media</h2><p>Upload a profile or project image, certificate document, blog image, or CV.</p></div><form onSubmit={upload}><input type="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" onChange={(event) => setFile(event.target.files?.[0] || null)} required /><button className="button button-primary" disabled={busy}>{busy ? "Uploading…" : "Upload file"} <ArrowUpRight size={15} /></button></form><small>Images and PDF files up to 8 MB.</small>{status && <p role="status">{status}</p>}</div><div className="media-grid">{media.map((item) => <article className="media-item" key={item.id}>{item.resource_type === "image" ? <img src={item.url} alt={item.original_name} loading="lazy" /> : <div className="pdf-preview">PDF</div>}<div><strong>{item.original_name}</strong><button onClick={() => navigator.clipboard.writeText(item.url)}>Copy URL</button></div></article>)}{!media.length && <div className="empty-panel">Uploaded assets will appear here. Configure Cloudinary credentials on the backend to enable uploads.</div>}</div></div>
}

function SettingsManager() {
  const [text, setText] = useState("{}")
  const [status, setStatus] = useState("")
  useEffect(() => { api.get("/settings").then(({ data }) => setText(JSON.stringify(data, null, 2))).catch((error) => setStatus(error.message)) }, [])
  async function save(event) { event.preventDefault(); try { const result = await api.put("/settings", JSON.parse(text)); setText(JSON.stringify(result, null, 2)); setStatus("Website settings saved.") } catch (error) { setStatus(error instanceof SyntaxError ? "Settings must be valid JSON." : error.message) } }
  return <div className="admin-content"><form className="admin-panel settings-editor" onSubmit={save}><div className="section-label">SITE CONFIGURATION</div><h2>Website settings</h2><p>Manage your title, description, footer information, social links, and theme settings as a JSON object. Values are stored in the database.</p><textarea rows="16" spellCheck="false" value={text} onChange={(event) => setText(event.target.value)} /><p role="status">{status}</p><button className="button button-primary"><Save size={15} /> Save settings</button></form></div>
}

function AccountManager() {
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [status, setStatus] = useState("")
  async function submit(event) { event.preventDefault(); try { await api.post("/admin/account/password", { current_password: current, new_password: next }); setCurrent(""); setNext(""); setStatus("Password updated. Sign in again on your next session.") } catch (error) { setStatus(error.message) } }
  return <div className="admin-content"><form className="admin-panel password-form" onSubmit={submit}><div className="section-label">SECURITY</div><h2>Change password</h2><p>Use a long, unique password with at least 12 characters.</p><label>Current password<input type="password" autoComplete="current-password" required value={current} onChange={(event) => setCurrent(event.target.value)} /></label><label>New password<input type="password" minLength="12" autoComplete="new-password" required value={next} onChange={(event) => setNext(event.target.value)} /></label><p role="status">{status}</p><button className="button button-primary"><ShieldCheck size={15} /> Update password</button></form></div>
}

export default function AdminRoot() {
  const [user, setUser] = useState(undefined)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => { api.get("/auth/me").then(({ data }) => setUser(data)).catch(() => setUser(null)) }, [])
  async function logout() { try { await api.post("/auth/logout") } finally { setUser(null); navigate("/admin/login") } }
  if (user === undefined) return <div className="admin-loading">Loading your workspace…</div>
  if (!user) return <Login onLogin={() => api.get("/auth/me").then(({ data }) => setUser(data)).then(() => navigate("/admin"))} />
  if (location.pathname === "/admin/login") navigate("/admin", { replace: true })
  return <Admin user={user} onLogout={logout} />
}
