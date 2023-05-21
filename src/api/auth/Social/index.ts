import { makeRedirectUri, startAsync } from 'expo-auth-session'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider } from '@supabase/supabase-js'
import { SUPABASE_URL } from '@env'
import { SocialLoginTypes } from './Social.types'
import { supabase } from 'src/utils/supabase'

export const SocialLogin = async ({
  provider,
  rememberMe,
}: SocialLoginTypes) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider.toLowerCase() as Provider,
  })
  const redirectUrl = makeRedirectUri({
    path: '/auth/callback',
  })

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
