import {
  HeadingFour,
  HeadingSix,
  ParagraphL,
  ParagraphM,
  ParagraphXS,
} from 'src/styles/utils/typography'

import { Heart } from 'src/assets/svg/Heart'
import styled from 'styled-components/native'

export const Price = styled.Text<{ size: string }>`
  ${({ size }) => (size === 'large' ? HeadingFour : HeadingSix)}
  color: ${({ theme }) => theme.primary[500]};
`

export const AmountSoldText = styled.Text<{ size: string }>`
  ${ParagraphXS}

  color: ${({ theme }) => theme.primary[500]};
  border: 1px solid ${({ theme }) => theme.primary[500]};
  padding: 3px 10px;
  border-radius: 6px;
`

export const RatingText = styled.Text<{ size: string }>`
  ${({ size }) => (size === 'large' ? ParagraphL : ParagraphM)}

  color: ${({ theme }) => theme.other.white}
`

export const Rating = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const Title = styled.Text<{ size: string }>`
  ${({ size }) => (size === 'large' ? HeadingFour : HeadingSix)}
  color: ${({ theme }) => theme.other.white};
`

export const StyledHeart = styled(Heart)<{ size: string }>``

export const HeartButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
`

export const ProductImage = styled.Image<{ size: string }>`
  height: ${({ size }) => (size === 'large' ? '240px' : '182px')};
  width: 100%;
  max-width: ${({ size }) => (size === 'large' ? '240px' : '182px')};
  background: ${({ theme }) => theme.darkColors.dark3};
  border-radius: 36px;
`

export const ImageContainer = styled.View``

export const Container = styled.TouchableOpacity<{ size: string }>`
  height: ${({ size }) => (size === 'large' ? '362px' : '298px')};
  width: 100%;
  flex: 1;
  min-width: ${({ size }) => (size === 'large' ? '240px' : '162px')};
  max-width: ${({ size }) => (size === 'large' ? '240px' : '182px')};
  display: flex;
  gap: 10px;
`
