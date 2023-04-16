import {
  ConfirmationText,
  Container,
  GreenConfirmationText,
  ResendButton,
  StyledCodeField,
  TextCell,
  TextCellContainer,
  Wrapper,
} from './Confirmation.styles'
import {
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useContext, useEffect, useState } from 'react'
import { Button } from 'src/components/Elements/Button'
import { MethodTypes } from '../ResetMethod'
import { ResetPasswordWithEmail } from 'src/api/auth/Email'
import { SignInWithOtp } from 'src/api/auth/Phone'
import { AppContext } from 'src/contexts/AppContext'
import { supabase } from 'src/utils/supabase'

const CELL_COUNT = 6

export const Confirmation = ({ route }) => {
  const { toggleResetPassword } = useContext(AppContext)
  const [time, setTime] = useState(60)
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const { credentials, method } = route.params

  useEffect(() => {
    let SmsCounter
    if (time > 0) {
      SmsCounter = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }
    return () => {
      clearTimeout(SmsCounter)
    }
  })

  const resendVerification = async () => {
    if (!time) {
      if (method === MethodTypes.EMAIL) {
        ResetPasswordWithEmail(credentials)
        setTime(60)
      } else if (method === MethodTypes.SMS) {
        SignInWithOtp(credentials)
        setTime(60)
      }
    }
  }

  useEffect(() => {
    if (method === MethodTypes.EMAIL) {
      ResetPasswordWithEmail(credentials)
    } else if (method === MethodTypes.SMS) {
      SignInWithOtp(credentials)
    }
  }, [])

  const verifyOtp = async () => {
    console.log('toggling')
    const { data, error } = await supabase.auth.verifyOtp(
      method === MethodTypes.EMAIL
        ? {
            email: credentials,
            token: value,
            type: 'recovery',
          }
        : {
            phone: credentials,
            token: value,
            type: 'sms',
          }
    )
    if (data?.session?.access_token) {
      toggleResetPassword()
    }
  }

  return (
    <Container>
      <Wrapper>
        <ConfirmationText>
          Code has been send to {route.params.info}
        </ConfirmationText>
        <StyledCodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <TextCellContainer>
              <TextCell
                isFocused={isFocused}
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </TextCell>
            </TextCellContainer>
          )}
        />
        <ResendButton
          onPress={() => resendVerification()}
          disabled={time !== 0}
        >
          <>
            <ConfirmationText>Resend code </ConfirmationText>
            <GreenConfirmationText>
              {time !== 0 && `in ${time} s`}
            </GreenConfirmationText>
          </>
        </ResendButton>
      </Wrapper>
      <Button onPress={() => verifyOtp()}>Verify</Button>
    </Container>
  )
}
