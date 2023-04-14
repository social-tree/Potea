import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'
import { Container, StyledLogo, StyledLoading } from './SplashScreen.styles'

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
