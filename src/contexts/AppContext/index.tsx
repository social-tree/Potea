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
import { Session } from '@supabase/supabase-js'
import { allNotifications } from 'src/constants/notifications'
import { notificationType } from 'src/types/notification'
import { productType } from 'src/types/product'
import { supabase } from 'src/utils/supabase'

export const AppContext = createContext({
  resetPassword: false,
  toggleResetPassword: () => {},
  favoriteProducts: new Map([]),
  addProductToFavorites: (product: productType) => {},
  user: null as null | UserType,
  setModalErrorText: (error: string) => {},
  modalErrorText: '',
  closeErrorModal: () => {},
  loading: false,
  splashLoading: true,
  setLoading: (state: boolean) => {},
  setSplashLoading: (state: boolean) => {},
  session: null as null | Session,
  setSession: (session: Session) => {},
})

export const AppProvider = ({ children }) => {
  const [resetPassword, setResetPassword] = useState(false)
  const [favoriteProducts, setFavoriteProducts] = useState(new Map([]))
  const [user, setUser] = useState<null | UserType>(null)
  const [modalErrorText, setModalErrorText] = useState('')
  const [loading, setLoading] = useState(false)
  const [splashLoading, setSplashLoading] = useState(false)
  const [session, setSession] = useState<Session | null>(null)

  const toggleResetPassword = () => {
    setResetPassword((prev) => (prev ? false : true))
  }

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
            avatar: `${res.data.avatar}?time=${new Date().getTime()}`,
            gender: res.data?.gender,
          }
          setUser((prev) => {
            return {
              ...prev,
              user_metadata: userInfo,
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
            console.log({
              user_metadata: {
                ...(updatedData.new as UserMetaData),
                avatar: `${
                  updatedData.new.avatar
                }?time=${new Date().getTime()}`,
              },
            })
            setUser((prev) => ({
              ...prev,
              user_metadata: {
                ...(updatedData.new as UserMetaData),
                avatar: `${
                  updatedData.new.avatar
                }?time=${new Date().getTime()}`,
              },
            }))
          }
        )
        .subscribe()
    }
    getUserSession()
  }, [session])

  const closeErrorModal = () => {
    setModalErrorText('')
  }

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
        favoriteProducts,
        resetPassword,
        toggleResetPassword,
        addProductToFavorites,
        user,
        setModalErrorText,
        modalErrorText,
        closeErrorModal,
        setLoading,
        loading,
        splashLoading,
        setSplashLoading,
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
