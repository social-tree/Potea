import { UserMetaData, UserType } from 'src/types/user'
import { createContext, useEffect, useState } from 'react'

import React from 'react'
import { allNotifications } from 'src/constants/notifications'
import { notificationType } from 'src/types/notification'
import { productType } from 'src/types/product'
import { supabase } from 'src/utils/supabase'

export const AppContext = createContext({
  resetPassword: false,
  toggleResetPassword: () => {},
  notifications: [],
  favoriteProducts: new Map([]),
  addProductToFavorites: (product: productType) => {},
  user: null as null | UserType,
})

export const AppProvider = ({ children }) => {
  const [resetPassword, setResetPassword] = useState(false)
  const [notifications, setNotifications] = useState<notificationType[]>([])
  const [favoriteProducts, setFavoriteProducts] = useState(new Map([]))
  const [user, setUser] = useState<null | UserType>(null)

  const toggleResetPassword = () => {
    setResetPassword((prev) => (prev ? false : true))
  }

  useEffect(() => {
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

  useEffect(() => {
    const getUserSession = async () => {
      const { data } = await supabase.auth.getUser().then((res) => {
        setUser(res.data.user as UserType)
        return res
      })
      await supabase
        .from('users')
        .select('*')
        .single()
        .then((res) => {
          setUser((prev) => {
            return {
              ...prev,
              user_metadata: res.data as UserMetaData,
            }
          })
        })
      supabase
        .channel('any')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'users',
            filter: `id=eq.${data.user.id}`,
          },
          (updatedData) =>
            setUser((prev) => ({
              ...prev,
              user_metadata: updatedData.new as UserMetaData,
            }))
        )
        .subscribe()
    }
    getUserSession()
  }, [])

  return (
    <AppContext.Provider
      value={{
        favoriteProducts,
        notifications,
        resetPassword,
        toggleResetPassword,
        addProductToFavorites,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
