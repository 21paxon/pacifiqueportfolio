function escapeXml(value) {
  return String(value).replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character])
}

module.exports = async function sitemap(request, response) {
  const host = request.headers["x-forwarded-host"] || request.headers.host
  const protocol = request.headers["x-forwarded-proto"] || "https"
  const origin = `${protocol}://${host}`
  const apiBase = process.env.VITE_API_BASE_URL
  const urls = [`${origin}/`]
  if (apiBase) {
    for (const resource of ["projects", "blog"]) {
      try {
        const result = await fetch(`${apiBase}/${resource}`)
        if (!result.ok) continue
        const records = await result.json()
        for (const record of records) if (record.slug) urls.push(`${origin}/${resource === "blog" ? "blog" : "projects"}/${encodeURIComponent(record.slug)}`)
      } catch { /* Keep the base portfolio in the sitemap while the API is unavailable. */ }
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${escapeXml(url)}</loc></url>`).join("")}</urlset>`
  response.setHeader("Content-Type", "application/xml; charset=utf-8")
  response.setHeader("Cache-Control", "public, max-age=300, s-maxage=300")
  return response.status(200).send(body)
}
