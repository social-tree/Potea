import { supabase } from 'src/utils/supabase'

export const getReviews = async ({
  limit = 10,
  filterByRating = 0,
  productId,
  order = {
    ascending: true,
    name: 'created_at',
  },
}) => {
  let query = supabase
    .from('reviews')
    .select('*, userInfo:users(avatar,nickname)')
    .eq('product_id', productId)
    .limit(limit)
    .order('created_at', { ascending: order.ascending })
  if (filterByRating) {
    const rating = Math.floor(filterByRating)
    query = query.gte('rating', `${rating}`)
    query = query.lt('rating', `${rating + 1}`)
  }

  const { data, error } = await query
  console.log(data, error)
  return { data, error }
}
