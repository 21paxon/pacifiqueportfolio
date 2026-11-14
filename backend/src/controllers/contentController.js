const repository = require("../repositories/contentRepository")
const { pool } = require("../config/database")

function createContentController(name) {
  return {
    list: async (request, response, next) => {
      try { response.json(await repository.list(name, { admin: Boolean(request.admin), ...request.query })) } catch (error) { next(error) }
    },
    get: async (request, response, next) => {
      try {
        const record = await repository.getBySlug(name, request.params.slug, { admin: Boolean(request.admin) })
        if (!record) return response.status(404).json({ error: "Content not found." })
        return response.json(record)
      } catch (error) { return next(error) }
    },
    create: async (request, response, next) => {
      try {
        const record = await repository.save(name, null, request.body)
        await pool.query("INSERT INTO activity_log (admin_id, action, entity) VALUES ($1, 'created', $2)", [request.admin.sub, name])
        return response.status(201).json(record)
      } catch (error) { return next(error) }
    },
    update: async (request, response, next) => {
      try {
        const record = await repository.save(name, request.params.id, request.body)
        if (!record) return response.status(404).json({ error: "Content not found." })
        await pool.query("INSERT INTO activity_log (admin_id, action, entity) VALUES ($1, 'updated', $2)", [request.admin.sub, name])
        return response.json(record)
      } catch (error) { return next(error) }
    },
    remove: async (request, response, next) => {
      try {
        if (!await repository.remove(name, request.params.id)) return response.status(404).json({ error: "Content not found." })
        await pool.query("INSERT INTO activity_log (admin_id, action, entity) VALUES ($1, 'deleted', $2)", [request.admin.sub, name])
        return response.status(204).end()
      } catch (error) { return next(error) }
    },
  }
}

module.exports = { createContentController }
