import { ParagraphL, ParagraphM, ParagraphS } from 'src/styles/utils/typography'

import styled from 'styled-components/native'

export const CreatedDate = styled.Text`
  ${ParagraphS}
  color: ${({ theme }) => theme.greyscale[400]}
`

export const Description = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphM}
  letter-spacing: 0.2px;
  line-height: 25px;
`

export const RatingValue = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.primary[500]}
`

export const ReviewRating = styled.View`
  display: flex;
  flex-direction: row;
  border-width: 2px;
  border-color: ${({ theme }) => theme.primary[500]};
  padding: 6px 15px;
  border-radius: 100px;
  align-items: center;
  gap: 9px;
  margin-left: auto;
`

export const Username = styled.Text`
  ${ParagraphL}
  color: ${({ theme }) => theme.other.white}
`

export const Avatar = styled.Image`
  width: 48px;
  height: 48px;

  border-radius: 50px;
`

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

export const Container = styled.View`
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
