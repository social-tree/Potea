import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthNavigator from '../AuthNavigator'
import { Loading } from 'src/assets/animations/Loading'
import { NavigationContainer } from '@react-navigation/native'
import { SplashScreen } from 'src/pages/SplashScreen'
import { ThemeConsumer } from 'styled-components'
import UserNavigator from '../UserNavigator'
import { View } from 'react-native'
import { supabase } from 'src/utils/supabase'
import { theme } from 'src/styles/theme'

export const RootNavigator = () => {
  const navigationRef = React.createRef<any>()
  const [navigationIsReady, setNavigationIsReady] = useState(false)
  const { resetPassword, session, setSession } = useContext(AppContext)
  const { user, loading, setSplashLoading, splashLoading } =
    useContext(AppContext)

  useEffect(() => {
    const getUserSession = async () => {
      setSplashLoading(true)
      await supabase.auth
        .getSession()
        .then(({ data: { session } }) => {
          setSession(session)
        })
        .catch((error) => console.log(error))
      setSplashLoading(false)
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
      if (navigationIsReady && !!user?.user_metadata && !!session) {
        for (const key in user?.user_metadata) {
          if (
            user?.user_metadata?.[key] === null ||
            !user?.user_metadata?.[key]
          ) {
            navigationRef?.current?.navigate('FillProfile')
            return
          }
        }
      }
    }
    checkUserMetaData()
  }, [user, session, navigationRef])
  return (
    <>
      {loading && (
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: theme.darkColors.dark1,
          }}
        >
          <Loading />
        </View>
      )}
      {splashLoading && <SplashScreen />}
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
