import {
  HeadingFive,
  HeadingSix,
  ParagraphL,
  ParagraphM,
} from 'src/styles/utils/typography'

import { Button } from 'src/components/Elements/Button'
import styled from 'styled-components/native'

export const TotalAmountValue = styled.Text`
  ${ParagraphL}
  color: ${({ theme }) => theme.other.white}
`

export const TotalAmountTitle = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.other.white};
`

export const TotalAmountRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TotalAmountContainer = styled.View`
  background-color: ${({ theme }) => theme.darkColors.dark2};
  padding: 24px;
  border-radius: 16px;
  display: flex;
  gap: 22px;
`

export const ChooseShippingText = styled.Text`
  margin-right: auto;
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white};
`

export const ChooseShippingButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 20px;
`

export const CheckoutBoldArrow = styled.View`
  padding-left: 16px;
`

export const BottomSheetContainer = styled.View`
  padding: 24px;
`

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const ShippingInfoAddress = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.other.white}
`

export const ShippingInfoTitle = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white}
`

export const ShippingInfo = styled.View`
  display: flex;
  gap: 6px;
  margin-right: auto;
`

export const ShippingInfoIcon = styled.View`
  background-color: ${({ theme }) => theme.primary[500]};
  padding: 8px;
  border-radius: 50px;
`

export const ShippingInfoCard = styled.View`
  background-color: ${({ theme }) => theme.darkColors.dark2};
  min-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
  padding: 20px;
  border-radius: 24;
  gap: 16px;
`

export const CheckoutTitle = styled.Text`
  ${HeadingFive}
  color: ${({ theme }) => theme.other.white};
`

export const Container = styled.View`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex-direction: column;
  flex: 1;
`
