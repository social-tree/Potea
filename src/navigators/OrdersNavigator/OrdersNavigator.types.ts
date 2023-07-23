import { productType } from 'src/types/product'

export type OrdersStackParamList = {
  MyOrders: undefined
  TrackOrder: {
    product: productType
    quantity: number
  }
}
