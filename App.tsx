import { Home } from 'src/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from 'styled-components'
import { theme } from 'src/styles/theme'
import AuthNavigator from 'src/navigators/Auth'
import { SplashScreen } from 'src/pages/SplashScreen'

const { Screen, Navigator } = createNativeStackNavigator()

export default function App() {
  const authenticated = false

  const loading = true

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {authenticated ? (
            <Navigator>
              <Screen name="Home" component={Home} />
            </Navigator>
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      )}
    </ThemeProvider>
  )
}
