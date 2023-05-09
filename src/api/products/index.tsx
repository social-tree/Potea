import { getProductsParams } from './products.types'
import { supabase } from 'src/utils/supabase'

export const getProducts = async ({
  limit = 10,
  offerType = 'normal',
  type = '',
  order = { name: 'created_at', ascending: true },
}: getProductsParams) => {
  let query = supabase
    .from('products')
    .select()
    .eq('offerType', offerType)
    .limit(limit)
    .order(order.name, { ascending: order.ascending })

  if (type && type !== 'All') {
    query = query.eq('type', type.toLowerCase())
  }

  const { data, error } = await query

  return { data, error }
}
