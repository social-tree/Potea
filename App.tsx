import { Home } from 'src/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from 'styled-components'
import { theme } from 'src/styles/theme'
import AuthNavigator from 'src/navigators/Auth'

const { Screen, Navigator } = createNativeStackNavigator()

export default function App() {
  const authenticated = false

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {authenticated ? (
          <Navigator>
            <Screen name="Home" component={Home} />
          </Navigator>
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </ThemeProvider>
  )
}
