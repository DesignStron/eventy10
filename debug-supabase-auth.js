// Debug Supabase with different auth
import { createClient } from '@supabase/supabase-js'

// Try with service role key
const supabaseUrl = 'https://qbcjyecssttdmvmtswcy.supabase.co'
const supabaseServiceKey = 'GcO1VloYBrRQdrVL'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function debugWithServiceKey() {
  console.log('Testing with service role key...')
  
  try {
    // Test connection
    const { data, error } = await supabase
      .from('offer')
      .select('*')
    
    console.log('Service key test result:')
    console.log('Data length:', data?.length || 0)
    console.log('Data:', data)
    console.log('Error:', error)
    
    // Test with anon key
    const { createClient: createAnonClient } = await import('@supabase/supabase-js')
    const anonClient = createAnonClient(supabaseUrl, 'sb_publishable_UtjJmFhwhBnPUqle-91xEw_jYnGPq6k')
    
    const { data: anonData, error: anonError } = await anonClient
      .from('offer')
      .select('*')
    
    console.log('Anon key test result:')
    console.log('Data length:', anonData?.length || 0)
    console.log('Data:', anonData)
    console.log('Error:', anonError)
    
  } catch (err) {
    console.error('Debug error:', err)
  }
}

debugWithServiceKey()
