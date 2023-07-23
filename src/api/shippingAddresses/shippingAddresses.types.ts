import {
  PostgrestError,
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/supabase-js'

import { ShippingAddressType } from 'src/types/shippingAddress'

export type getShippingAddressesParams = {
  userId: string | number
}
