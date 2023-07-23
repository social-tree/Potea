import { getShippingAddressesParams } from './shippingAddresses.types'
import { supabase } from 'src/utils/supabase'

export const getShippingAddresses = async ({
  userId,
}: getShippingAddressesParams) => {
  const { data, error } = await supabase
    .from('shippingAddresses')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}
