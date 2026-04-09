-- Create gallery table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('urodziny', 'szkolne', 'firmowe', 'inne')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create offer table
CREATE TABLE offer (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL CHECK (key IN ('urodziny', 'szkolne', 'firmowe', 'animacje', 'komunie', 'wesela', 'pikniki', 'bale', 'mikolajki')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  bullets TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact table
CREATE TABLE contact (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX gallery_category_idx ON gallery(category);
CREATE INDEX gallery_created_at_idx ON gallery(created_at DESC);
CREATE INDEX contact_created_at_idx ON contact(created_at DESC);
CREATE INDEX offer_key_idx ON offer(key);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now)
CREATE POLICY "Enable all operations for gallery" ON gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for offer" ON offer FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for contact" ON contact FOR ALL USING (true) WITH CHECK (true);
