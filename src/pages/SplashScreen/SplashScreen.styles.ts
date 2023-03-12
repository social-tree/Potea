import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'

export const StyledLottieView = styled(LottieView)`
  padding-top: 50%;
`

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${({ theme }) => theme.darkColors.dark1};
`
