import {
  HeadingSix,
  ParagraphM,
  ParagraphS,
  ParagraphXS,
} from 'src/styles/utils/typography'

import { Button } from 'src/components/Elements/Button'
import styled from 'styled-components/native'

export const TrackOrderButton = styled(Button)`
  max-width: 110px;
  min-width: 110px;
  min-height: 32px;
  height: 32px;
  padding: 6px 16px;
`

export const OrderPrice = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.primary[500]}
`

export const OrderInfoBottom = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const OrderStatus = styled.Text`
  ${ParagraphXS}
  background-color: rgba(1, 183, 99, 0.08);
  color: ${({ theme }) => theme.primary[500]};
  align-self: flex-start;
  border-radius: 6px;
  padding: 6px 10px;
`

export const OrderQuantity = styled.Text`
  ${ParagraphS}
  color: ${({ theme }) => theme.other.white}
`

export const OrderProductName = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white}
`

export const OrderInfo = styled.View`
  display: flex;
  justify-content: space-between;
  flex: 1;
`

export const OrderImage = styled.Image`
  width: 120px;
  height: 120px;
  background-color: ${({ theme }) => theme.darkColors.dark3};
  border-radius: 20px;
`

export const Container = styled.View`
  padding: 20px;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 32px;
  gap: 16px;
`
