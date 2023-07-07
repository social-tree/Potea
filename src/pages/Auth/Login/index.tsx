import * as Styled from './Login.styles'

import { EmailLogin, SocialLogin } from 'src/api/auth'
import {
  OtherMethods,
  SocialButton,
  SocialButtons,
  StyledSignupWrap,
} from '../CreateAccount/CreateAccount.styles'
import { SignupButtonText, SignupText } from '../AuthMethod/AuthMethod.styles'

import { AntDesign } from '@expo/vector-icons'
import { Button } from 'src/components/Elements/Button'
import { Checkbox } from 'src/components/Form/Elements/Checkbox'
import { ChoiceSplit } from 'src/components/Elements/ChoiceSplit'
import { Email } from 'src/assets/svg/Email'
import { FontAwesome5 } from '@expo/vector-icons'
import { Input } from 'src/components/Form/Elements/Inputs/Input'
import { Logo } from 'src/assets/svg/Logo'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export const Login = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()
  const [loading, setLoading] = useState(false)

  const onFormSubmit = async (formData) => {
    console.log('submit')
    const { email, password, rememberMe } = formData
    setLoading(true)
    const { data, error } = await EmailLogin({
      email,
      password,
      rememberMe,
    })
    if (error) {
      console.log(error)
      setError('password', { type: 'custom', message: error.message })
      setError('email', { type: 'custom', message: '' })
    }
    setLoading(false)
  }

  return (
    <Styled.Container
      contentContainerStyle={{
        display: 'flex',
        alignItems: 'center',
        gap: 38,
        paddingTop: 30,
        paddingBottom: 40,
      }}
    >
      <Logo />
      <Styled.Title>Login to Your Account</Styled.Title>
      <Styled.Form>
        <Input
          name="email"
          control={control}
          leftIcon={<Email />}
          placeholder="Email"
          inputProps={{
            textContentType: 'username',
          }}
          rules={{ required: 'Enter an email' }}
          errors={errors}
        />
        <Input
          name="password"
          control={control}
          leftIcon={<Styled.Lock source={require('src/assets/img/Lock.png')} />}
          placeholder="Password"
          type="password"
          inputProps={{
            textContentType: 'password',
          }}
          rules={{
            required: 'Enter a password',
            minLength: {
              value: 6,
              message: 'The minimum length is 6 characters',
            },
          }}
          errors={errors}
        />
        <Checkbox name="rememberMe" control={control} label="Remember me" />
        <Button
          disabled={loading}
          loading={loading}
          onPress={handleSubmit(onFormSubmit)}
        >
          Sign in
        </Button>
        <TouchableHighlight onPress={() => navigation.navigate('ResetMethod')}>
          <Styled.GreenText>Forgot the password?</Styled.GreenText>
        </TouchableHighlight>
      </Styled.Form>
      <Styled.StyledOtherMethods>
        <ChoiceSplit />
        <SocialButtons>
          <SocialButton disabled>
            <FontAwesome5 name="facebook" size={24} color="white" />
          </SocialButton>
          <SocialButton>
            <AntDesign
              name="google"
              size={24}
              color="white"
              onPress={() => SocialLogin({ provider: 'google' })}
            />
          </SocialButton>
          <SocialButton disabled>
            <AntDesign name="apple1" size={24} color="black" />
          </SocialButton>
        </SocialButtons>
        <StyledSignupWrap>
          <SignupText>Already have an account?</SignupText>
          <SignupButtonText
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <Styled.GreenText>Sign up</Styled.GreenText>
          </SignupButtonText>
        </StyledSignupWrap>
      </Styled.StyledOtherMethods>
    </Styled.Container>
  )
}
