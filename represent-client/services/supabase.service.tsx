import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export default createClient(
	'https://ijxfwjuurxppacepegmf.supabase.co',
	process.env.PUBLIC_SUPABASE_KEY || ''
)
