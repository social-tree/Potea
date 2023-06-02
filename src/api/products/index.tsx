import { getProductParams, getProductsParams } from './products.types'

import { supabase } from 'src/utils/supabase'

export const getProducts = async ({
  limit = 10,
  offerType = 'normal',
  searchText = '',
  type = '',
  priceRange = undefined,
  rating,
  order = { name: 'created_at', ascending: true },
}: getProductsParams) => {
  let query = supabase
    .from('products')
    .select()
    .eq('offerType', offerType)
    .limit(limit)
    .order(order.name, { ascending: order.ascending })

  if (type && type !== 'All') query = query.eq('type', type.toLowerCase())
  if (searchText) query = query.ilike('name', `%${searchText}%`)
  if (rating > 0) query = query.eq('rating', rating)
  if (priceRange?.length > 0) {
    query = query.gte('price', priceRange[0])
    query = query.lte('price', priceRange[1])
  }
  const { data, error } = await query

  return { data, error }
}

export const getProduct = async ({ id }: getProductParams) => {
  const { data, error } = await supabase
    .from('products')
    .select()
    .eq('id', id)
    .single()

  return { data, error }
}
