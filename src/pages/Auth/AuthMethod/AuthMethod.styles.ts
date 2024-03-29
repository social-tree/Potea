import { HeadingOne, ParagraphM } from 'src/styles/utils/typography'

import { ChoiceSplit } from 'src/components/Elements/ChoiceSplit'
import { WindowWithSmoke } from 'src/assets/svg/WindowWithSmoke'
import styled from 'styled-components/native'

export const SignupButtonText = styled.Text`
  font-weight: 400;
  ${ParagraphM}
  color: ${({ theme }) => theme.primary[500]};

  padding-top: 10px;
`

export const SignupButton = styled.TouchableOpacity<{ disabled?: boolean }>``

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
  padding-bottom: 10px;
`

export const StyledChoiceSplit = styled(ChoiceSplit)`
  padding: 34px 0px;
`

export const SocialLoginText = styled.Text`
  font-weight: 600;
  ${ParagraphM}
  color: ${({ theme }) => theme.greyscale[50]};
`

export const SocialLoginButton = styled.TouchableOpacity<{
  disabled?: boolean
}>`
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
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
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

export const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 0px 24px 0px 24px;
`
