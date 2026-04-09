-- IMPORT OFERTA DATA TO SUPABASE
-- Run this command to insert the oferta.json data into the database

-- Clear existing data
DELETE FROM offer;

-- Insert all oferta sections
INSERT INTO offer (key, title, description, price, bullets, created_at) VALUES
('urodziny', 'Urodziny dla dzieci', 'Peen energii scenariusz urodzin: animacje, zabawy ruchowe, mini-dyskoteka, balony i tematyczne dekoracje. Program dopasowujemy do wieku oraz zainteresowa dziecka.', '899 PLN', ARRAY['Animator / prowadzcy', 'Scenariusz + gry i konkursy', 'Dekoracje i mini-strefa foto', 'Muzyka i mini-dyskoteka'], NOW()),
('animacje', 'Animacje i warsztaty', 'Profesjonalne animacje dla dzieci w rónym wieku: kreatywne warsztaty, zabawy ruchowe, gry zespowowe i konkursy z nagrodami.', '599 PLN', ARRAY['Zesp animatorw (2-3 osoby)', 'Sprzt do zabaw i gier', 'Materia warsztatowe', 'Nagrody i upominki'], NOW()),
('komunie', 'Komunie i uroczystoci', 'Elegancka oprawa uroczystoci komunijnych: animacje dla dzieci, muzyka, dekoracje oraz koordynacja caego wydarzenia.', '1890 PLN', ARRAY['Oprawa artystyczna uroczystoci', 'Animacje dla dzieci', 'Dekoracje kwiatowe i tematyczne', 'Koordynator wydarzenia'], NOW()),
('wesela', 'Wesela i przyjcia', 'Profesjonalne prowadzenie wesel oraz oprawa muzyczna. Zabawy integracyjne, konkursy i animacje dla goci w kadym wieku.', '3490 PLN', ARRAY['Prowadzenie imprezy', 'Oprawa muzyczna', 'Zabawy i konkursy', 'Koordynacja przebiegu wesela'], NOW()),
('pikniki', 'Pikniki szkolne i festyny', 'Organizacja piknikw szkolnych, festynw i dni dziecka. Pena oprawa techniczna, atrakcje dla wszystkich grup wiekowych.', '2490 PLN', ARRAY['Namioty i sprzt techniczny', 'Atrakcje dla dzieci i dorosych', 'Prowadzenie imprezy', 'Obsuga gastronomiczna (opcja)'], NOW()),
('bale', 'Bale karnawaowe i studniwki', 'Magiczna atmosfera balw karnawaowych dla dzieci oraz eleganckie studniwki. Dekoracje, muzyka, prowadzenie i atrakcje.', '3290 PLN', ARRAY['Dekoracje tematyczne', 'Oprawa muzyczna i owietlenie', 'Prowadzenie balu', 'Zabawy i konkursy'], NOW()),
('mikolajki', 'Mikoajki i eventy witeczne', 'Magiczne Mikoajki dla dzieci i firmowe eventy witeczne. wity Mikoaj, prezenty, animacje i witeczna atmosfera.', '1990 PLN', ARRAY['Wizyta witego Mikoaja', 'Prezenty i upominki', 'Witeczne animacje', 'Dekoracje witeczne'], NOW());

-- Verify insertion
SELECT COUNT(*) as total_offers FROM offer;
SELECT * FROM offer ORDER BY created_at;
