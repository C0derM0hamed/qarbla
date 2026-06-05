CREATE DATABASE IF NOT EXISTS karbala_test;
USE karbala_test;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS attachments;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS narrations;
DROP TABLE IF EXISTS verses;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS nights;
DROP TABLE IF EXISTS seasons;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE seasons (
  id VARCHAR(36) PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  intro TEXT,
  hero_image TEXT,
  logo_image TEXT,
  is_active BOOLEAN DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nights (
  id VARCHAR(36) PRIMARY KEY,
  season_id VARCHAR(36) NOT NULL,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  teaser TEXT,
  why_important TEXT,
  central_idea TEXT,
  quote TEXT,
  quote_author TEXT,
  reflection_question TEXT,
  practical_step TEXT,
  cover_image TEXT,
  audio_file TEXT,
  pdf_file TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE
);

CREATE TABLE topics (
  id VARCHAR(36) PRIMARY KEY,
  night_id VARCHAR(36) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (night_id) REFERENCES nights(id) ON DELETE CASCADE
);

CREATE TABLE verses (
  id VARCHAR(36) PRIMARY KEY,
  night_id VARCHAR(36) NOT NULL,
  surah_name TEXT,
  verse_number TEXT,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (night_id) REFERENCES nights(id) ON DELETE CASCADE
);

CREATE TABLE narrations (
  id VARCHAR(36) PRIMARY KEY,
  night_id VARCHAR(36) NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (night_id) REFERENCES nights(id) ON DELETE CASCADE
);

CREATE TABLE resources (
  id VARCHAR(36) PRIMARY KEY,
  night_id VARCHAR(36) NOT NULL,
  title TEXT NOT NULL,
  category VARCHAR(20) DEFAULT 'article',
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (night_id) REFERENCES nights(id) ON DELETE CASCADE
);

CREATE TABLE cards (
  id VARCHAR(36) PRIMARY KEY,
  night_id VARCHAR(36),
  slug VARCHAR(255) NOT NULL UNIQUE,
  type VARCHAR(20) DEFAULT 'quote',
  title TEXT NOT NULL,
  content TEXT,
  image TEXT,
  downloadable BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (night_id) REFERENCES nights(id) ON DELETE SET NULL
);
