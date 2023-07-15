import { Database } from './supabase'
import { UserType } from './user'

export type reviewType = Database['public']['Tables']['reviews']['Row']

export type reviewWithUserType =
  Database['public']['Tables']['reviews']['Row'] & {
    userInfo: {
      avatar: string
      nickname: string
    }
  }
