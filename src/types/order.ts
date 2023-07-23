import { Database } from './supabase'
import { productType } from './product'

export type OrderType = Database['public']['Tables']['orders']['Row'] & {
  product: productType
}
