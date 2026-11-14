# Pacifique NIYOGUSHIMWA — Portfolio and CMS

The repository contains two independently deployable applications: the React/Vite website in `frontend/` and the Express API in `backend/`. Root-level npm scripts are workspace shortcuts only.

## Architecture

- `frontend/`: React, Vite, JavaScript, React Router, Axios and Lucide. Deploy to Vercel with the project root set to `frontend/`.
- `backend/`: Express REST API, PostgreSQL (`pg`), cookie-based administrator auth, Cloudinary uploads and OpenAPI docs. Deploy to Render using the root `render.yaml`.
- `backend/migrations/`: versioned schema and existing verified portfolio content. Public endpoints expose published content only; the admin can read drafts after authentication.

The frontend never connects directly to PostgreSQL. All data access goes through the versioned HTTPS API.

## Local development

Requirements: Node.js 20+, a PostgreSQL database (Neon recommended), and Cloudinary credentials for media uploads.

1. Copy `backend/.env.example` to `backend/.env`, set `DATABASE_URL`, a random `JWT_SECRET` of at least 32 characters, an administrator email and a unique password of at least 12 characters. Set Cloudinary values to enable uploads.
2. Install backend dependencies and apply migrations:

   ```sh
   cd backend
   npm install
   npm run migrate
   npm run dev
   ```

3. In another terminal, copy `frontend/.env.example` to `frontend/.env`, install dependencies and start Vite:

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

The site runs at `http://localhost:5173`; the API runs at `http://localhost:4000`. The backend only creates an initial admin account when `ADMIN_EMAIL` and `ADMIN_PASSWORD` are configured. It never exposes public registration. The initial password is not changed on later server starts; use Admin → Account to rotate it.

The API health check is `/api/v1/health`, OpenAPI JSON is `/api/v1/openapi.json`, and Swagger UI is `/api/docs`.

## Deployment

### Vercel

- Import this repository and set the project root to `frontend/`.
- Build command: `npm run build`; output directory: `dist`.
- The Vercel API proxy and sitemap use `https://pacifiqueportfolio.onrender.com/api/v1` by default. Set `VITE_API_BASE_URL` in Vercel only if you want to override that API origin.
- The Vercel serverless proxy forwards `/api/v1/*` to this URL, keeping the browser session cookie same-origin while the API remains independently hosted.

### Render and Neon

- Create the Render web service from the repository-root `render.yaml` (service root `backend/`, build command `npm install`, start command `npm start`).
- Set `DATABASE_URL` to the Neon connection string, `FRONTEND_URL` to the exact Vercel origin (no trailing slash), `ADMIN_EMAIL`, `ADMIN_PASSWORD` (12+ characters), and a random `JWT_SECRET` (32+ characters). Set the Cloudinary credentials for media.
- The backend applies pending migrations on startup before listening. `npm run migrate` is also available for manual maintenance. Configure secrets in Render, not source control.
- Set the production API origin in Vercel as `VITE_API_BASE_URL`, then redeploy the frontend.

Production auth uses an HttpOnly, Secure, SameSite=Lax cookie. The browser calls Vercel at its own origin; the Vercel function forwards requests and the cookie to Render. Exact-origin CORS and request-origin checks are configured from `FRONTEND_URL`.

## Content and external configuration

The initial profile, projects, skills, education, certificates, and experience are seeded from information already in the portfolio. Existing employment dates that were absent remain unset. No blog articles, external credentials, certificate files, or CV file are fabricated. Add those assets and content through `/admin` after configuring services.

Contact submissions are validated and stored in PostgreSQL. Cloudinary uploads accept JPG, PNG, WebP, GIF, and PDF up to 4 MB. A missing Cloudinary configuration returns a clear service error.

## API outline

All routes use `/api/v1`. Public GET endpoints include `/profile`, `/projects`, `/projects/:slug`, `/skills`, `/experiences`, `/education`, `/certifications`, `/blog` and `/blog/:slug`. `/contact` stores a message. Administrator login is `/auth/login`, logout is `/auth/logout`; protected content CRUD, profile editing, messages, settings, media, overview, and password changes require the signed HttpOnly session cookie.

## Checks

Run `npm run build` in `frontend/` to create the Vercel production bundle. Run the backend with a configured Neon database to apply migrations and verify CRUD, login, uploads, and message persistence. No production services or credentials are included in this repository.
