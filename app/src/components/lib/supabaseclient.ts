import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://uhzjfduvcjnqqfbzoqks.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string
export const supabase = createClient(supabaseUrl, supabaseKey)

//NETLIFY SITE CONFIG
//ENVIRONMENT VARIABLES IMPORT FROM .ENV FILE SO IT DOESNT BLOW UP AND DIE
