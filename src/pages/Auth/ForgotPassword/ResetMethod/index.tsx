import * as Styled from './ResetMethod.styles'

import { Button } from 'src/components/Elements/Button'
import { Email } from 'src/assets/svg/Email'
import { Input } from 'src/components/Form/Elements/Inputs/Input'
import { LockedPhone } from 'src/assets/svg/LockedPhone'
import { Message } from 'src/assets/svg/Message'
import React from 'react'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export enum MethodTypes {
  EMAIL,
  SMS,
  PHONE_CHANGE,
}

export enum StageTypes {
  Method,
  Input,
}

export const ResetMethod = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState<MethodTypes>(
    MethodTypes.SMS
  )
  const [stage, setStage] = useState<StageTypes>(StageTypes.Method)

  const { control, handleSubmit, trigger } = useForm()

  const handleMethodChange = (method: MethodTypes) => {
    setSelectedMethod(method)
  }

  const handleFormSubmit = (data) => {
    const { info } = data
    navigation.navigate('Confirmation', {
      credentials: info,
      method: selectedMethod,
    })
  }

  return (
    <Styled.Container>
      <LockedPhone />
      <Styled.Methods>
        <Styled.InfoText>
          {stage === StageTypes.Method
            ? 'Select which method should we use to reset your password'
            : `Enter the ${
                selectedMethod === MethodTypes.SMS ? 'phone number' : 'email'
              } that was linked to your account`}
        </Styled.InfoText>
        {stage === StageTypes.Method ? (
          <>
            <Styled.MethodButton
              selected={selectedMethod === MethodTypes.SMS}
              onPress={() => handleMethodChange(MethodTypes.SMS)}
            >
              <>
                <Styled.MethodIcon>
                  <Styled.IconShadow />
                  <Message />
                </Styled.MethodIcon>
                <Styled.MethodInfo>
                  <Styled.MethodText>via SMS:</Styled.MethodText>
                  <Styled.MethodInfoText>
                    +7 999 ********99
                  </Styled.MethodInfoText>
                </Styled.MethodInfo>
              </>
            </Styled.MethodButton>
            <Styled.MethodButton
              selected={selectedMethod === MethodTypes.EMAIL}
              onPress={() => handleMethodChange(MethodTypes.EMAIL)}
            >
              <>
                <Styled.MethodIcon>
                  <Styled.IconShadow />
                  <Email fill={theme.primary[500]} width={'32'} height={'32'} />
                </Styled.MethodIcon>
                <Styled.MethodInfo>
                  <Styled.MethodText>via Email:</Styled.MethodText>
                  <Styled.MethodInfoText>
                    example@yourdomain.com
                  </Styled.MethodInfoText>
                </Styled.MethodInfo>
              </>
            </Styled.MethodButton>
          </>
        ) : (
          <Input
            placeholder={
              selectedMethod === MethodTypes.EMAIL ? 'Email' : 'Phone Number'
            }
            name="info"
            control={control}
            rules={{ required: true }}
          />
        )}
      </Styled.Methods>
      <Button
        onPress={async () => {
          if (stage === StageTypes.Method) {
            return setStage(StageTypes.Input)
          }
          const verifiedFields = await trigger()
          verifiedFields && handleSubmit(handleFormSubmit)()
        }}
      >
        Continue
      </Button>
    </Styled.Container>
  )
}
