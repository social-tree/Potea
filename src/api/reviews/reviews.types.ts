export type getReviewsParams = {
  limit: number
  filterByRating: number
  productId: number
  order: {
    ascending: boolean
    name: string
  }
}
