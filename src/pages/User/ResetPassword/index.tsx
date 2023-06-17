import * as Styled from './ResetPassword.styles'

import { Image, KeyboardAvoidingView, Platform } from 'react-native'

import { Button } from 'src/components/Elements/Button'
import { Input } from 'src/components/Form/Elements/Inputs/Input'
import { Loading } from 'src/assets/animations/Loading'
import { Modal } from 'src/components/Elements/Modal'
import { PhoneSuccess } from 'src/assets/svg/PhoneSuccess'
import React from 'react'
import { SuccessShield } from 'src/assets/svg/SuccessShield'
import { updateUserInfo } from 'src/api/auth/User'
import { useForm } from 'react-hook-form'
import { useHeaderHeight } from '@react-navigation/elements'
import { useState } from 'react'

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
        <Styled.SuccessModal>
          <SuccessShield />
          <Styled.ModalInfo>
            <Styled.ModalTitle>Congratulations!</Styled.ModalTitle>
            <Styled.ModalDescription>
              Your account is ready to use. You will be redirected to the Home
              page in a few seconds..
            </Styled.ModalDescription>
          </Styled.ModalInfo>
          <Loading style={{ width: 100, height: 130 }} />
        </Styled.SuccessModal>
      </Modal>
      <Styled.Container
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: 71,
          paddingHorizontal: 24,
          gap: 71,
        }}
      >
        <PhoneSuccess />
        <Styled.Wrapper>
          <Styled.Info>Create Your New Password</Styled.Info>
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
        </Styled.Wrapper>
        <Button onPress={handleSubmit(onFormSubmit)}>Continue</Button>
      </Styled.Container>
    </KeyboardAvoidingView>
  )
}
