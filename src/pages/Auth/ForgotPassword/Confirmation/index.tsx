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

import { AppContext } from 'src/contexts/AppContext'
import { Button } from 'src/components/Elements/Button'
import { MethodTypes } from '../ResetMethod'
import React from 'react'
import { ResetPasswordWithEmail } from 'src/api/auth/Email'
import { SignInWithOtp } from 'src/api/auth/Phone'
import { supabase } from 'src/utils/supabase'
import { updateUserInfo } from 'src/api/auth/User'
import { useHideTab } from 'src/hooks/useHideTab'
import { verifyUserInfo } from 'src/api/auth/User'

const CELL_COUNT = 6

export const Confirmation = ({ route }) => {
  const { toggleResetPassword } = useContext(AppContext)
  const [time, setTime] = useState(60)
  const [value, setValue] = useState('')
  useHideTab({ hide: true })
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const { credentials, method, onConfirmation } = route.params

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
        await ResetPasswordWithEmail(credentials)
        setTime(60)
      } else if (method === MethodTypes.SMS) {
        await SignInWithOtp(credentials)
        setTime(60)
      } else if (method === MethodTypes.PHONE_CHANGE) {
        await updateUserInfo({ phone: credentials })
        setTime(60)
      }
    }
  }

  useEffect(() => {
    if (method === MethodTypes.EMAIL) {
      ResetPasswordWithEmail(credentials)
    } else if (method === MethodTypes.SMS) {
      SignInWithOtp(credentials)
    } else if (method === MethodTypes.PHONE_CHANGE) {
      const data = updateUserInfo({ phone: credentials })
        .then((userInfo) => console.log(userInfo))
        .catch((err) => console.error(err))
    }
  }, [])

  const verifyOtp = async () => {
    let verifyParams
    switch (method) {
      case MethodTypes.EMAIL: {
        verifyParams = {
          email: credentials,
          token: value,
          type: 'recovery',
        }
        break
      }
      case MethodTypes.PHONE_CHANGE: {
        verifyParams = {
          phone: credentials,
          token: value,
          type: 'sms',
        }
        break
      }
      case MethodTypes.SMS: {
        verifyParams = {
          phone: credentials,
          token: value,
          type: 'phone_change',
        }
      }
    }
    const { data, error } = await supabase.auth.verifyOtp(verifyParams)
    if (data?.session?.access_token) {
      toggleResetPassword()
      onConfirmation && onConfirmation(data, error)
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
