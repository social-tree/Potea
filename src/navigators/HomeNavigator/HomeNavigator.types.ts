export type HomeStackParamList = {
  Home: undefined
  Search: undefined
  Notifications: undefined
  Wishlist: undefined
  Product: {
    id: number
  }
  Reviews: {
    name: string
    productId: number
    reviewsAmount: number
  }
  FillProfile: undefined
}
