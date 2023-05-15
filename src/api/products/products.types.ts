export type getProductsParams = {
  limit?: number
  type?: string
  searchText?: string
  offerType?: string
  priceRange?: number[]
  rating?: number
  order?: { name: string; ascending: boolean }
}
