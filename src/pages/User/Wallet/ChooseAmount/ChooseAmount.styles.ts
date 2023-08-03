import { Chip } from 'src/components/Form/Elements/Chip'
import { Input } from 'src/components/Form/Elements/Inputs'
import { ParagraphL } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const AmountChip = styled(Chip)`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 20px;
`

export const AmountsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  max-width: 400px;
  width: 100%;
  align-self: center;
`

export const AmountInput = styled(Input)`
  background-color: transparent;
  border-color: ${({ theme }) => theme.primary[500]};
  padding: 32px;
  border-radius: 32px;
`

export const Title = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.other.white};
  ${ParagraphL}
`

export const Container = styled.View`
  padding: 24px;
  display: flex;
  gap: 24px;
`
