import { Database } from './supabase'
import { User } from '@supabase/supabase-js'

export type UserMetaData = Database['public']['Tables']['users']['Row']

export interface UserType extends User {
  user_metadata: UserMetaData
}
