const fs = require("node:fs/promises")
const path = require("node:path")
const { pool } = require("../config/database")

async function migrate() {
  await pool.query("CREATE TABLE IF NOT EXISTS schema_migrations (filename TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())")
  const directory = path.join(__dirname, "../../migrations")
  const files = (await fs.readdir(directory)).filter((file) => file.endsWith(".sql")).sort()
  for (const filename of files) {
    const alreadyApplied = await pool.query("SELECT 1 FROM schema_migrations WHERE filename = $1", [filename])
    if (alreadyApplied.rowCount) continue
    const client = await pool.connect()
    try {
      await client.query("BEGIN")
      await client.query(await fs.readFile(path.join(directory, filename), "utf8"))
      await client.query("INSERT INTO schema_migrations (filename) VALUES ($1)", [filename])
      await client.query("COMMIT")
      console.log(`Applied ${filename}`)
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally { client.release() }
  }
  console.log("Database migrations are up to date.")
}

migrate().catch((error) => { console.error(error); process.exitCode = 1 }).finally(() => pool.end())
