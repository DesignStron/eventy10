-- To create the bucket, use Supabase Dashboard -> Storage -> New bucket
-- Bucket name: hero-images
-- Make it public: YES

-- This SQL is for the site_settings table (already done by user)
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default hero image (optional)
INSERT INTO site_settings (key, value) VALUES 
('hero_image', 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=80')
ON CONFLICT (key) DO NOTHING;
