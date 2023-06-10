import { getProductParams, getProductsParams } from './products.types'

import { supabase } from 'src/utils/supabase'

export const getProducts = async ({
  offerType = null,
  searchText = null,
  type = 'All',
  priceRange = [0, 99999999],
  rating = null,
}: getProductsParams) => {
  let { data, error } = await supabase.rpc('get_products', {
    product_offer_type: offerType || null,
    product_type: type && type !== 'All' ? type?.toLocaleLowerCase() : null,
    product_rating: rating === 0 ? null : rating,
    product_search_text: searchText,
    product_price_range: priceRange,
  })

  return { data, error }
}

export const getProduct = async ({ id }: getProductParams) => {
  const { data, error } = await supabase
    .rpc('get_product', { product_id: id })
    .maybeSingle()

  return { data, error }
}
