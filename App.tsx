import { Home } from 'src/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from 'styled-components'
import { theme } from 'src/styles/theme'

const { Screen, Navigator } = createNativeStackNavigator()

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Navigator>
          <Screen name="Home" component={Home} />
        </Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}
