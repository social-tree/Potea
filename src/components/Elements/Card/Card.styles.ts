import {
  HeadingFive,
  HeadingOne,
  ParagraphM,
} from 'src/styles/utils/typography'

import { Button } from '../Button'
import styled from 'styled-components/native'

export const TopUpButton = styled(Button)`
  min-width: 118px;
  min-height: 38px;
  height: 38px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.other.white};
`

export const BalanceNumber = styled.Text`
  ${HeadingOne}
  color: ${({ theme }) => theme.other.white};
`

export const BalanceTitle = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.other.white};
`

export const BalanceContainer = styled.View`
  display: flex;
`

export const Bottom = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`

export const CardLogos = styled.View``

export const CardNumber = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphM}
`

export const CardName = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${HeadingFive}
`

export const TopCardDetails = styled.View`
  display: flex;
  gap: 8px;
`

export const Top = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Container = styled.ImageBackground`
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  background-color: ${({ theme }) => theme.primary[500]};
  height: 221px;
  padding: 32px;
`
