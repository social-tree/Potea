import { supabase } from 'src/utils/supabase'
import { topUpUserWalletParams } from './balances.types'

export const getCreditBalance = async () => {
  const { data, error } = await supabase.from('balances').select('*').single()
  return { data, error }
}

export const topUpUserWallet = async ({ amount }: topUpUserWalletParams) => {
  const { data, error } = await supabase.rpc('add_to_balance', {
    amount: amount,
  })
  return { data, error }
}
