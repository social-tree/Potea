import * as Styled from './Transaction.styles'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { TransactionType } from 'src/types/transactions'
import { theme } from 'src/styles/theme'

export const Transaction = ({
  id,
  created_at,
  icon,
  amount,
  name,
  type,
}: TransactionType) => {
  return (
    <Styled.Container>
      <Styled.TransactionIcon type={type}>
        <MaterialCommunityIcons name={icon as any} size={30} color="white" />
      </Styled.TransactionIcon>
      <Styled.TransactionInfo>
        <Styled.TransactionInfoTop>
          <Styled.TransactionName>
            {name === 'Order' ? `Order #${id}` : name}
          </Styled.TransactionName>
          <Styled.TransactionPrice>${amount}</Styled.TransactionPrice>
        </Styled.TransactionInfoTop>
        <Styled.TransactionInfoBottom>
          <Styled.TransactionDate>
            {`${new Date(created_at)?.toDateString()} | ${
              new Date(created_at)?.toTimeString()?.split(' ')?.[0]
            }`}
          </Styled.TransactionDate>
          <Styled.TransactionType>{type}</Styled.TransactionType>
          {type === 'Top Ups' ? (
            <MaterialCommunityIcons
              name="arrow-down-circle"
              size={20}
              color={theme.primary[500]}
            />
          ) : (
            <MaterialCommunityIcons
              name="arrow-up-circle"
              size={20}
              color={theme.status.error}
            />
          )}
        </Styled.TransactionInfoBottom>
      </Styled.TransactionInfo>
    </Styled.Container>
  )
}
