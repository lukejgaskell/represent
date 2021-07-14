import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export default createClient(
	'https://ijxfwjuurxppacepegmf.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNTc3NDA5NSwiZXhwIjoxOTQxMzUwMDk1fQ.0KwOFn1KJSzCPb-PmBMUs6y2RZA8ra1RJyqSgD118bA'
)
