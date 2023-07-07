import * as Styled from './CreateAccount.styles'

import { EmailSignup, SocialLogin } from 'src/api/auth'
import React, { useState } from 'react'
import {
  SignupButton,
  SignupButtonText,
  SignupText,
  SignupWrap,
} from '../AuthMethod/AuthMethod.styles'

import { AntDesign } from '@expo/vector-icons'
import { Button } from 'src/components/Elements/Button'
import { Checkbox } from 'src/components/Form/Elements/Checkbox'
import { ChoiceSplit } from 'src/components/Elements/ChoiceSplit'
import { Email } from 'src/assets/svg/Email'
import { FontAwesome5 } from '@expo/vector-icons'
import { Input } from 'src/components/Form/Elements/Inputs/Input'
import { Logo } from 'src/assets/svg/Logo'
import { useForm } from 'react-hook-form'

export const CreateAccount = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()
  const [loading, setLoading] = useState(false)

  const onFormSubmit = async (formData) => {
    const { email, password, rememberMe } = formData
    setLoading(true)
    const { data, error } = await EmailSignup({
      email,
      password,
      rememberMe,
    })
    if (error) {
      setError('password', { type: 'custom', message: error.message })
      setError('email', { type: 'custom', message: '' })
    }
    setLoading(false)
    if (data?.user?.aud) {
      navigation.navigate('Login')
    }
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
      <Styled.Title>Create Your Account</Styled.Title>
      <Styled.Form>
        <Input
          name={'email'}
          control={control}
          leftIcon={<Email />}
          placeholder="Email"
          rules={{ required: 'Enter an email' }}
          errors={errors}
        />
        <Input
          name={'password'}
          control={control}
          leftIcon={<Styled.Lock source={require('src/assets/img/Lock.png')} />}
          type="password"
          placeholder="Password"
          inputProps={{
            textContentType: 'newPassword',
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
        <Button loading={loading} onPress={handleSubmit(onFormSubmit)}>
          Sign up
        </Button>
      </Styled.Form>
      <ChoiceSplit />
      <Styled.OtherMethods>
        <Styled.SocialButtons>
          <Styled.SocialButton disabled>
            <FontAwesome5 name="facebook" size={24} color="white" />
          </Styled.SocialButton>
          <Styled.SocialButton>
            <AntDesign
              name="google"
              size={24}
              color="white"
              onPress={() => SocialLogin({ provider: 'google' })}
            />
          </Styled.SocialButton>
          <Styled.SocialButton disabled>
            <AntDesign name="apple1" size={24} color="black" />
          </Styled.SocialButton>
        </Styled.SocialButtons>
      </Styled.OtherMethods>
      <Styled.StyledSignupWrap>
        <SignupText>Already have an account?</SignupText>
        <SignupButton
          onPress={() => {
            navigation.navigate('Login')
          }}
        >
          <SignupButtonText>Sign in</SignupButtonText>
        </SignupButton>
      </Styled.StyledSignupWrap>
    </Styled.Container>
  )
}
