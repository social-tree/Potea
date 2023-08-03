import * as LocalAuthentication from 'expo-local-authentication'
import * as Styled from './PINScreen.styles'

import { LockedPhone } from 'src/assets/svg/LockedPhone'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
  onPinComplete: () => void
}

export const PINScreen = ({ onPinComplete }: Props) => {
  const togglePin = async () => {
    const { success } = await LocalAuthentication.authenticateAsync({
      cancelLabel: 'Cancel',
      requireConfirmation: true,
    })
    if (success) {
      onPinComplete()
    }
  }

  return (
    <Styled.Container>
      <Styled.Wrap onPress={() => togglePin()}>
        <LockedPhone />
        <Styled.PinButton>Press to enter your PIN</Styled.PinButton>
      </Styled.Wrap>
    </Styled.Container>
  )
}
