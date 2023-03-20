import { generateParagraph } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const StyledText = styled.Text`
  ${({ theme }) =>
    generateParagraph({
      color: theme.greyscale[50],
      fontWeight: 600,
      size: 18,
    })};
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
