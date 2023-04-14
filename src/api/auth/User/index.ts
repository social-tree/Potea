import { supabase } from 'src/utils/supabase'

export const updateUserInfo = async (userInfo: updateUserInfoTypes) => {
  const { data, error } = await supabase.auth.updateUser(userInfo)
  return { data, error }
}
