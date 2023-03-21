import { HeadingOne, ParagraphM } from 'src/styles/utils/typography'

import { WindowWithSmoke } from 'src/assets/svg/WindowWithSmoke'
import styled from 'styled-components/native'

export const SignupButtonText = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.greyscale[50]};
  font-weight: 400;
  padding-top: 10px;
`

export const SignupButton = styled.TouchableOpacity``

export const SignupText = styled.Text`
  padding-top: 10px;
  color: white;
`

export const SignupWrap = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  padding-top: 20px;
`

export const SocialLoginText = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.greyscale[50]};
  font-weight: 600;
`

export const SocialLoginButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  width: 100%;
  height: 60px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.darkColors.dark3};
`

export const SocialButtonsContainer = styled.View`
  width: 100%;
  display: flex;
  gap: 16px;
`

export const StyledWindowWithSmoke = styled(WindowWithSmoke)`
  margin-left: 30px;
`

export const Header = styled.Text`
  ${HeadingOne}
  color: ${({ theme }) => theme.greyscale[50]};
  padding-bottom: 30px;
`

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px 24px 0px 24px;
`
