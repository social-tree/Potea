export type HomeStackParamList = {
  Home: undefined
  Search: {
    selectedFilters?: {
      category?: string
      sortBy?: string
      rating?: number
      offerType?: string
    }
  }
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
