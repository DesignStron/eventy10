-- FIX MUSIC API - USUN CONSTRAINT DLA music_services
-- Ten sam problem co z offer - UUID constraint

-- 1. Usun wszystkie constrainty dla music_services
ALTER TABLE music_services DROP CONSTRAINT IF EXISTS music_services_id_check;
ALTER TABLE music_services DROP CONSTRAINT IF EXISTS music_services_pkey;

-- 2. Sprawdz strukture tabeli
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'music_services' 
ORDER BY ordinal_position;

-- 3. Sprawdz czy sa jakies constrainty
SELECT conname, contype 
FROM pg_constraint 
WHERE conrelid = 'music_services'::regclass;
