import AuthNavigator from 'src/navigators/Auth'
import { Home } from 'src/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { SplashScreen } from 'src/pages/SplashScreen'
import { ThemeProvider } from 'styled-components/native'
import { theme } from 'src/styles/theme'

export default function App() {
  const authenticated = false

  const loading = false

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <SplashScreen />
      ) : (
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
      )}
    </ThemeProvider>
  )
}
