import { HeadingThree } from 'src/styles/utils/typography'
import { OtherMethods } from '../CreateAccount/CreateAccount.styles'
import styled from 'styled-components/native'

export const StyledOtherMethods = styled(OtherMethods)`
  gap: 20px;
  display: flex;
  align-items: center;
`

export const GreenText = styled.Text`
  color: ${({ theme }) => theme.primary[500]};
`

export const Lock = styled.Image``

export const Form = styled.View`
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: center;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.greyscale[50]};
  ${HeadingThree}
`

export const Container = styled.ScrollView`
  padding: 0px 24px 0px 24px;
`
