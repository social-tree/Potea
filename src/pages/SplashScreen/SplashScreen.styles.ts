import styled from 'styled-components/native'
import { Logo } from 'src/assets/svg/Logo'
import { Loading } from 'src/assets/animations/Loading'

export const StyledLogo = styled(Logo)`
  margin-top: 50%;
`

export const StyledLoading = styled(Loading)`
  padding-top: 40%;
  width: 200px;
  height: 200px;
`

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${({ theme }) => theme.darkColors.dark1};
`
