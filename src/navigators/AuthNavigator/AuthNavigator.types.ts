import { AuthError, Session, User } from '@supabase/supabase-js'

import { MethodTypes } from 'src/pages/Auth/ForgotPassword/ResetMethod'

export type AuthStackParamList = {
  Welcome: undefined
  AuthMethod: undefined
  CreateAccount: undefined
  ResetMethod: undefined
  Login: undefined
  Confirmation: {
    info: string
    credentials: 'string'
    method: MethodTypes
    onConfirmation: (
      data: {
        user: User
        session: Session
      },
      error: AuthError
    ) => void
  }
}
