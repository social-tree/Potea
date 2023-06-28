import { Button } from 'src/components/Elements/Button'
import { HeadingFour } from 'src/styles/utils/typography'
import { MiniProduct } from 'src/components/Elements/MiniProduct'
import styled from 'styled-components/native'

export const AcceptButton = styled(Button)`
  min-width: undefined;
  flex: 1;
`

export const CancelButton = styled(AcceptButton)`
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const Actions = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.darkColors.dark3};
  padding-top: 24px;
`

export const StyledMiniProduct = styled(MiniProduct)`
  background-color: ${({ theme }) => theme.darkColors.dark1};
`

export const Title = styled.Text`
  ${HeadingFour}
  text-align: center;
  color: ${({ theme }) => theme.other.white};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.darkColors.dark3};
  padding-bottom: 24px;
`

export const Container = styled.View`
  max-height: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 24px 48px 24px;
`
