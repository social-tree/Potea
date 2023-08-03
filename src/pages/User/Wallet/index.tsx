import * as Styled from './Wallet.styles'

import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { Card } from 'src/components/Elements/Card'
import { FlatList } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Transaction } from 'src/components/Elements/Transaction'
import { TransactionType } from 'src/types/transactions'
import { WalletStackParamList } from 'src/navigators/WalletNavigator/WalletNavigator.types'
import { getCreditBalance } from 'src/api/balances'
import { getUserTransactions } from 'src/api/transactions'

export const Wallet = ({
  navigation,
}: StackScreenProps<WalletStackParamList, 'MyWallet'>) => {
  const [transactions, setTransactions] = useState<TransactionType[] | []>([])
  const [balance, setBalance] = useState(0)

  const { user, setLoading, loading, setModalErrorText } =
    useContext(AppContext)

  const getTransactionsAndBalance = async () => {
    setLoading(true)
    const userBalance = await getCreditBalance()
    const { data, error } = await getUserTransactions({ limit: 6 })
    if (userBalance.error) {
      setLoading(false)
      setModalErrorText('there was an error getting your balance')
    }
    if (error) {
      setLoading(false)
      setModalErrorText('there was an error getting your transactions')
    }
    setBalance(userBalance.data?.balance)
    setTransactions(data)
    setLoading(false)
  }

  useEffect(() => {
    getTransactionsAndBalance()
  }, [])

  return (
    <FlatList
      ListHeaderComponentStyle={{ gap: 24 }}
      contentContainerStyle={{ padding: 24, gap: 24 }}
      ListHeaderComponent={
        <>
          <Card
            username={`${user?.user_metadata?.full_name}`}
            navigation={navigation}
            balance={balance}
          />
          <Styled.TransactionTop>
            <Styled.TransactionsTitle>
              Recent Transaction History
            </Styled.TransactionsTitle>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllTransactions')}
            >
              <Styled.GreenText>See All</Styled.GreenText>
            </TouchableOpacity>
          </Styled.TransactionTop>
        </>
      }
      refreshing={loading}
      data={transactions}
      onRefresh={() => {
        getTransactionsAndBalance()
      }}
      renderItem={({ item }) => (
        <Transaction
          user_id={item.user_id}
          id={item.id}
          created_at={item.created_at}
          icon={item.icon}
          amount={item.amount}
          name={item.name}
          type={item.type}
        />
      )}
    />
  )
}
