import {
  HeadingThree,
  HeadingTwo,
  ParagraphXL,
} from 'src/styles/utils/typography'

import { Animated } from 'react-native'
import { Button } from 'src/components/Elements/Button'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'

export const StyledButton = styled(Button)``

export const ButtonContainer = styled.View`
  padding: 0px 24px 15px 24px;
`
export const CarouselContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const WelcomeSlideText = styled.Text`
  ${HeadingTwo}
  color: ${({ theme }) => theme.other.white};
  text-align: center;
  padding: 0px 20px;
`

export const WelcomeSlideContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
`

export const WelcomeDescription = styled.Text`
  ${ParagraphXL}
  color: ${({ theme }) => theme.greyscale[300]};
`

export const Title = styled.Text`
  font-size: 96px;
  color: ${({ theme }) => theme.primary[500]};
  font-weight: 900;
`

export const WelcomeText = styled.Text`
  font-size: 44px;
  font-weight: 700;
  color: ${({ theme }) => theme.other.white};
`

export const WelcomeInfo = styled(LinearGradient)`
  max-height: 565px;
  height: 100%;
  display: flex;
  padding: 62px 32px;
  gap: 0px;
  justify-content: flex-end;
  margin-top: auto;
`

export const WelcomeBackground = styled.Image`
  position: absolute;
  flex: 1;
  width: 100%;
  top: 0;
`

export const WelcomeBackgroundContainer = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`

export const WelcomeContainer = styled(Animated.View)`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  z-index: 10000;
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
`

export const Container = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.darkColors.dark1};
`
