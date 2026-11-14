const { Pool } = require("pg")

if (!process.env.DATABASE_URL) console.warn("DATABASE_URL is not set; database routes will not work until configured.")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

module.exports = { pool }
