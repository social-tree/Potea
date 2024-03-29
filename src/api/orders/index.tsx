import { getOrdersParams } from './orders.types'
import { supabase } from 'src/utils/supabase'

export const getOrders = async ({
  limit,
  offset,
  amountPerPage = 10,
  type,
}: getOrdersParams) => {
  let query = supabase
    .from('orders')
    .select('*, product:products(*)')
    .order('created_at', { ascending: false })

  let count
  if (limit) query = query.limit(limit)

  if (Number(offset) >= 0) {
    query = query.range(offset, offset + amountPerPage - 1)
    count = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
  }
  if (type) query = query.eq('status', type)

  const { data, error } = await query

  return { data, error, countData: count }
}
