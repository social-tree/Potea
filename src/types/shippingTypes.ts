import { Database } from './supabase'

export type ShippingTypeType =
  Database['public']['Tables']['shippingTypes']['Row']
