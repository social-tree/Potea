import { Database } from './supabase'

export type TransactionType =
  Database['public']['Tables']['transactions']['Row']
