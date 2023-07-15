import { Database } from './supabase'

export type reviewType = Database['public']['Tables']['reviews']['Row']
