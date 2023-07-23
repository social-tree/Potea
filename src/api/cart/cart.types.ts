export type addProductToCartParams = {
  id: number
  quantity: number
}

export type changeCartProductQuantityParams = {
  id: number
  type: 'add' | 'rem'
}

export type deleteCartProductParams = {
  id: number
}

export type purchaseCartProductsParams = {
  payment_id: number
}
