import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { productType } from 'src/types/product'

export type getProductParams = {
  id: number
}

export type getProductsParams = {
  limit?: number
  type?: string
  searchText?: string
  offerType?: string
  priceRange?: number[]
  rating?: number
  order?: { name: string; ascending: boolean }
}
