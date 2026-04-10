-- SIMPLE FIX: Remove the constraint completely
ALTER TABLE offer DROP CONSTRAINT IF EXISTS offer_key_check;

-- No constraint - allow any key value
-- This will let you add custom offers with keys like "oferta-1234567890"
