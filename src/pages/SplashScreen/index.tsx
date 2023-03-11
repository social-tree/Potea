import { Logo } from 'src/assets/svg/Logo'
import { SafeAreaView } from 'react-native'
import { Text } from 'react-native'
import { View, StatusBar } from 'react-native'
import { Container, StyledLottieView } from './SplashScreen.styles'
import { theme } from 'src/styles/theme'

export const SplashScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Container>
        <Logo />
        <StyledLottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          colorFilters={[
            {
              keypath: 'Shape Layer 2',
              color: theme.primary[500],
            },
            {
              keypath: 'Shape Layer 1',
              color: theme.primary[500],
            },
          ]}
          loop
          source={require('src/assets/animations/loading.json')}
        />
      </Container>
    </SafeAreaView>
  )
}
