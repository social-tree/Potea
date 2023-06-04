import {
  HeadingFour,
  HeadingSix,
  HeadingThree,
  ParagraphL,
  ParagraphM,
  ParagraphS,
  ParagraphXS,
} from 'src/styles/utils/typography'

import styled from 'styled-components/native'

export const PurchaseText = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphL}
`

export const ButtonContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const PriceValue = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${HeadingFour}
`

export const PriceTitle = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphS}
`

export const PriceContainer = styled.View``

export const PurchaseContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding-top: 13px;
`

export const QuantityContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.darkColors.dark3};
  padding-bottom: 24px;
`

export const Description = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.other.white};
`

export const InfoTitle = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white};
`

export const ReviewText = styled.Text`
  color: ${({ theme }) => theme.other.white};
`

export const AmountSoldText = styled.Text`
  color: ${({ theme }) => theme.primary[500]};
  ${ParagraphXS}
  background-color: ${({ theme }) => `${theme.primary[500]}10`};
  padding: 6px 12px;
  border-radius: 6px;
`

export const InfoBottomBar = styled.View`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.darkColors.dark3};
  padding-bottom: 16px;
`

export const ProductTitle = styled.Text`
  ${HeadingThree}
  color: ${({ theme }) => theme.other.white};
`

export const InfoTopBar = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const ProductInfoContainer = styled.View`
  padding: 24px;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
`

export const DotsContainer = styled.View`
  position: absolute;
  bottom: 8px;
  display: flex;
  align-items: center;
  width: 100%;
`

export const ProductImageContaiener = styled.View`
  position: relative;
`

export const ProductImage = styled.Image`
  width: 100%;
  height: 500px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const Container = styled.ScrollView``
