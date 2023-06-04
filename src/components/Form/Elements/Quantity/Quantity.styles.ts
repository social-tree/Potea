import { HeadingSix } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const QuantityAmount = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white}
`

export const Container = styled.View`
  background-color: ${({ theme }) => theme.darkColors.dark3};
  padding: 12px 20px;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`
