import * as LocalAuthentication from 'expo-local-authentication'
import * as Styled from './Security.styles'

import React from 'react'
import { Switch } from 'src/components/Form/Elements/Switch'
import { useForm } from 'react-hook-form'

export const Security = () => {
  const { control } = useForm()

  return (
    <Styled.Container>
      <Styled.SwitchContainer>
        <Styled.SwitchLabel>Remember Me</Styled.SwitchLabel>
        <Switch name="rememberMe" control={control} />
      </Styled.SwitchContainer>
      <Styled.SwitchContainer>
        <Styled.SwitchLabel>Face ID</Styled.SwitchLabel>
        <Switch name="faceID" control={control} />
      </Styled.SwitchContainer>
      <Styled.ChangePassButton>Change Password</Styled.ChangePassButton>
    </Styled.Container>
  )
}
