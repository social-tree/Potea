import { reviewType } from './review'

export type productType = {
  id: number
  image: string[]
  name: string
  sold_amount: number
  description: string
  price: number
  count: number
  average_rating: number
  reviews_amount: number
}
