import { supabase } from 'src/utils/supabase'

export const getPaymentMethods = async ({ limit, offset, amountPerPage }) => {
  let query = supabase
    .from('paymentMethods')
    .select('*')
    .order('created_at', { ascending: false })

  let count
  if (limit) query = query.limit(limit)

  if (Number(offset) >= 0) {
    query = query.range(offset, offset + amountPerPage - 1)
    count = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
  }

  const { data, error } = await query

  return { data, error }
}
