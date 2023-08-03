import * as PaymentMethodsStyled from 'src/pages/User/Cart/PaymentMethods/PaymentMethods.styles'
import * as Styled from './Payments.styles'

import React, { useEffect } from 'react'

import { FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { getPaymentMethods } from 'src/api/paymentMethods'
import { usePagination } from 'src/hooks/usePagination'

export const Payments = () => {
  const { data, fetchData, loading, nextPage, onPageRefresh } =
    usePagination(getPaymentMethods)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <FlatList
      contentContainerStyle={{ padding: 20, gap: 30 }}
      data={data}
      refreshing={loading}
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.1}
      onRefresh={() => onPageRefresh()}
      renderItem={({ item }) => (
        <PaymentMethodsStyled.PaymentMiniCard
          shadowProps={{ style: { borderRadius: 16 } }}
        >
          <FontAwesome5
            name={item.icon_name}
            size={26}
            color={`${item.color}`}
          />
          <PaymentMethodsStyled.PaymentTitle>
            {item.title}
          </PaymentMethodsStyled.PaymentTitle>
          <PaymentMethodsStyled.PaymentBalance>
            {item.balance ? `$${item.balance?.toLocaleString()}` : ``}
          </PaymentMethodsStyled.PaymentBalance>
          <Styled.PaymentStatus>Connected</Styled.PaymentStatus>
        </PaymentMethodsStyled.PaymentMiniCard>
      )}
    />
  )
}
