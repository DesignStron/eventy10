-- FIX CONSTRAINT VIOLATION
-- Najpierw usun istniejcy constraint, potem zaktualizuj dane, potem dodaj nowy

-- 1. Usun stary constraint
ALTER TABLE offer DROP CONSTRAINT IF EXISTS offer_category_check;

-- 2. Zaktualizuj dane - wstaw puste wartosci dla NULL
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
WHERE category IS NULL OR category_label IS NULL;

-- 3. Dodaj nowy, bardziej elastyczny constraint (opcjonalnie)
-- Lub pomin ten krok, aby nie mie constraint w ogole
ALTER TABLE offer ADD CONSTRAINT offer_category_check 
  CHECK (category IS NOT NULL AND length(trim(category)) >= 2);

-- 4. Sprawd wyniki
SELECT id, key, category, category_label, title FROM offer ORDER BY id;
