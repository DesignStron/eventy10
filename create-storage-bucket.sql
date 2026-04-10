-- CREATE STORAGE BUCKET FOR OFFER IMAGES
-- Tworzy bucket 'offer-images' w Supabase Storage

-- 1. Utworz bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('offer-images', 'offer-images', true);

-- 2. Ustaw polityki dostepu (RLS)
-- Pozwol na publiczne odczyty i upload dla wszystkich
CREATE POLICY "Public images are viewable by everyone" ON storage.objects
FOR SELECT USING (bucket_id = 'offer-images');

CREATE POLICY "Anyone can upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'offer-images');

CREATE POLICY "Anyone can update their own images" ON storage.objects
FOR UPDATE USING (bucket_id = 'offer-images');

CREATE POLICY "Anyone can delete their own images" ON storage.objects
FOR DELETE USING (bucket_id = 'offer-images');

-- 3. Sprawdz czy bucket istnieje
SELECT * FROM storage.buckets WHERE name = 'offer-images';
