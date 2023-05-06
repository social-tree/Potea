import { Container, StyledLoading, StyledLogo } from './SplashScreen.styles'

import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'

export const SplashScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Container>
        <StyledLogo />
        <StyledLoading />
      </Container>
    </SafeAreaView>
  )
}
