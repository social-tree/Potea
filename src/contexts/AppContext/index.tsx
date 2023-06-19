import * as Styled from './AppContext.styles'

import { UserMetaData, UserType } from 'src/types/user'
import { createContext, useEffect, useState } from 'react'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { BottomSheetProvider } from '@gorhom/bottom-sheet/lib/typescript/contexts'
import { Button } from 'src/components/Elements/Button'
import { ErrorShield } from 'src/assets/svg/ErrorShield'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modal } from 'src/components/Elements/Modal'
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
  setModalErrorText: (error: string) => {},
  modalErrorText: '',
  closeErrorModal: () => {},
  loading: true,
  setLoading: (state: boolean) => {},
})

export const AppProvider = ({ children }) => {
  const [resetPassword, setResetPassword] = useState(false)
  const [notifications, setNotifications] = useState<notificationType[]>([])
  const [favoriteProducts, setFavoriteProducts] = useState(new Map([]))
  const [user, setUser] = useState<null | UserType>(null)
  const [modalErrorText, setModalErrorText] = useState('')
  const [loading, setLoading] = useState(true)

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
        .select('*, gender:genders(name, id)')
        .single()
        .then((res) => {
          const userInfo = {
            ...res.data,
            gender: res.data?.gender,
          }
          setUser((prev) => {
            return {
              ...prev,
              user_metadata: userInfo as UserMetaData,
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
            filter: `id=eq.${data?.user?.id}`,
          },
          (updatedData) => {
            setUser((prev) => ({
              ...prev,
              user_metadata: updatedData.new as UserMetaData,
            }))
          }
        )
        .subscribe()
    }
    getUserSession()
  }, [])

  const closeErrorModal = () => {
    setModalErrorText('')
  }

  return (
    <AppContext.Provider
      value={{
        favoriteProducts,
        notifications,
        resetPassword,
        toggleResetPassword,
        addProductToFavorites,
        user,
        setModalErrorText,
        modalErrorText,
        closeErrorModal,
        setLoading,
        loading,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          {!!modalErrorText && (
            <Modal onClose={() => closeErrorModal()} open={true}>
              <Styled.ErrorWrapper>
                <ErrorShield width={240} height={240} />
                <Styled.ErrorTitle>{modalErrorText}</Styled.ErrorTitle>
                <Styled.ErrorButton onPress={() => closeErrorModal()}>
                  Return
                </Styled.ErrorButton>
              </Styled.ErrorWrapper>
            </Modal>
          )}
          {children}
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AppContext.Provider>
  )
}
