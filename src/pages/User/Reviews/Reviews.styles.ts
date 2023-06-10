import { HeadingFour } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const NothingFoundText = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${HeadingFour}
  text-align: center;
`

export const NothingFoundContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`

export const RatingText = styled.Text`
  color: ${({ theme }) => theme.other.white};
`
export const Container = styled.View``
