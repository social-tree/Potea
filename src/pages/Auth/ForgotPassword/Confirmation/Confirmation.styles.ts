import { HeadingFour, ParagraphXL } from 'src/styles/utils/typography'

import { CodeField } from 'react-native-confirmation-code-field'
import styled from 'styled-components/native'

export const TextCell = styled.Text<{ isFocused: boolean }>`
  text-align: center;
  color: ${({ theme }) => theme.other.white};
  ${HeadingFour}
  margin-bottom: ${({ isFocused }) => (isFocused ? '6px' : '0px')};
`

export const TextCellContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 53px;
  height: 61px;
  margin: 0px 6px;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.darkColors.dark3};
`

export const StyledCodeField = styled(CodeField)`
  display: flex;
  gap: 5px;
`

export const ConfirmationText = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphXL}
  text-align: center;
`

export const GreenConfirmationText = styled.Text`
  ${ParagraphXL}
  color: ${({ theme }) => theme.primary[500]};
`

export const ResendButton = styled.TouchableHighlight`
  display: flex;
  flex-direction: row;
`

export const Wrapper = styled.View`
  display: flex;
  gap: 60px;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const Container = styled.View`
  display: flex;
  flex: 1;
  padding: 0px 24px 38px 24px;
`
