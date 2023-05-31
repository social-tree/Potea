import { User } from '@supabase/supabase-js'

export type UserMetaData = {
  id: number
  full_name: string
  phone_number: string
  avatar: string
  gender: {
    id: string
    name: string
  }
  date_of_birth: string
  created_at: string
}

export interface UserType extends User {
  user_metadata: UserMetaData
}
