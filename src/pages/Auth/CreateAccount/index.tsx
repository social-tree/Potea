import {
  Container,
  Form,
  Lock,
  OtherMethods,
  SocialButton,
  SocialButtons,
  StyledSignupWrap,
  Title,
} from './CreateAccount.styles'
import {
  SignupButton,
  SignupButtonText,
  SignupText,
  SignupWrap,
} from '../AuthMethod/AuthMethod.styles'

import { Apple } from 'src/assets/svg/Apple'
import { Button } from 'src/components/Elements/Button'
import { Checkbox } from 'src/components/Form/Elements/Checkbox'
import { ChoiceSplit } from 'src/components/Elements/ChoiceSplit'
import { Email } from 'src/assets/svg/Email'
import { Facebook } from 'src/assets/svg/Facebook'
import { Google } from 'src/assets/svg/Google'
import { Input } from 'src/components/Form/Elements/Input'
import { Logo } from 'src/assets/svg/Logo'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EmailSignup, SocialLogin } from 'src/api/auth'

export const CreateAccount = ({ navigation }) => {
  const { control, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)

  const onFormSubmit = async (formData) => {
    const { email, password, rememberMe } = formData
    setLoading(true)
    await EmailSignup({
      email,
      password,
      rememberMe,
    })
    setLoading(false)
  }

  return (
    <Container
      contentContainerStyle={{
        display: 'flex',
        alignItems: 'center',
        gap: 38,
        paddingTop: 30,
        paddingBottom: 40,
      }}
    >
      <Logo />
      <Title>Create Your Account</Title>
      <Form>
        <Input
          name={'email'}
          control={control}
          leftIcon={<Email />}
          placeholder="Email"
          rules={{ required: true }}
        />
        <Input
          name={'password'}
          control={control}
          leftIcon={<Lock source={require('src/assets/img/Lock.png')} />}
          type="password"
          placeholder="Password"
          inputProps={{
            textContentType: 'newPassword',
          }}
          rules={{ required: true }}
        />
        <Checkbox name="rememberMe" control={control} label="Remember me" />
        <Button loading={loading} onPress={handleSubmit(onFormSubmit)}>
          Sign up
        </Button>
      </Form>
      <ChoiceSplit />
      <OtherMethods>
        <SocialButtons>
          <SocialButton disabled>
            <Facebook />
          </SocialButton>
          <SocialButton>
            <Google onPress={() => SocialLogin({ provider: 'google' })} />
          </SocialButton>
          <SocialButton disabled>
            <Apple />
          </SocialButton>
        </SocialButtons>
      </OtherMethods>
      <StyledSignupWrap>
        <SignupText>Already have an account?</SignupText>
        <SignupButton
          onPress={() => {
            navigation.navigate('Login')
          }}
        >
          <SignupButtonText>Sign in</SignupButtonText>
        </SignupButton>
      </StyledSignupWrap>
    </Container>
  )
}
