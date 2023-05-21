import { User } from '@supabase/supabase-js'

export type UserMetaData = {
  full_name: string
  phone_number: string
  avatar: string
  gender: string
  date_of_birth: string
}

export interface UserType extends User {
  user_metadata: UserMetaData
}
