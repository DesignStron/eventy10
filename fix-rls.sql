-- 1. Wlacz RLS dla tabeli site_settings (jesli nie jest wlaczone)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 2. Usun istniejace polityki (jesli sa)
DROP POLICY IF EXISTS "Users can view site_settings" ON site_settings;
DROP POLICY IF EXISTS "Users can insert site_settings" ON site_settings;
DROP POLICY IF EXISTS "Users can update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Users can delete site_settings" ON site_settings;

-- 3. Stworz nowe polityki RLS
-- Polityka do odczytu (wszyscy moga czytac)
CREATE POLICY "Users can view site_settings" ON site_settings
  FOR SELECT USING (true);

-- Polityka do wstawiania (wszyscy moga dodawac)
CREATE POLICY "Users can insert site_settings" ON site_settings
  FOR INSERT WITH CHECK (true);

-- Polityka do aktualizacji (wszyscy moga aktualizowac)
CREATE POLICY "Users can update site_settings" ON site_settings
  FOR UPDATE USING (true);

-- Polityka do usuwania (wszyscy moga usuwac)
CREATE POLICY "Users can delete site_settings" ON site_settings
  FOR DELETE USING (true);

-- 4. Alternatywnie - wylacz RLS calkowicie (jesli nie potrzebujesz bezpieczenstwa)
-- ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
