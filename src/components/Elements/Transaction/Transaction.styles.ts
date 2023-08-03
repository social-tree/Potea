import { HeadingSix, ParagraphM } from 'src/styles/utils/typography'

import styled from 'styled-components/native'

export const TransactionType = styled.Text`
  color: ${({ theme }) => theme.other.white};
  margin-left: auto;
  margin-right: 5px;
  ${ParagraphM}
`

export const TransactionDate = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphM}
`

export const TransactionInfoBottom = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const TransactionPrice = styled.Text`
  color: ${({ theme }) => theme.primary[500]};
  ${HeadingSix}
`

export const TransactionName = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${HeadingSix}
`

export const TransactionInfoTop = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TransactionInfo = styled.View`
  display: flex;
  flex: 1;
  gap: 8px;
`

export const TransactionIcon = styled.View<{ type: string }>`
  width: 60px;
  height: 60px;
  background-color: ${({ theme, type }) =>
    type === 'Top Ups' ? theme.primary[500] : theme.greyscale[500]};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`
