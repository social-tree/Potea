import { ButtonProps } from 'react-native-elements'
import { StyledButton, StyledText } from './Button.styles'

interface Props extends ButtonProps {}

export const Button = ({ children, ...props }: Props) => {
  return (
    <StyledButton {...props}>
      <StyledText>{children}</StyledText>
    </StyledButton>
  )
}
