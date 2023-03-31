import AuthNavigator from 'src/navigators/Auth'
import GlobalStyle from 'src/styles/GlobalStyle'
import { Home } from 'src/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { SplashScreen } from 'src/pages/SplashScreen'
import { ThemeProvider } from 'styled-components/native'
import { View } from 'react-native'
import { theme } from 'src/styles/theme'
import { useEffect, useState } from 'react'
import { supabase } from 'src/utils/supabase'
import { Session } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [loading, setLoading] = useState(true)

  const [session, setSession] = useState<Session | null>(null)

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
      console.log(_event, '_event')
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
  }, [])
  console.log(session)

  return (
    <ThemeProvider theme={theme}>
      <View style={GlobalStyle['*']}>
        {loading ? (
          <SplashScreen />
        ) : (
          <NavigationContainer
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
            {false ? <Home /> : <AuthNavigator />}
          </NavigationContainer>
        )}
      </View>
    </ThemeProvider>
  )
}
