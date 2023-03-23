import {
  Urbanist_300Light,
  Urbanist_500Medium,
  useFonts,
} from '@expo-google-fonts/urbanist'

import AuthNavigator from 'src/navigators/Auth'
import GlobalStyle from 'src/styles/GlobalStyle'
import { Home } from 'src/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { SplashScreen } from 'src/pages/SplashScreen'
import { ThemeProvider } from 'styled-components/native'
import { View } from 'react-native'
import { theme } from 'src/styles/theme'

export default function App() {
  let [fontsLoaded] = useFonts({
    Urbanist_500Medium,
    Urbanist_300Light,
  })

  const authenticated = false

  const loading = !fontsLoaded

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <SplashScreen />
      ) : (
        <View style={GlobalStyle?.['*']}>
          <NavigationContainer
            theme={{
              colors: {
                primary: 'red',
                background: theme.darkColors.dark1,
                text: theme.greyscale[50],
                border: theme.darkColors.dark1,
                card: theme.darkColors.dark1,
                notification: 'red',
              },
              dark: true,
            }}
          >
            {authenticated ? <Home /> : <AuthNavigator />}
          </NavigationContainer>
        </View>
      )}
    </ThemeProvider>
  )
}
