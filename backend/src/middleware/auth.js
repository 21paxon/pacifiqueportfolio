const jwt = require("jsonwebtoken")

function requireAuth(request, response, next) {
  const token = request.cookies?.portfolio_token || request.get("authorization")?.replace(/^Bearer\s+/i, "")
  if (!token) return response.status(401).json({ error: "Authentication required." })
  try {
    request.admin = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch {
    return response.status(401).json({ error: "Session is invalid or expired." })
  }
}

module.exports = { requireAuth }
