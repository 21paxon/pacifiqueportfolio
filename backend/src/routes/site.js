const express = require("express")
const bcrypt = require("bcrypt")
const multer = require("multer")
const { v2: cloudinary } = require("cloudinary")
const { pool } = require("../config/database")
const { requireAuth } = require("../middleware/auth")

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 }, fileFilter: (req, file, done) => {
  if (/^(image\/(jpeg|png|webp|gif)|application\/pdf)$/.test(file.mimetype)) return done(null, true)
  return done(new Error("Only JPG, PNG, WebP, GIF, and PDF files are allowed."))
} })

router.get("/profile", async (_request, response, next) => {
  try { const result = await pool.query("SELECT * FROM profiles ORDER BY updated_at DESC LIMIT 1"); response.json(result.rows[0] || null) } catch (error) { next(error) }
})
router.put("/profile", requireAuth, async (request, response, next) => {
  try {
    const allowed = new Set(["full_name","headline","introduction","about","photo_url","email","phone","location","github_url","linkedin_url","cv_url","available"])
    const entries = Object.entries(request.body || {}).filter(([key]) => allowed.has(key))
    if (!entries.length) return response.status(400).json({ error: "Provide at least one profile field." })
    const fields = entries.map(([key]) => key)
    const values = entries.map(([, value]) => value)
    const updates = entries.map(([key], index) => `${key} = $${index + 1}`).join(",")
    const result = await pool.query(`INSERT INTO profiles (singleton, ${fields.join(",")}) VALUES (true, ${fields.map((_, i) => `$${i + 1}`).join(",")}) ON CONFLICT (singleton) DO UPDATE SET ${updates}, updated_at = now() RETURNING *`, values)
    return response.json(result.rows[0])
  } catch (error) { return next(error) }
})

router.get("/settings", async (_request, response, next) => {
  try { const result = await pool.query("SELECT key, value FROM website_settings"); response.json(Object.fromEntries(result.rows.map(({ key, value }) => [key, value]))) } catch (error) { next(error) }
})
router.put("/settings", requireAuth, async (request, response, next) => {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const allowed = new Set(["site_title","site_description","logo_url","favicon_url","github_url","linkedin_url","footer_text","email","phone","location","default_theme","seo_title","seo_description"])
    for (const [key, value] of Object.entries(request.body || {})) {
      if (!allowed.has(key)) continue
      await client.query("INSERT INTO website_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()", [key, JSON.stringify(value)])
    }
    await client.query("COMMIT")
    const result = await client.query("SELECT key, value FROM website_settings")
    return response.json(Object.fromEntries(result.rows.map(({ key, value }) => [key, value])))
  } catch (error) { await client.query("ROLLBACK"); return next(error) } finally { client.release() }
})

router.get("/admin/overview", requireAuth, async (_request, response, next) => {
  try {
    const result = await pool.query(`SELECT
      (SELECT count(*)::int FROM projects) AS projects,
      (SELECT count(*)::int FROM projects WHERE published) AS published_projects,
      (SELECT count(*)::int FROM blog_posts) AS blog_posts,
      (SELECT count(*)::int FROM blog_posts WHERE status = 'published') AS published_articles,
      (SELECT count(*)::int FROM certifications) AS certifications,
      (SELECT count(*)::int FROM contact_messages WHERE NOT is_read AND NOT archived) AS unread_messages,
      (SELECT COALESCE(json_agg(row_to_json(a)), '[]') FROM (SELECT action, entity, created_at FROM activity_log ORDER BY created_at DESC LIMIT 8) a) AS recent_activity`)
    return response.json(result.rows[0])
  } catch (error) { return next(error) }
})

