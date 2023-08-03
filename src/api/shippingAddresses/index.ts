import {
  addShippingAddressParams,
  getShippingAddressParams,
  getShippingAddressesParams,
  updateShippingAddressParams,
} from './shippingAddresses.types'

import { supabase } from 'src/utils/supabase'

export const getShippingAddresses = async ({
  offset,
  limit,
  amountPerPage,
}: getShippingAddressesParams) => {
  let query = supabase
    .from('shippingAddresses')
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

export const getShippingAddress = async ({ id }: getShippingAddressParams) => {
  const { data, error } = await supabase
    .from('shippingAddresses')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export const addShippingAddress = async ({
  id,
  addressInfo,
}: addShippingAddressParams) => {
  const { data, error } = await supabase
    .from('shippingAddresses')
    .insert(addressInfo)
  return { data, error }
}

export const updateShippingAddress = async ({
  id,
  addressInfo,
}: updateShippingAddressParams) => {
  const { data, error } = await supabase
    .from('shippingAddresses')
    .update(addressInfo)
    .eq('id', id)
  return { data, error }
}
