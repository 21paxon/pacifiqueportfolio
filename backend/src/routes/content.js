const express = require("express")
const { requireAuth, optionalAuth } = require("../middleware/auth")
const { createContentController } = require("../controllers/contentController")

const router = express.Router()
const resources = ["projects", "skills", "experiences", "education", "certifications", "blog", "skill_categories", "blog_categories"]
for (const resource of resources) {
  const controller = createContentController(resource)
  router.get(`/${resource}`, optionalAuth, (request, response, next) => {
    if (request.query.admin === "true") return requireAuth(request, response, next)
    return next()
  }, controller.list)
  if (["projects", "blog", "blog_categories"].includes(resource)) router.get(`/${resource}/:slug`, optionalAuth, controller.get)
  router.post(`/${resource}`, requireAuth, controller.create)
  router.put(`/${resource}/:id`, requireAuth, controller.update)
  router.delete(`/${resource}/:id`, requireAuth, controller.remove)
}

module.exports = router
