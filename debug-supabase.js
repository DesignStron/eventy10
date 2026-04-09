// Debug Supabase connection
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qbcjyecssttdmvmtswcy.supabase.co'
const supabaseKey = 'sb_publishable_UtjJmFhwhBnPUqle-91xEw_jYnGPq6k'

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test connection
    const { data, error } = await supabase
      .from('offer')
      .select('*')
      .limit(1)
    
    console.log('Connection test result:')
    console.log('Data:', data)
    console.log('Error:', error)
    
    // Count records
    const { count, error: countError } = await supabase
      .from('offer')
      .select('*', { count: 'exact', head: true })
    
    console.log('Total records:', count)
    console.log('Count error:', countError)
    
  } catch (err) {
    console.error('Debug error:', err)
  }
}

debugConnection()
