import { Button } from 'src/components/Elements/Button'
import { HeadingFour } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const ErrorTitle = styled.Text`
  ${HeadingFour}
  color: ${({ theme }) => theme.other.white};
  text-align: center;
  width: 100%;
`

export const ErrorButton = styled(Button)`
  background-color: ${({ theme }) => theme.greyscale[600]};
`

export const ErrorWrapper = styled.View`
  width: 340px;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 44px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`

export const ErrorContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`
