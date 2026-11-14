const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { pool } = require("../config/database")
const { requireAuth } = require("../middleware/auth")

const router = express.Router()
const cookieOptions = () => ({ httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 8 * 60 * 60 * 1000, path: "/" })

router.post("/login", async (request, response, next) => {
  try {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) return response.status(503).json({ error: "Authentication is not configured." })
    const email = String(request.body?.email || "").trim().toLowerCase()
    const password = String(request.body?.password || "")
    if (!email || !password) return response.status(400).json({ error: "Email and password are required." })
    const result = await pool.query("SELECT id, email, password_hash FROM admin_users WHERE email = $1", [email])
    const admin = result.rows[0]
    if (!admin || !await bcrypt.compare(password, admin.password_hash)) return response.status(401).json({ error: "Email or password is incorrect." })
    const token = jwt.sign({ sub: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "8h" })
    response.cookie("portfolio_token", token, cookieOptions())
    await pool.query("INSERT INTO activity_log (admin_id, action, entity) VALUES ($1, 'login', 'admin')", [admin.id])
    return response.json({ id: admin.id, email: admin.email })
  } catch (error) { return next(error) }
})

router.post("/logout", (request, response) => response.clearCookie("portfolio_token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", path: "/" }).status(204).end())
router.get("/me", requireAuth, (request, response) => response.json({ id: request.admin.sub, email: request.admin.email }))

module.exports = router
