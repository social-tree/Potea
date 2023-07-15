import { Database } from './supabase'

export type ShippingAddressType =
  Database['public']['Tables']['shippingAddresses']['Row']
