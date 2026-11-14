# Portfolio API

See the repository [README](../README.md) for architecture, local setup, deployment, and API details.

The API is a JavaScript Express app with versioned REST routes, PostgreSQL persistence, hashed administrator passwords, signed HttpOnly session cookies, Cloudinary uploads, Swagger UI, security headers, rate limits, origin checks, and parameterized SQL.

Copy `.env.example` to `.env`, configure the database and secrets, run `npm install` and `npm run migrate`, then `npm run dev`. The initial administrator is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` when the server starts after the migrations have been applied.
