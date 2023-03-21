import { ParagraphXL } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const StyledText = styled.Text`
  ${ParagraphXL}
  font-weight: 600;
  color: ${({ theme }) => theme.greyscale[50]};
`

export const Line = styled.View`
  height: 1px;
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 34px 0px;
`
