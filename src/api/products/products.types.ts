export type getProductsParams = {
  limit?: number
  type?: string
  offerType?: string
  order?: { name: string; ascending: boolean }
}
