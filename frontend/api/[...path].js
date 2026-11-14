module.exports = async function apiProxy(request, response) {
  const apiBase = process.env.VITE_API_BASE_URL
  if (!apiBase) return response.status(503).json({ error: "VITE_API_BASE_URL is not configured for the API proxy." })

  const requestUrl = new URL(request.url, `https://${request.headers.host}`)
  const suffix = requestUrl.pathname.replace(/^\/api\/v1/, "")
  const upstreamUrl = `${apiBase.replace(/\/$/, "")}${suffix}${requestUrl.search}`
  const headers = new Headers(request.headers)
  headers.delete("host")
  headers.delete("content-length")
  const options = { method: request.method, headers, redirect: "manual" }

  if (!["GET", "HEAD"].includes(request.method)) {
    const chunks = []
    for await (const chunk of request) chunks.push(Buffer.from(chunk))
    options.body = Buffer.concat(chunks)
  }

  try {
    const upstream = await fetch(upstreamUrl, options)
    response.status(upstream.status)
    for (const name of ["content-type", "cache-control", "set-cookie", "location"]) {
      const value = name === "set-cookie" && typeof upstream.headers.getSetCookie === "function"
        ? upstream.headers.getSetCookie()
        : upstream.headers.get(name)
      if (value && (Array.isArray(value) ? value.length : true)) response.setHeader(name, value)
    }
    return response.send(Buffer.from(await upstream.arrayBuffer()))
  } catch (error) {
    console.error("API proxy error:", error)
    return response.status(502).json({ error: "The portfolio API could not be reached." })
  }
}

module.exports.config = { api: { bodyParser: false } }
