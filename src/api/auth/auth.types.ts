import { Provider } from '@supabase/supabase-js'

export interface EmailLoginTypes {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SocialLoginTypes {
  provider: Provider
  rememberMe?: boolean
}
