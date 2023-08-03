import { HeadingFive, ParagraphL } from 'src/styles/utils/typography'

import styled from 'styled-components/native'

export const TransactionsTitle = styled.Text`
  ${HeadingFive}
  color: ${({ theme }) => theme.other.white}
`

export const GreenText = styled.Text`
  color: ${({ theme }) => theme.primary[500]};
  ${ParagraphL}
`

export const TransactionTop = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
