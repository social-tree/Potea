import { supabase } from 'src/utils/supabase'

export const getShippingTypes = async () => {
  const { data, error } = await supabase.from('shippingTypes').select('*')

  return { data, error }
}
