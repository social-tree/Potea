import { Container, Line, StyledText } from './ChoiceSplit.styles'

export const ChoiceSplit = (props) => {
  return (
    <Container {...props}>
      <Line />
      <StyledText>or</StyledText>
      <Line />
    </Container>
  )
}
