import { createContext, useEffect, useState } from 'react'
import { allNotifications } from 'src/constants/notifications'
import { allProducts } from 'src/constants/products'
import { notificationType } from 'src/types/notification'
import { productType } from 'src/types/product'

export const AppContext = createContext({
  resetPassword: false,
  toggleResetPassword: () => {},
  products: [],
  notifications: [],
  favoriteProducts: new Map([]),
  addProductToFavorites: (product: productType) => {},
})

export const AppProvider = ({ children }) => {
  const [resetPassword, setResetPassword] = useState(false)
  const [products, setProducts] = useState<productType[]>([])
  const [notifications, setNotifications] = useState<notificationType[]>([])
  const [favoriteProducts, setFavoriteProducts] = useState(new Map([]))

  const toggleResetPassword = () => {
    setResetPassword((prev) => (prev ? false : true))
  }

  useEffect(() => {
    setProducts(allProducts)
    setNotifications(allNotifications)
  }, [])

  const addProductToFavorites = (product: productType) => {
    setFavoriteProducts((products) => {
      let newProducts = new Map(products)
      if (!!products.get(product.id)) {
        newProducts.delete(product.id)
      } else {
        newProducts.set(product.id, product)
      }
      return newProducts
    })
  }

  return (
    <AppContext.Provider
      value={{
        products,
        favoriteProducts,
        notifications,
        resetPassword,
        toggleResetPassword,
        addProductToFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
