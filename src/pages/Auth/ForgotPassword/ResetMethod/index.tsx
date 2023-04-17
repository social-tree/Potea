import { Message } from 'src/assets/svg/Message'
import {
  Container,
  IconShadow,
  InfoText,
  MethodButton,
  MethodIcon,
  MethodInfo,
  MethodInfoText,
  MethodText,
  Methods,
} from './ResetMethod.styles'
import { LockedPhone } from 'src/assets/svg/LockedPhone'
import { Email } from 'src/assets/svg/Email'
import { theme } from 'src/styles/theme'
import { Button } from 'src/components/Elements/Button'
import { useState } from 'react'
import { Input } from 'src/components/Form/Elements/Input'
import { useForm } from 'react-hook-form'

export enum MethodTypes {
  EMAIL,
  SMS,
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
    <Container>
      <LockedPhone />
      <Methods>
        <InfoText>
          {stage === StageTypes.Method
            ? 'Select which method should we use to reset your password'
            : `Enter the ${
                selectedMethod === MethodTypes.SMS ? 'phone number' : 'email'
              } that was linked to your account`}
        </InfoText>
        {stage === StageTypes.Method ? (
          <>
            <MethodButton
              selected={selectedMethod === MethodTypes.SMS}
              onPress={() => handleMethodChange(MethodTypes.SMS)}
            >
              <>
                <MethodIcon>
                  <IconShadow />
                  <Message />
                </MethodIcon>
                <MethodInfo>
                  <MethodText>via SMS:</MethodText>
                  <MethodInfoText>+7 999 ********99</MethodInfoText>
                </MethodInfo>
              </>
            </MethodButton>
            <MethodButton
              selected={selectedMethod === MethodTypes.EMAIL}
              onPress={() => handleMethodChange(MethodTypes.EMAIL)}
            >
              <>
                <MethodIcon>
                  <IconShadow />
                  <Email fill={theme.primary[500]} width={'32'} height={'32'} />
                </MethodIcon>
                <MethodInfo>
                  <MethodText>via Email:</MethodText>
                  <MethodInfoText>example@yourdomain.com</MethodInfoText>
                </MethodInfo>
              </>
            </MethodButton>
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
      </Methods>
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
    </Container>
  )
}