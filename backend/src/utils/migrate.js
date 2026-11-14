const fs = require("node:fs/promises")
const path = require("node:path")
const { pool } = require("../config/database")

async function migrate() {
  const file = path.join(__dirname, "../../migrations/001_initial.sql")
  const sql = await fs.readFile(file, "utf8")
  await pool.query(sql)
  console.log("Database migrations applied.")
}

migrate().catch((error) => { console.error(error); process.exitCode = 1 }).finally(() => pool.end())
