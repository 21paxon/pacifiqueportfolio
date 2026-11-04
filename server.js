const express = require("express")
const path = require("node:path")
const emailjs = require("@emailjs/nodejs")

const app = express()
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, "public")

app.use(express.json({ limit: "20kb" }))
app.use(express.static(publicDirectory))

app.post("/api/contact", async (request, response) => {
  const { name, email, message } = request.body || {}

  if (!name || !email || !message) {
    return response.status(400).json({ success: false, error: "Name, email, and message are required." })
  }

  try {
    if (process.env.EMAILJS_PUBLIC_KEY && process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID) {
      emailjs.init({ publicKey: process.env.EMAILJS_PUBLIC_KEY })
      await emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, { name, email, message })
    } else {
      console.log("Contact form submission:", { name, email, message })
    }

    return response.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return response.status(500).json({ success: false, error: "Failed to send message." })
  }
})

app.listen(port, () => {
  console.log(`Portfolio running at http://localhost:${port}`)
})
