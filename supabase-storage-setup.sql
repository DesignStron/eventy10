-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images', 
  'gallery-images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update their own gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete their own gallery images" ON storage.objects;

-- Set up Row Level Security for the bucket - allow everyone to upload
CREATE POLICY "Allow public uploads to gallery-images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'gallery-images'
);

-- Allow public access to view images
CREATE POLICY "Allow public access to gallery-images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'gallery-images'
);

-- Allow public updates
CREATE POLICY "Allow public updates to gallery-images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'gallery-images'
);

-- Allow public deletions
CREATE POLICY "Allow public deletions to gallery-images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'gallery-images'
);
