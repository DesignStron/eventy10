// Debug specific tables
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qbcjyecssttdmvmtswcy.supabase.co'
const supabaseKey = 'sb_publishable_UtjJmFhwhBnPUqle-91xEw_jYnGPq6k'

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugTables() {
  console.log('=== GALLERY TABLE ===')
  try {
    const { data: galleryData, error: galleryError } = await supabase
      .from('gallery')
      .select('*')
      .limit(2)
    
    console.log('Gallery data length:', galleryData?.length || 0)
    console.log('Gallery error:', galleryError)
    console.log('Gallery sample:', galleryData)
  } catch (err) {
    console.error('Gallery error:', err)
  }

  console.log('\n=== OFFER TABLE ===')
  try {
    const { data: offerData, error: offerError } = await supabase
      .from('offer')
      .select('*')
      .limit(2)
    
    console.log('Offer data length:', offerData?.length || 0)
    console.log('Offer error:', offerError)
    console.log('Offer sample:', offerData)
  } catch (err) {
    console.error('Offer error:', err)
  }

  console.log('\n=== CONTACT TABLE ===')
  try {
    const { data: contactData, error: contactError } = await supabase
      .from('contact')
      .select('*')
      .limit(2)
    
    console.log('Contact data length:', contactData?.length || 0)
    console.log('Contact error:', contactError)
    console.log('Contact sample:', contactData)
  } catch (err) {
    console.error('Contact error:', err)
  }

  console.log('\n=== TABLE INFO ===')
  try {
    // Check if offer table exists and has RLS
    const { data: tableInfo, error: tableError } = await supabase
      .from('offer')
      .select('id, key, title')
      .limit(1)
    
    console.log('Offer table access:', tableInfo ? 'OK' : 'FAILED')
    console.log('Offer table error:', tableError)
  } catch (err) {
    console.error('Offer table access error:', err)
  }
}

debugTables()
