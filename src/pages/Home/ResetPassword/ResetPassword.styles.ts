import {
  HeadingFive,
  ParagraphL,
  ParagraphXL,
} from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const ModalInfo = styled.View`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const SuccessModal = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 340px;
  gap: 32px;
  padding: 40px 32px 0px 32px;
`

export const ModalDescription = styled.Text`
  ${ParagraphL}
  text-align: center;
  color: ${({ theme }) => theme.other.white};
`

export const ModalTitle = styled.Text`
  ${HeadingFive}
  text-align: center;
  color: ${({ theme }) => theme.other.white};
`

export const Info = styled.Text`
  ${ParagraphXL}
  color: ${({ theme }) => theme.other.white};
`

export const Wrapper = styled.View`
  width: 100%;
  display: flex;
  gap: 24px;
`

export const Container = styled.ScrollView`
  display: flex;
  gap: 71px;
`
