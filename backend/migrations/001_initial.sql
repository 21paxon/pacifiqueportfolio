CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), full_name TEXT NOT NULL DEFAULT '', headline TEXT NOT NULL DEFAULT '',
  introduction TEXT NOT NULL DEFAULT '', about TEXT NOT NULL DEFAULT '', photo_url TEXT NOT NULL DEFAULT '/pssportphot.jpeg',
  email TEXT NOT NULL DEFAULT '', phone TEXT NOT NULL DEFAULT '', location TEXT NOT NULL DEFAULT '',
  github_url TEXT NOT NULL DEFAULT '', linkedin_url TEXT NOT NULL DEFAULT '', cv_url TEXT NOT NULL DEFAULT '',
  available BOOLEAN NOT NULL DEFAULT false, singleton BOOLEAN NOT NULL DEFAULT true UNIQUE CHECK (singleton), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '', problem TEXT NOT NULL DEFAULT '', solution TEXT NOT NULL DEFAULT '',
  contribution TEXT NOT NULL DEFAULT '', features JSONB NOT NULL DEFAULT '[]', technologies JSONB NOT NULL DEFAULT '[]',
  category TEXT NOT NULL DEFAULT '', status TEXT NOT NULL DEFAULT 'in-progress', cover_image TEXT NOT NULL DEFAULT '',
  screenshots JSONB NOT NULL DEFAULT '[]', github_url TEXT NOT NULL DEFAULT '', demo_url TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false, published BOOLEAN NOT NULL DEFAULT false, sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL, alt_text TEXT NOT NULL DEFAULT '', sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL UNIQUE, sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, category_id UUID REFERENCES skill_categories(id) ON DELETE SET NULL,
  icon_url TEXT NOT NULL DEFAULT '', proficiency_type TEXT NOT NULL DEFAULT 'practical' CHECK (proficiency_type IN ('practical','learning')),
  sort_order INTEGER NOT NULL DEFAULT 0, published BOOLEAN NOT NULL DEFAULT true, updated_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(name, category_id)
);
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), organization TEXT NOT NULL, position TEXT NOT NULL,
  employment_type TEXT NOT NULL DEFAULT '', start_date DATE, end_date DATE, current BOOLEAN NOT NULL DEFAULT false,
  responsibilities JSONB NOT NULL DEFAULT '[]', achievements JSONB NOT NULL DEFAULT '[]', logo_url TEXT NOT NULL DEFAULT '',
  published BOOLEAN NOT NULL DEFAULT true, sort_order INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), institution TEXT NOT NULL, qualification TEXT NOT NULL,
  start_date DATE, end_date DATE, expected_completion TEXT NOT NULL DEFAULT '', details TEXT NOT NULL DEFAULT '',
  published BOOLEAN NOT NULL DEFAULT true, sort_order INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, issuer TEXT NOT NULL DEFAULT '', issue_date DATE,
  file_url TEXT NOT NULL DEFAULT '', verification_url TEXT NOT NULL DEFAULT '', published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS blog_categories (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL UNIQUE, slug TEXT NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL UNIQUE, slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '', content TEXT NOT NULL DEFAULT '', cover_image TEXT NOT NULL DEFAULT '',
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL, tags JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published')), published_at TIMESTAMPTZ,
  seo_title TEXT NOT NULL DEFAULT '', seo_description TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS blog_post_tags (
  blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  blog_tag_id UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, blog_tag_id)
);
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL, is_read BOOLEAN NOT NULL DEFAULT false, archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), key TEXT NOT NULL UNIQUE, value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), public_id TEXT NOT NULL UNIQUE, url TEXT NOT NULL,
  resource_type TEXT NOT NULL DEFAULT 'image', format TEXT NOT NULL DEFAULT '', bytes INTEGER NOT NULL DEFAULT 0,
  original_name TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL, entity TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS projects_public_sort_idx ON projects(published, featured DESC, sort_order);
CREATE INDEX IF NOT EXISTS project_images_order_idx ON project_images(project_id, sort_order);
CREATE INDEX IF NOT EXISTS blog_posts_public_idx ON blog_posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS blog_post_tags_tag_idx ON blog_post_tags(blog_tag_id, blog_post_id);
CREATE INDEX IF NOT EXISTS contact_messages_recent_idx ON contact_messages(created_at DESC);
