export type reviewType = {
  id: number
  created_at: string
  rating: number
  description: string
  user_id: string
  product_id: number
  userInfo: {
    avatar: string
    nickname: string
  }
}
