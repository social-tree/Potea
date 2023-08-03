import { ParagraphL } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const PaymentStatus = styled.Text`
  ${ParagraphL}
  color: ${({ theme }) => theme.primary[500]};
  font-weight: 700;
`
