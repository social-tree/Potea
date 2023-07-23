import { ShippingAddressType } from 'src/types/shippingAddress'
import { ShippingTypeType } from 'src/types/shippingTypes'

export type CartStackParamList = {
  Cart: undefined
  Checkout: {
    ShippingType?: ShippingTypeType
    ShippingAddress?: ShippingAddressType
  }
  ChooseShipping: {
    ShippingType?: ShippingTypeType
  }
  ShippingAddress: {
    ShippingAddress?: ShippingAddressType
  }
  PaymentMethods: undefined
}
