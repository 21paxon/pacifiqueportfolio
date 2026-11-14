export default async function apiProxy(request, response) {
  const apiBase = process.env.VITE_API_BASE_URL || "https://pacifiqueportfolio.onrender.com/api/v1"

  const requestUrl = new URL(request.url, `https://${request.headers.host}`)
  const suffix = requestUrl.pathname.replace(/^\/api\/v1/, "")
  const upstreamUrl = `${apiBase.replace(/\/$/, "")}${suffix}${requestUrl.search}`
  const headers = new Headers()
  for (const name of ["accept", "content-type", "cookie", "authorization", "origin", "user-agent", "x-forwarded-for", "x-forwarded-proto"]) {
    const value = request.headers[name]
    if (value) headers.set(name, Array.isArray(value) ? value.join(", ") : value)
  }
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

export const config = { api: { bodyParser: false } }
