import { Button } from 'src/components/Elements/Button'
import { ParagraphL } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const ChangePassButton = styled(Button)`
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const SwitchLabel = styled.Text`
  ${ParagraphL}
  color: ${({ theme }) => theme.other.white};
`

export const SwitchContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Container = styled.View`
  padding: 20px;
  gap: 20px;
`
