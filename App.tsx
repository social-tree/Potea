import AuthNavigator from 'src/navigators/Auth'
import GlobalStyle from 'src/styles/GlobalStyle'
import { Home } from 'src/pages/Home'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import { SplashScreen } from 'src/pages/SplashScreen'
import { ThemeProvider } from 'styled-components/native'
import { View } from 'react-native'
import { theme } from 'src/styles/theme'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { supabase } from 'src/utils/supabase'
import { Session } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeNavigator from 'src/navigators/Home'

export default function App() {
  const [loading, setLoading] = useState(true)

  const [session, setSession] = useState<Session | null>(null)

  const navigationRef = React.createRef<any>()
  const [navigationIsReady, setNavigationIsReady] = useState(false)

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

  return (
    <ThemeProvider theme={theme}>
      <View style={GlobalStyle['*']}>
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
          {session ? <HomeNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </View>
    </ThemeProvider>
  )
}
