import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const url = "https://ijxfwjuurxppacepegmf.supabase.in"

export const supabaseAuthUrl = `${url}/auth/v1/authorize`

// Create a single supabase client for interacting with your database
export default createClient(
  url,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNTc3NDA5NSwiZXhwIjoxOTQxMzUwMDk1fQ.0KwOFn1KJSzCPb-PmBMUs6y2RZA8ra1RJyqSgD118bA",
  { localStorage: AsyncStorage }
)
