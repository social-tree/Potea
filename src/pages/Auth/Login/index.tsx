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

export const Login = ({ navigation }) => {
  return (
    <Container
      contentContainerStyle={{ display: 'flex', alignItems: 'center', gap: 38 }}
    >
      <Logo />
      <Title>Login to Your Account</Title>
      <Form>
        <Input leftIcon={<Email />} placeholder="Email" />
        <Input
          leftIcon={<Lock source={require('src/assets/img/Lock.png')} />}
          placeholder="Password"
          type="password"
        />
        <Checkbox label="Remember me" />
        <Button>Sign in</Button>
        <TouchableHighlight>
          <GreenText>Forgot the password?</GreenText>
        </TouchableHighlight>
      </Form>
      <StyledOtherMethods>
        <ChoiceSplit />
        <SocialButtons>
          <SocialButton>
            <Facebook />
          </SocialButton>
          <SocialButton>
            <Google />
          </SocialButton>
          <SocialButton>
            <Apple />
          </SocialButton>
        </SocialButtons>
        <StyledSignupWrap>
          <SignupText>Already have an account?</SignupText>
          <SignupButtonText onPress={() => navigation.navigate('Login')}>
            <GreenText>Sign in</GreenText>
          </SignupButtonText>
        </StyledSignupWrap>
      </StyledOtherMethods>
    </Container>
  )
}
