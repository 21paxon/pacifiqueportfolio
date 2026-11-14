const { pool } = require("../config/database")

const collections = {
  projects: { table: "projects", publicWhere: "published = true", order: "featured DESC, sort_order, created_at DESC" },
  skills: { table: "skills", publicWhere: "published = true", order: "skills.sort_order, skills.name" },
  experiences: { table: "experiences", publicWhere: "published = true", order: "sort_order, start_date DESC NULLS LAST" },
  education: { table: "education", publicWhere: "published = true", order: "sort_order, start_date DESC NULLS LAST" },
  certifications: { table: "certifications", publicWhere: "published = true", order: "sort_order, issue_date DESC NULLS LAST" },
  blog: { table: "blog_posts", publicWhere: "status = 'published' AND published_at <= now()", order: "published_at DESC" },
  skill_categories: { table: "skill_categories", publicWhere: "true", order: "sort_order, name", timestamps: false },
  blog_categories: { table: "blog_categories", publicWhere: "true", order: "name", timestamps: false },
}
const writable = {
  projects: new Set(["slug","title","description","problem","solution","contribution","features","technologies","category","status","cover_image","screenshots","github_url","demo_url","featured","published","sort_order"]),
  skills: new Set(["name","category_id","icon_url","proficiency_type","sort_order","published"]),
  experiences: new Set(["organization","position","employment_type","start_date","end_date","current","responsibilities","achievements","logo_url","published","sort_order"]),
  education: new Set(["institution","qualification","start_date","end_date","expected_completion","details","published","sort_order"]),
  certifications: new Set(["name","issuer","issue_date","file_url","verification_url","published","sort_order"]),
  blog: new Set(["slug","title","excerpt","content","cover_image","category_id","tags","status","published_at","seo_title","seo_description"]),
  skill_categories: new Set(["name","sort_order"]),
  blog_categories: new Set(["name","slug"]),
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
  const from = name === "skills" ? "skills LEFT JOIN skill_categories ON skill_categories.id = skills.category_id" : config.table
  const selection = name === "skills" ? "skills.*, skill_categories.name AS category" : "*"
  const result = await pool.query(`SELECT ${selection} FROM ${from} ${clause} ORDER BY ${config.order} LIMIT $${params.length - 1} OFFSET $${params.length}`, params)
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
  if (name === "blog" && body?.status === "published" && !body.published_at) body = { ...body, published_at: new Date().toISOString() }
  const allowed = writable[name]
  const entries = Object.entries(body || {}).filter(([key]) => allowed.has(key))
  if (!entries.length) throw Object.assign(new Error("No editable fields were provided."), { status: 400 })
  const values = entries.map(([key, value]) => jsonFields.has(key) && !Array.isArray(value) && key !== "tags" ? JSON.stringify(value) : jsonFields.has(key) ? JSON.stringify(value) : value)
  const table = collections[name].table
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    let result
    if (id) {
      values.push(id)
      const sets = entries.map(([key], index) => `${key} = $${index + 1}${jsonFields.has(key) ? "::jsonb" : ""}`)
      if (collections[name].timestamps !== false) sets.push("updated_at = now()")
      result = await client.query(`UPDATE ${table} SET ${sets.join(", ")} WHERE id = $${values.length} RETURNING *`, values)
    } else {
      const columns = entries.map(([key]) => key)
      const placeholders = entries.map(([key], index) => `$${index + 1}${jsonFields.has(key) ? "::jsonb" : ""}`)
      result = await client.query(`INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *`, values)
    }
    const record = result.rows[0]
    if (!record) { await client.query("ROLLBACK"); return null }

    if (name === "projects" && Object.hasOwn(body, "screenshots")) {
      await client.query("DELETE FROM project_images WHERE project_id = $1", [record.id])
      for (const [index, image] of (Array.isArray(body.screenshots) ? body.screenshots : []).entries()) {
        if (typeof image === "string" && image.trim()) await client.query("INSERT INTO project_images (project_id, url, alt_text, sort_order) VALUES ($1,$2,$3,$4)", [record.id, image.trim(), `${record.title} screenshot`, index])
      }
    }

    if (name === "blog" && Object.hasOwn(body, "tags")) {
      await client.query("DELETE FROM blog_post_tags WHERE blog_post_id = $1", [record.id])
      for (const item of (Array.isArray(body.tags) ? body.tags : [])) {
        const tagName = String(item).trim().slice(0, 80)
        const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        if (!slug) continue
        const tag = await client.query("INSERT INTO blog_tags (name, slug) VALUES ($1,$2) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id", [tagName, slug])
        await client.query("INSERT INTO blog_post_tags (blog_post_id, blog_tag_id) VALUES ($1,$2) ON CONFLICT DO NOTHING", [record.id, tag.rows[0].id])
      }
    }

    await client.query("COMMIT")
    return record
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally { client.release() }
}

async function remove(name, id) {
  const config = configFor(name)
  const result = await pool.query(`DELETE FROM ${config.table} WHERE id = $1 RETURNING id`, [id])
  return result.rowCount > 0
}

module.exports = { collections, list, getBySlug, save, remove }
