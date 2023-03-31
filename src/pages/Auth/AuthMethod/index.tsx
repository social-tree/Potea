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
  StyledChoiceSplit,
  StyledWindowWithSmoke,
} from './AuthMethod.styles'
import { SafeAreaView, StatusBar } from 'react-native'

import { Apple } from 'src/assets/svg/Apple'
import { Button } from 'src/components/Elements/Button'
import { ChoiceSplit } from 'src/components/Elements/ChoiceSplit'
import { Facebook } from 'src/assets/svg/Facebook'
import { Google } from 'src/assets/svg/Google'
import { SocialLogin } from 'src/api/auth'
import { theme } from 'src/styles/theme'

export const AuthMethod = ({ navigation }) => {
  return (
    <Container
      contentContainerStyle={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      <StyledWindowWithSmoke />
      <Header>Let’s you in</Header>
      <SocialButtonsContainer>
        <SocialLoginButton
          disabled
          onPress={() => SocialLogin({ provider: 'facebook' })}
        >
          <Facebook />
          <SocialLoginText>Continue with Facebook</SocialLoginText>
        </SocialLoginButton>
        <SocialLoginButton onPress={() => SocialLogin({ provider: 'google' })}>
          <Google />
          <SocialLoginText>Continue with Google</SocialLoginText>
        </SocialLoginButton>
        <SocialLoginButton
          disabled
          onPress={() => SocialLogin({ provider: 'apple' })}
        >
          <Apple />
          <SocialLoginText>Continue with Apple</SocialLoginText>
        </SocialLoginButton>
      </SocialButtonsContainer>
      <StyledChoiceSplit />
      <Button
        onPress={() => navigation.navigate('Login')}
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
        <SignupButton onPress={() => navigation.navigate('CreateAccount')}>
          <SignupButtonText>Sign up</SignupButtonText>
        </SignupButton>
      </SignupWrap>
    </Container>
  )
}
