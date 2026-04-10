-- FIX OFFER CONSTRAINT
-- Remove the restrictive check constraint to allow custom offer keys

-- Drop the existing constraint
ALTER TABLE offer DROP CONSTRAINT IF EXISTS offer_key_check;

-- Add a new, more flexible constraint that allows custom keys
ALTER TABLE offer ADD CONSTRAINT offer_key_check 
  CHECK (key ~ '^[a-z0-9\-_]+$' AND length(key) >= 3);

-- Verify the constraint was updated
SELECT conname, consrc 
FROM pg_constraint 
WHERE conrelid = 'offer'::regclass AND contype = 'c';
