import { SocialLoginTypes } from './Social.types'
import { Provider } from '@supabase/supabase-js'
import { supabase } from 'src/utils/supabase'
import { makeRedirectUri, startAsync } from 'expo-auth-session'
import { SUPABASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const SocialLogin = async ({
  provider,
  rememberMe,
}: SocialLoginTypes) => {
  console.log('hello')
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider.toLowerCase() as Provider,
  })
  const redirectUrl = makeRedirectUri({
    path: '/auth/callback',
  })
  console.log(redirectUrl, 'redirect')

  const authResponse = await startAsync({
    authUrl: `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`,
    returnUrl: redirectUrl,
  })

  if (authResponse.type === 'success' && typeof rememberMe === 'boolean') {
    AsyncStorage.setItem('rememberMe', `${rememberMe}`)
  }

  if (authResponse.type === 'success') {
    supabase.auth.setSession({
      access_token: authResponse.params.access_token,
      refresh_token: authResponse.params.refresh_token,
    })
  }

  return { data, error }
}
