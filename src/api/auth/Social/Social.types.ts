import { Provider } from '@supabase/supabase-js'

export interface SocialLoginTypes {
  provider: Provider
  rememberMe?: boolean
}