router.get("/admin/messages", requireAuth, async (request, response, next) => {
  try {
    const result = await pool.query("SELECT * FROM contact_messages WHERE ($1::boolean OR NOT archived) ORDER BY created_at DESC LIMIT 200", [request.query.archived === "true"])
    return response.json(result.rows)
  } catch (error) { return next(error) }
})
router.patch("/admin/messages/:id", requireAuth, async (request, response, next) => {
  try {
    const allowed = ["is_read", "archived"]
    const entries = Object.entries(request.body || {}).filter(([key, value]) => allowed.includes(key) && typeof value === "boolean")
    if (!entries.length) return response.status(400).json({ error: "Provide is_read or archived as a boolean." })
    const result = await pool.query(`UPDATE contact_messages SET ${entries.map(([key], i) => `${key} = $${i + 1}`).join(", ")} WHERE id = $${entries.length + 1} RETURNING *`, [...entries.map(([, value]) => value), request.params.id])
    return result.rows[0] ? response.json(result.rows[0]) : response.status(404).json({ error: "Message not found." })
  } catch (error) { return next(error) }
})
router.delete("/admin/messages/:id", requireAuth, async (request, response, next) => {
  try { const result = await pool.query("DELETE FROM contact_messages WHERE id = $1", [request.params.id]); return result.rowCount ? response.status(204).end() : response.status(404).json({ error: "Message not found." }) } catch (error) { return next(error) }
})

router.get("/admin/media", requireAuth, async (_request, response, next) => {
  try { const result = await pool.query("SELECT * FROM media ORDER BY created_at DESC LIMIT 200"); response.json(result.rows) } catch (error) { next(error) }
})
router.post("/admin/media", requireAuth, upload.single("file"), async (request, response, next) => {
  try {
    if (!request.file) return response.status(400).json({ error: "Choose a file to upload." })
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) return response.status(503).json({ error: "Cloudinary is not configured on the server." })
    cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET })
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: "auto", folder: "pacifique-portfolio" }, (error, result) => error ? reject(error) : resolve(result))
      stream.end(request.file.buffer)
    })
    const result = await pool.query("INSERT INTO media (public_id, url, resource_type, format, bytes, original_name) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [uploaded.public_id, uploaded.secure_url, uploaded.resource_type, uploaded.format || "", uploaded.bytes, request.file.originalname])
    return response.status(201).json(result.rows[0])
  } catch (error) { return next(error) }
})
router.delete("/admin/media/:id", requireAuth, async (request, response, next) => {
  try {
    const found = await pool.query("SELECT * FROM media WHERE id = $1", [request.params.id])
    const asset = found.rows[0]
    if (!asset) return response.status(404).json({ error: "Media item not found." })
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET })
      const resourceType = ["image", "video"].includes(asset.resource_type) ? asset.resource_type : "raw"
      await cloudinary.uploader.destroy(asset.public_id, { resource_type: resourceType, invalidate: true })
    }
    await pool.query("DELETE FROM media WHERE id = $1", [request.params.id])
    return response.status(204).end()
  } catch (error) { return next(error) }
})

router.post("/admin/account/password", requireAuth, async (request, response, next) => {
  try {
    const current = String(request.body?.current_password || "")
    const nextPassword = String(request.body?.new_password || "")
    if (nextPassword.length < 12) return response.status(400).json({ error: "New password must be at least 12 characters." })
    const result = await pool.query("SELECT password_hash FROM admin_users WHERE id = $1", [request.admin.sub])
    if (!result.rows[0] || !await bcrypt.compare(current, result.rows[0].password_hash)) return response.status(401).json({ error: "Current password is incorrect." })
    await pool.query("UPDATE admin_users SET password_hash = $1, updated_at = now() WHERE id = $2", [await bcrypt.hash(nextPassword, 12), request.admin.sub])
    return response.json({ success: true })
  } catch (error) { return next(error) }
})

router.post("/contact", async (request, response, next) => {
  try {
    const name = String(request.body?.name || "").trim()
    const email = String(request.body?.email || "").trim()
    const subject = String(request.body?.subject || "").trim()
    const message = String(request.body?.message || "").trim()
    if (!name || name.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 10000) return response.status(400).json({ error: "Enter a name, valid email address, and message under 10,000 characters." })
    const result = await pool.query("INSERT INTO contact_messages (name,email,subject,message) VALUES ($1,$2,$3,$4) RETURNING id", [name,email,subject.slice(0,200),message])
    return response.status(201).json({ success: true, id: result.rows[0].id })
  } catch (error) { return next(error) }
})

module.exports = router
