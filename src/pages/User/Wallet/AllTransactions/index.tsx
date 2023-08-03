import React, { useContext, useEffect } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { FlatList } from 'react-native'
import { Transaction } from 'src/components/Elements/Transaction'
import { TransactionType } from 'src/types/transactions'
import { getUserTransactions } from 'src/api/transactions'
import { useFocusEffect } from '@react-navigation/native'
import { usePagination } from 'src/hooks/usePagination'
import { useState } from 'react'

export const AllTransactions = () => {
  const { data, hasMore, nextPage, fetchData, offset, onPageRefresh, loading } =
    usePagination(getUserTransactions)

  useEffect(() => {
    fetchData()
  }, [offset])

  return (
    <FlatList
      contentContainerStyle={{ padding: 20, gap: 24 }}
      data={data}
      refreshing={loading}
      onEndReached={() => {
        nextPage()
      }}
      onEndReachedThreshold={0.1}
      onRefresh={() => onPageRefresh()}
      renderItem={({ item }) => (
        <Transaction
          id={item.id}
          user_id={item.user_id}
          amount={item.amount}
          created_at={item.created_at}
          icon={item.icon}
          name={item.name}
          type={item.type}
        />
      )}
    />
  )
}
