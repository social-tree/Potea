import {
  HeadingFour,
  HeadingSix,
  ParagraphL,
  ParagraphM,
} from 'src/styles/utils/typography'

import { Button } from 'src/components/Elements/Button'
import { MiniCard } from 'src/components/Elements/MiniCard'
import styled from 'styled-components/native'

export const ModalViewReceiptButton = styled(Button)`
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const ModalViewOrderButton = styled(Button)``

export const ModalButtons = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

export const ModalDesc = styled.Text`
  ${ParagraphL}
  color: ${({ theme }) => theme.other.white}
`

export const ModalTitle = styled.Text`
  ${HeadingFour}
  color: ${({ theme }) => theme.other.white}
`

export const ModalInfo = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`

export const ModalContainer = styled.View`
  padding: 40px 32px 32px 32px;
  max-width: 340px;
  display: flex;
  align-items: center;
  gap: 32px;
`

export const AddNewButton = styled(Button)`
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const PaymentBalance = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white};
  margin-left: auto;
`

export const PaymentTitle = styled(PaymentBalance)`
  margin-left: 0px;
`

export const PaymentMiniCard = styled(MiniCard)`
  border-radius: 16px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphM}
`
