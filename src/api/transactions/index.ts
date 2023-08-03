import { getUserTransactionsParams } from './transactions.types'
import { supabase } from 'src/utils/supabase'

export const getUserTransactions = async ({
  limit,
  offset,
  amountPerPage = 10,
}: getUserTransactionsParams) => {
  let query = supabase
    .from('transactions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  let count

  if (limit) {
    query = query.limit(limit)
  }
  if (Number(offset) >= 0) {
    query = query.range(offset, offset + amountPerPage - 1)
    count = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
  }

  const { data, error } = await query

  return { data, error, countData: count || 0 }
}
