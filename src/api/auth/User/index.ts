import { updateUserInfoTypes, verifyUserInfoTypes } from './User.types'

import { supabase } from 'src/utils/supabase'

export const updateUserInfo = async (userInfo: updateUserInfoTypes) => {
  const { data, error } = await supabase.auth.updateUser(userInfo)
  return { data, error }
}

export const verifyUserInfo = async (verifyInfo: verifyUserInfoTypes) => {
  const { data, error } = await supabase.auth.verifyOtp(verifyInfo)
  return { data, error }
}
