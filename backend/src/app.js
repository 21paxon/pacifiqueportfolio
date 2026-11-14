const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const rateLimit = require("express-rate-limit")
const swaggerUi = require("swagger-ui-express")
const authRoutes = require("./routes/auth")
const contentRoutes = require("./routes/content")
const siteRoutes = require("./routes/site")

const app = express()
app.disable("x-powered-by")
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1)
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173").split(",").map((origin) => origin.trim())

app.use(helmet())
app.use(cors({ origin(origin, done) {
  if (!origin || allowedOrigins.includes(origin)) return done(null, true)
  return done(Object.assign(new Error("Origin is not allowed by CORS."), { status: 403 }))
}, credentials: true }))
app.use(express.json({ limit: "1mb" }))
app.use(cookieParser())
app.use("/api/v1/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-7", legacyHeaders: false }))
app.use("/api/v1/contact", rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: "draft-7", legacyHeaders: false }))

app.get("/api/v1/health", async (_request, response) => {
  try { await require("./config/database").pool.query("SELECT 1"); return response.json({ status: "ok", service: "portfolio-api", database: "connected", timestamp: new Date().toISOString() }) }
  catch { return response.status(503).json({ status: "unavailable", service: "portfolio-api", database: "disconnected" }) }
})
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1", siteRoutes)
app.use("/api/v1", contentRoutes)

const openapi = {
  openapi: "3.0.3", info: { title: "Pacifique Portfolio API", version: "1.0.0", description: "Portfolio content, contact, and administration API." },
  servers: [{ url: "/api/v1" }], components: { securitySchemes: { cookieAuth: { type: "apiKey", in: "cookie", name: "portfolio_token" } } },
  paths: {
    "/health": { get: { summary: "Health check", responses: { 200: { description: "API is available" } } } },
    "/auth/login": { post: { summary: "Administrator login", responses: { 200: { description: "Sets secure HttpOnly session cookie" }, 401: { description: "Invalid credentials" } } } },
    "/auth/logout": { post: { summary: "Administrator logout", responses: { 204: { description: "Session cleared" } } } },
    "/profile": { get: { summary: "Read public profile", responses: { 200: { description: "Profile object" } } }, put: { security: [{ cookieAuth: [] }], summary: "Update profile", responses: { 200: { description: "Updated profile" } } } },
    "/projects": { get: { summary: "List published projects", responses: { 200: { description: "Project list" } } }, post: { security: [{ cookieAuth: [] }], summary: "Create project", responses: { 201: { description: "Created project" } } } },
    "/projects/{slug}": { get: { summary: "Read project by slug", parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Project" }, 404: { description: "Not found" } } } },
    "/skills": { get: { summary: "List skills", responses: { 200: { description: "Skill list" } } } },
    "/experiences": { get: { summary: "List experience", responses: { 200: { description: "Experience list" } } } },
    "/education": { get: { summary: "List education", responses: { 200: { description: "Education list" } } } },
    "/certifications": { get: { summary: "List certifications", responses: { 200: { description: "Certification list" } } } },
    "/blog": { get: { summary: "List published articles", responses: { 200: { description: "Article list" } } } },
    "/contact": { post: { summary: "Submit a contact message", responses: { 201: { description: "Message stored" }, 400: { description: "Invalid input" } } } },
    "/admin/overview": { get: { security: [{ cookieAuth: [] }], summary: "Dashboard statistics", responses: { 200: { description: "Database-backed statistics" } } } },
    "/admin/messages": { get: { security: [{ cookieAuth: [] }], summary: "List contact messages", responses: { 200: { description: "Message list" } } } },
    "/admin/media": { post: { security: [{ cookieAuth: [] }], summary: "Upload media to Cloudinary", responses: { 201: { description: "Media record" } } } },
  },
}
for (const resource of ["projects", "skills", "experiences", "education", "certifications", "blog", "skill_categories", "blog_categories"]) {
  const path = `/${resource}`
  openapi.paths[path] ||= {}
  openapi.paths[path].get ||= { summary: `List ${resource}`, responses: { 200: { description: "Content list" } } }
  openapi.paths[path].post = { security: [{ cookieAuth: [] }], summary: `Create ${resource} item`, responses: { 201: { description: "Created item" }, 401: { description: "Authentication required" } } }
  openapi.paths[`/${resource}/{id}`] = {
    put: { security: [{ cookieAuth: [] }], summary: `Update ${resource} item`, parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }], responses: { 200: { description: "Updated item" }, 404: { description: "Not found" } } },
    delete: { security: [{ cookieAuth: [] }], summary: `Delete ${resource} item`, parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }], responses: { 204: { description: "Deleted item" }, 404: { description: "Not found" } } },
  }
}
openapi.paths["/auth/me"] = { get: { security: [{ cookieAuth: [] }], summary: "Read the signed-in administrator", responses: { 200: { description: "Administrator session" }, 401: { description: "Authentication required" } } } }
openapi.paths["/settings"] = { get: { summary: "Read public website settings", responses: { 200: { description: "Public settings" } } }, put: { security: [{ cookieAuth: [] }], summary: "Update website settings", responses: { 200: { description: "Saved settings" } } } }
openapi.paths["/admin/overview"] ||= { get: { security: [{ cookieAuth: [] }], summary: "Read dashboard statistics", responses: { 200: { description: "Database-backed statistics" } } } }
openapi.paths["/admin/messages"] = { get: { security: [{ cookieAuth: [] }], summary: "List contact messages", responses: { 200: { description: "Message list" } } } }
openapi.paths["/admin/messages/{id}"] = {
  patch: { security: [{ cookieAuth: [] }], summary: "Mark a message read or archived", responses: { 200: { description: "Updated message" } } },
  delete: { security: [{ cookieAuth: [] }], summary: "Delete a message", responses: { 204: { description: "Deleted message" } } },
}
openapi.paths["/admin/media"] = { get: { security: [{ cookieAuth: [] }], summary: "List media assets", responses: { 200: { description: "Media list" } } }, post: { security: [{ cookieAuth: [] }], summary: "Upload a media asset", responses: { 201: { description: "Uploaded media" } } } }
openapi.paths["/admin/media/{id}"] = { delete: { security: [{ cookieAuth: [] }], summary: "Delete a media asset", responses: { 204: { description: "Deleted media" } } } }
openapi.paths["/admin/account/password"] = { post: { security: [{ cookieAuth: [] }], summary: "Change administrator password", responses: { 200: { description: "Password changed" }, 401: { description: "Current password is incorrect" } } } }
app.get("/api/v1/openapi.json", (_request, response) => response.json(openapi))
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi))

app.use((request, response) => response.status(404).json({ error: `Route not found: ${request.method} ${request.path}` }))
app.use((error, _request, response, _next) => {
  const status = error.status || (error.code === "23505" ? 409 : ["23503", "23514", "23502", "22P02", "22007", "22008"].includes(error.code) ? 400 : 500)
  if (status >= 500) console.error("API error:", error)
  response.status(status).json({ error: status === 500 ? "An unexpected server error occurred." : error.message })
})

module.exports = { app }
