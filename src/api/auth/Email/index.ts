import AsyncStorage from '@react-native-async-storage/async-storage'
import { EmailLoginTypes } from './Email.types'
import { supabase } from 'src/utils/supabase'

export const EmailSignup = async ({
  email,
  password,
  rememberMe,
}: EmailLoginTypes) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (data?.user?.id && typeof rememberMe === 'boolean') {
    AsyncStorage.setItem('rememberMe', `${rememberMe}`)
  }

  return { data, error }
}

export const EmailLogin = async ({
  email,
  password,
  rememberMe,
}: EmailLoginTypes) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  console.log(data, error)

  if (data?.user?.id && typeof rememberMe === 'boolean') {
    AsyncStorage.setItem('rememberMe', `${rememberMe}`)
  }

  return { data, error }
}

export const ResetPasswordWithEmail = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({ email })

  return { data, error }
}
