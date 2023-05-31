import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthNavigator from './AuthNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { Session } from '@supabase/supabase-js'
import { SplashScreen } from 'src/pages/SplashScreen'
import UserNavigator from './UserNavigator'
import { supabase } from 'src/utils/supabase'
import { theme } from 'src/styles/theme'

interface Props {
  setLoading: (state: boolean) => void
  loading: boolean
}

export const RootNavigator = ({ setLoading, loading }: Props) => {
  const navigationRef = React.createRef<any>()
  const [navigationIsReady, setNavigationIsReady] = useState(false)

  const [session, setSession] = useState<Session | null>(null)
  const { resetPassword } = useContext(AppContext)
  const { user } = useContext(AppContext)

  useEffect(() => {
    const getUserSession = async () => {
      setLoading(true)
      await supabase.auth
        .getSession()
        .then(({ data: { session } }) => {
          setSession(session)
        })
        .catch((error) => console.log(error))
      setLoading(false)
    }
    getUserSession()

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (_event == 'PASSWORD_RECOVERY') {
        if (navigationIsReady) {
          navigationRef?.current?.navigate('ResetPassword')
        }
      }
    })
  }, [navigationIsReady])

  useEffect(() => {
    const appStateId = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      appStateId.remove()
    }
  }, [])

  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === 'background') {
      const rememberMe = await AsyncStorage.getItem('rememberMe')
      if (rememberMe == 'false') {
        supabase.auth.signOut()
      }
    }
  }

  useEffect(() => {
    if (resetPassword) {
      if (navigationIsReady) {
        navigationRef?.current?.navigate('ResetPassword')
      }
    }
  }, [resetPassword, navigationRef, navigationIsReady])

  useEffect(() => {
    const checkUserMetaData = async () => {
      if (navigationIsReady && !!user.user_metadata && !!session) {
        for (const key in user.user_metadata) {
          if (user.user_metadata[key] === null || !user.user_metadata[key]) {
            navigationRef?.current?.navigate('FillProfile')
            return
          }
        }
      }
    }
    checkUserMetaData()
  }, [user])

  return (
    <>
      {loading && <SplashScreen />}
      <NavigationContainer
        ref={navigationRef}
        onReady={() => setNavigationIsReady(true)}
        theme={{
          colors: {
            primary: theme.greyscale[50],
            background: theme.darkColors.dark1,
            text: theme.greyscale[50],
            border: theme.darkColors.dark1,
            card: theme.darkColors.dark1,
            notification: 'red',
          },
          dark: true,
        }}
      >
        {session ? <UserNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  )
}
