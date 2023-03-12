import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { Logo } from 'src/assets/svg/Logo'

export const StyledLogo = styled(Logo)`
  margin-top: 50%;
`

export const StyledLottieView = styled(LottieView)`
  padding-top: 30%;
`

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${({ theme }) => theme.darkColors.dark1};
`
