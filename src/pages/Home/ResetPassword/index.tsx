import { PhoneSuccess } from 'src/assets/svg/PhoneSuccess'
import {
  Container,
  Info,
  ModalDescription,
  ModalInfo,
  ModalTitle,
  SuccessModal,
  Wrapper,
} from './ResetPassword.styles'
import { Input } from 'src/components/Form/Elements/Input'
import { useForm } from 'react-hook-form'
import { Image, KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from 'src/components/Elements/Button'
import { useHeaderHeight } from '@react-navigation/elements'
import { updateUserInfo } from 'src/api/auth/User'
import { Modal } from 'src/components/Elements/Modal'
import { useState } from 'react'
import { SuccessShield } from 'src/assets/svg/SuccessShield'
import { Loading } from 'src/assets/animations/Loading'

export const ResetPassword = ({ route, navigation }) => {
  const { control, handleSubmit } = useForm()
  const headerHeight = useHeaderHeight()
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  const onFormSubmit = async (data) => {
    const { password, confirmPassword } = data
    if (password === confirmPassword) {
      handleSuccessModal()
      await updateUserInfo({
        password,
      })
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      })
    }
  }

  const handleSuccessModal = () => {
    setSuccessModalOpen((prev) => (prev ? false : true))
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <Modal open={successModalOpen}>
        <SuccessModal>
          <SuccessShield />
          <ModalInfo>
            <ModalTitle>Congratulations!</ModalTitle>
            <ModalDescription>
              Your account is ready to use. You will be redirected to the Home
              page in a few seconds..
            </ModalDescription>
          </ModalInfo>
          <Loading style={{ width: 100, height: 130 }} />
        </SuccessModal>
      </Modal>
      <Container
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: 71,
          paddingHorizontal: 24,
          gap: 71,
        }}
      >
        <PhoneSuccess />
        <Wrapper>
          <Info>Create Your New Password</Info>
          <Input
            control={control}
            placeholder="New Password"
            leftIcon={<Image source={require('src/assets/img/Lock.png')} />}
            type="password"
            inputProps={{
              textContentType: 'password',
            }}
            rules={{ required: true }}
            name="password"
          />
          <Input
            control={control}
            placeholder="Confirm Password"
            leftIcon={<Image source={require('src/assets/img/Lock.png')} />}
            type="password"
            inputProps={{
              textContentType: 'password',
            }}
            rules={{ required: true }}
            name="confirmPassword"
          />
        </Wrapper>
        <Button onPress={handleSubmit(onFormSubmit)}>Continue</Button>
      </Container>
    </KeyboardAvoidingView>
  )
}
