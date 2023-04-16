import { supabase } from 'src/utils/supabase'

export const SignInWithOtp = async ({ phoneNumber }) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phoneNumber,
  })

  return { data, error }
}
