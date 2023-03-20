import AuthNavigator from 'src/navigators/Auth'
import GlobalStyle from 'src/styles/GlobalStyle'
import { Home } from 'src/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { SplashScreen } from 'src/pages/SplashScreen'
import { ThemeProvider } from 'styled-components/native'
import { View } from 'react-native'
import { theme } from 'src/styles/theme'

export default function App() {
  const authenticated = false

  const loading = false

  return (
    <ThemeProvider theme={theme}>
      <View style={GlobalStyle["*"]}>
        {loading ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            {authenticated ? <Home /> : <AuthNavigator />}
          </NavigationContainer>
        )}
      </View>
    </ThemeProvider>
  )
}
