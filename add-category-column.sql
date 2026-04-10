-- DODAJ NOWE KOLUMNY DO TABELI OFFER
-- Dodajemy kolumny category i category_label zamiast polega na key

-- Dodaj kolumny
ALTER TABLE offer 
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS category_label TEXT;

-- Ustaw warto dla istniejcych rekordów
UPDATE offer 
SET category = key, 
    category_label = CASE 
        WHEN key = 'urodziny' THEN 'Urodziny'
        WHEN key = 'animacje' THEN 'Animacje'
        WHEN key = 'komunie' THEN 'Komunie'
        WHEN key = 'wesela' THEN 'Wesela'
        WHEN key = 'pikniki' THEN 'Pikniki szkolne'
        WHEN key = 'bale' THEN 'Bale karnawaowe'
        WHEN key = 'mikolajki' THEN 'Mikoajki'
        ELSE key
    END
WHERE category IS NULL;

-- Usun stary constraint
ALTER TABLE offer DROP CONSTRAINT IF EXISTS offer_key_check;

-- Dodaj nowy constraint dla kolumny category (opcjonalnie)
ALTER TABLE offer ADD CONSTRAINT offer_category_check 
  CHECK (category ~ '^[a-z0-9\-_]+$' AND length(category) >= 3);

-- Sprawd wyniki
SELECT id, key, category, category_label, title FROM offer ORDER BY id;
