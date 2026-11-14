const jwt = require("jsonwebtoken")

function requireAuth(request, response, next) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) return response.status(503).json({ error: "Authentication is not configured." })
  const token = request.cookies?.portfolio_token || request.get("authorization")?.replace(/^Bearer\s+/i, "")
  if (!token) return response.status(401).json({ error: "Authentication required." })
  try {
    request.admin = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch {
    return response.status(401).json({ error: "Session is invalid or expired." })
  }
}

function optionalAuth(request, _response, next) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) return next()
  const token = request.cookies?.portfolio_token || request.get("authorization")?.replace(/^Bearer\s+/i, "")
  if (token) {
    try { request.admin = jwt.verify(token, process.env.JWT_SECRET) } catch { /* Public requests may carry an expired cookie. */ }
  }
  return next()
}

module.exports = { requireAuth, optionalAuth }
