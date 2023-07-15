import { Database } from './supabase'
import { reviewType } from './review'

export type productType = Database['public']['Tables']['products']['Row']

export type productWithQuantityType = productType & { quantity: number }

export type productWithRatingType = productType & {
  average_rating: number
  reviews_amount?: number
}
