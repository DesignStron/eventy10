// Debug Supabase connection - direct SQL test
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qbcjyecssttdmvmtswcy.supabase.co'
const supabaseKey = 'sb_publishable_UtjJmFhwhBnPUqle-91xEw_jYnGPq6k'

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test connection with raw SQL
    const { data, error } = await supabase
      .rpc('exec_sql', { sql: 'SELECT COUNT(*) as count FROM offer' })
    
    console.log('Raw SQL test result:')
    console.log('Data:', data)
    console.log('Error:', error)
    
    // Try direct select again
    const { data: offerData, error: offerError } = await supabase
      .from('offer')
      .select('*')
    
    console.log('Direct select result:')
    console.log('Data length:', offerData?.length || 0)
    console.log('Data:', offerData)
    console.log('Error:', offerError)
    
    // Test if table exists
    const { data: tableInfo, error: tableError } = await supabase
      .from('offer')
      .select('id')
      .limit(1)
    
    console.log('Table exists test:')
    console.log('Table info:', tableInfo)
    console.log('Table error:', tableError)
    
  } catch (err) {
    console.error('Debug error:', err)
  }
}

debugConnection()
