require("dotenv").config()
const bcrypt = require("bcrypt")
const { app } = require("./app")
const { pool } = require("./config/database")
const { migrate } = require("./utils/migrate")

const port = Number(process.env.PORT) || 4000

async function bootstrapAdmin() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.warn("ADMIN_EMAIL and ADMIN_PASSWORD are unset; no administrator account will be bootstrapped.")
    return
  }
  if (process.env.ADMIN_PASSWORD.length < 12) throw new Error("ADMIN_PASSWORD must contain at least 12 characters.")
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
  await pool.query("INSERT INTO admin_users (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING", [process.env.ADMIN_EMAIL.toLowerCase(), passwordHash])
}

async function start() {
  if (!process.env.DATABASE_URL) console.warn("DATABASE_URL is unset; configure it and run `npm run migrate` before using data endpoints.")
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) console.warn("Set JWT_SECRET to a random value of at least 32 characters before enabling login.")
  if (process.env.DATABASE_URL) {
    await migrate()
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) await bootstrapAdmin()
  }
  const server = app.listen(port, () => console.log(`Portfolio API listening on port ${port}`))
  const shutdown = () => server.close(() => pool.end().finally(() => process.exit(0)))
  process.on("SIGTERM", shutdown)
  process.on("SIGINT", shutdown)
}

start().catch((error) => { console.error("Failed to start API:", error); process.exit(1) })
