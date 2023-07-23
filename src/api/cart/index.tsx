import {
  addProductToCartParams,
  changeCartProductQuantityParams,
  deleteCartProductParams,
  purchaseCartProductsParams,
} from './cart.types'

import { supabase } from 'src/utils/supabase'

export const addProductToCart = async ({
  id,
  quantity,
}: addProductToCartParams) => {
  const { data, error } = await supabase.rpc('add_to_cart', {
    product_id: id,
    quantity,
  })
  return { data, error }
}

export const getProductsFromCart = async () => {
  const { data, error } = await supabase.rpc('get_user_cart_products')

  return { data, error }
}

export const changeCartProductQuantity = async ({
  id,
  type,
}: changeCartProductQuantityParams) => {
  const { data, error } = await supabase.rpc('update_product_quantity', {
    product_id: id,
    type,
  })

  return { data, error }
}

export const deleteCartProduct = async ({ id }: deleteCartProductParams) => {
  const { data, error } = await supabase.rpc('delete_product_from_cart', {
    product_id: id,
  })

  return { data, error }
}

export const purchaseCartProducts = async ({
  payment_id,
}: purchaseCartProductsParams) => {
  const { data, error } = await supabase.rpc('purchase_items', {
    payment_id,
  })

  return { data, error }
}
