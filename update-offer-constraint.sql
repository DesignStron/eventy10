-- Drop and recreate the offer table with updated constraint
DROP TABLE IF EXISTS offer CASCADE;

-- Create offer table with all allowed keys
CREATE TABLE offer (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL CHECK (key IN ('urodziny', 'szkolne', 'firmowe', 'animacje', 'komunie', 'wesela', 'pikniki', 'bale', 'mikolajki')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  bullets TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX offer_key_idx ON offer(key);
