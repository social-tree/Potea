import { decode } from 'base64-arraybuffer'
import { supabase } from 'src/utils/supabase'
import { uploadUserProfileImageParams } from './avatar.types'

export const uploadUserProfileImage = async ({
  avatarBase64,
  userId,
}: uploadUserProfileImageParams) => {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`${userId}.png`, decode(avatarBase64), {
      cacheControl: '3600',
      upsert: true,
      contentType: 'image/png',
    })
  return { data, error }
}
