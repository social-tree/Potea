import { getUserNotificationsParams } from './notifications.types'
import { supabase } from 'src/utils/supabase'

export const getUserNotifications = async ({
  offset,
  amountPerPage = 10,
  userCreationDate,
}: getUserNotificationsParams) => {
  let query = supabase.rpc('get_notifications')

  let count

  if (Number(offset) >= 0) {
    count = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', userCreationDate)
  }

  const { data, error } = await query
  console.log({ data, error, count })

  return { data, error, countData: count || 0 }
}
