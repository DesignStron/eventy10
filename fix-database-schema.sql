-- FIX DATABASE SCHEMA FOR EVENTOWA SITE
-- Run this in Supabase SQL Editor to fix all issues

-- =====================================================
-- STEP 1: Fix offer table - add missing columns
-- =====================================================
ALTER TABLE offer 
ADD COLUMN IF NOT EXISTS key_label TEXT,
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- =====================================================
-- STEP 2: Create music_services table (missing!)
-- =====================================================
CREATE TABLE IF NOT EXISTS music_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  category_label TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  image TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for music_services
CREATE INDEX IF NOT EXISTS music_services_key_idx ON music_services(key);
CREATE INDEX IF NOT EXISTS music_services_created_at_idx ON music_services(created_at);

-- Enable RLS for music_services
ALTER TABLE music_services ENABLE ROW LEVEL SECURITY;

-- Create policy for music_services
CREATE POLICY "Enable all operations for music_services" 
ON music_services FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- STEP 3: Update RLS policies for offer table
-- =====================================================
DROP POLICY IF EXISTS "Enable all operations for offer" ON offer;
CREATE POLICY "Enable all operations for offer" 
ON offer FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- STEP 4: Insert default music_services data
-- =====================================================
DELETE FROM music_services;

INSERT INTO music_services (key, category_label, title, description, features, image, created_at) VALUES
('studniowki', 'Studniówki', 'Studniówki', 'Elegancka oprawa muzyczna i prowadzenie wieczoru. Dobieramy repertuar dopasowany do gustu maturzystów i tradycji.', 
 ARRAY['Repertuar taneczny i okolicznościowy', 'Profesjonalne prowadzenie imprezy', 'Oświetlenie i efekty świetlne', 'Współpraca z fotografem'], 
 '', NOW()),

('wesela', 'Wesela', 'Wesela', 'Kompleksowa oprawa muzyczna wesela - od pierwszego tańca po oczepiny. Dbamy o każdy moment tego wyjątkowego dnia.', 
 ARRAY['Konsultacja i dobór repertuaru', 'Prowadzenie ceremonii i przyjęcia', 'Zabawy i konkursy weselne', 'Sprzęt nagłośnieniowy i oświetlenie'], 
 '', NOW()),

('urodziny', 'Urodziny', 'Urodziny i przyjęcia', 'Muzyczna oprawa przyjęć urodzinowych, rocznic i spotkań rodzinnych. Dopasujemy klimat do charakteru imprezy i gości.', 
 ARRAY['Różne gatunki muzyczne', 'Możliwość dedykacji i życzeń', 'Nagłośnienie dostosowane do sali', 'Opcjonalnie animacje dla dzieci'], 
 '', NOW()),

('firmowe', 'Eventy firmowe', 'Eventy firmowe', 'Profesjonalna oprawa muzyczna na imprezy integracyjne, bankiety, gale i konferencje.', 
 ARRAY['Muzyka tła i taneczna', 'Prowadzenie programu', 'Nagłośnienie konferencji', 'Oświetlenie sceniczne'], 
 '', NOW()),

('bale', 'Bale', 'Bale karnawałowe', 'Dynamiczna oprawa muzyczna balów karnawałowych dla dzieci i dorosłych. Wiele gatunków i klimatów w jednym wieczorze.', 
 ARRAY['Repertuar taneczny i zabawowy', 'Konkursy muzyczne z nagrodami', 'Światła i efekty specjalne', 'Współpraca z animatorami'], 
 '', NOW()),

('swiateczne', 'Świąteczne', 'Eventy świąteczne', 'Magiczna atmosfera świąt Bożego Narodzenia z odpowiednią oprawą muzyczną. Kolędy, nowoczesne hity i klimatyczne aranżacje.', 
 ARRAY['Repertuar świąteczny', 'Oświetlenie dekoracyjne', 'Możliwość nagłośnienia na zewnątrz', 'Współpraca z Mikołajem'], 
 '', NOW());

-- =====================================================
-- STEP 5: Update offer data with key_label values
-- =====================================================
UPDATE offer SET key_label = CASE key
  WHEN 'urodziny' THEN 'Urodziny'
  WHEN 'animacje' THEN 'Animacje'
  WHEN 'komunie' THEN 'Komunie'
  WHEN 'wesela' THEN 'Wesela'
  WHEN 'pikniki' THEN 'Pikniki szkolne'
  WHEN 'bale' THEN 'Bale karnawałowe'
  WHEN 'mikolajki' THEN 'Mikołajki'
  ELSE key
END WHERE key_label IS NULL;

-- =====================================================
-- STEP 6: Create storage bucket for gallery images if not exists
-- =====================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images', 
  'gallery-images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Allow public uploads to gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates to gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletions to gallery-images" ON storage.objects;

CREATE POLICY "Allow public uploads to gallery-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Allow public access to gallery-images" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Allow public updates to gallery-images" ON storage.objects
FOR UPDATE USING (bucket_id = 'gallery-images');

CREATE POLICY "Allow public deletions to gallery-images" ON storage.objects
FOR DELETE USING (bucket_id = 'gallery-images');

-- =====================================================
-- STEP 7: Verify setup
-- =====================================================
SELECT 'gallery' as table_name, COUNT(*) as record_count FROM gallery
UNION ALL
SELECT 'offer' as table_name, COUNT(*) as record_count FROM offer  
UNION ALL
SELECT 'contact' as table_name, COUNT(*) as record_count FROM contact
UNION ALL
SELECT 'music_services' as table_name, COUNT(*) as record_count FROM music_services;

SELECT 'Database schema fixed successfully!' as status;
