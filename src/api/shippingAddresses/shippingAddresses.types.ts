import { ShippingAddressType } from 'src/types/shippingAddress'

export type getShippingAddressesParams = {
  offset: number
  amountPerPage?: number
  limit: number
}

export type getShippingAddressParams = {
  id?: number
}

export type addShippingAddressParams = {
  id?: number
  addressInfo: ShippingAddressType
}

export type updateShippingAddressParams = {
  id?: number
  addressInfo: ShippingAddressType
}
