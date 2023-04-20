import {
  Container,
  Form,
  GreenText,
  Lock,
  StyledOtherMethods,
  Title,
} from './Login.styles'
import {
  OtherMethods,
  SocialButton,
  SocialButtons,
  StyledSignupWrap,
} from '../CreateAccount/CreateAccount.styles'
import { SignupButtonText, SignupText } from '../AuthMethod/AuthMethod.styles'
import { useState } from 'react'
import { Apple } from 'src/assets/svg/Apple'
import { Button } from 'src/components/Elements/Button'
import { Checkbox } from 'src/components/Form/Elements/Checkbox'
import { ChoiceSplit } from 'src/components/Elements/ChoiceSplit'
import { Email } from 'src/assets/svg/Email'
import { Facebook } from 'src/assets/svg/Facebook'
import { Google } from 'src/assets/svg/Google'
import { Input } from 'src/components/Form/Elements/Input'
import { Logo } from 'src/assets/svg/Logo'
import { TouchableHighlight } from 'react-native'
import { useForm } from 'react-hook-form'
import { EmailLogin, SocialLogin } from 'src/api/auth'

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
      setError('password', { type: 'custom', message: error.message })
      setError('email', { type: 'custom', message: '' })
    }
    setLoading(false)
  }
  console.log(errors)

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
      <Title>Login to Your Account</Title>
      <Form>
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
          leftIcon={<Lock source={require('src/assets/img/Lock.png')} />}
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
          <GreenText>Forgot the password?</GreenText>
        </TouchableHighlight>
      </Form>
      <StyledOtherMethods>
        <ChoiceSplit />
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
        <StyledSignupWrap>
          <SignupText>Already have an account?</SignupText>
          <SignupButtonText
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <GreenText>Sign up</GreenText>
          </SignupButtonText>
        </StyledSignupWrap>
      </StyledOtherMethods>
    </Container>
  )
}
