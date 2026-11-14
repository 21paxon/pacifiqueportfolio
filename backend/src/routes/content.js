const express = require("express")
const { requireAuth } = require("../middleware/auth")
const { createContentController } = require("../controllers/contentController")

const router = express.Router()
const resources = ["projects", "skills", "experiences", "education", "certifications", "blog"]
for (const resource of resources) {
  const controller = createContentController(resource)
  router.get(`/${resource}`, controller.list)
  router.get(`/${resource}/:slug`, controller.get)
  router.post(`/${resource}`, requireAuth, controller.create)
  router.put(`/${resource}/:id`, requireAuth, controller.update)
  router.delete(`/${resource}/:id`, requireAuth, controller.remove)
}

module.exports = router
