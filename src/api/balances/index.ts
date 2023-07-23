import { supabase } from 'src/utils/supabase'

export const getCreditBalance = async () => {
  const { data, error } = await supabase.from('balances').select('*').single()
  return { data, error }
}
