import { NavigationContainer } from '@react-navigation/native'
import { theme } from 'src/styles/theme'
import AuthNavigator from 'src/navigators/Auth'
import { SplashScreen } from 'src/pages/SplashScreen'
import { Home } from 'src/pages/Home'
import { ThemeProvider } from 'styled-components/native'

export default function App() {
  const authenticated = false

  const loading = false

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {authenticated ? <Home /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </ThemeProvider>
  )
}
