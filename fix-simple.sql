-- PROSTE ROZWI AZANIE
-- Usun constraint i zaktualizuj dane

-- 1. Usun wszystkie constrainty
ALTER TABLE offer DROP CONSTRAINT IF EXISTS offer_category_check;
ALTER TABLE offer DROP CONSTRAINT IF EXISTS offer_key_check;

-- 2. Zaktualizuj dane
UPDATE offer 
SET category = COALESCE(category, key),
    category_label = COALESCE(category_label, 
        CASE 
            WHEN key = 'urodziny' THEN 'Urodziny'
            WHEN key = 'animacje' THEN 'Animacje'
            WHEN key = 'komunie' THEN 'Komunie'
            WHEN key = 'wesela' THEN 'Wesela'
            WHEN key = 'pikniki' THEN 'Pikniki szkolne'
            WHEN key = 'bale' THEN 'Bale karnawaowe'
            WHEN key = 'mikolajki' THEN 'Mikoajki'
            ELSE key
        END
    );

-- 3. Bez constraint - pozwol na dowolne kategorie
-- (nic nie dodajemy)

-- 4. Sprawd
SELECT id, key, category, category_label, title FROM offer ORDER BY id;
