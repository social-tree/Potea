import 'react-native-url-polyfill/auto'

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Database } from 'src/types/supabase'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)

export const storageSupabaseURL = `${SUPABASE_URL}/storage/v1/object/public/avatars/`
