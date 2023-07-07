import * as Styled from './Confirmation.styles'

import {
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { AuthStackParamList } from 'src/navigators/AuthNavigator/AuthNavigator.types'
import { Button } from 'src/components/Elements/Button'
import { MethodTypes } from '../ResetMethod'
import React from 'react'
import { ResetPasswordWithEmail } from 'src/api/auth/Email'
import { SignInWithOtp } from 'src/api/auth/Phone'
import { StackScreenProps } from '@react-navigation/stack'
import { supabase } from 'src/utils/supabase'
import { updateUserInfo } from 'src/api/auth/User'

const CELL_COUNT = 6

export const Confirmation = ({
  route,
}: StackScreenProps<AuthStackParamList>) => {
  const { toggleResetPassword } = useContext(AppContext)
  const [time, setTime] = useState(60)
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const { credentials, method, onConfirmation, info } = route.params

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
        await SignInWithOtp({ phoneNumber: credentials })
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
      SignInWithOtp({ phoneNumber: credentials })
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
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.ConfirmationText>
          Code has been send to {info}
        </Styled.ConfirmationText>
        <Styled.StyledCodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Styled.TextCellContainer>
              <Styled.TextCell
                isFocused={isFocused}
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Styled.TextCell>
            </Styled.TextCellContainer>
          )}
        />
        <Styled.ResendButton
          onPress={() => resendVerification()}
          disabled={time !== 0}
        >
          <>
            <Styled.ConfirmationText>Resend code </Styled.ConfirmationText>
            <Styled.GreenConfirmationText>
              {time !== 0 && `in ${time} s`}
            </Styled.GreenConfirmationText>
          </>
        </Styled.ResendButton>
      </Styled.Wrapper>
      <Button onPress={() => verifyOtp()}>Verify</Button>
    </Styled.Container>
  )
}
