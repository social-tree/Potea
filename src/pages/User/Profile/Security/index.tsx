import * as LocalAuthentication from 'expo-local-authentication'
import * as Styled from './Security.styles'

import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProfileStackParamList } from 'src/navigators/ProfileNavigator/ProfileNavigator.types'
import { StackScreenProps } from '@react-navigation/stack'
import { Switch } from 'src/components/Form/Elements/Switch'
import { useDebounce } from 'src/hooks/useDebounce'
import { useForm } from 'react-hook-form'

export const Security = ({
  navigation,
}: StackScreenProps<ProfileStackParamList, 'Security'>) => {
  const [authAvailable, setAuthAvailable] = useState(true)
  const { control, watch, reset, setValue } = useForm()
  const { loading, setLoading } = useContext(AppContext)
  const { firstDebounce, debouncedValue } = useDebounce(watch('PIN'), 100)

  useEffect(() => {
    const getIsAuthAvailable = async () => {
      setLoading(true)
      const isAvailable = await LocalAuthentication.isEnrolledAsync()
      setAuthAvailable(isAvailable)
      setLoading(false)
    }
    getIsAuthAvailable()
  }, [])

  useEffect(() => {
    if (firstDebounce?.current) return
    console.log('firstDebounce', firstDebounce.current)
  }, [debouncedValue])

  useEffect(() => {
    const getAuthValue = async () => {
      setLoading(true)
      const isEnabled = await AsyncStorage.getItem('isBiometricsEnabled')

      reset({
        PIN: isEnabled === 'true' ? true : false,
      })
      setLoading(false)
    }
    getAuthValue()
  }, [authAvailable])

  return (
    <Styled.Container>
      <Styled.SwitchContainer>
        <Styled.SwitchLabel>Remember Me</Styled.SwitchLabel>
        <Switch name="rememberMe" control={control} />
      </Styled.SwitchContainer>
      {authAvailable && (
        <Styled.SwitchContainer>
          <Styled.SwitchLabel>Login with PIN code</Styled.SwitchLabel>
          <Switch name="PIN" control={control} />
        </Styled.SwitchContainer>
      )}
      <Styled.ChangePassButton
        onPress={() => {
          const parent = navigation.getParent()
          parent.navigate('ResetPassword')
        }}
      >
        Change Password
      </Styled.ChangePassButton>
    </Styled.Container>
  )
}
