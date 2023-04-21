import { NavigationContainer } from '@react-navigation/native'
import { theme } from 'src/styles/theme'
import UserNavigator from './UserNavigator'
import AuthNavigator from './AuthNavigator'
import React, { useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { AppContext } from 'src/contexts/AppContext'
import { supabase } from 'src/utils/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SplashScreen } from 'src/pages/SplashScreen'

interface Props {
  setLoading: (state: boolean) => void
  loading: boolean
}

export const RootNavigator = ({ setLoading, loading }: Props) => {
  const navigationRef = React.createRef<any>()
  const [navigationIsReady, setNavigationIsReady] = useState(false)

  const [session, setSession] = useState<Session | null>(null)
  const { resetPassword } = useContext(AppContext)

  useEffect(() => {
    const getUserSession = async () => {
      setLoading(true)
      await supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      setLoading(false)
    }
    getUserSession()

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log(session, 'session')
      console.log(_event, '_event')
      if (_event == 'PASSWORD_RECOVERY') {
        if (navigationIsReady) {
          navigationRef?.current?.navigate('ResetPassword')
        }
      }
    })

    return () => {
      const onAppExit = async () => {
        const rememberMe = AsyncStorage.getItem('rememberMe')
        if (!rememberMe) {
          console.log('signedOut')
          supabase.auth.signOut()
        }
      }
      onAppExit()
    }
  }, [navigationIsReady])

  useEffect(() => {
    if (resetPassword) {
      if (navigationIsReady) {
        navigationRef?.current?.navigate('ResetPassword')
      }
    }
  }, [resetPassword, navigationRef, navigationIsReady])

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
