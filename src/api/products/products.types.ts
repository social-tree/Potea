export type getProductsParams = {
  limit?: number
  type?: string
  searchText?: string
  offerType?: string
  order?: { name: string; ascending: boolean }
}
