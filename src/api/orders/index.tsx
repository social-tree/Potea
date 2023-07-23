import { supabase } from 'src/utils/supabase'

export const getOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, product:products(*)')

  return { data, error }
}
