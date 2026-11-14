const { pool } = require("../config/database")

const collections = {
  projects: { table: "projects", publicWhere: "published = true", order: "featured DESC, sort_order, created_at DESC" },
  skills: { table: "skills", publicWhere: "published = true", order: "sort_order, name" },
  experiences: { table: "experiences", publicWhere: "published = true", order: "sort_order, start_date DESC NULLS LAST" },
  education: { table: "education", publicWhere: "published = true", order: "sort_order, start_date DESC NULLS LAST" },
  certifications: { table: "certifications", publicWhere: "published = true", order: "sort_order, issue_date DESC NULLS LAST" },
  blog: { table: "blog_posts", publicWhere: "status = 'published' AND published_at <= now()", order: "published_at DESC" },
}
const writable = {
  projects: new Set(["slug","title","description","problem","solution","contribution","features","technologies","category","status","cover_image","screenshots","github_url","demo_url","featured","published","sort_order"]),
  skills: new Set(["name","category_id","icon_url","proficiency_type","sort_order","published"]),
  experiences: new Set(["organization","position","employment_type","start_date","end_date","current","responsibilities","achievements","logo_url","published","sort_order"]),
  education: new Set(["institution","qualification","start_date","end_date","expected_completion","details","published","sort_order"]),
  certifications: new Set(["name","issuer","issue_date","file_url","verification_url","published","sort_order"]),
  blog: new Set(["slug","title","excerpt","content","cover_image","category_id","tags","status","published_at","seo_title","seo_description"]),
}
const jsonFields = new Set(["features","technologies","screenshots","responsibilities","achievements","tags"])

function configFor(name) {
  const config = collections[name]
  if (!config) throw Object.assign(new Error("Unknown content collection."), { status: 404 })
  return config
}

async function list(name, { admin = false, limit = 100, offset = 0, search = "" } = {}) {
  const config = configFor(name)
  const params = []
  const where = []
  if (!admin) where.push(config.publicWhere)
  if (search && ["projects", "blog"].includes(name)) {
    params.push(`%${search.slice(0, 100)}%`)
    where.push(`(title ILIKE $${params.length} OR description ILIKE $${params.length})`)
  }
  params.push(Math.min(Math.max(Number(limit) || 100, 1), 200), Math.max(Number(offset) || 0, 0))
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : ""
  const result = await pool.query(`SELECT * FROM ${config.table} ${clause} ORDER BY ${config.order} LIMIT $${params.length - 1} OFFSET $${params.length}`, params)
  return result.rows
}

async function getBySlug(name, slug, { admin = false } = {}) {
  const config = configFor(name)
  const visibility = admin ? "" : ` AND (${config.publicWhere})`
  const result = await pool.query(`SELECT * FROM ${config.table} WHERE slug = $1${visibility} LIMIT 1`, [slug])
  return result.rows[0] || null
}

async function save(name, id, body) {
  configFor(name)
  const allowed = writable[name]
  const entries = Object.entries(body || {}).filter(([key]) => allowed.has(key))
  if (!entries.length) throw Object.assign(new Error("No editable fields were provided."), { status: 400 })
  const values = entries.map(([key, value]) => jsonFields.has(key) && !Array.isArray(value) && key !== "tags" ? JSON.stringify(value) : jsonFields.has(key) ? JSON.stringify(value) : value)
  const table = collections[name].table
  if (id) {
    values.push(id)
    const sets = entries.map(([key], index) => `${key} = $${index + 1}${jsonFields.has(key) ? "::jsonb" : ""}`)
    sets.push("updated_at = now()")
    const result = await pool.query(`UPDATE ${table} SET ${sets.join(", ")} WHERE id = $${values.length} RETURNING *`, values)
    return result.rows[0] || null
  }
  const columns = entries.map(([key]) => key)
  const placeholders = entries.map(([key], index) => `$${index + 1}${jsonFields.has(key) ? "::jsonb" : ""}`)
  const result = await pool.query(`INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *`, values)
  return result.rows[0]
}

async function remove(name, id) {
  const config = configFor(name)
  const result = await pool.query(`DELETE FROM ${config.table} WHERE id = $1 RETURNING id`, [id])
  return result.rowCount > 0
}

module.exports = { collections, list, getBySlug, save, remove }
