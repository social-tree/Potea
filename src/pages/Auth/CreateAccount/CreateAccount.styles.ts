import { HeadingThree, ParagraphM } from 'src/styles/utils/typography'

import { Button } from 'src/components/Elements/Button'
import { ChoiceSplit } from 'src/components/Elements/ChoiceSplit'
import { Logo } from 'src/assets/svg/Logo'
import { SignupWrap } from '../AuthMethod/AuthMethod.styles'
import styled from 'styled-components/native'

export const SocialButton = styled.TouchableHighlight`
  padding: 18px 32px;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.darkColors.dark2};
  border: 1px solid ${({ theme }) => theme.darkColors.dark3};
`

export const SocialButtons = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

export const StyledSignupWrap = styled(SignupWrap)`
  padding: 0px;
`

export const OtherMethods = styled.View`
  width: 100%;
`

export const Lock = styled.Image``

export const Form = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.greyscale[50]};
  ${HeadingThree}
`

export const Container = styled.ScrollView`
  padding: 30px 24px 0px 24px;
`
