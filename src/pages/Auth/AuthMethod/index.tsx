import * as Styled from './AuthMethod.styles'

import { SafeAreaView, StatusBar } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import { Button } from 'src/components/Elements/Button'
import { ChoiceSplit } from 'src/components/Elements/ChoiceSplit'
import { FontAwesome5 } from '@expo/vector-icons'
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
    <Styled.Container
      contentContainerStyle={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      <Styled.StyledWindowWithSmoke />
      <Styled.Header>Let’s you in</Styled.Header>
      <Styled.SocialButtonsContainer>
        <Styled.SocialLoginButton
          disabled={loading || true}
          onPress={() => handleSocialLogin('facebook')}
        >
          <FontAwesome5 name="facebook" size={24} color="white" />

          <Styled.SocialLoginText>
            Continue with Facebook
          </Styled.SocialLoginText>
        </Styled.SocialLoginButton>
        <Styled.SocialLoginButton
          disabled={loading}
          onPress={() => handleSocialLogin('google')}
        >
          <AntDesign name="google" size={24} color="white" />
          <Styled.SocialLoginText>Continue with Google</Styled.SocialLoginText>
        </Styled.SocialLoginButton>
        <Styled.SocialLoginButton
          disabled={loading || true}
          onPress={() => handleSocialLogin('apple')}
        >
          <AntDesign name="apple1" size={24} color="black" />
          <Styled.SocialLoginText>Continue with Apple</Styled.SocialLoginText>
        </Styled.SocialLoginButton>
      </Styled.SocialButtonsContainer>
      <Styled.StyledChoiceSplit />
      <Button onPress={() => navigation.navigate('Login')} enableShadow>
        Sign in with password
      </Button>
      <Styled.SignupWrap>
        <Styled.SignupText>Don't have an account?</Styled.SignupText>
        <Styled.SignupButton
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Styled.SignupButtonText>Sign up</Styled.SignupButtonText>
        </Styled.SignupButton>
      </Styled.SignupWrap>
    </Styled.Container>
  )
}
