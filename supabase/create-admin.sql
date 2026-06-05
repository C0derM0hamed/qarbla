-- ========================================================
-- Create and Confirm Admin User in Supabase Auth
-- Run this in your Supabase SQL Editor
-- ========================================================

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert or update admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmed_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@qarbla.com',
  crypt('AdminPassword123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  now()
) ON CONFLICT (email) DO UPDATE
SET email_confirmed_at = now(),
    confirmed_at = now(),
    encrypted_password = crypt('AdminPassword123!', gen_salt('bf'));

-- Ensure user is linked in public schema if you have a users table (optional)
-- INSERT INTO public.profiles (id, email) VALUES (..., 'admin@qarbla.com') ON CONFLICT DO NOTHING;
