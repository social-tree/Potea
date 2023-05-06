import { getProductsParams } from './products.types'
import { supabase } from 'src/utils/supabase'

export const getProducts = async ({
  limit = 10,
  type = 'normal',
  order = { name: 'created_at', ascending: true },
}: getProductsParams) => {
  const { data, error } = await supabase
    .from('products')
    .select()
    .eq('type', type)
    .limit(limit)
    .order(order.name, { ascending: order.ascending })

  return { data, error }
}
