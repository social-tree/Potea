import {
  Container,
  Header,
  SignupButton,
  SignupButtonText,
  SignupText,
  SignupWrap,
  SocialButtonsContainer,
  SocialLoginButton,
  SocialLoginText,
  StyledWindowWithSmoke,
} from './AuthMethod.styles'
import { SafeAreaView, StatusBar } from 'react-native'

import { Apple } from 'src/assets/svg/Apple'
import { Button } from 'src/components/Elements/Button'
import { ChoiceSplit } from 'src/components/Elements/ChoiceSplit'
import { Facebook } from 'src/assets/svg/Facebook'
import { Google } from 'src/assets/svg/Google'
import { theme } from 'src/styles/theme'

export const AuthMethod = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Container>
        <StyledWindowWithSmoke />
        <Header>Let’s you in</Header>
        <SocialButtonsContainer>
          <SocialLoginButton>
            <Facebook />
            <SocialLoginText>Continue with Facebook</SocialLoginText>
          </SocialLoginButton>
          <SocialLoginButton>
            <Google />
            <SocialLoginText>Continue with Google</SocialLoginText>
          </SocialLoginButton>
          <SocialLoginButton>
            <Apple />
            <SocialLoginText>Continue with Apple</SocialLoginText>
          </SocialLoginButton>
        </SocialButtonsContainer>
        <ChoiceSplit />
        <Button
          style={{
            shadowColor: `${theme.primary[500]}90`,
            elevation: 3,
            shadowRadius: 500,
            borderColor: 'transparent',
            shadowOpacity: 0.26,
            borderWidth: 0,
            overflow: 'visible',
          }}
        >
          Sign in with password
        </Button>
        <SignupWrap>
          <SignupText>Don't have an account?</SignupText>
          <SignupButton>
            <SignupButtonText>Sign up</SignupButtonText>
          </SignupButton>
        </SignupWrap>
      </Container>
    </SafeAreaView>
  )
}
