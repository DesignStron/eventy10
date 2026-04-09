-- COMPLETE SETUP FOR EVENTOWA SITE
-- RUN THIS ENTIRE FILE IN SUPABASE SQL EDITOR

-- Step 1: Create all tables
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('urodziny', 'szkolne', 'firmowe', 'inne')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offer (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL CHECK (key IN ('urodziny', 'szkolne', 'firmowe', 'animacje', 'komunie', 'wesela', 'pikniki', 'bale', 'mikolajki')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  bullets TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create indexes
CREATE INDEX IF NOT EXISTS gallery_category_idx ON gallery(category);
CREATE INDEX IF NOT EXISTS gallery_created_at_idx ON gallery(created_at DESC);
CREATE INDEX IF NOT EXISTS contact_created_at_idx ON contact(created_at DESC);
CREATE INDEX IF NOT EXISTS offer_key_idx ON offer(key);

-- Step 3: Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images', 
  'gallery-images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Step 4: Set up Row Level Security for storage
DROP POLICY IF EXISTS "Anyone can view gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update their own gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete their own gallery images" ON storage.objects;

CREATE POLICY "Allow public uploads to gallery-images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'gallery-images'
);

CREATE POLICY "Allow public access to gallery-images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'gallery-images'
);

CREATE POLICY "Allow public updates to gallery-images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'gallery-images'
);

CREATE POLICY "Allow public deletions to gallery-images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'gallery-images'
);

-- Step 5: Clear and insert offer data
DELETE FROM offer;

INSERT INTO offer (key, title, description, price, bullets, created_at) VALUES
('urodziny', 'Urodziny dla dzieci', 'Peen energii scenariusz urodzin: animacje, zabawy ruchowe, mini-dyskoteka, balony i tematyczne dekoracje. Program dopasowujemy do wieku oraz zainteresowa dziecka.', '899 PLN', ARRAY['Animator / prowadzcy', 'Scenariusz + gry i konkursy', 'Dekoracje i mini-strefa foto', 'Muzyka i mini-dyskoteka'], NOW()),
('animacje', 'Animacje i warsztaty', 'Profesjonalne animacje dla dzieci w rónym wieku: kreatywne warsztaty, zabawy ruchowe, gry zespowowe i konkursy z nagrodami.', '599 PLN', ARRAY['Zesp animatorw (2-3 osoby)', 'Sprzt do zabaw i gier', 'Materia warsztatowe', 'Nagrody i upominki'], NOW()),
('komunie', 'Komunie i uroczystoci', 'Elegancka oprawa uroczystoci komunijnych: animacje dla dzieci, muzyka, dekoracje oraz koordynacja caego wydarzenia.', '1890 PLN', ARRAY['Oprawa artystyczna uroczystoci', 'Animacje dla dzieci', 'Dekoracje kwiatowe i tematyczne', 'Koordynator wydarzenia'], NOW()),
('wesela', 'Wesela i przyjcia', 'Profesjonalne prowadzenie wesel oraz oprawa muzyczna. Zabawy integracyjne, konkursy i animacje dla goci w kadym wieku.', '3490 PLN', ARRAY['Prowadzenie imprezy', 'Oprawa muzyczna', 'Zabawy i konkursy', 'Koordynacja przebiegu wesela'], NOW()),
('pikniki', 'Pikniki szkolne i festyny', 'Organizacja piknikw szkolnych, festynw i dni dziecka. Pena oprawa techniczna, atrakcje dla wszystkich grup wiekowych.', '2490 PLN', ARRAY['Namioty i sprzt techniczny', 'Atrakcje dla dzieci i dorosych', 'Prowadzenie imprezy', 'Obsuga gastronomiczna (opcja)'], NOW()),
('bale', 'Bale karnawaowe i studniwki', 'Magiczna atmosfera balw karnawaowych dla dzieci oraz eleganckie studniwki. Dekoracje, muzyka, prowadzenie i atrakcje.', '3290 PLN', ARRAY['Dekoracje tematyczne', 'Oprawa muzyczna i owietlenie', 'Prowadzenie balu', 'Zabawy i konkursy'], NOW()),
('mikolajki', 'Mikoajki i eventy witeczne', 'Magiczne Mikoajki dla dzieci i firmowe eventy witeczne. wity Mikoaj, prezenty, animacje i witeczna atmosfera.', '1990 PLN', ARRAY['Wizyta witego Mikoaja', 'Prezenty i upominki', 'Witeczne animacje', 'Dekoracje witeczne'], NOW());

-- Step 6: Verify setup
SELECT 'gallery' as table_name, COUNT(*) as record_count FROM gallery
UNION ALL
SELECT 'offer' as table_name, COUNT(*) as record_count FROM offer  
UNION ALL
SELECT 'contact' as table_name, COUNT(*) as record_count FROM contact;

SELECT 'Setup completed successfully!' as status;
