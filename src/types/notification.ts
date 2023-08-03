import { Database } from './supabase'

export type notificationGroupType = {
  date: string
  notifications: Array<Database['public']['Tables']['notifications']['Row']>
}

export type notificationType =
  Database['public']['Tables']['notifications']['Row'] & {
    notification_types: Database['public']['Tables']['notification_types']['Row']
  }
