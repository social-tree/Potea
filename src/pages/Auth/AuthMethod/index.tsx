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
import { Provider } from '@supabase/supabase-js'
import React from 'react'
import { SocialLogin } from 'src/api/auth'
import { theme } from 'src/styles/theme'
import { useState } from 'react'

export const AuthMethod = ({ navigation }) => {
  const [loading, setLoading] = useState(false)

  const handleSocialLogin = async (provider: Provider) => {
    setLoading(true)
    await SocialLogin({ provider: provider })
    setLoading(false)
  }

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
          disabled={loading || true}
          onPress={() => handleSocialLogin('facebook')}
        >
          <Facebook />
          <SocialLoginText>Continue with Facebook</SocialLoginText>
        </SocialLoginButton>
        <SocialLoginButton
          disabled={loading}
          onPress={() => handleSocialLogin('google')}
        >
          <Google />
          <SocialLoginText>Continue with Google</SocialLoginText>
        </SocialLoginButton>
        <SocialLoginButton
          disabled={loading || true}
          onPress={() => handleSocialLogin('apple')}
        >
          <Apple />
          <SocialLoginText>Continue with Apple</SocialLoginText>
        </SocialLoginButton>
      </SocialButtonsContainer>
      <StyledChoiceSplit />
      <Button onPress={() => navigation.navigate('Login')} enableShadow>
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
