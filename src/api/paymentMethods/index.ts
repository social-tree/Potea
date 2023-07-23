import { supabase } from 'src/utils/supabase'

export const getPaymentMethods = async () => {
  const { data, error } = await supabase.from('paymentMethods').select('*')

  return { data, error }
}
